import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../core/constants/app_strings.dart';
import '../../core/utils/currency_formatter.dart';
import '../../core/utils/date_formatter.dart';
import '../../models/product_model.dart';
import '../../providers/app_provider.dart';
import '../../providers/product_provider.dart';
import '../../providers/report_provider.dart';
import '../../providers/stock_provider.dart';
import '../../widgets/primary_button.dart';
import '../../widgets/stat_card.dart';
import '../products/add_edit_product_screen.dart';
import '../purchases/add_purchase_screen.dart';
import '../purchases/purchases_screen.dart';
import '../stock/stock_management_screen.dart';
import 'widgets/low_stock_section.dart';
import 'widgets/sales_chart_widget.dart';
import 'widgets/top_products_section.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _refreshData();
    });
  }

  Future<void> _refreshData() async {
    final reportProv = context.read<ReportProvider>();
    final prodProv = context.read<ProductProvider>();
    await Future.wait([
      reportProv.loadDashboardSummary(),
      prodProv.loadProducts(),
    ]);
  }

  void _showQuickStockInDialog(ProductModel product) {
    final controller = TextEditingController(text: '10');
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: Text(
          'Tambah Stok ${product.name}',
          style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w700),
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Stok saat ini: ${product.stock} ${product.unitName ?? 'pcs'}',
              style: const TextStyle(color: AppColors.textSecondary, fontSize: 13),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: controller,
              keyboardType: TextInputType.number,
              autofocus: true,
              decoration: InputDecoration(
                labelText: 'Jumlah Masuk (${product.unitName ?? 'pcs'})',
                border: const OutlineInputBorder(),
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Batal'),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.primary,
              foregroundColor: Colors.white,
            ),
            onPressed: () async {
              final qty = int.tryParse(controller.text) ?? 0;
              if (qty > 0 && product.id != null) {
                Navigator.pop(ctx);
                final stockProv = context.read<StockProvider>();
                final ok = await stockProv.quickStockIn(
                  productId: product.id!,
                  quantity: qty,
                  reason: 'Penambahan Stok Cepat dari Beranda',
                );
                if (ok && mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('Stok ${product.name} bertambah $qty ${product.unitName ?? 'pcs'}'),
                      backgroundColor: AppColors.success,
                    ),
                  );
                  _refreshData();
                }
              }
            },
            child: const Text('Simpan'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final reportProv = context.watch<ReportProvider>();
    final summary = reportProv.dashboardSummary;
    final appProv = context.read<AppProvider>();
    final today = DateTime.now();

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(7),
              decoration: BoxDecoration(
                color: AppColors.primaryLight,
                borderRadius: BorderRadius.circular(10),
              ),
              child: const Icon(Icons.storefront_rounded, color: AppColors.primaryDark, size: 22),
            ),
            const SizedBox(width: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Warung Mak Wi',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w800,
                    color: AppColors.textPrimary,
                  ),
                ),
                Text(
                  DateFormatter.formatFull(today),
                  style: const TextStyle(
                    fontSize: 11,
                    color: AppColors.textSecondary,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh_rounded, color: AppColors.primary),
            tooltip: 'Perbarui Data',
            onPressed: _refreshData,
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _refreshData,
        color: AppColors.primary,
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Warung Mak Wi Hero Banner Card
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF16A34A), Color(0xFF15803D)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(16),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFF16A34A).withOpacity(0.28),
                      blurRadius: 10,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.2),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.storefront_rounded, color: Colors.white, size: 28),
                    ),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Warung Mak Wi',
                            style: TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.w800,
                              color: Colors.white,
                              letterSpacing: 0.3,
                            ),
                          ),
                          const SizedBox(height: 3),
                          Text(
                            'Aplikasi Kasir & Pembukuan Toko',
                            style: TextStyle(
                              fontSize: 12,
                              color: Colors.white.withOpacity(0.9),
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // Summary 4-Cards Grid
              GridView.count(
                crossAxisCount: 2,
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                mainAxisSpacing: 10,
                crossAxisSpacing: 10,
                childAspectRatio: 1.45,
                children: [
                  StatCard(
                    title: AppStrings.todayRevenue,
                    value: CurrencyFormatter.format(summary.todayRevenue),
                    icon: Icons.trending_up_rounded,
                    iconColor: AppColors.primary,
                    iconBackgroundColor: AppColors.primaryLight,
                  ),
                  StatCard(
                    title: AppStrings.todayTransactions,
                    value: '${summary.todayTransactionCount} transaksi',
                    icon: Icons.receipt_long_rounded,
                    iconColor: AppColors.tertiary,
                    iconBackgroundColor: AppColors.tertiaryLight,
                  ),
                  StatCard(
                    title: AppStrings.todayProfit,
                    value: CurrencyFormatter.format(summary.todayProfit),
                    icon: Icons.monetization_on_rounded,
                    iconColor: AppColors.success,
                    iconBackgroundColor: AppColors.primaryContainer,
                  ),
                  StatCard(
                    title: AppStrings.lowStockAlert,
                    value: '${summary.lowStockCount} produk',
                    icon: Icons.warning_amber_rounded,
                    iconColor: summary.lowStockCount > 0 ? AppColors.danger : AppColors.secondary,
                    iconBackgroundColor: summary.lowStockCount > 0 ? AppColors.dangerLight : AppColors.secondaryLight,
                    onTap: () {
                      appProv.setNavIndex(2); // Jump to Barang
                      context.read<ProductProvider>().setFilter('low_stock');
                    },
                  ),
                ],
              ),
              const SizedBox(height: 16),

              // Prominent "+ Transaksi Baru" CTA
              PrimaryButton(
                text: AppStrings.newTransaction,
                icon: Icons.point_of_sale_rounded,
                height: 52,
                onPressed: () {
                  appProv.setNavIndex(1); // Jump to Kasir
                },
              ),
              const SizedBox(height: 16),

              // Quick Actions Row
              Row(
                children: [
                  Expanded(
                    child: _buildQuickActionButton(
                      label: 'Kasir',
                      icon: Icons.shopping_cart_checkout_rounded,
                      color: AppColors.primary,
                      onTap: () => appProv.setNavIndex(1),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: _buildQuickActionButton(
                      label: 'Tambah Barang',
                      icon: Icons.add_box_rounded,
                      color: AppColors.tertiary,
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (_) => const AddEditProductScreen(),
                          ),
                        ).then((_) => _refreshData());
                      },
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: _buildQuickActionButton(
                      label: 'Stok Masuk',
                      icon: Icons.inventory_2_rounded,
                      color: AppColors.secondary,
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (_) => const StockManagementScreen(),
                          ),
                        ).then((_) => _refreshData());
                      },
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: _buildQuickActionButton(
                      label: 'Pembelian',
                      icon: Icons.local_shipping_rounded,
                      color: const Color(0xFF8B5CF6),
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (_) => const PurchasesScreen(),
                          ),
                        ).then((_) => _refreshData());
                      },
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),

              // Low Stock Section
              LowStockSection(
                lowStockProducts: summary.lowStockProducts,
                onQuickStockIn: _showQuickStockInDialog,
                onViewAll: () {
                  appProv.setNavIndex(2); // Jump to Barang
                  context.read<ProductProvider>().setFilter('low_stock');
                },
              ),
              const SizedBox(height: 16),

              // Sales Last 7 Days Chart
              SalesChartWidget(salesData: summary.salesLast7Days),
              const SizedBox(height: 16),

              // Top Products Section
              TopProductsSection(topProducts: summary.topProducts),
              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildQuickActionButton({
    required String label,
    required IconData icon,
    required Color color,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 4),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: AppColors.border),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: color.withOpacity(0.12),
                shape: BoxShape.circle,
              ),
              child: Icon(icon, color: color, size: 20),
            ),
            const SizedBox(height: 6),
            Text(
              label,
              style: const TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w600,
                color: AppColors.textPrimary,
              ),
              textAlign: TextAlign.center,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ],
        ),
      ),
    );
  }
}
