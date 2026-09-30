import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../core/constants/app_strings.dart';
import '../../core/utils/currency_formatter.dart';
import '../../core/utils/date_formatter.dart';
import '../../models/sale_model.dart';
import '../../providers/report_provider.dart';
import '../../providers/sale_provider.dart';
import '../../repositories/report_repository.dart';
import '../../widgets/app_card.dart';
import '../../widgets/empty_state.dart';
import '../../widgets/money_text.dart';
import '../../widgets/stat_card.dart';
import 'transaction_detail_screen.dart';

class ReportsScreen extends StatefulWidget {
  const ReportsScreen({super.key});

  @override
  State<ReportsScreen> createState() => _ReportsScreenState();
}

class _ReportsScreenState extends State<ReportsScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _loadData();
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<void> _loadData() async {
    final reportProv = context.read<ReportProvider>();
    final saleProv = context.read<SaleProvider>();
    await Future.wait([
      reportProv.loadReportSummary(),
      saleProv.loadSales(start: reportProv.startDate, end: reportProv.endDate),
    ]);
  }

  void _onFilterChanged(String filter) async {
    final reportProv = context.read<ReportProvider>();
    if (filter == 'custom') {
      final pickedRange = await showDateRangePicker(
        context: context,
        firstDate: DateTime(2020),
        lastDate: DateTime.now().add(const Duration(days: 1)),
        initialDateRange: DateTimeRange(
          start: reportProv.startDate,
          end: reportProv.endDate,
        ),
      );
      if (pickedRange != null) {
        reportProv.setFilter('custom', customStart: pickedRange.start, customEnd: pickedRange.end);
        context.read<SaleProvider>().loadSales(start: pickedRange.start, end: pickedRange.end);
      }
    } else {
      reportProv.setFilter(filter);
      context.read<SaleProvider>().loadSales(start: reportProv.startDate, end: reportProv.endDate);
    }
  }

  @override
  Widget build(BuildContext context) {
    final reportProv = context.watch<ReportProvider>();
    final saleProv = context.watch<SaleProvider>();
    final summary = reportProv.reportSummary;
    final currentFilter = reportProv.selectedFilter;

    return Scaffold(
      appBar: AppBar(
        title: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              AppStrings.reports,
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: AppColors.textPrimary),
            ),
            Text(
              'Warung Mak Wi',
              style: TextStyle(fontSize: 12, color: AppColors.textSecondary, fontWeight: FontWeight.w500),
            ),
          ],
        ),
        bottom: TabBar(
          controller: _tabController,
          labelColor: AppColors.primaryDark,
          unselectedLabelColor: AppColors.textSecondary,
          indicatorColor: AppColors.primary,
          indicatorWeight: 3,
          labelStyle: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13),
          tabs: const [
            Tab(text: 'Ringkasan'),
            Tab(text: 'Riwayat Transaksi'),
            Tab(text: 'Produk Terlaris'),
          ],
        ),
      ),
      body: Column(
        children: [
          // Filter Chips Row
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            color: Colors.white,
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: [
                  _buildFilterChip('Hari ini', 'today', currentFilter),
                  const SizedBox(width: 8),
                  _buildFilterChip('Kemarin', 'yesterday', currentFilter),
                  const SizedBox(width: 8),
                  _buildFilterChip('7 Hari', '7days', currentFilter),
                  const SizedBox(width: 8),
                  _buildFilterChip('Bulan ini', 'this_month', currentFilter),
                  const SizedBox(width: 8),
                  _buildFilterChip('Pilih Tanggal', 'custom', currentFilter),
                ],
              ),
            ),
          ),
          const Divider(height: 1, color: AppColors.border),

          // Tab Content
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                // 1. Ringkasan Keuangan
                _buildSummaryTab(summary),

                // 2. Riwayat Transaksi Penjualan
                _buildTransactionHistoryTab(saleProv.sales),

                // 3. Produk Terlaris
                _buildTopProductsTab(summary),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFilterChip(String label, String value, String activeValue) {
    final isSelected = activeValue == value;
    return ChoiceChip(
      label: Text(label),
      selected: isSelected,
      selectedColor: AppColors.primary,
      labelStyle: TextStyle(
        fontSize: 12,
        fontWeight: FontWeight.w600,
        color: isSelected ? Colors.white : AppColors.textPrimary,
      ),
      onSelected: (_) => _onFilterChanged(value),
    );
  }

  Widget _buildSummaryTab(ReportSummaryModel reportSummary) {
    return RefreshIndicator(
      onRefresh: _loadData,
      color: AppColors.primary,
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 4 Grid Stats
            GridView.count(
              crossAxisCount: 2,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              mainAxisSpacing: 10,
              crossAxisSpacing: 10,
              childAspectRatio: 1.45,
              children: [
                StatCard(
                  title: 'Total Penjualan (Omzet)',
                  value: CurrencyFormatter.format(reportSummary.totalSales),
                  icon: Icons.trending_up_rounded,
                  iconColor: AppColors.primary,
                  iconBackgroundColor: AppColors.primaryLight,
                ),
                StatCard(
                  title: 'Total Laba Bersih',
                  value: CurrencyFormatter.format(reportSummary.totalProfit),
                  icon: Icons.monetization_on_rounded,
                  iconColor: AppColors.success,
                  iconBackgroundColor: AppColors.primaryContainer,
                ),
                StatCard(
                  title: 'Total Modal (HPP)',
                  value: CurrencyFormatter.format(reportSummary.totalCost),
                  icon: Icons.account_balance_wallet_outlined,
                  iconColor: AppColors.tertiary,
                  iconBackgroundColor: AppColors.tertiaryLight,
                ),
                StatCard(
                  title: 'Total Kulakan',
                  value: CurrencyFormatter.format(reportSummary.totalPurchases),
                  icon: Icons.local_shipping_outlined,
                  iconColor: const Color(0xFF8B5CF6),
                  iconBackgroundColor: const Color(0xFFF3E8FF),
                ),
              ],
            ),
            const SizedBox(height: 16),

            // Transaction Count & Average Value
            AppCard(
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Jumlah Transaksi',
                          style: TextStyle(fontSize: 12, color: AppColors.textSecondary),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          '${reportSummary.transactionCount} Transaksi',
                          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800),
                        ),
                      ],
                    ),
                  ),
                  Container(width: 1, height: 40, color: AppColors.border),
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.only(left: 16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Rata-rata Transaksi',
                            style: TextStyle(fontSize: 12, color: AppColors.textSecondary),
                          ),
                          const SizedBox(height: 4),
                          MoneyText(
                            amount: reportSummary.averageTransactionValue,
                            fontSize: 16,
                            fontWeight: FontWeight.w800,
                            color: AppColors.primaryDark,
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Daily Sales Breakdown
            const Text(
              'Rincian Harian',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 8),

            if (reportSummary.dailyBreakdown.isEmpty)
              const Text('Tidak ada data rincian.')
            else
              ListView.separated(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: reportSummary.dailyBreakdown.length,
                separatorBuilder: (_, __) => const SizedBox(height: 8),
                itemBuilder: (context, index) {
                  final day = reportSummary.dailyBreakdown[index];
                  final dDate = DateTime.tryParse(day.date) ?? DateTime.now();

                  return AppCard(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              DateFormatter.formatMedium(dDate),
                              style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700),
                            ),
                            Text(
                              day.dayLabel,
                              style: const TextStyle(fontSize: 12, color: AppColors.textTertiary),
                            ),
                          ],
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            MoneyText(
                              amount: day.revenue,
                              fontSize: 14,
                              fontWeight: FontWeight.w800,
                            ),
                            Text(
                              'Laba: +${CurrencyFormatter.format(day.profit)}',
                              style: const TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.w700,
                                color: AppColors.success,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  );
                },
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildTransactionHistoryTab(List<SaleModel> sales) {
    if (sales.isEmpty) {
      return const EmptyState(
        icon: Icons.receipt_long_outlined,
        title: 'Belum Ada Transaksi',
        message: 'Tidak ada transaksi penjualan pada rentang tanggal yang dipilih.',
      );
    }

    return ListView.separated(
      padding: const EdgeInsets.all(16),
      itemCount: sales.length,
      separatorBuilder: (_, __) => const SizedBox(height: 10),
      itemBuilder: (context, index) {
        final sale = sales[index];
        final date = DateTime.tryParse(sale.date) ?? DateTime.now();

        return AppCard(
          padding: const EdgeInsets.all(14),
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (_) => TransactionDetailScreen(sale: sale),
              ),
            );
          },
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    sale.invoiceNumber,
                    style: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w700,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  MoneyText(
                    amount: sale.total,
                    fontSize: 15,
                    fontWeight: FontWeight.w800,
                    color: AppColors.primaryDark,
                  ),
                ],
              ),
              const SizedBox(height: 4),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    '${sale.totalItemsCount} barang • ${sale.paymentMethod}',
                    style: const TextStyle(fontSize: 12, color: AppColors.textSecondary),
                  ),
                  Text(
                    DateFormatter.formatDateTime(date),
                    style: const TextStyle(fontSize: 11, color: AppColors.textTertiary),
                  ),
                ],
              ),
              const SizedBox(height: 6),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Laba: +${CurrencyFormatter.format(sale.totalProfit)}',
                    style: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w700,
                      color: AppColors.success,
                    ),
                  ),
                  const Row(
                    children: [
                      Text(
                        'Lihat Detail',
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          color: AppColors.primary,
                        ),
                      ),
                      Icon(Icons.chevron_right, size: 16, color: AppColors.primary),
                    ],
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildTopProductsTab(ReportSummaryModel reportSummary) {
    final top = reportSummary.topProducts;
    if (top.isEmpty) {
      return const EmptyState(
        icon: Icons.local_fire_department_outlined,
        title: 'Belum Ada Penjualan',
        message: 'Daftar produk terlaris akan muncul di sini saat ada transaksi pada periode ini.',
      );
    }

    return ListView.separated(
      padding: const EdgeInsets.all(16),
      itemCount: top.length,
      separatorBuilder: (_, __) => const SizedBox(height: 10),
      itemBuilder: (context, index) {
        final item = top[index];
        final rank = index + 1;

        return AppCard(
          padding: const EdgeInsets.all(14),
          child: Row(
            children: [
              Container(
                width: 32,
                height: 32,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: rank <= 3 ? AppColors.secondary : AppColors.surfaceVariant,
                  shape: BoxShape.circle,
                ),
                child: Text(
                  '$rank',
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w800,
                    color: rank <= 3 ? Colors.white : AppColors.textSecondary,
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      item.productName,
                      style: const TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.w700,
                        color: AppColors.textPrimary,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      'Terjual: ${item.quantitySold} ${item.unitName ?? 'pcs'}',
                      style: const TextStyle(fontSize: 12, color: AppColors.textSecondary),
                    ),
                  ],
                ),
              ),
              MoneyText(
                amount: item.totalRevenue,
                fontSize: 15,
                fontWeight: FontWeight.w800,
                color: AppColors.primaryDark,
              ),
            ],
          ),
        );
      },
    );
  }
}
