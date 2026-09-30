import 'package:flutter/material.dart';
import '../models/cart_item_model.dart';
import '../models/sale_model.dart';
import '../repositories/sale_repository.dart';

class SaleProvider extends ChangeNotifier {
  final SaleRepository _saleRepo;

  SaleProvider({SaleRepository? saleRepo}) : _saleRepo = saleRepo ?? SaleRepository();

  List<SaleModel> _sales = [];
  SaleModel? _lastCompletedSale;
  bool _isProcessing = false;
  String? _errorMessage;

  List<SaleModel> get sales => _sales;
  SaleModel? get lastCompletedSale => _lastCompletedSale;
  bool get isProcessing => _isProcessing;
  String? get errorMessage => _errorMessage;

  Future<void> loadSales({DateTime? start, DateTime? end, String? search}) async {
    try {
      _sales = await _saleRepo.getSales(
        startDate: start,
        endDate: end,
        searchQuery: search,
      );
      notifyListeners();
    } catch (e) {
      debugPrint('Error loading sales: $e');
    }
  }

  /// Processes checkout atomically
  Future<SaleModel?> processCheckout({
    required List<CartItemModel> items,
    required int total,
    required int paid,
    required int change,
    required String paymentMethod,
  }) async {
    _isProcessing = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final sale = await _saleRepo.createSale(
        items: items,
        total: total,
        paid: paid,
        change: change,
        paymentMethod: paymentMethod,
      );

      _lastCompletedSale = sale;
      await loadSales();
      return sale;
    } catch (e) {
      _errorMessage = e.toString().replaceAll('Exception: ', '');
      return null;
    } finally {
      _isProcessing = false;
      notifyListeners();
    }
  }

  void clearLastSale() {
    _lastCompletedSale = null;
    notifyListeners();
  }
}
