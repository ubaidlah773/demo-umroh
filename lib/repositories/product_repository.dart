import 'package:sqflite/sqflite.dart';
import '../core/database/app_database.dart';
import '../models/product_model.dart';

class ProductRepository {
  final AppDatabase _dbHelper;

  ProductRepository({AppDatabase? dbHelper}) : _dbHelper = dbHelper ?? AppDatabase.instance;

  static const String _selectQuery = '''
    SELECT 
      p.*, 
      c.name AS category_name, 
      u.name AS unit_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN units u ON p.unit_id = u.id
  ''';

  Future<List<ProductModel>> getAllProducts({
    String? query,
    int? categoryId,
    bool? lowStockOnly,
    bool? outOfStockOnly,
  }) async {
    final db = await _dbHelper.database;
    final List<String> whereClauses = [];
    final List<dynamic> whereArgs = [];

    if (query != null && query.trim().isNotEmpty) {
      final sanitized = '%${query.trim()}%';
      whereClauses.add('(p.name LIKE ? OR p.barcode LIKE ? OR c.name LIKE ?)');
      whereArgs.addAll([sanitized, sanitized, sanitized]);
    }

    if (categoryId != null && categoryId > 0) {
      whereClauses.add('p.category_id = ?');
      whereArgs.add(categoryId);
    }

    if (outOfStockOnly == true) {
      whereClauses.add('p.stock <= 0');
    } else if (lowStockOnly == true) {
      whereClauses.add('(p.stock > 0 AND p.stock <= p.minimum_stock)');
    }

    String fullQuery = _selectQuery;
    if (whereClauses.isNotEmpty) {
      fullQuery += ' WHERE ${whereClauses.join(' AND ')}';
    }
    fullQuery += ' ORDER BY p.name ASC';

    final List<Map<String, dynamic>> results = await db.rawQuery(fullQuery, whereArgs);
    return results.map((m) => ProductModel.fromMap(m)).toList();
  }

  Future<ProductModel?> getProductById(int id) async {
    final db = await _dbHelper.database;
    final List<Map<String, dynamic>> results = await db.rawQuery(
      '$_selectQuery WHERE p.id = ?',
      [id],
    );
    if (results.isEmpty) return null;
    return ProductModel.fromMap(results.first);
  }

  Future<ProductModel?> getProductByBarcode(String barcode) async {
    if (barcode.trim().isEmpty) return null;
    final db = await _dbHelper.database;
    final List<Map<String, dynamic>> results = await db.rawQuery(
      '$_selectQuery WHERE p.barcode = ?',
      [barcode.trim()],
    );
    if (results.isEmpty) return null;
    return ProductModel.fromMap(results.first);
  }

  Future<List<ProductModel>> getLowStockProducts() async {
    final db = await _dbHelper.database;
    final List<Map<String, dynamic>> results = await db.rawQuery(
      '$_selectQuery WHERE p.stock <= p.minimum_stock ORDER BY p.stock ASC',
    );
    return results.map((m) => ProductModel.fromMap(m)).toList();
  }

  Future<int> insertProduct(ProductModel product) async {
    final db = await _dbHelper.database;
    final now = DateTime.now().toIso8601String();

    return await db.transaction((txn) async {
      final id = await txn.insert(
        'products',
        product.copyWith(createdAt: now, updatedAt: now).toMap(),
      );

      // Record initial stock movement
      if (product.stock > 0) {
        await txn.insert('stock_movements', {
          'product_id': id,
          'type': 'in',
          'quantity': product.stock,
          'before_stock': 0,
          'after_stock': product.stock,
          'reason': 'Stok Awal Barang',
          'reference_id': 'NEW-$id',
          'created_at': now,
        });
      }

      return id;
    });
  }

  Future<int> updateProduct(ProductModel product) async {
    if (product.id == null) return 0;
    final db = await _dbHelper.database;
    final now = DateTime.now().toIso8601String();

    return await db.update(
      'products',
      product.copyWith(updatedAt: now).toMap(),
      where: 'id = ?',
      whereArgs: [product.id],
    );
  }

  Future<bool> hasTransactionHistory(int productId) async {
    final db = await _dbHelper.database;
    final saleCount = Sqflite.firstIntValue(
      await db.rawQuery('SELECT COUNT(*) FROM sale_details WHERE product_id = ?', [productId]),
    ) ?? 0;
    if (saleCount > 0) return true;

    final purchaseCount = Sqflite.firstIntValue(
      await db.rawQuery('SELECT COUNT(*) FROM purchase_details WHERE product_id = ?', [productId]),
    ) ?? 0;
    return purchaseCount > 0;
  }

  Future<int> deleteProduct(int id) async {
    final db = await _dbHelper.database;
    // SQLite cascade / delete
    return await db.delete('products', where: 'id = ?', whereArgs: [id]);
  }

  Future<int> getProductsCount() async {
    final db = await _dbHelper.database;
    return Sqflite.firstIntValue(
      await db.rawQuery('SELECT COUNT(*) FROM products'),
    ) ?? 0;
  }
}
