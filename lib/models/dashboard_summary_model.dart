import 'product_model.dart';

class DailySalesPoint {
  final String date; // YYYY-MM-DD
  final String dayLabel; // Sen, Sel, etc.
  final int revenue;
  final int profit;

  DailySalesPoint({
    required this.date,
    required this.dayLabel,
    required this.revenue,
    required this.profit,
  });
}

class TopProductItem {
  final int productId;
  final String productName;
  final String? unitName;
  final int quantitySold;
  final int totalRevenue;

  TopProductItem({
    required this.productId,
    required this.productName,
    this.unitName,
    required this.quantitySold,
    required this.totalRevenue,
  });
}

class DashboardSummaryModel {
  final int todayRevenue;
  final int todayTransactionCount;
  final int todayProfit;
  final int lowStockCount;
  final List<DailySalesPoint> salesLast7Days;
  final List<TopProductItem> topProducts;
  final List<ProductModel> lowStockProducts;

  DashboardSummaryModel({
    required this.todayRevenue,
    required this.todayTransactionCount,
    required this.todayProfit,
    required this.lowStockCount,
    required this.salesLast7Days,
    required this.topProducts,
    required this.lowStockProducts,
  });

  factory DashboardSummaryModel.empty() {
    return DashboardSummaryModel(
      todayRevenue: 0,
      todayTransactionCount: 0,
      todayProfit: 0,
      lowStockCount: 0,
      salesLast7Days: [],
      topProducts: [],
      lowStockProducts: [],
    );
  }
}
