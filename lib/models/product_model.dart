class ProductModel {
  final int? id;
  final String name;
  final int? categoryId;
  final String? categoryName;
  final int? unitId;
  final String? unitName;
  final String? barcode;
  final int purchasePrice;
  final int sellingPrice;
  final int stock;
  final int minimumStock;
  final String createdAt;
  final String updatedAt;

  ProductModel({
    this.id,
    required this.name,
    this.categoryId,
    this.categoryName,
    this.unitId,
    this.unitName,
    this.barcode,
    required this.purchasePrice,
    required this.sellingPrice,
    required this.stock,
    this.minimumStock = 5,
    required this.createdAt,
    required this.updatedAt,
  });

  int get margin => sellingPrice - purchasePrice;

  double get marginPercentage {
    if (purchasePrice <= 0) return 0.0;
    return ((sellingPrice - purchasePrice) / purchasePrice) * 100.0;
  }

  bool get isOutOfStock => stock <= 0;
  bool get isLowStock => stock > 0 && stock <= minimumStock;

  factory ProductModel.fromMap(Map<String, dynamic> map) {
    return ProductModel(
      id: map['id'] as int?,
      name: map['name'] as String,
      categoryId: map['category_id'] as int?,
      categoryName: map['category_name'] as String?,
      unitId: map['unit_id'] as int?,
      unitName: map['unit_name'] as String?,
      barcode: map['barcode'] as String?,
      purchasePrice: (map['purchase_price'] as num?)?.toInt() ?? 0,
      sellingPrice: (map['selling_price'] as num?)?.toInt() ?? 0,
      stock: (map['stock'] as num?)?.toInt() ?? 0,
      minimumStock: (map['minimum_stock'] as num?)?.toInt() ?? 5,
      createdAt: map['created_at'] as String? ?? DateTime.now().toIso8601String(),
      updatedAt: map['updated_at'] as String? ?? DateTime.now().toIso8601String(),
    );
  }

  Map<String, dynamic> toMap() {
    return {
      if (id != null) 'id': id,
      'name': name,
      'category_id': categoryId,
      'unit_id': unitId,
      'barcode': barcode ?? '',
      'purchase_price': purchasePrice,
      'selling_price': sellingPrice,
      'stock': stock,
      'minimum_stock': minimumStock,
      'created_at': createdAt,
      'updated_at': updatedAt,
    };
  }

  ProductModel copyWith({
    int? id,
    String? name,
    int? categoryId,
    String? categoryName,
    int? unitId,
    String? unitName,
    String? barcode,
    int? purchasePrice,
    int? sellingPrice,
    int? stock,
    int? minimumStock,
    String? createdAt,
    String? updatedAt,
  }) {
    return ProductModel(
      id: id ?? this.id,
      name: name ?? this.name,
      categoryId: categoryId ?? this.categoryId,
      categoryName: categoryName ?? this.categoryName,
      unitId: unitId ?? this.unitId,
      unitName: unitName ?? this.unitName,
      barcode: barcode ?? this.barcode,
      purchasePrice: purchasePrice ?? this.purchasePrice,
      sellingPrice: sellingPrice ?? this.sellingPrice,
      stock: stock ?? this.stock,
      minimumStock: minimumStock ?? this.minimumStock,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }
}
