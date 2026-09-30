import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';
import '../../core/constants/app_strings.dart';
import '../../core/utils/currency_formatter.dart';
import '../../models/sale_model.dart';
import '../../widgets/money_text.dart';
import '../../widgets/primary_button.dart';
import '../../widgets/secondary_button.dart';
import 'receipt_preview_dialog.dart';

class PaymentSuccessDialog extends StatelessWidget {
  final SaleModel sale;
  final VoidCallback onNewTransaction;

  const PaymentSuccessDialog({
    super.key,
    required this.sale,
    required this.onNewTransaction,
  });

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: false,
      child: Dialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        backgroundColor: Colors.white,
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // Celebration Icon
              Container(
                width: 72,
                height: 72,
                decoration: const BoxDecoration(
                  color: AppColors.primaryLight,
                  shape: BoxShape.circle,
                ),
                child: const Icon(
                  Icons.check_circle_rounded,
                  color: AppColors.primary,
                  size: 48,
                ),
              ),
              const SizedBox(height: 16),
              const Text(
                AppStrings.transactionSuccess,
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w800,
                  color: AppColors.textPrimary,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 6),
              Text(
                sale.invoiceNumber,
                style: const TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                  color: AppColors.textSecondary,
                ),
              ),
              const SizedBox(height: 20),

              // Summary Box
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppColors.surfaceVariant,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppColors.border),
                ),
                child: Column(
                  children: [
                    _buildRow(
                      label: AppStrings.totalShopping,
                      value: CurrencyFormatter.format(sale.total),
                      isBold: true,
                    ),
                    const Divider(height: 16, color: AppColors.border),
                    _buildRow(
                      label: '${AppStrings.amountPaid} (${sale.paymentMethod})',
                      value: CurrencyFormatter.format(sale.paid),
                    ),
                    const SizedBox(height: 8),
                    _buildRow(
                      label: AppStrings.change,
                      value: CurrencyFormatter.format(sale.change),
                      valueColor: AppColors.primaryDark,
                      isBold: true,
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Action Buttons
              PrimaryButton(
                text: AppStrings.newTransactionBtn,
                icon: Icons.add_shopping_cart_rounded,
                height: 48,
                onPressed: () {
                  Navigator.pop(context);
                  onNewTransaction();
                },
              ),
              const SizedBox(height: 10),
              SecondaryButton(
                text: AppStrings.printReceipt,
                icon: Icons.receipt_long_rounded,
                height: 46,
                onPressed: () {
                  showDialog(
                    context: context,
                    builder: (_) => ReceiptPreviewDialog(sale: sale),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildRow({
    required String label,
    required String value,
    Color? valueColor,
    bool isBold = false,
  }) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: 13,
            color: isBold ? AppColors.textPrimary : AppColors.textSecondary,
            fontWeight: isBold ? FontWeight.w700 : FontWeight.w500,
          ),
        ),
        Text(
          value,
          style: TextStyle(
            fontSize: 15,
            color: valueColor ?? AppColors.textPrimary,
            fontWeight: isBold ? FontWeight.w800 : FontWeight.w600,
          ),
        ),
      ],
    );
  }
}
