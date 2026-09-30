import 'package:flutter/material.dart';
import '../models/cart_item_model.dart';
import '../models/product_model.dart';

class CartProvider extends ChangeNotifier {
  final List<CartItemModel> _items = [];

  List<CartItemModel> get items => List.unmodifiable(_items);

  bool get isEmpty => _items.isEmpty;
  bool get isNotEmpty => _items.isNotEmpty;

  int get totalAmount => _items.fold(0, (sum, item) => sum + item.subtotal);
  int get totalCost => _items.fold(0, (sum, item) => sum + item.cost);
  int get totalProfit => _items.fold(0, (sum, item) => sum + item.profit);
  int get totalItemsCount => _items.fold(0, (sum, item) => sum + item.quantity);

  int getItemQuantity(int productId) {
    final index = _items.indexWhere((i) => i.product.id == productId);
    if (index >= 0) return _items[index].quantity;
    return 0;
  }

  /// Adds a product to cart or increments quantity
  bool addItem(ProductModel product) {
    if (product.id == null) return false;

    // Check if out of stock
    if (product.stock <= 0) {
      return false;
    }

    final index = _items.indexWhere((i) => i.product.id == product.id);
    if (index >= 0) {
      if (_items[index].quantity < product.stock) {
        _items[index].quantity++;
        notifyListeners();
        return true;
      } else {
        return false; // Reached maximum stock limit
      }
    } else {
      _items.add(CartItemModel(product: product, quantity: 1));
      notifyListeners();
      return true;
    }
  }

  /// Decrements quantity or removes item if reaches 0
  void decrementItem(int productId) {
    final index = _items.indexWhere((i) => i.product.id == productId);
    if (index >= 0) {
      if (_items[index].quantity > 1) {
        _items[index].quantity--;
      } else {
        _items.removeAt(index);
      }
      notifyListeners();
    }
  }

  /// Updates quantity directly
  bool setQuantity(int productId, int newQuantity) {
    final index = _items.indexWhere((i) => i.product.id == productId);
    if (index >= 0) {
      if (newQuantity <= 0) {
        _items.removeAt(index);
        notifyListeners();
        return true;
      }
      if (newQuantity <= _items[index].product.stock) {
        _items[index].quantity = newQuantity;
        notifyListeners();
        return true;
      }
    }
    return false;
  }

  /// Removes item completely from cart
  void removeItem(int productId) {
    _items.removeWhere((i) => i.product.id == productId);
    notifyListeners();
  }

  /// Clears cart
  void clear() {
    _items.clear();
    notifyListeners();
  }
}
