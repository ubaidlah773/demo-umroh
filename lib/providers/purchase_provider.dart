import 'package:flutter/material.dart';
import '../models/purchase_detail_model.dart';
import '../models/purchase_model.dart';
import '../models/supplier_model.dart';
import '../repositories/purchase_repository.dart';
import '../repositories/supplier_repository.dart';

class PurchaseProvider extends ChangeNotifier {
  final PurchaseRepository _purchaseRepo;
  final SupplierRepository _supplierRepo;

  PurchaseProvider({
    PurchaseRepository? purchaseRepo,
    SupplierRepository? supplierRepo,
  })  : _purchaseRepo = purchaseRepo ?? PurchaseRepository(),
        _supplierRepo = supplierRepo ?? SupplierRepository();

  List<PurchaseModel> _purchases = [];
  List<SupplierModel> _suppliers = [];
  bool _isLoading = false;
  String? _errorMessage;

  List<PurchaseModel> get purchases => _purchases;
  List<SupplierModel> get suppliers => _suppliers;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  Future<void> init() async {
    await Future.wait([
      loadPurchases(),
      loadSuppliers(),
    ]);
  }

  Future<void> loadPurchases({DateTime? start, DateTime? end}) async {
    _isLoading = true;
    notifyListeners();

    try {
      _purchases = await _purchaseRepo.getPurchases(startDate: start, endDate: end);
    } catch (e) {
      debugPrint('Error loading purchases: $e');
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> loadSuppliers() async {
    try {
      _suppliers = await _supplierRepo.getAllSuppliers();
      notifyListeners();
    } catch (e) {
      debugPrint('Error loading suppliers: $e');
    }
  }

  Future<bool> addPurchase({
    int? supplierId,
    required DateTime date,
    required List<PurchaseDetailModel> items,
    String? notes,
  }) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      await _purchaseRepo.createPurchase(
        supplierId: supplierId,
        date: date,
        items: items,
        notes: notes,
      );
      await loadPurchases();
      return true;
    } catch (e) {
      _errorMessage = e.toString().replaceAll('Exception: ', '');
      return false;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<int> addSupplier(SupplierModel supplier) async {
    final id = await _supplierRepo.insertSupplier(supplier);
    await loadSuppliers();
    return id;
  }

  Future<void> updateSupplier(SupplierModel supplier) async {
    await _supplierRepo.updateSupplier(supplier);
    await loadSuppliers();
  }

  Future<void> deleteSupplier(int id) async {
    await _supplierRepo.deleteSupplier(id);
    await loadSuppliers();
  }
}
