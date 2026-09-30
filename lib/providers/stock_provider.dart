import 'package:flutter/material.dart';
import '../models/stock_movement_model.dart';
import '../repositories/stock_repository.dart';

class StockProvider extends ChangeNotifier {
  final StockRepository _stockRepo;

  StockProvider({StockRepository? stockRepo}) : _stockRepo = stockRepo ?? StockRepository();

  List<StockMovementModel> _movements = [];
  bool _isLoading = false;
  String? _errorMessage;

  List<StockMovementModel> get movements => _movements;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  Future<void> loadMovements({int? productId}) async {
    _isLoading = true;
    notifyListeners();

    try {
      _movements = await _stockRepo.getStockMovements(productId: productId);
    } catch (e) {
      debugPrint('Error loading stock movements: $e');
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<bool> adjustStock({
    required int productId,
    required int delta,
    required String reason,
  }) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      await _stockRepo.adjustStock(
        productId: productId,
        delta: delta,
        reason: reason,
      );
      await loadMovements();
      return true;
    } catch (e) {
      _errorMessage = e.toString().replaceAll('Exception: ', '');
      return false;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<bool> quickStockIn({
    required int productId,
    required int quantity,
    String reason = 'Penambahan Stok Cepat',
  }) async {
    try {
      await _stockRepo.quickStockIn(
        productId: productId,
        quantity: quantity,
        reason: reason,
      );
      await loadMovements();
      return true;
    } catch (e) {
      _errorMessage = e.toString().replaceAll('Exception: ', '');
      return false;
    }
  }
}
