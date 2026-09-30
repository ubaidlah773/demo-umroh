import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../core/constants/app_strings.dart';
import '../../core/utils/date_formatter.dart';
import '../../models/stock_movement_model.dart';
import '../../providers/stock_provider.dart';
import '../../widgets/app_card.dart';
import '../../widgets/empty_state.dart';

class StockMovementHistoryScreen extends StatefulWidget {
  final int? productId;
  final String? productName;

  const StockMovementHistoryScreen({
    super.key,
    this.productId,
    this.productName,
  });

  @override
  State<StockMovementHistoryScreen> createState() => _StockMovementHistoryScreenState();
}

class _StockMovementHistoryScreenState extends State<StockMovementHistoryScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<StockProvider>().loadMovements(productId: widget.productId);
    });
  }

  @override
  Widget build(BuildContext context) {
    final stockProv = context.watch<StockProvider>();
    final movements = stockProv.movements;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          widget.productName != null
              ? 'Riwayat Stok: ${widget.productName}'
              : AppStrings.stockHistory,
          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
        ),
      ),
      body: RefreshIndicator(
        onRefresh: () => stockProv.loadMovements(productId: widget.productId),
        color: AppColors.primary,
        child: stockProv.isLoading
            ? const Center(child: CircularProgressIndicator(color: AppColors.primary))
            : movements.isEmpty
                ? const EmptyState(
                    icon: Icons.history_rounded,
                    title: 'Belum Ada Riwayat Mutasi',
                    message: 'Setiap barang masuk, keluar, penjualan, atau opname akan tercatat di sini.',
                  )
                : ListView.separated(
                    padding: const EdgeInsets.all(16),
                    itemCount: movements.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 10),
                    itemBuilder: (context, index) {
                      final item = movements[index];
                      return _buildMovementCard(item);
                    },
                  ),
      ),
    );
  }

  Widget _buildMovementCard(StockMovementModel item) {
    final isPositive = item.quantity > 0;
    final date = DateTime.tryParse(item.createdAt) ?? DateTime.now();

    Color badgeColor = AppColors.primary;
    Color badgeBg = AppColors.primaryLight;
    if (item.type == 'sale') {
      badgeColor = AppColors.tertiary;
      badgeBg = AppColors.tertiaryLight;
    } else if (item.type == 'purchase') {
      badgeColor = const Color(0xFF8B5CF6);
      badgeBg = const Color(0xFFF3E8FF);
    } else if (item.type == 'out') {
      badgeColor = AppColors.danger;
      badgeBg = AppColors.dangerLight;
    } else if (item.type == 'adjustment') {
      badgeColor = AppColors.secondary;
      badgeBg = AppColors.secondaryLight;
    }

    return AppCard(
      padding: const EdgeInsets.all(14),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Top Row: Product Name & Quantity Delta
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  item.productName ?? 'Barang',
                  style: const TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w700,
                    color: AppColors.textPrimary,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              const SizedBox(width: 8),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: isPositive ? AppColors.primaryLight : AppColors.dangerLight,
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  '${isPositive ? '+' : ''}${item.quantity} ${item.unitName ?? 'pcs'}',
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w800,
                    color: isPositive ? AppColors.primaryDark : AppColors.danger,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),

          // Middle: Type Badge & Reason
          Row(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  color: badgeBg,
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Text(
                  item.typeLabel,
                  style: TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.w700,
                    color: badgeColor,
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  item.reason,
                  style: const TextStyle(
                    fontSize: 12,
                    color: AppColors.textSecondary,
                    fontWeight: FontWeight.w500,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          const Divider(height: 1, color: AppColors.border),
          const SizedBox(height: 8),

          // Bottom: Before -> After Stock and Date
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Stok: ${item.beforeStock} → ${item.afterStock} ${item.unitName ?? 'pcs'}',
                style: const TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                  color: AppColors.textPrimary,
                ),
              ),
              Text(
                DateFormatter.formatDateTime(date),
                style: const TextStyle(
                  fontSize: 11,
                  color: AppColors.textTertiary,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
