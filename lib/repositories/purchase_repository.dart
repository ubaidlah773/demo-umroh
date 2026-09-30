import 'package:intl/intl.dart';
import 'package:sqflite/sqflite.dart';
import '../core/database/app_database.dart';
import '../models/purchase_detail_model.dart';
import '../models/purchase_model.dart';

class PurchaseRepository {
  final AppDatabase _dbHelper;

  PurchaseRepository({AppDatabase? dbHelper}) : _dbHelper = dbHelper ?? AppDatabase.instance;

  Future<String> generateInvoiceNumber(DatabaseExecutor db) async {
    final now = DateTime.now();
    final datePrefix = DateFormat('yyyyMMdd').format(now);
    final prefix = 'BELI-$datePrefix-';

    final result = await db.rawQuery(
      "SELECT invoice_number FROM purchases WHERE invoice_number LIKE '$prefix%' ORDER BY id DESC LIMIT 1",
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

  /// Create a purchase inside a single atomic SQLite transaction
  Future<PurchaseModel> createPurchase({
    int? supplierId,
    required DateTime date,
    required List<PurchaseDetailModel> items,
    String? notes,
  }) async {
    if (items.isEmpty) {
      throw Exception('Daftar barang pembelian tidak boleh kosong.');
    }

    final db = await _dbHelper.database;
    final total = items.fold(0, (sum, item) => sum + item.subtotal);

    return await db.transaction((txn) async {
      final now = DateTime.now().toIso8601String();
      final invoiceNumber = await generateInvoiceNumber(txn);

      // 1. Insert into purchases
      final purchaseId = await txn.insert('purchases', {
        'invoice_number': invoiceNumber,
        'supplier_id': supplierId,
        'date': date.toIso8601String(),
        'total': total,
        'notes': notes ?? '',
        'created_at': now,
      });

      final List<PurchaseDetailModel> createdDetails = [];

      // 2. Insert details, increase stock, record movement
      for (final item in items) {
        final prodRows = await txn.query(
          'products',
          where: 'id = ?',
          whereArgs: [item.productId],
        );
        if (prodRows.isEmpty) {
          throw Exception('Barang ID ${item.productId} tidak ditemukan.');
        }

        final currentStock = (prodRows.first['stock'] as num).toInt();
        final afterStock = currentStock + item.quantity;

        // Insert detail
        final detailId = await txn.insert('purchase_details', {
          'purchase_id': purchaseId,
          'product_id': item.productId,
          'quantity': item.quantity,
          'purchase_price': item.purchasePrice,
          'subtotal': item.subtotal,
        });

        createdDetails.add(
          PurchaseDetailModel(
            id: detailId,
            purchaseId: purchaseId,
            productId: item.productId,
            productName: item.productName ?? prodRows.first['name'] as String?,
            quantity: item.quantity,
            purchasePrice: item.purchasePrice,
            subtotal: item.subtotal,
          ),
        );

        // Update product stock and optionally purchase_price
        await txn.update(
          'products',
          {
            'stock': afterStock,
            'purchase_price': item.purchasePrice,
            'updated_at': now,
          },
          where: 'id = ?',
          whereArgs: [item.productId],
        );

        // Record stock movement
        await txn.insert('stock_movements', {
          'product_id': item.productId,
          'type': 'purchase',
          'quantity': item.quantity,
          'before_stock': currentStock,
          'after_stock': afterStock,
          'reason': 'Pembelian $invoiceNumber',
          'reference_id': invoiceNumber,
          'created_at': now,
        });
      }

      return PurchaseModel(
        id: purchaseId,
        invoiceNumber: invoiceNumber,
        supplierId: supplierId,
        date: date.toIso8601String(),
        total: total,
        notes: notes,
        createdAt: now,
        items: createdDetails,
      );
    });
  }

  Future<List<PurchaseModel>> getPurchases({
    DateTime? startDate,
    DateTime? endDate,
    int limit = 100,
  }) async {
    final db = await _dbHelper.database;
    final List<String> whereClauses = [];
    final List<dynamic> whereArgs = [];

    if (startDate != null) {
      final startStr = DateFormat('yyyy-MM-dd 00:00:00').format(startDate);
      whereClauses.add('p.date >= ?');
      whereArgs.add(startStr);
    }

    if (endDate != null) {
      final endStr = DateFormat('yyyy-MM-dd 23:59:59').format(endDate);
      whereClauses.add('p.date <= ?');
      whereArgs.add(endStr);
    }

    String whereSql = '';
    if (whereClauses.isNotEmpty) {
      whereSql = 'WHERE ${whereClauses.join(' AND ')}';
    }

    final query = '''
      SELECT p.*, s.name AS supplier_name
      FROM purchases p
      LEFT JOIN suppliers s ON p.supplier_id = s.id
      $whereSql
      ORDER BY p.date DESC, p.id DESC
      LIMIT $limit
    ''';

    final List<Map<String, dynamic>> purchaseMaps = await db.rawQuery(query, whereArgs);
    final List<PurchaseModel> purchases = [];

    for (final pm in purchaseMaps) {
      final purchaseId = pm['id'] as int;
      final detailMaps = await db.rawQuery('''
        SELECT pd.*, pr.name AS product_name, u.name AS unit_name
        FROM purchase_details pd
        JOIN products pr ON pd.product_id = pr.id
        LEFT JOIN units u ON pr.unit_id = u.id
        WHERE pd.purchase_id = ?
      ''', [purchaseId]);

      final details = detailMaps.map((d) => PurchaseDetailModel.fromMap(d)).toList();
      purchases.add(PurchaseModel.fromMap(pm, items: details));
    }

    return purchases;
  }

  Future<int> getPurchasesCount() async {
    final db = await _dbHelper.database;
    return Sqflite.firstIntValue(
      await db.rawQuery('SELECT COUNT(*) FROM purchases'),
    ) ?? 0;
  }
}
