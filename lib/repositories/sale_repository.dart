import 'package:intl/intl.dart';
import 'package:sqflite/sqflite.dart';
import '../core/database/app_database.dart';
import '../models/cart_item_model.dart';
import '../models/sale_detail_model.dart';
import '../models/sale_model.dart';

class SaleRepository {
  final AppDatabase _dbHelper;

  SaleRepository({AppDatabase? dbHelper}) : _dbHelper = dbHelper ?? AppDatabase.instance;

  /// Generate next invoice number, e.g. TRX-20260930-001
  Future<String> generateInvoiceNumber(DatabaseExecutor db) async {
    final now = DateTime.now();
    final datePrefix = DateFormat('yyyyMMdd').format(now);
    final prefix = 'TRX-$datePrefix-';

    final result = await db.rawQuery(
      "SELECT invoice_number FROM sales WHERE invoice_number LIKE '$prefix%' ORDER BY id DESC LIMIT 1",
    );

    if (result.isEmpty) {
      return '${prefix}001';
    }

    final lastInvoice = result.first['invoice_number'] as String;
    final lastSeqStr = lastInvoice.split('-').last;
    final lastSeq = int.tryParse(lastSeqStr) ?? 0;
    final nextSeq = (lastSeq + 1).toString().padLeft(3, '0');
    return '$prefix$nextSeq';
  }

  /// Create a sale inside a single atomic SQLite transaction
  Future<SaleModel> createSale({
    required List<CartItemModel> items,
    required int total,
    required int paid,
    required int change,
    required String paymentMethod,
  }) async {
    if (items.isEmpty) {
      throw Exception('Keranjang belanja kosong.');
    }

    if (paid < total) {
      throw Exception('Uang pembayaran kurang dari total belanja.');
    }

    final db = await _dbHelper.database;

    return await db.transaction((txn) async {
      // 1. Stock Validation for every item
      for (final item in items) {
        final prodRows = await txn.query(
          'products',
          where: 'id = ?',
          whereArgs: [item.product.id],
        );
        if (prodRows.isEmpty) {
          throw Exception('Barang "${item.product.name}" tidak ditemukan di database.');
        }

        final currentStock = (prodRows.first['stock'] as num).toInt();
        if (currentStock < item.quantity) {
          throw Exception(
            'Stok "${item.product.name}" tidak mencukupi (tersedia: $currentStock, diminta: ${item.quantity}).',
          );
        }
      }

      final now = DateTime.now().toIso8601String();
      final invoiceNumber = await generateInvoiceNumber(txn);

      // 2. Insert into sales
      final saleId = await txn.insert('sales', {
        'invoice_number': invoiceNumber,
        'date': now,
        'total': total,
        'paid': paid,
        'change': change,
        'payment_method': paymentMethod,
        'created_at': now,
      });

      final List<SaleDetailModel> createdDetails = [];

      // 3. Process each item: insert detail, reduce stock, record movement
      for (final item in items) {
        final prodRows = await txn.query(
          'products',
          where: 'id = ?',
          whereArgs: [item.product.id],
        );
        final currentStock = (prodRows.first['stock'] as num).toInt();
        final purchasePrice = (prodRows.first['purchase_price'] as num).toInt();
        final sellingPrice = item.product.sellingPrice;
        final subtotal = item.subtotal;
        final profit = (sellingPrice - purchasePrice) * item.quantity;
        final afterStock = currentStock - item.quantity;

        // Insert sale_details
        final detailId = await txn.insert('sale_details', {
          'sale_id': saleId,
          'product_id': item.product.id!,
          'quantity': item.quantity,
          'purchase_price': purchasePrice,
          'selling_price': sellingPrice,
          'subtotal': subtotal,
          'profit': profit,
        });

        createdDetails.add(
          SaleDetailModel(
            id: detailId,
            saleId: saleId,
            productId: item.product.id!,
            productName: item.product.name,
            unitName: item.product.unitName,
            quantity: item.quantity,
            purchasePrice: purchasePrice,
            sellingPrice: sellingPrice,
            subtotal: subtotal,
            profit: profit,
          ),
        );

        // Update product stock
        await txn.update(
          'products',
          {
            'stock': afterStock,
            'updated_at': now,
          },
          where: 'id = ?',
          whereArgs: [item.product.id],
        );

        // Record stock movement
        await txn.insert('stock_movements', {
          'product_id': item.product.id!,
          'type': 'sale',
          'quantity': -item.quantity,
          'before_stock': currentStock,
          'after_stock': afterStock,
          'reason': 'Penjualan $invoiceNumber',
          'reference_id': invoiceNumber,
          'created_at': now,
        });
      }

      return SaleModel(
        id: saleId,
        invoiceNumber: invoiceNumber,
        date: now,
        total: total,
        paid: paid,
        change: change,
        paymentMethod: paymentMethod,
        createdAt: now,
        items: createdDetails,
      );
    });
  }

  /// Get list of sales with optional date filtering and search
  Future<List<SaleModel>> getSales({
    DateTime? startDate,
    DateTime? endDate,
    String? searchQuery,
    int limit = 100,
  }) async {
    final db = await _dbHelper.database;
    final List<String> whereClauses = [];
    final List<dynamic> whereArgs = [];

    if (startDate != null) {
      final startStr = DateFormat('yyyy-MM-dd 00:00:00').format(startDate);
      whereClauses.add('s.date >= ?');
      whereArgs.add(startStr);
    }

    if (endDate != null) {
      final endStr = DateFormat('yyyy-MM-dd 23:59:59').format(endDate);
      whereClauses.add('s.date <= ?');
      whereArgs.add(endStr);
    }

    if (searchQuery != null && searchQuery.trim().isNotEmpty) {
      whereClauses.add('s.invoice_number LIKE ?');
      whereArgs.add('%${searchQuery.trim()}%');
    }

    String whereSql = '';
    if (whereClauses.isNotEmpty) {
      whereSql = 'WHERE ${whereClauses.join(' AND ')}';
    }

    final query = '''
      SELECT s.*
      FROM sales s
      $whereSql
      ORDER BY s.date DESC, s.id DESC
      LIMIT $limit
    ''';

    final List<Map<String, dynamic>> saleMaps = await db.rawQuery(query, whereArgs);

    final List<SaleModel> sales = [];
    for (final sm in saleMaps) {
      final saleId = sm['id'] as int;
      final detailMaps = await db.rawQuery('''
        SELECT sd.*, p.name AS product_name, u.name AS unit_name
        FROM sale_details sd
        JOIN products p ON sd.product_id = p.id
        LEFT JOIN units u ON p.unit_id = u.id
        WHERE sd.sale_id = ?
      ''', [saleId]);

      final details = detailMaps.map((d) => SaleDetailModel.fromMap(d)).toList();
      sales.add(SaleModel.fromMap(sm, items: details));
    }

    return sales;
  }

  /// Fetch single sale by id
  Future<SaleModel?> getSaleById(int id) async {
    final db = await _dbHelper.database;
    final saleMaps = await db.query('sales', where: 'id = ?', whereArgs: [id]);
    if (saleMaps.isEmpty) return null;

    final detailMaps = await db.rawQuery('''
      SELECT sd.*, p.name AS product_name, u.name AS unit_name
      FROM sale_details sd
      JOIN products p ON sd.product_id = p.id
      LEFT JOIN units u ON p.unit_id = u.id
      WHERE sd.sale_id = ?
    ''', [id]);

    final details = detailMaps.map((d) => SaleDetailModel.fromMap(d)).toList();
    return SaleModel.fromMap(saleMaps.first, items: details);
  }

  Future<int> getSalesCount() async {
    final db = await _dbHelper.database;
    return Sqflite.firstIntValue(
      await db.rawQuery('SELECT COUNT(*) FROM sales'),
    ) ?? 0;
  }
}
