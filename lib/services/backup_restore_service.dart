import 'dart:convert';
import 'dart:io';
import 'package:path_provider/path_provider.dart';
import 'package:sqflite/sqflite.dart';
import '../core/constants/app_constants.dart';
import '../core/database/app_database.dart';

class BackupRestoreResult {
  final bool isSuccess;
  final String message;
  final String? filePath;

  BackupRestoreResult({
    required this.isSuccess,
    required this.message,
    this.filePath,
  });
}

class BackupRestoreService {
  final AppDatabase _dbHelper;

  BackupRestoreService({AppDatabase? dbHelper}) : _dbHelper = dbHelper ?? AppDatabase.instance;

  static const List<String> _tablesInOrder = [
    'units',
    'categories',
    'suppliers',
    'products',
    'purchases',
    'purchase_details',
    'sales',
    'sale_details',
    'stock_movements',
    'settings',
  ];

  /// Creates a complete JSON backup of the entire local database
  Future<String> createBackupJson() async {
    final db = await _dbHelper.database;
    final Map<String, dynamic> backupData = {};

    for (final table in _tablesInOrder) {
      final rows = await db.query(table);
      backupData[table] = rows;
    }

    final payload = {
      'app': AppConstants.appName,
      'version': AppConstants.appVersion,
      'export_date': DateTime.now().toIso8601String(),
      'tables': backupData,
    };

    return const JsonEncoder.withIndent('  ').convert(payload);
  }

  /// Exports backup to local device storage
  Future<BackupRestoreResult> exportBackupToFile() async {
    try {
      final jsonString = await createBackupJson();
      final directory = await getApplicationDocumentsDirectory();
      final dateStr = DateTime.now().toIso8601String().replaceAll(':', '-').split('.').first;
      final fileName = 'warung_pintar_backup_$dateStr.json';
      final file = File('${directory.path}/$fileName');
      await file.writeAsString(jsonString);

      return BackupRestoreResult(
        isSuccess: true,
        message: 'Backup berhasil disimpan: $fileName',
        filePath: file.path,
      );
    } catch (e) {
      return BackupRestoreResult(
        isSuccess: false,
        message: 'Gagal membuat backup data: ${e.toString()}',
      );
    }
  }

  /// Restores database from JSON string with strict validation and transaction rollback
  Future<BackupRestoreResult> restoreFromJson(String jsonContent) async {
    try {
      final Map<String, dynamic> parsed = jsonDecode(jsonContent);

      if (!parsed.containsKey('tables') || !parsed.containsKey('app')) {
        return BackupRestoreResult(
          isSuccess: false,
          message: 'Format file backup tidak valid atau rusak.',
        );
      }

      final Map<String, dynamic> tables = parsed['tables'] as Map<String, dynamic>;
      final db = await _dbHelper.database;

      await db.transaction((txn) async {
        // Reverse order deletion for FK safety
        final reversedTables = _tablesInOrder.reversed.toList();
        for (final table in reversedTables) {
          await txn.delete(table);
        }

        // Forward order insertion
        for (final table in _tablesInOrder) {
          if (tables.containsKey(table)) {
            final List<dynamic> rows = tables[table] as List<dynamic>;
            for (final row in rows) {
              await txn.insert(
                table,
                Map<String, dynamic>.from(row as Map),
                conflictAlgorithm: ConflictAlgorithm.replace,
              );
            }
          }
        }
      });

      return BackupRestoreResult(
        isSuccess: true,
        message: 'Data berhasil dipulihkan secara lengkap! 🎉',
      );
    } catch (e) {
      return BackupRestoreResult(
        isSuccess: false,
        message: 'Gagal memulihkan data backup. Database tidak berubah: ${e.toString()}',
      );
    }
  }
}
