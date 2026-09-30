import 'package:flutter/material.dart';
import '../repositories/settings_repository.dart';
import '../services/backup_restore_service.dart';

class SettingsProvider extends ChangeNotifier {
  final SettingsRepository _settingsRepo;
  final BackupRestoreService _backupService;

  SettingsProvider({
    SettingsRepository? settingsRepo,
    BackupRestoreService? backupService,
  })  : _settingsRepo = settingsRepo ?? SettingsRepository(),
        _backupService = backupService ?? BackupRestoreService();

  StoreProfile _storeProfile = StoreProfile(
    name: 'Warung Mak Wi',
    address: 'Jl. Contoh No. 10',
    phone: '081234567890',
    receiptFooter: 'Terima kasih atas kunjungan Anda! 🙏',
  );

  DatabaseStats _stats = DatabaseStats(
    productCount: 0,
    transactionCount: 0,
    purchaseCount: 0,
    supplierCount: 0,
    databaseSizeKb: 0,
  );

  bool _isLoading = false;
  String? _statusMessage;

  StoreProfile get storeProfile => _storeProfile;
  DatabaseStats get stats => _stats;
  bool get isLoading => _isLoading;
  String? get statusMessage => _statusMessage;

  Future<void> init() async {
    await Future.wait([
      loadProfile(),
      loadStats(),
    ]);
  }

  Future<void> loadProfile() async {
    try {
      _storeProfile = await _settingsRepo.getStoreProfile();
      notifyListeners();
    } catch (e) {
      debugPrint('Error loading profile: $e');
    }
  }

  Future<void> updateProfile({
    required String name,
    required String address,
    required String phone,
    required String footer,
  }) async {
    _isLoading = true;
    notifyListeners();

    try {
      await _settingsRepo.updateStoreProfile(
        name: name,
        address: address,
        phone: phone,
        footer: footer,
      );
      await loadProfile();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> loadStats() async {
    try {
      _stats = await _settingsRepo.getDatabaseStats();
      notifyListeners();
    } catch (e) {
      debugPrint('Error loading stats: $e');
    }
  }

  Future<BackupRestoreResult> exportBackup() async {
    _isLoading = true;
    notifyListeners();

    try {
      final res = await _backupService.exportBackupToFile();
      _statusMessage = res.message;
      return res;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<String> getBackupJsonString() async {
    return await _backupService.createBackupJson();
  }

  Future<BackupRestoreResult> restoreBackup(String jsonContent) async {
    _isLoading = true;
    notifyListeners();

    try {
      final res = await _backupService.restoreFromJson(jsonContent);
      _statusMessage = res.message;
      if (res.isSuccess) {
        await init();
      }
      return res;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> reloadSampleData() async {
    _isLoading = true;
    notifyListeners();

    try {
      await _settingsRepo.reloadSampleData();
      await init();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> clearTransactions() async {
    _isLoading = true;
    notifyListeners();

    try {
      await _settingsRepo.clearTransactions();
      await loadStats();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}
