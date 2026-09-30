import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../core/constants/app_constants.dart';
import '../../core/constants/app_strings.dart';
import '../../models/product_model.dart';
import '../../providers/product_provider.dart';
import '../../providers/stock_provider.dart';
import '../../widgets/primary_button.dart';
import '../../widgets/secondary_button.dart';

class StockAdjustmentDialog extends StatefulWidget {
  final ProductModel product;

  const StockAdjustmentDialog({super.key, required this.product});

  @override
  State<StockAdjustmentDialog> createState() => _StockAdjustmentDialogState();
}

class _StockAdjustmentDialogState extends State<StockAdjustmentDialog> {
  String _adjustmentType = 'in'; // 'in', 'out', 'opname'
  final TextEditingController _amountController = TextEditingController(text: '1');
  String _selectedReason = AppConstants.stockAdjustmentReasons.first;
  final TextEditingController _customReasonController = TextEditingController();
  bool _isSaving = false;

  @override
  void dispose() {
    _amountController.dispose();
    _customReasonController.dispose();
    super.dispose();
  }

  int get _calculatedAfterStock {
    final inputVal = int.tryParse(_amountController.text) ?? 0;
    if (_adjustmentType == 'in') {
      return widget.product.stock + inputVal;
    } else if (_adjustmentType == 'out') {
      return widget.product.stock - inputVal;
    } else {
      // opname / direct set
      return inputVal;
    }
  }

  int get _delta {
    final inputVal = int.tryParse(_amountController.text) ?? 0;
    if (_adjustmentType == 'in') {
      return inputVal;
    } else if (_adjustmentType == 'out') {
      return -inputVal;
    } else {
      return inputVal - widget.product.stock;
    }
  }

  Future<void> _submitAdjustment() async {
    final delta = _delta;
    if (delta == 0) {
      Navigator.pop(context);
      return;
    }

    final afterStock = _calculatedAfterStock;
    if (afterStock < 0) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Stok akhir tidak boleh kurang dari 0!'),
          backgroundColor: AppColors.danger,
        ),
      );
      return;
    }

    final reason = _selectedReason == 'Lainnya' && _customReasonController.text.trim().isNotEmpty
        ? _customReasonController.text.trim()
        : _selectedReason;

    setState(() => _isSaving = true);

    final stockProv = context.read<StockProvider>();
    final prodProv = context.read<ProductProvider>();

    final success = await stockProv.adjustStock(
      productId: widget.product.id!,
      delta: delta,
      reason: reason,
    );

    setState(() => _isSaving = false);

    if (mounted) {
      if (success) {
        await prodProv.loadProducts();
        Navigator.pop(context, true);
      } else {
        final err = stockProv.errorMessage ?? 'Gagal menyesuaikan stok.';
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(err), backgroundColor: AppColors.danger),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final afterStock = _calculatedAfterStock;
    final isInvalid = afterStock < 0;

    return Dialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      backgroundColor: Colors.white,
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Row(
                  children: [
                    Icon(Icons.tune_rounded, color: AppColors.primary),
                    SizedBox(width: 8),
                    Text(
                      AppStrings.stockAdjustment,
                      style: TextStyle(
                        fontSize: 17,
                        fontWeight: FontWeight.w700,
                        color: AppColors.textPrimary,
                      ),
                    ),
                  ],
                ),
                IconButton(
                  icon: const Icon(Icons.close, color: AppColors.textSecondary),
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
            const SizedBox(height: 12),

            // Product Name & Current Stock
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppColors.surfaceVariant,
                borderRadius: BorderRadius.circular(10),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    widget.product.name,
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w700,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '${AppStrings.stockBefore}: ${widget.product.stock} ${widget.product.unitName ?? 'pcs'}',
                    style: const TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w600,
                      color: AppColors.textSecondary,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Adjustment Type Selector
            Row(
              children: [
                Expanded(
                  child: _buildTypeOption(
                    label: 'Masuk (+)',
                    type: 'in',
                    icon: Icons.add_circle_outline,
                    color: AppColors.primary,
                  ),
                ),
                const SizedBox(width: 6),
                Expanded(
                  child: _buildTypeOption(
                    label: 'Keluar (-)',
                    type: 'out',
                    icon: Icons.remove_circle_outline,
                    color: AppColors.danger,
                  ),
                ),
                const SizedBox(width: 6),
                Expanded(
                  child: _buildTypeOption(
                    label: 'Opname (=)',
                    type: 'opname',
                    icon: Icons.inventory_outlined,
                    color: AppColors.secondary,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),

            // Amount Input
            Text(
              _adjustmentType == 'opname' ? 'Stok Riil Opname' : 'Jumlah Perubahan',
              style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 6),
            TextField(
              controller: _amountController,
              keyboardType: TextInputType.number,
              autofocus: true,
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
              decoration: InputDecoration(
                suffixText: widget.product.unitName ?? 'pcs',
                hintText: '0',
              ),
              onChanged: (_) => setState(() {}),
            ),
            const SizedBox(height: 16),

            // Mandatory Reason Selector
            const Text(
              AppStrings.adjustmentReason,
              style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 6),
            DropdownButtonFormField<String>(
              value: _selectedReason,
              items: AppConstants.stockAdjustmentReasons.map((r) {
                return DropdownMenuItem(value: r, child: Text(r, style: const TextStyle(fontSize: 13)));
              }).toList(),
              onChanged: (val) {
                if (val != null) setState(() => _selectedReason = val);
              },
              decoration: const InputDecoration(
                contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 12),
              ),
            ),
            const SizedBox(height: 16),

            // Before -> After Stock Preview Card
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: isInvalid ? AppColors.dangerLight : AppColors.primaryLight.withOpacity(0.5),
                borderRadius: BorderRadius.circular(10),
                border: Border.all(
                  color: isInvalid ? AppColors.danger.withOpacity(0.3) : AppColors.primary.withOpacity(0.3),
                ),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    AppStrings.stockAfter,
                    style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600),
                  ),
                  Text(
                    '$afterStock ${widget.product.unitName ?? 'pcs'}',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w800,
                      color: isInvalid ? AppColors.danger : AppColors.primaryDark,
                    ),
                  ),
                ],
              ),
            ),
            if (isInvalid) ...[
              const SizedBox(height: 6),
              const Text(
                'Stok tidak boleh bernilai negatif.',
                style: TextStyle(color: AppColors.danger, fontSize: 12, fontWeight: FontWeight.w600),
              ),
            ],
            const SizedBox(height: 20),

            // Submit Buttons
            PrimaryButton(
              text: 'Simpan Penyesuaian',
              icon: Icons.check,
              isLoading: _isSaving,
              onPressed: isInvalid ? null : _submitAdjustment,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTypeOption({
    required String label,
    required String type,
    required IconData icon,
    required Color color,
  }) {
    final isSelected = _adjustmentType == type;
    return InkWell(
      onTap: () => setState(() => _adjustmentType = type),
      borderRadius: BorderRadius.circular(8),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 4),
        decoration: BoxDecoration(
          color: isSelected ? color.withOpacity(0.12) : AppColors.surfaceVariant,
          borderRadius: BorderRadius.circular(8),
          border: Border.all(
            color: isSelected ? color : AppColors.border,
            width: isSelected ? 1.5 : 1,
          ),
        ),
        child: Column(
          children: [
            Icon(icon, size: 18, color: isSelected ? color : AppColors.textSecondary),
            const SizedBox(height: 4),
            Text(
              label,
              style: TextStyle(
                fontSize: 11,
                fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                color: isSelected ? color : AppColors.textPrimary,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
