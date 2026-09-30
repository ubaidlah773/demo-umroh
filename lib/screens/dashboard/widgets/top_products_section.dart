import 'package:flutter/material.dart';
import '../../../core/constants/app_colors.dart';
import '../../../core/utils/currency_formatter.dart';
import '../../../models/dashboard_summary_model.dart';
import '../../../widgets/app_card.dart';

class TopProductsSection extends StatelessWidget {
  final List<TopProductItem> topProducts;

  const TopProductsSection({
    super.key,
    required this.topProducts,
  });

  @override
  Widget build(BuildContext context) {
    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Row(
            children: [
              Icon(Icons.local_fire_department_rounded, size: 20, color: AppColors.secondary),
              SizedBox(width: 8),
              Text(
                'Produk Terlaris',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w700,
                  color: AppColors.textPrimary,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          if (topProducts.isEmpty)
            Container(
              padding: const EdgeInsets.symmetric(vertical: 16),
              alignment: Alignment.center,
              child: const Text(
                'Belum ada data produk terlaris.',
                style: TextStyle(
                  fontSize: 13,
                  color: AppColors.textTertiary,
                ),
              ),
            )
          else
            ListView.separated(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: topProducts.length,
              separatorBuilder: (_, __) => const Divider(color: AppColors.border, height: 14),
              itemBuilder: (context, index) {
                final item = topProducts[index];
                final rank = index + 1;

                Color rankColor = AppColors.textTertiary;
                Color rankBg = AppColors.surfaceVariant;
                if (rank == 1) {
                  rankColor = Colors.white;
                  rankBg = const Color(0xFFEAB308); // Gold
                } else if (rank == 2) {
                  rankColor = Colors.white;
                  rankBg = const Color(0xFF94A3B8); // Silver
                } else if (rank == 3) {
                  rankColor = Colors.white;
                  rankBg = const Color(0xFFB45309); // Bronze
                }

                return Row(
                  children: [
                    Container(
                      width: 26,
                      height: 26,
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                        color: rankBg,
                        shape: BoxShape.circle,
                      ),
                      child: Text(
                        '$rank',
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w800,
                          color: rankColor,
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
                              fontSize: 14,
                              fontWeight: FontWeight.w700,
                              color: AppColors.textPrimary,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                          const SizedBox(height: 2),
                          Text(
                            'Terjual: ${item.quantitySold} ${item.unitName ?? 'pcs'}',
                            style: const TextStyle(
                              fontSize: 12,
                              color: AppColors.textSecondary,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 8),
                    Text(
                      CurrencyFormatter.format(item.totalRevenue),
                      style: const TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w700,
                        color: AppColors.primaryDark,
                      ),
                    ),
                  ],
                );
              },
            ),
        ],
      ),
    );
  }
}
