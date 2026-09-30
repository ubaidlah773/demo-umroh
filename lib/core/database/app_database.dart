import 'dart:async';
import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';
import '../constants/app_constants.dart';
import 'seed_data.dart';

class AppDatabase {
  static final AppDatabase instance = AppDatabase._init();
  static Database? _database;

  AppDatabase._init();

  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDB(AppConstants.databaseName);
    return _database!;
  }

  Future<Database> _initDB(String filePath) async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, filePath);

    return await openDatabase(
      path,
      version: AppConstants.databaseVersion,
      onCreate: _createDB,
      onConfigure: _onConfigure,
    );
  }

  Future<void> _onConfigure(Database db) async {
    await db.execute('PRAGMA foreign_keys = ON');
  }

  Future<void> _createDB(Database db, int version) async {
    // 1. Categories
    await db.execute('''
      CREATE TABLE categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
      )
    ''');

    // 2. Units
    await db.execute('''
      CREATE TABLE units (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
      )
    ''');

    // 3. Products
    await db.execute('''
      CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
        unit_id INTEGER REFERENCES units(id) ON DELETE SET NULL,
        barcode TEXT,
        purchase_price INTEGER NOT NULL DEFAULT 0,
        selling_price INTEGER NOT NULL DEFAULT 0,
        stock INTEGER NOT NULL DEFAULT 0,
        minimum_stock INTEGER NOT NULL DEFAULT 5,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    ''');

    // 4. Suppliers
    await db.execute('''
      CREATE TABLE suppliers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT,
        address TEXT,
        notes TEXT,
        created_at TEXT NOT NULL
      )
    ''');

    // 5. Purchases
    await db.execute('''
      CREATE TABLE purchases (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        invoice_number TEXT NOT NULL UNIQUE,
        supplier_id INTEGER REFERENCES suppliers(id) ON DELETE SET NULL,
        date TEXT NOT NULL,
        total INTEGER NOT NULL DEFAULT 0,
        notes TEXT,
        created_at TEXT NOT NULL
      )
    ''');

    // 6. Purchase Details
    await db.execute('''
      CREATE TABLE purchase_details (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        purchase_id INTEGER NOT NULL REFERENCES purchases(id) ON DELETE CASCADE,
        product_id INTEGER NOT NULL REFERENCES products(id),
        quantity INTEGER NOT NULL,
        purchase_price INTEGER NOT NULL,
        subtotal INTEGER NOT NULL
      )
    ''');

    // 7. Sales
    await db.execute('''
      CREATE TABLE sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        invoice_number TEXT NOT NULL UNIQUE,
        date TEXT NOT NULL,
        total INTEGER NOT NULL DEFAULT 0,
        paid INTEGER NOT NULL DEFAULT 0,
        change INTEGER NOT NULL DEFAULT 0,
        payment_method TEXT NOT NULL DEFAULT 'Tunai',
        created_at TEXT NOT NULL
      )
    ''');

    // 8. Sale Details
    await db.execute('''
      CREATE TABLE sale_details (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sale_id INTEGER NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
        product_id INTEGER NOT NULL REFERENCES products(id),
        quantity INTEGER NOT NULL,
        purchase_price INTEGER NOT NULL,
        selling_price INTEGER NOT NULL,
        subtotal INTEGER NOT NULL,
        profit INTEGER NOT NULL
      )
    ''');

    // 9. Stock Movements
    await db.execute('''
      CREATE TABLE stock_movements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        type TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        before_stock INTEGER NOT NULL,
        after_stock INTEGER NOT NULL,
        reason TEXT NOT NULL,
        reference_id TEXT,
        created_at TEXT NOT NULL
      )
    ''');

    // 10. Settings
    await db.execute('''
      CREATE TABLE settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      )
    ''');

    // Insert Default System Data (Units & Categories)
    for (final unit in AppConstants.standardUnits) {
      await db.insert('units', {'name': unit});
    }
    for (final cat in AppConstants.standardCategories) {
      await db.insert('categories', {'name': cat});
    }

    // Default Settings
    await db.insert('settings', {'key': 'store_name', 'value': 'Warung Mak Wi'});
    await db.insert('settings', {'key': 'store_address', 'value': 'Jl. Contoh No. 10'});
    await db.insert('settings', {'key': 'store_phone', 'value': '081234567890'});
    await db.insert('settings', {'key': 'receipt_footer', 'value': 'Terima kasih atas kunjungan Anda! 🙏'});
    await db.insert('settings', {'key': 'currency', 'value': 'IDR'});
    await db.insert('settings', {'key': 'dark_mode', 'value': 'false'});

    // Optional initial seed data can be loaded if requested or on first launch
    await SeedData.insertInitialSampleData(db);
  }

  Future<void> close() async {
    final db = _database;
    if (db != null) {
      await db.close();
      _database = null;
    }
  }
}
