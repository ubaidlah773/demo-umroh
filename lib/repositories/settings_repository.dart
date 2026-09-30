import 'dart:io';
import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';
import '../core/constants/app_constants.dart';
import '../core/database/app_database.dart';
import '../core/database/seed_data.dart';

class StoreProfile {
  final String name;
  final String address;
  final String phone;
  final String receiptFooter;

  StoreProfile({
    required this.name,
    required this.address,
    required this.phone,
    required this.receiptFooter,
  });
}

class DatabaseStats {
  final int productCount;
  final int transactionCount;
  final int purchaseCount;
  final int supplierCount;
  final int databaseSizeKb;

  DatabaseStats({
    required this.productCount,
    required this.transactionCount,
    required this.purchaseCount,
    required this.supplierCount,
    required this.databaseSizeKb,
  });
}

class SettingsRepository {
  final AppDatabase _dbHelper;

  SettingsRepository({AppDatabase? dbHelper}) : _dbHelper = dbHelper ?? AppDatabase.instance;

  Future<String> getSetting(String key, {String defaultValue = ''}) async {
    final db = await _dbHelper.database;
    final results = await db.query(
      'settings',
      where: 'key = ?',
      whereArgs: [key],
    );
    if (results.isEmpty) return defaultValue;
    return results.first['value'] as String;
  }

  Future<void> setSetting(String key, String value) async {
    final db = await _dbHelper.database;
    await db.insert(
      'settings',
      {'key': key, 'value': value},
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<StoreProfile> getStoreProfile() async {
    final name = await getSetting('store_name', defaultValue: 'Warung Mak Wi');
    final address = await getSetting('store_address', defaultValue: 'Jl. Contoh No. 10');
    final phone = await getSetting('store_phone', defaultValue: '081234567890');
    final footer = await getSetting('receipt_footer', defaultValue: 'Terima kasih atas kunjungan Anda! 🙏');

    return StoreProfile(
      name: name,
      address: address,
      phone: phone,
      receiptFooter: footer,
    );
  }

  Future<void> updateStoreProfile({
    required String name,
    required String address,
    required String phone,
    required String footer,
  }) async {
    await setSetting('store_name', name.trim());
    await setSetting('store_address', address.trim());
    await setSetting('store_phone', phone.trim());
    await setSetting('receipt_footer', footer.trim());
  }

  Future<DatabaseStats> getDatabaseStats() async {
    final db = await _dbHelper.database;

    final prodCount = Sqflite.firstIntValue(
      await db.rawQuery('SELECT COUNT(*) FROM products'),
    ) ?? 0;

    final saleCount = Sqflite.firstIntValue(
      await db.rawQuery('SELECT COUNT(*) FROM sales'),
    ) ?? 0;

    final purchaseCount = Sqflite.firstIntValue(
      await db.rawQuery('SELECT COUNT(*) FROM purchases'),
    ) ?? 0;

    final supplierCount = Sqflite.firstIntValue(
      await db.rawQuery('SELECT COUNT(*) FROM suppliers'),
    ) ?? 0;

    int sizeKb = 0;
    try {
      final dbPath = await getDatabasesPath();
      final path = join(dbPath, AppConstants.databaseName);
      final file = File(path);
      if (await file.exists()) {
        sizeKb = (await file.length()) ~/ 1024;
      }
    } catch (_) {}

    return DatabaseStats(
      productCount: prodCount,
      transactionCount: saleCount,
      purchaseCount: purchaseCount,
      supplierCount: supplierCount,
      databaseSizeKb: sizeKb,
    );
  }

  Future<void> clearTransactions() async {
    final db = await _dbHelper.database;
    await SeedData.clearTransactions(db);
  }

  Future<void> reloadSampleData() async {
    final db = await _dbHelper.database;
    await SeedData.wipeAllData(db);

    // Reinsert standards
    for (final unit in AppConstants.standardUnits) {
      await db.insert('units', {'name': unit});
    }
    for (final cat in AppConstants.standardCategories) {
      await db.insert('categories', {'name': cat});
    }
    await db.insert('settings', {'key': 'store_name', 'value': 'Warung Mak Wi'});
    await db.insert('settings', {'key': 'store_address', 'value': 'Jl. Contoh No. 10'});
    await db.insert('settings', {'key': 'store_phone', 'value': '081234567890'});
    await db.insert('settings', {'key': 'receipt_footer', 'value': 'Terima kasih atas kunjungan Anda! 🙏'});
    await db.insert('settings', {'key': 'currency', 'value': 'IDR'});
    await db.insert('settings', {'key': 'dark_mode', 'value': 'false'});

    await SeedData.insertInitialSampleData(db);
  }
}
