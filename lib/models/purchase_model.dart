import 'purchase_detail_model.dart';

class PurchaseModel {
  final int? id;
  final String invoiceNumber;
  final int? supplierId;
  final String? supplierName;
  final String date;
  final int total;
  final String? notes;
  final String createdAt;
  final List<PurchaseDetailModel> items;

  PurchaseModel({
    this.id,
    required this.invoiceNumber,
    this.supplierId,
    this.supplierName,
    required this.date,
    required this.total,
    this.notes,
    required this.createdAt,
    this.items = const [],
  });

  factory PurchaseModel.fromMap(Map<String, dynamic> map, {List<PurchaseDetailModel> items = const []}) {
    return PurchaseModel(
      id: map['id'] as int?,
      invoiceNumber: map['invoice_number'] as String,
      supplierId: map['supplier_id'] as int?,
      supplierName: map['supplier_name'] as String?,
      date: map['date'] as String,
      total: (map['total'] as num?)?.toInt() ?? 0,
      notes: map['notes'] as String?,
      createdAt: map['created_at'] as String? ?? DateTime.now().toIso8601String(),
      items: items,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      if (id != null) 'id': id,
      'invoice_number': invoiceNumber,
      'supplier_id': supplierId,
      'date': date,
      'total': total,
      'notes': notes ?? '',
      'created_at': createdAt,
    };
  }
}
