class SaleDetailModel {
  final int? id;
  final int? saleId;
  final int productId;
  final String? productName;
  final String? unitName;
  final int quantity;
  final int purchasePrice;
  final int sellingPrice;
  final int subtotal;
  final int profit;

  SaleDetailModel({
    this.id,
    this.saleId,
    required this.productId,
    this.productName,
    this.unitName,
    required this.quantity,
    required this.purchasePrice,
    required this.sellingPrice,
    required this.subtotal,
    required this.profit,
  });

  factory SaleDetailModel.fromMap(Map<String, dynamic> map) {
    return SaleDetailModel(
      id: map['id'] as int?,
      saleId: map['sale_id'] as int?,
      productId: map['product_id'] as int,
      productName: map['product_name'] as String?,
      unitName: map['unit_name'] as String?,
      quantity: (map['quantity'] as num).toInt(),
      purchasePrice: (map['purchase_price'] as num).toInt(),
      sellingPrice: (map['selling_price'] as num).toInt(),
      subtotal: (map['subtotal'] as num).toInt(),
      profit: (map['profit'] as num).toInt(),
    );
  }

  Map<String, dynamic> toMap() {
    return {
      if (id != null) 'id': id,
      if (saleId != null) 'sale_id': saleId,
      'product_id': productId,
      'quantity': quantity,
      'purchase_price': purchasePrice,
      'selling_price': sellingPrice,
      'subtotal': subtotal,
      'profit': profit,
    };
  }
}
