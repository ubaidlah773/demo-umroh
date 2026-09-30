import 'package:sqflite/sqflite.dart';
import '../core/database/app_database.dart';
import '../models/category_model.dart';

class CategoryRepository {
  final AppDatabase _dbHelper;

  CategoryRepository({AppDatabase? dbHelper}) : _dbHelper = dbHelper ?? AppDatabase.instance;

  Future<List<CategoryModel>> getAllCategories() async {
    final db = await _dbHelper.database;
    final List<Map<String, dynamic>> maps = await db.query(
      'categories',
      orderBy: 'name ASC',
    );
    return maps.map((m) => CategoryModel.fromMap(m)).toList();
  }

  Future<int> insertCategory(String name) async {
    final db = await _dbHelper.database;
    return await db.insert(
      'categories',
      {'name': name.trim()},
      conflictAlgorithm: ConflictAlgorithm.ignore,
    );
  }

  Future<int> deleteCategory(int id) async {
    final db = await _dbHelper.database;
    return await db.delete('categories', where: 'id = ?', whereArgs: [id]);
  }
}

class UnitRepository {
  final AppDatabase _dbHelper;

  UnitRepository({AppDatabase? dbHelper}) : _dbHelper = dbHelper ?? AppDatabase.instance;

  Future<List<UnitModel>> getAllUnits() async {
    final db = await _dbHelper.database;
    final List<Map<String, dynamic>> maps = await db.query(
      'units',
      orderBy: 'name ASC',
    );
    return maps.map((m) => UnitModel.fromMap(m)).toList();
  }

  Future<int> insertUnit(String name) async {
    final db = await _dbHelper.database;
    return await db.insert(
      'units',
      {'name': name.trim().toLowerCase()},
      conflictAlgorithm: ConflictAlgorithm.ignore,
    );
  }
}
