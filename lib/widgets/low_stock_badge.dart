import 'package:flutter/material.dart';
import '../core/constants/app_colors.dart';

class LowStockBadge extends StatelessWidget {
  final int stock;
  final int minimumStock;
  final String unit;

  const LowStockBadge({
    super.key,
    required this.stock,
    this.minimumStock = 5,
    this.unit = 'pcs',
  });

  @override
  Widget build(BuildContext context) {
    Color bg;
    Color text;
    String label;
    IconData? icon;

    if (stock <= 0) {
      bg = AppColors.dangerLight;
      text = AppColors.danger;
      label = 'Habis';
      icon = Icons.cancel_outlined;
    } else if (stock <= minimumStock) {
      bg = AppColors.secondaryLight;
      text = AppColors.secondary;
      label = 'Sisa $stock $unit';
      icon = Icons.warning_amber_rounded;
    } else {
      bg = AppColors.primaryLight;
      text = AppColors.primaryDark;
      label = '$stock $unit';
      icon = null;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(6),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) ...[
            Icon(icon, size: 12, color: text),
            const SizedBox(width: 4),
          ],
          Text(
            label,
            style: TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w700,
              color: text,
            ),
          ),
        ],
      ),
    );
  }
}
