import 'package:sqflite/sqflite.dart';

class SeedData {
  static Future<void> insertInitialSampleData(Database db) async {
    final count = Sqflite.firstIntValue(
      await db.rawQuery('SELECT COUNT(*) FROM products'),
    ) ?? 0;

    if (count > 0) return; // Only seed if empty

    final now = DateTime.now().toIso8601String();

    // Map Category IDs
    final catRows = await db.query('categories');
    final Map<String, int> catMap = {
      for (var row in catRows) row['name'] as String: row['id'] as int,
    };

    // Map Unit IDs
    final unitRows = await db.query('units');
    final Map<String, int> unitMap = {
      for (var row in unitRows) row['name'] as String: row['id'] as int,
    };

    // Realistic Indonesian Warung Products
    final sampleProducts = [
      {
        'name': 'Indomie Goreng',
        'category': 'Makanan',
        'unit': 'bungkus',
        'barcode': '089686010924',
        'purchase_price': 2600,
        'selling_price': 3500,
        'stock': 48,
        'minimum_stock': 10,
      },
      {
        'name': 'Aqua 600ml',
        'category': 'Minuman',
        'unit': 'botol',
        'barcode': '8886008101053',
        'purchase_price': 2500,
        'selling_price': 3500,
        'stock': 24,
        'minimum_stock': 8,
      },
      {
        'name': 'Gula Pasir 1kg',
        'category': 'Sembako',
        'unit': 'kg',
        'barcode': '8992761131016',
        'purchase_price': 15000,
        'selling_price': 17500,
        'stock': 4, // Low stock demo! (<= 5)
        'minimum_stock': 5,
      },
      {
        'name': 'Minyak Goreng Sania 2L',
        'category': 'Sembako',
        'unit': 'bungkus',
        'barcode': '8993005315024',
        'purchase_price': 31000,
        'selling_price': 35000,
        'stock': 12,
        'minimum_stock': 4,
      },
      {
        'name': 'Telur Ayam',
        'category': 'Sembako',
        'unit': 'butir',
        'barcode': '',
        'purchase_price': 1800,
        'selling_price': 2200,
        'stock': 3, // Low stock demo! (<= 10)
        'minimum_stock': 10,
      },
      {
        'name': 'Kopi Kapal Api Spesial Mix',
        'category': 'Minuman',
        'unit': 'sachet',
        'barcode': '8992696404456',
        'purchase_price': 1200,
        'selling_price': 1800,
        'stock': 30,
        'minimum_stock': 10,
      },
      {
        'name': 'Teh Celup SariWangi 25s',
        'category': 'Minuman',
        'unit': 'dus',
        'barcode': '8999999017644',
        'purchase_price': 6500,
        'selling_price': 8000,
        'stock': 8,
        'minimum_stock': 3,
      },
      {
        'name': 'Rokok Sampoerna Mild 16',
        'category': 'Rokok',
        'unit': 'bungkus',
        'barcode': '8998989100115',
        'purchase_price': 31000,
        'selling_price': 34000,
        'stock': 15,
        'minimum_stock': 5,
      },
      {
        'name': 'Sabun Cuci Piring Sunlight 650ml',
        'category': 'Sabun & Sampo',
        'unit': 'bungkus',
        'barcode': '8999999042219',
        'purchase_price': 11500,
        'selling_price': 14000,
        'stock': 2, // Low stock demo!
        'minimum_stock': 5,
      },
      {
        'name': 'Biskuit Roma Kelapa 300g',
        'category': 'Snack & Biskuit',
        'unit': 'bungkus',
        'barcode': '8996001301019',
        'purchase_price': 9000,
        'selling_price': 11000,
        'stock': 14,
        'minimum_stock': 4,
      },
    ];

    for (final p in sampleProducts) {
      final catId = catMap[p['category']];
      final unitId = unitMap[p['unit']];

      final productId = await db.insert('products', {
        'name': p['name'],
        'category_id': catId,
        'unit_id': unitId,
        'barcode': p['barcode'],
        'purchase_price': p['purchase_price'],
        'selling_price': p['selling_price'],
        'stock': p['stock'],
        'minimum_stock': p['minimum_stock'],
        'created_at': now,
        'updated_at': now,
      });

      // Initial stock movement record
      await db.insert('stock_movements', {
        'product_id': productId,
        'type': 'in',
        'quantity': p['stock'],
        'before_stock': 0,
        'after_stock': p['stock'],
        'reason': 'Stok Awal Toko',
        'reference_id': 'INIT-$productId',
        'created_at': now,
      });
    }

    // Insert 1 Default Supplier
    final supplierId = await db.insert('suppliers', {
      'name': 'Toko Grosir Makmur Jaya',
      'phone': '081399887766',
      'address': 'Pasar Induk Blok B No. 15',
      'notes': 'Supplier sembako dan makanan ringan mingguan',
      'created_at': now,
    });

    // Create 1 sample purchase
    final purchaseId = await db.insert('purchases', {
      'invoice_number': 'BELI-20260925-001',
      'supplier_id': supplierId,
      'date': now,
      'total': 124800,
      'notes': 'Stok awal pembukaan toko',
      'created_at': now,
    });

    // Insert purchase details
    await db.insert('purchase_details', {
      'purchase_id': purchaseId,
      'product_id': 1,
      'quantity': 48,
      'purchase_price': 2600,
      'subtotal': 124800,
    });
  }

  /// Reset all transaction data while preserving product catalog
  static Future<void> clearTransactions(Database db) async {
    await db.delete('sale_details');
    await db.delete('sales');
    await db.delete('purchase_details');
    await db.delete('purchases');
    await db.delete('stock_movements');
  }

  /// Wipes all tables completely (used in restore/full reset)
  static Future<void> wipeAllData(Database db) async {
    await db.delete('sale_details');
    await db.delete('sales');
    await db.delete('purchase_details');
    await db.delete('purchases');
    await db.delete('stock_movements');
    await db.delete('products');
    await db.delete('suppliers');
    await db.delete('categories');
    await db.delete('units');
    await db.delete('settings');
  }
}
