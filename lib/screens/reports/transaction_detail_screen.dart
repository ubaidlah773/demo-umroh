import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';
import '../../core/constants/app_strings.dart';
import '../../core/utils/currency_formatter.dart';
import '../../core/utils/date_formatter.dart';
import '../../models/sale_model.dart';
import '../../widgets/app_card.dart';
import '../../widgets/money_text.dart';
import '../../widgets/primary_button.dart';
import '../cashier/receipt_preview_dialog.dart';

class TransactionDetailScreen extends StatelessWidget {
  final SaleModel sale;

  const TransactionDetailScreen({super.key, required this.sale});

  @override
  Widget build(BuildContext context) {
    final date = DateTime.tryParse(sale.date) ?? DateTime.now();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Detail Transaksi', style: TextStyle(fontWeight: FontWeight.w700)),
        actions: [
          IconButton(
            icon: const Icon(Icons.receipt_long_rounded, color: AppColors.primary),
            tooltip: AppStrings.printReceipt,
            onPressed: () {
              showDialog(
                context: context,
                builder: (_) => ReceiptPreviewDialog(sale: sale),
              );
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Invoice & Status Card
            AppCard(
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        sale.invoiceNumber,
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w800,
                          color: AppColors.textPrimary,
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppColors.primaryLight,
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: const Text(
                          'Lunas',
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w700,
                            color: AppColors.primaryDark,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        DateFormatter.formatDateTime(date),
                        style: const TextStyle(fontSize: 12, color: AppColors.textSecondary),
                      ),
                      Text(
                        'Metode: ${sale.paymentMethod}',
                        style: const TextStyle(fontSize: 12, color: AppColors.textSecondary),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Itemized List Header
            Text(
              'Rincian Barang (${sale.totalItemsCount} pcs)',
              style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 8),

            // Items
            ListView.separated(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: sale.items.length,
              separatorBuilder: (_, __) => const SizedBox(height: 8),
              itemBuilder: (context, index) {
                final item = sale.items[index];
                return AppCard(
                  padding: const EdgeInsets.all(12),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Expanded(
                            child: Text(
                              item.productName ?? 'Barang',
                              style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700),
                            ),
                          ),
                          MoneyText(
                            amount: item.subtotal,
                            fontSize: 14,
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
                            '${item.quantity} ${item.unitName ?? 'pcs'} x ${CurrencyFormatter.format(item.sellingPrice)}',
                            style: const TextStyle(fontSize: 12, color: AppColors.textSecondary),
                          ),
                          Text(
                            'Laba: +${CurrencyFormatter.format(item.profit)}',
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
            const SizedBox(height: 16),

            // Financial Breakdown Card
            AppCard(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  _buildSummaryLine('Total Belanja', CurrencyFormatter.format(sale.total), isBold: true),
                  const SizedBox(height: 8),
                  _buildSummaryLine('Uang Dibayar (${sale.paymentMethod})', CurrencyFormatter.format(sale.paid)),
                  const SizedBox(height: 8),
                  _buildSummaryLine('Kembalian', CurrencyFormatter.format(sale.change), color: AppColors.primaryDark, isBold: true),
                  const Divider(height: 20, color: AppColors.border),
                  _buildSummaryLine('Total Keuntungan (Laba)', '+${CurrencyFormatter.format(sale.totalProfit)}', color: AppColors.success, isBold: true),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Print Receipt CTA
            PrimaryButton(
              text: AppStrings.printReceipt,
              icon: Icons.receipt_long_rounded,
              height: 50,
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
    );
  }

  Widget _buildSummaryLine(String title, String value, {Color? color, bool isBold = false}) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          title,
          style: TextStyle(
            fontSize: isBold ? 14 : 13,
            color: isBold ? AppColors.textPrimary : AppColors.textSecondary,
            fontWeight: isBold ? FontWeight.w700 : FontWeight.w500,
          ),
        ),
        Text(
          value,
          style: TextStyle(
            fontSize: isBold ? 15 : 13,
            color: color ?? AppColors.textPrimary,
            fontWeight: isBold ? FontWeight.w800 : FontWeight.w600,
          ),
        ),
      ],
    );
  }
}
