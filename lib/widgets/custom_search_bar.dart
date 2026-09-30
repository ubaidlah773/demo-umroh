import 'package:flutter/material.dart';
import '../core/constants/app_colors.dart';

class CustomSearchBar extends StatelessWidget {
  final TextEditingController? controller;
  final String hintText;
  final ValueChanged<String>? onChanged;
  final VoidCallback? onClear;
  final VoidCallback? onScanBarcode;
  final bool autoFocus;

  const CustomSearchBar({
    super.key,
    this.controller,
    this.hintText = 'Cari barang...',
    this.onChanged,
    this.onClear,
    this.onScanBarcode,
    this.autoFocus = false,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      height: 48,
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkSurface : Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: isDark ? AppColors.darkBorder : AppColors.border,
          width: 1,
        ),
      ),
      child: TextField(
        controller: controller,
        autofocus: autoFocus,
        onChanged: onChanged,
        style: TextStyle(
          fontSize: 14,
          color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
        ),
        decoration: InputDecoration(
          hintText: hintText,
          hintStyle: const TextStyle(
            fontSize: 14,
            color: AppColors.textTertiary,
          ),
          prefixIcon: const Icon(
            Icons.search,
            color: AppColors.textSecondary,
            size: 22,
          ),
          suffixIcon: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (controller != null && controller!.text.isNotEmpty)
                IconButton(
                  icon: const Icon(Icons.close, size: 18, color: AppColors.textSecondary),
                  onPressed: () {
                    controller?.clear();
                    if (onChanged != null) onChanged!('');
                    if (onClear != null) onClear!();
                  },
                ),
              if (onScanBarcode != null)
                IconButton(
                  icon: const Icon(Icons.qr_code_scanner, size: 20, color: AppColors.primary),
                  tooltip: 'Scan Barcode',
                  onPressed: onScanBarcode,
                ),
            ],
          ),
          border: InputBorder.none,
          enabledBorder: InputBorder.none,
          focusedBorder: InputBorder.none,
          contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
        ),
      ),
    );
  }
}
