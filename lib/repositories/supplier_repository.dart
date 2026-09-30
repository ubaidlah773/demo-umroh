import 'package:sqflite/sqflite.dart';
import '../core/database/app_database.dart';
import '../models/supplier_model.dart';

class SupplierRepository {
  final AppDatabase _dbHelper;

  SupplierRepository({AppDatabase? dbHelper}) : _dbHelper = dbHelper ?? AppDatabase.instance;

  Future<List<SupplierModel>> getAllSuppliers() async {
    final db = await _dbHelper.database;
    final List<Map<String, dynamic>> results = await db.query(
      'suppliers',
      orderBy: 'name ASC',
    );
    return results.map((m) => SupplierModel.fromMap(m)).toList();
  }

  Future<SupplierModel?> getSupplierById(int id) async {
    final db = await _dbHelper.database;
    final List<Map<String, dynamic>> results = await db.query(
      'suppliers',
      where: 'id = ?',
      whereArgs: [id],
    );
    if (results.isEmpty) return null;
    return SupplierModel.fromMap(results.first);
  }

  Future<int> insertSupplier(SupplierModel supplier) async {
    final db = await _dbHelper.database;
    return await db.insert('suppliers', supplier.toMap());
  }

  Future<int> updateSupplier(SupplierModel supplier) async {
    if (supplier.id == null) return 0;
    final db = await _dbHelper.database;
    return await db.update(
      'suppliers',
      supplier.toMap(),
      where: 'id = ?',
      whereArgs: [supplier.id],
    );
  }

  Future<int> deleteSupplier(int id) async {
    final db = await _dbHelper.database;
    return await db.delete('suppliers', where: 'id = ?', whereArgs: [id]);
  }
}
