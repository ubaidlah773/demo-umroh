import 'package:intl/intl.dart';
import 'package:sqflite/sqflite.dart';
import '../core/database/app_database.dart';
import '../core/utils/date_formatter.dart';
import '../models/dashboard_summary_model.dart';
import '../models/product_model.dart';

class ReportSummaryModel {
  final int totalSales; // Omzet
  final int totalCost; // Modal (HPP)
  final int totalProfit; // Laba Bersih
  final int totalPurchases; // Pengeluaran Kulakan
  final int transactionCount;
  final int averageTransactionValue;
  final List<DailySalesPoint> dailyBreakdown;
  final List<TopProductItem> topProducts;

  ReportSummaryModel({
    required this.totalSales,
    required this.totalCost,
    required this.totalProfit,
    required this.totalPurchases,
    required this.transactionCount,
    required this.averageTransactionValue,
    required this.dailyBreakdown,
    required this.topProducts,
  });

  factory ReportSummaryModel.empty() {
    return ReportSummaryModel(
      totalSales: 0,
      totalCost: 0,
      totalProfit: 0,
      totalPurchases: 0,
      transactionCount: 0,
      averageTransactionValue: 0,
      dailyBreakdown: [],
      topProducts: [],
    );
  }
}

class ReportRepository {
  final AppDatabase _dbHelper;

  ReportRepository({AppDatabase? dbHelper}) : _dbHelper = dbHelper ?? AppDatabase.instance;

  /// Fetches real-time dashboard data from SQLite
  Future<DashboardSummaryModel> getDashboardSummary() async {
    final db = await _dbHelper.database;
    final now = DateTime.now();
    final todayStart = DateFormat('yyyy-MM-dd 00:00:00').format(now);
    final todayEnd = DateFormat('yyyy-MM-dd 23:59:59').format(now);

    // 1. Today's Revenue and Transaction Count
    final todaySalesResult = await db.rawQuery('''
      SELECT 
        COUNT(id) AS trx_count,
        COALESCE(SUM(total), 0) AS total_revenue
      FROM sales
      WHERE date >= ? AND date <= ?
    ''', [todayStart, todayEnd]);

    final todayTrxCount = (todaySalesResult.first['trx_count'] as num?)?.toInt() ?? 0;
    final todayRevenue = (todaySalesResult.first['total_revenue'] as num?)?.toInt() ?? 0;

    // 2. Today's Profit
    final todayProfitResult = await db.rawQuery('''
      SELECT COALESCE(SUM(sd.profit), 0) AS total_profit
      FROM sale_details sd
      JOIN sales s ON sd.sale_id = s.id
      WHERE s.date >= ? AND s.date <= ?
    ''', [todayStart, todayEnd]);

    final todayProfit = (todayProfitResult.first['total_profit'] as num?)?.toInt() ?? 0;

    // 3. Low stock count and products
    final lowStockMaps = await db.rawQuery('''
      SELECT p.*, c.name AS category_name, u.name AS unit_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN units u ON p.unit_id = u.id
      WHERE p.stock <= p.minimum_stock
      ORDER BY p.stock ASC
      LIMIT 10
    ''');
    final lowStockProducts = lowStockMaps.map((m) => ProductModel.fromMap(m)).toList();
    final lowStockCount = lowStockProducts.length;

    // 4. Sales Last 7 Days (including today)
    final List<DailySalesPoint> sales7Days = [];
    for (int i = 6; i >= 0; i--) {
      final targetDate = now.subtract(Duration(days: i));
      final dayStart = DateFormat('yyyy-MM-dd 00:00:00').format(targetDate);
      final dayEnd = DateFormat('yyyy-MM-dd 23:59:59').format(targetDate);
      final isoDate = DateFormat('yyyy-MM-dd').format(targetDate);
      final dayLabel = DateFormatter.getDayAbbr(targetDate.weekday);

      final dayRes = await db.rawQuery('''
        SELECT 
          COALESCE(SUM(s.total), 0) AS revenue,
          COALESCE(SUM(sd.profit), 0) AS profit
        FROM sales s
        LEFT JOIN sale_details sd ON sd.sale_id = s.id
        WHERE s.date >= ? AND s.date <= ?
      ''', [dayStart, dayEnd]);

      final dayRev = (dayRes.first['revenue'] as num?)?.toInt() ?? 0;
      final dayProf = (dayRes.first['profit'] as num?)?.toInt() ?? 0;

      sales7Days.add(
        DailySalesPoint(
          date: isoDate,
          dayLabel: dayLabel,
          revenue: dayRev,
          profit: dayProf,
        ),
      );
    }

    // 5. Top 5 Bestselling Products
    final topMaps = await db.rawQuery('''
      SELECT 
        sd.product_id,
        p.name AS product_name,
        u.name AS unit_name,
        COALESCE(SUM(sd.quantity), 0) AS total_qty,
        COALESCE(SUM(sd.subtotal), 0) AS total_revenue
      FROM sale_details sd
      JOIN products p ON sd.product_id = p.id
      LEFT JOIN units u ON p.unit_id = u.id
      GROUP BY sd.product_id
      ORDER BY total_qty DESC, total_revenue DESC
      LIMIT 5
    ''');

    final topProducts = topMaps.map((m) {
      return TopProductItem(
        productId: m['product_id'] as int,
        productName: m['product_name'] as String,
        unitName: m['unit_name'] as String?,
        quantitySold: (m['total_qty'] as num).toInt(),
        totalRevenue: (m['total_revenue'] as num).toInt(),
      );
    }).toList();

    return DashboardSummaryModel(
      todayRevenue: todayRevenue,
      todayTransactionCount: todayTrxCount,
      todayProfit: todayProfit,
      lowStockCount: lowStockCount,
      salesLast7Days: sales7Days,
      topProducts: topProducts,
      lowStockProducts: lowStockProducts,
    );
  }

  /// Fetches comprehensive financial report for specified date window
  Future<ReportSummaryModel> getReportSummary({
    required DateTime startDate,
    required DateTime endDate,
  }) async {
    final db = await _dbHelper.database;
    final startStr = DateFormat('yyyy-MM-dd 00:00:00').format(startDate);
    final endStr = DateFormat('yyyy-MM-dd 23:59:59').format(endDate);

    // 1. Sales metrics
    final salesRes = await db.rawQuery('''
      SELECT 
        COUNT(id) AS trx_count,
        COALESCE(SUM(total), 0) AS total_sales
      FROM sales
      WHERE date >= ? AND date <= ?
    ''', [startStr, endStr]);

    final trxCount = (salesRes.first['trx_count'] as num?)?.toInt() ?? 0;
    final totalSales = (salesRes.first['total_sales'] as num?)?.toInt() ?? 0;

    // 2. Profit and Cost metrics
    final profitRes = await db.rawQuery('''
      SELECT 
        COALESCE(SUM(sd.profit), 0) AS total_profit,
        COALESCE(SUM(sd.purchase_price * sd.quantity), 0) AS total_cost
      FROM sale_details sd
      JOIN sales s ON sd.sale_id = s.id
      WHERE s.date >= ? AND s.date <= ?
    ''', [startStr, endStr]);

    final totalProfit = (profitRes.first['total_profit'] as num?)?.toInt() ?? 0;
    final totalCost = (profitRes.first['total_cost'] as num?)?.toInt() ?? 0;

    // 3. Purchase spending metrics
    final purchaseRes = await db.rawQuery('''
      SELECT COALESCE(SUM(total), 0) AS total_purchases
      FROM purchases
      WHERE date >= ? AND date <= ?
    ''', [startStr, endStr]);

    final totalPurchases = (purchaseRes.first['total_purchases'] as num?)?.toInt() ?? 0;

    // Average transaction value
    final avgTrx = trxCount > 0 ? (totalSales ~/ trxCount) : 0;

    // 4. Daily breakdown
    final diffDays = endDate.difference(startDate).inDays + 1;
    final List<DailySalesPoint> dailyList = [];

    // Limit daily chart to max 31 days for UI clarity
    final daysToIterate = diffDays.clamp(1, 31);
    for (int i = 0; i < daysToIterate; i++) {
      final d = startDate.add(Duration(days: i));
      if (d.isAfter(endDate)) break;

      final dStart = DateFormat('yyyy-MM-dd 00:00:00').format(d);
      final dEnd = DateFormat('yyyy-MM-dd 23:59:59').format(d);
      final isoDate = DateFormat('yyyy-MM-dd').format(d);
      final dayLabel = DateFormatter.getDayAbbr(d.weekday);

      final dRes = await db.rawQuery('''
        SELECT 
          COALESCE(SUM(s.total), 0) AS revenue,
          COALESCE(SUM(sd.profit), 0) AS profit
        FROM sales s
        LEFT JOIN sale_details sd ON sd.sale_id = s.id
        WHERE s.date >= ? AND s.date <= ?
      ''', [dStart, dEnd]);

      dailyList.add(
        DailySalesPoint(
          date: isoDate,
          dayLabel: dayLabel,
          revenue: (dRes.first['revenue'] as num?)?.toInt() ?? 0,
          profit: (dRes.first['profit'] as num?)?.toInt() ?? 0,
        ),
      );
    }

    // 5. Top Products in this period
    final topMaps = await db.rawQuery('''
      SELECT 
        sd.product_id,
        p.name AS product_name,
        u.name AS unit_name,
        COALESCE(SUM(sd.quantity), 0) AS total_qty,
        COALESCE(SUM(sd.subtotal), 0) AS total_revenue
      FROM sale_details sd
      JOIN sales s ON sd.sale_id = s.id
      JOIN products p ON sd.product_id = p.id
      LEFT JOIN units u ON p.unit_id = u.id
      WHERE s.date >= ? AND s.date <= ?
      GROUP BY sd.product_id
      ORDER BY total_qty DESC, total_revenue DESC
      LIMIT 10
    ''', [startStr, endStr]);

    final topProducts = topMaps.map((m) {
      return TopProductItem(
        productId: m['product_id'] as int,
        productName: m['product_name'] as String,
        unitName: m['unit_name'] as String?,
        quantitySold: (m['total_qty'] as num).toInt(),
        totalRevenue: (m['total_revenue'] as num).toInt(),
      );
    }).toList();

    return ReportSummaryModel(
      totalSales: totalSales,
      totalCost: totalCost,
      totalProfit: totalProfit,
      totalPurchases: totalPurchases,
      transactionCount: trxCount,
      averageTransactionValue: avgTrx,
      dailyBreakdown: dailyList,
      topProducts: topProducts,
    );
  }
}
