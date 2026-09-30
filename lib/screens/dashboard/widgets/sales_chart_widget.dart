import 'dart:math';
import 'package:flutter/material.dart';
import '../../../core/constants/app_colors.dart';
import '../../../core/utils/currency_formatter.dart';
import '../../../models/dashboard_summary_model.dart';
import '../../../widgets/app_card.dart';

class SalesChartWidget extends StatelessWidget {
  final List<DailySalesPoint> salesData;

  const SalesChartWidget({
    super.key,
    required this.salesData,
  });

  @override
  Widget build(BuildContext context) {
    if (salesData.isEmpty) {
      return const SizedBox.shrink();
    }

    final maxRevenue = salesData.fold(0, (maxVal, item) => max(maxVal, item.revenue));
    final hasSales = maxRevenue > 0;

    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Row(
                children: [
                  Icon(Icons.bar_chart_rounded, size: 20, color: AppColors.primary),
                  SizedBox(width: 8),
                  Text(
                    'Penjualan 7 Hari',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w700,
                      color: AppColors.textPrimary,
                    ),
                  ),
                ],
              ),
              if (hasSales)
                Text(
                  'Maks: ${CurrencyFormatter.format(maxRevenue)}',
                  style: const TextStyle(
                    fontSize: 11,
                    color: AppColors.textSecondary,
                    fontWeight: FontWeight.w500,
                  ),
                ),
            ],
          ),
          const SizedBox(height: 16),
          if (!hasSales)
            Container(
              height: 110,
              alignment: Alignment.center,
              child: const Text(
                'Belum ada transaksi penjualan dalam 7 hari ini.',
                style: TextStyle(
                  fontSize: 13,
                  color: AppColors.textTertiary,
                ),
                textAlign: TextAlign.center,
              ),
            )
          else
            SizedBox(
              height: 130,
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.end,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: salesData.map((point) {
                  final isToday = point == salesData.last;
                  final ratio = maxRevenue > 0 ? (point.revenue / maxRevenue).clamp(0.05, 1.0) : 0.05;

                  return Expanded(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 4),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          // Revenue text label above bar
                          if (point.revenue > 0)
                            Text(
                              _formatCompactRupiah(point.revenue),
                              style: TextStyle(
                                fontSize: 9,
                                fontWeight: FontWeight.w700,
                                color: isToday ? AppColors.primary : AppColors.textSecondary,
                              ),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            )
                          else
                            const SizedBox(height: 12),
                          const SizedBox(height: 4),
                          // Bar
                          Expanded(
                            child: Align(
                              alignment: Alignment.bottomCenter,
                              child: Container(
                                height: 80 * ratio,
                                width: 22,
                                decoration: BoxDecoration(
                                  color: isToday
                                      ? AppColors.primary
                                      : (point.revenue > 0
                                          ? AppColors.primary.withOpacity(0.4)
                                          : AppColors.surfaceVariant),
                                  borderRadius: const BorderRadius.vertical(
                                    top: Radius.circular(6),
                                  ),
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(height: 6),
                          // Day Label
                          Text(
                            point.dayLabel,
                            style: TextStyle(
                              fontSize: 11,
                              fontWeight: isToday ? FontWeight.w800 : FontWeight.w500,
                              color: isToday ? AppColors.primary : AppColors.textSecondary,
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                }).toList(),
              ),
            ),
        ],
      ),
    );
  }

  String _formatCompactRupiah(int val) {
    if (val >= 1000000) {
      final jt = (val / 1000000).toStringAsFixed(1);
      return '${jt.replaceAll('.0', '')}jt';
    } else if (val >= 1000) {
      final rb = (val / 1000).toStringAsFixed(0);
      return '${rb}rb';
    }
    return '$val';
  }
}
