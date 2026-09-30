import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../core/constants/app_strings.dart';
import '../../core/utils/currency_formatter.dart';
import '../../core/utils/date_formatter.dart';
import '../../models/purchase_model.dart';
import '../../providers/purchase_provider.dart';
import '../../widgets/app_card.dart';
import '../../widgets/empty_state.dart';
import '../../widgets/money_text.dart';
import 'add_purchase_screen.dart';
import 'suppliers_screen.dart';

class PurchasesScreen extends StatefulWidget {
  const PurchasesScreen({super.key});

  @override
  State<PurchasesScreen> createState() => _PurchasesScreenState();
}

class _PurchasesScreenState extends State<PurchasesScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<PurchaseProvider>().init();
    });
  }

  void _showPurchaseDetailDialog(PurchaseModel purchase) {
    final date = DateTime.tryParse(purchase.date) ?? DateTime.now();

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(purchase.invoiceNumber, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800)),
            Text(
              DateFormatter.formatDateTime(date),
              style: const TextStyle(fontSize: 12, color: AppColors.textSecondary),
            ),
          ],
        ),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (purchase.supplierName != null && purchase.supplierName!.isNotEmpty) ...[
                Text('Supplier: ${purchase.supplierName!}', style: const TextStyle(fontWeight: FontWeight.w600)),
                const SizedBox(height: 8),
              ],
              const Divider(color: AppColors.border),
              ...purchase.items.map((i) {
                return Padding(
                  padding: const EdgeInsets.symmetric(vertical: 4),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        child: Text(
                          '${i.productName ?? 'Barang'} (${i.quantity}x)',
                          style: const TextStyle(fontSize: 13),
                        ),
                      ),
                      MoneyText(
                        amount: i.subtotal,
                        fontSize: 13,
                        fontWeight: FontWeight.w700,
                      ),
                    ],
                  ),
                );
              }),
              const Divider(color: AppColors.border),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Total Pembelian:', style: TextStyle(fontWeight: FontWeight.w700)),
                  MoneyText(
                    amount: purchase.total,
                    fontSize: 16,
                    fontWeight: FontWeight.w800,
                    color: AppColors.primaryDark,
                  ),
                ],
              ),
              if (purchase.notes != null && purchase.notes!.isNotEmpty) ...[
                const SizedBox(height: 12),
                Text('Catatan: ${purchase.notes}', style: const TextStyle(fontSize: 12, color: AppColors.textTertiary)),
              ],
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Tutup'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final purchaseProv = context.watch<PurchaseProvider>();
    final purchases = purchaseProv.purchases;

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          AppStrings.purchases,
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.storefront_rounded, color: AppColors.primary),
            tooltip: 'Kelola Supplier',
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const SuppliersScreen()),
              );
            },
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: () => purchaseProv.loadPurchases(),
        color: AppColors.primary,
        child: purchaseProv.isLoading
            ? const Center(child: CircularProgressIndicator(color: AppColors.primary))
            : purchases.isEmpty
                ? EmptyState(
                    icon: Icons.local_shipping_outlined,
                    title: 'Belum Ada Data Pembelian',
                    message: 'Catat pembelian barang dari agen atau pasar untuk menambah stok secara otomatis.',
                    actionText: AppStrings.addPurchase,
                    onAction: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (_) => const AddPurchaseScreen()),
                      );
                    },
                  )
                : ListView.separated(
                    padding: const EdgeInsets.fromLTRB(16, 16, 16, 80),
                    itemCount: purchases.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 10),
                    itemBuilder: (context, index) {
                      final p = purchases[index];
                      final date = DateTime.tryParse(p.date) ?? DateTime.now();

                      return AppCard(
                        padding: const EdgeInsets.all(14),
                        onTap: () => _showPurchaseDetailDialog(p),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  p.invoiceNumber,
                                  style: const TextStyle(
                                    fontSize: 14,
                                    fontWeight: FontWeight.w700,
                                    color: AppColors.textPrimary,
                                  ),
                                ),
                                MoneyText(
                                  amount: p.total,
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
                                  p.supplierName ?? 'Pembelian Mandiri',
                                  style: const TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.w500,
                                    color: AppColors.textSecondary,
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
                            const SizedBox(height: 8),
                            Text(
                              '${p.items.length} jenis barang kulakan',
                              style: const TextStyle(
                                fontSize: 11,
                                color: AppColors.textTertiary,
                                fontStyle: FontStyle.italic,
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: AppColors.primary,
        foregroundColor: Colors.white,
        icon: const Icon(Icons.add),
        label: const Text(AppStrings.addPurchase, style: TextStyle(fontWeight: FontWeight.w700)),
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (_) => const AddPurchaseScreen()),
          );
        },
      ),
    );
  }
}
