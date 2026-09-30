import 'sale_detail_model.dart';

class SaleModel {
  final int? id;
  final String invoiceNumber;
  final String date;
  final int total;
  final int paid;
  final int change;
  final String paymentMethod;
  final String createdAt;
  final List<SaleDetailModel> items;

  SaleModel({
    this.id,
    required this.invoiceNumber,
    required this.date,
    required this.total,
    required this.paid,
    required this.change,
    this.paymentMethod = 'Tunai',
    required this.createdAt,
    this.items = const [],
  });

  int get totalProfit => items.fold(0, (sum, item) => sum + item.profit);
  int get totalItemsCount => items.fold(0, (sum, item) => sum + item.quantity);

  factory SaleModel.fromMap(Map<String, dynamic> map, {List<SaleDetailModel> items = const []}) {
    return SaleModel(
      id: map['id'] as int?,
      invoiceNumber: map['invoice_number'] as String,
      date: map['date'] as String,
      total: (map['total'] as num?)?.toInt() ?? 0,
      paid: (map['paid'] as num?)?.toInt() ?? 0,
      change: (map['change'] as num?)?.toInt() ?? 0,
      paymentMethod: map['payment_method'] as String? ?? 'Tunai',
      createdAt: map['created_at'] as String? ?? DateTime.now().toIso8601String(),
      items: items,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      if (id != null) 'id': id,
      'invoice_number': invoiceNumber,
      'date': date,
      'total': total,
      'paid': paid,
      'change': change,
      'payment_method': paymentMethod,
      'created_at': createdAt,
    };
  }
}
