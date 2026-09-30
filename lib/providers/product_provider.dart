import 'package:flutter/material.dart';
import '../models/category_model.dart';
import '../models/product_model.dart';
import '../repositories/category_repository.dart';
import '../repositories/product_repository.dart';
import '../repositories/unit_repository.dart';

class ProductProvider extends ChangeNotifier {
  final ProductRepository _productRepo;
  final CategoryRepository _categoryRepo;
  final UnitRepository _unitRepo;

  ProductProvider({
    ProductRepository? productRepo,
    CategoryRepository? categoryRepo,
    UnitRepository? unitRepo,
  })  : _productRepo = productRepo ?? ProductRepository(),
        _categoryRepo = categoryRepo ?? CategoryRepository(),
        _unitRepo = unitRepo ?? UnitRepository();

  List<ProductModel> _products = [];
  List<CategoryModel> _categories = [];
  List<UnitModel> _units = [];

  bool _isLoading = false;
  String _searchQuery = '';
  String _activeFilter = 'all'; // 'all', 'low_stock', 'out_of_stock'
  int? _selectedCategoryId;

  List<ProductModel> get products => _products;
  List<CategoryModel> get categories => _categories;
  List<UnitModel> get units => _units;
  bool get isLoading => _isLoading;
  String get searchQuery => _searchQuery;
  String get activeFilter => _activeFilter;
  int? get selectedCategoryId => _selectedCategoryId;

  Future<void> init() async {
    await Future.wait([
      loadCategories(),
      loadUnits(),
      loadProducts(),
    ]);
  }

  Future<void> loadProducts() async {
    _isLoading = true;
    notifyListeners();

    try {
      _products = await _productRepo.getAllProducts(
        query: _searchQuery,
        categoryId: _selectedCategoryId,
        lowStockOnly: _activeFilter == 'low_stock',
        outOfStockOnly: _activeFilter == 'out_of_stock',
      );
    } catch (e) {
      debugPrint('Error loading products: $e');
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> loadCategories() async {
    try {
      _categories = await _categoryRepo.getAllCategories();
      notifyListeners();
    } catch (e) {
      debugPrint('Error loading categories: $e');
    }
  }

  Future<void> loadUnits() async {
    try {
      _units = await _unitRepo.getAllUnits();
      notifyListeners();
    } catch (e) {
      debugPrint('Error loading units: $e');
    }
  }

  void setSearchQuery(String query) {
    _searchQuery = query;
    loadProducts();
  }

  void setFilter(String filter) {
    _activeFilter = filter;
    loadProducts();
  }

  void setCategoryFilter(int? categoryId) {
    _selectedCategoryId = categoryId;
    loadProducts();
  }

  Future<int> addProduct(ProductModel product) async {
    final id = await _productRepo.insertProduct(product);
    await loadProducts();
    return id;
  }

  Future<void> updateProduct(ProductModel product) async {
    await _productRepo.updateProduct(product);
    await loadProducts();
  }

  Future<bool> deleteProduct(int id) async {
    try {
      await _productRepo.deleteProduct(id);
      await loadProducts();
      return true;
    } catch (e) {
      return false;
    }
  }

  Future<bool> hasTransactionHistory(int id) async {
    return await _productRepo.hasTransactionHistory(id);
  }

  Future<void> addCategory(String name) async {
    await _categoryRepo.insertCategory(name);
    await loadCategories();
  }

  Future<void> addUnit(String name) async {
    await _unitRepo.insertUnit(name);
    await loadUnits();
  }
}
