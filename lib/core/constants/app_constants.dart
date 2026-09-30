class AppConstants {
  static const String appName = 'Warung Mak Wi';
  static const String appTagline = 'Aplikasi Kasir & Stok Warung Offline';
  static const String appVersion = '1.0.0';

  // Database
  static const String databaseName = 'warung_pintar.db';
  static const int databaseVersion = 1;

  // Defaults
  static const int defaultMinimumStock = 5;
  static const String defaultUnit = 'pcs';
  static const String defaultCategory = 'Lainnya';
  static const String defaultCurrency = 'Rp ';

  // Stock Adjustment Reasons
  static const List<String> stockAdjustmentReasons = [
    'Barang rusak',
    'Barang hilang',
    'Stok opname',
    'Kesalahan input',
    'Kadaluarsa (Expired)',
    'Pemakaian pribadi',
    'Bonus / Promosi',
  ];

  // Default Units
  static const List<String> standardUnits = [
    'pcs',
    'kg',
    'bungkus',
    'botol',
    'liter',
    'renteng',
    'dus',
    'sachet',
    'butir',
    'kaleng',
  ];

  // Default Categories
  static const List<String> standardCategories = [
    'Makanan',
    'Minuman',
    'Sembako',
    'Rokok',
    'Snack & Biskuit',
    'Bumbu Dapur',
    'Perlengkapan Rumah',
    'Sabun & Sampo',
    'Obat & Perawatan',
    'Lainnya',
  ];
}
