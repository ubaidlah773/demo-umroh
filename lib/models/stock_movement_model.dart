class StockMovementModel {
  final int? id;
  final int productId;
  final String? productName;
  final String? unitName;
  final String type; // 'in', 'out', 'adjustment', 'sale', 'purchase'
  final int quantity;
  final int beforeStock;
  final int afterStock;
  final String reason;
  final String? referenceId;
  final String createdAt;

  StockMovementModel({
    this.id,
    required this.productId,
    this.productName,
    this.unitName,
    required this.type,
    required this.quantity,
    required this.beforeStock,
    required this.afterStock,
    required this.reason,
    this.referenceId,
    required this.createdAt,
  });

  String get typeLabel {
    switch (type) {
      case 'sale':
        return 'Penjualan';
      case 'purchase':
        return 'Pembelian';
      case 'in':
        return 'Stok Masuk';
      case 'out':
        return 'Stok Keluar';
      case 'adjustment':
        return 'Penyesuaian';
      default:
        return type;
    }
  }

  factory StockMovementModel.fromMap(Map<String, dynamic> map) {
    return StockMovementModel(
      id: map['id'] as int?,
      productId: map['product_id'] as int,
      productName: map['product_name'] as String?,
      unitName: map['unit_name'] as String?,
      type: map['type'] as String,
      quantity: (map['quantity'] as num).toInt(),
      beforeStock: (map['before_stock'] as num).toInt(),
      afterStock: (map['after_stock'] as num).toInt(),
      reason: map['reason'] as String,
      referenceId: map['reference_id'] as String?,
      createdAt: map['created_at'] as String? ?? DateTime.now().toIso8601String(),
    );
  }

  Map<String, dynamic> toMap() {
    return {
      if (id != null) 'id': id,
      'product_id': productId,
      'type': type,
      'quantity': quantity,
      'before_stock': beforeStock,
      'after_stock': afterStock,
      'reason': reason,
      'reference_id': referenceId ?? '',
      'created_at': createdAt,
    };
  }
}
