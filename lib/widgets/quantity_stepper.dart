import 'package:flutter/material.dart';
import '../core/constants/app_colors.dart';

class QuantityStepper extends StatelessWidget {
  final int value;
  final int min;
  final int? max;
  final ValueChanged<int> onChanged;
  final double size;

  const QuantityStepper({
    super.key,
    required this.value,
    this.min = 1,
    this.max,
    required this.onChanged,
    this.size = 36,
  });

  @override
  Widget build(BuildContext context) {
    final canDecrement = value > min;
    final canIncrement = max == null || value < max!;

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        // Decrement Button
        InkWell(
          onTap: canDecrement
              ? () => onChanged(value - 1)
              : () => onChanged(value - 1), // Allow dropping to 0 to trigger removal
          borderRadius: BorderRadius.circular(8),
          child: Container(
            width: size,
            height: size,
            decoration: BoxDecoration(
              color: AppColors.surfaceVariant,
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: AppColors.border),
            ),
            child: Icon(
              value <= 1 ? Icons.delete_outline : Icons.remove,
              size: 16,
              color: value <= 1 ? AppColors.danger : AppColors.textPrimary,
            ),
          ),
        ),
        // Value Text
        Container(
          constraints: BoxConstraints(minWidth: size + 4),
          alignment: Alignment.center,
          padding: const EdgeInsets.symmetric(horizontal: 6),
          child: Text(
            '$value',
            style: const TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.w700,
              color: AppColors.textPrimary,
            ),
          ),
        ),
        // Increment Button
        InkWell(
          onTap: canIncrement ? () => onChanged(value + 1) : null,
          borderRadius: BorderRadius.circular(8),
          child: Container(
            width: size,
            height: size,
            decoration: BoxDecoration(
              color: canIncrement ? AppColors.primaryContainer : AppColors.surfaceVariant,
              borderRadius: BorderRadius.circular(8),
              border: Border.all(
                color: canIncrement ? AppColors.primary.withOpacity(0.3) : AppColors.border,
              ),
            ),
            child: Icon(
              Icons.add,
              size: 16,
              color: canIncrement ? AppColors.primaryDark : AppColors.textTertiary,
            ),
          ),
        ),
      ],
    );
  }
}
