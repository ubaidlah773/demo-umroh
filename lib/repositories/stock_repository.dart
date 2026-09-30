import 'package:sqflite/sqflite.dart';
import '../core/database/app_database.dart';
import '../models/stock_movement_model.dart';

class StockRepository {
  final AppDatabase _dbHelper;

  StockRepository({AppDatabase? dbHelper}) : _dbHelper = dbHelper ?? AppDatabase.instance;

  Future<List<StockMovementModel>> getStockMovements({
    int? productId,
    int limit = 100,
  }) async {
    final db = await _dbHelper.database;
    final List<dynamic> whereArgs = [];
    String whereClause = '';

    if (productId != null) {
      whereClause = 'WHERE sm.product_id = ?';
      whereArgs.add(productId);
    }

    final query = '''
      SELECT 
        sm.*, 
        p.name AS product_name, 
        u.name AS unit_name
      FROM stock_movements sm
      JOIN products p ON sm.product_id = p.id
      LEFT JOIN units u ON p.unit_id = u.id
      $whereClause
      ORDER BY sm.created_at DESC, sm.id DESC
      LIMIT $limit
    ''';

    final List<Map<String, dynamic>> results = await db.rawQuery(query, whereArgs);
    return results.map((m) => StockMovementModel.fromMap(m)).toList();
  }

  /// Adjust stock manually with mandatory reason and strict atomic integrity
  Future<void> adjustStock({
    required int productId,
    required int delta,
    required String reason,
    String? referenceId,
  }) async {
    if (delta == 0) return;
    final db = await _dbHelper.database;

    await db.transaction((txn) async {
      // 1. Fetch current product
      final productRows = await txn.query(
        'products',
        where: 'id = ?',
        whereArgs: [productId],
      );

      if (productRows.isEmpty) {
        throw Exception('Barang tidak ditemukan.');
      }

      final currentStock = (productRows.first['stock'] as num).toInt();
      final afterStock = currentStock + delta;

      if (afterStock < 0) {
        throw Exception('Stok tidak boleh kurang dari 0 (tersedia: $currentStock)');
      }

      final now = DateTime.now().toIso8601String();

      // 2. Update product stock
      await txn.update(
        'products',
        {
          'stock': afterStock,
          'updated_at': now,
        },
        where: 'id = ?',
        whereArgs: [productId],
      );

      // 3. Insert stock movement record
      final movementType = delta > 0 ? 'adjustment' : 'out';
      await txn.insert('stock_movements', {
        'product_id': productId,
        'type': movementType,
        'quantity': delta,
        'before_stock': currentStock,
        'after_stock': afterStock,
        'reason': reason.trim(),
        'reference_id': referenceId ?? 'ADJ-${DateTime.now().millisecondsSinceEpoch}',
        'created_at': now,
      });
    });
  }

  /// Quick stock increment (e.g. from low stock banner or quick button)
  Future<void> quickStockIn({
    required int productId,
    required int quantity,
    String reason = 'Penambahan Stok Cepat',
  }) async {
    if (quantity <= 0) return;
    await adjustStock(
      productId: productId,
      delta: quantity,
      reason: reason,
      referenceId: 'QUICK-IN',
    );
  }
}
