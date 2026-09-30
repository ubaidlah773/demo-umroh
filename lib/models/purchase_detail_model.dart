class PurchaseDetailModel {
  final int? id;
  final int? purchaseId;
  final int productId;
  final String? productName;
  final String? unitName;
  final int quantity;
  final int purchasePrice;
  final int subtotal;

  PurchaseDetailModel({
    this.id,
    this.purchaseId,
    required this.productId,
    this.productName,
    this.unitName,
    required this.quantity,
    required this.purchasePrice,
    required this.subtotal,
  });

  factory PurchaseDetailModel.fromMap(Map<String, dynamic> map) {
    return PurchaseDetailModel(
      id: map['id'] as int?,
      purchaseId: map['purchase_id'] as int?,
      productId: map['product_id'] as int,
      productName: map['product_name'] as String?,
      unitName: map['unit_name'] as String?,
      quantity: (map['quantity'] as num).toInt(),
      purchasePrice: (map['purchase_price'] as num).toInt(),
      subtotal: (map['subtotal'] as num).toInt(),
    );
  }

  Map<String, dynamic> toMap() {
    return {
      if (id != null) 'id': id,
      if (purchaseId != null) 'purchase_id': purchaseId,
      'product_id': productId,
      'quantity': quantity,
      'purchase_price': purchasePrice,
      'subtotal': subtotal,
    };
  }
}
