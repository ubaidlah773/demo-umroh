import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../core/constants/app_strings.dart';
import '../../models/product_model.dart';
import '../../providers/product_provider.dart';
import '../../widgets/app_card.dart';
import '../../widgets/custom_search_bar.dart';
import '../../widgets/empty_state.dart';
import '../../widgets/low_stock_badge.dart';
import 'stock_adjustment_dialog.dart';
import 'stock_movement_history_screen.dart';

class StockManagementScreen extends StatefulWidget {
  const StockManagementScreen({super.key});

  @override
  State<StockManagementScreen> createState() => _StockManagementScreenState();
}

class _StockManagementScreenState extends State<StockManagementScreen> {
  final TextEditingController _searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<ProductProvider>().loadProducts();
    });
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  void _openAdjustmentDialog(ProductModel product) async {
    final updated = await showDialog<bool>(
      context: context,
      builder: (_) => StockAdjustmentDialog(product: product),
    );

    if (updated == true && mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Stok ${product.name} berhasil diperbarui!'),
          backgroundColor: AppColors.success,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final prodProv = context.watch<ProductProvider>();
    final products = prodProv.products;

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          AppStrings.stockManagement,
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.history_rounded, color: AppColors.primary),
            tooltip: AppStrings.stockHistory,
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => const StockMovementHistoryScreen(),
                ),
              );
            },
          ),
        ],
      ),
      body: Column(
        children: [
          // Search Bar
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 8, 16, 10),
            child: CustomSearchBar(
              controller: _searchController,
              hintText: 'Cari barang untuk ubah stok...',
              onChanged: (val) => prodProv.setSearchQuery(val),
            ),
          ),
          const Divider(height: 1, color: AppColors.border),

          // Product List with Quick Adjust Button
          Expanded(
            child: RefreshIndicator(
              onRefresh: () => prodProv.loadProducts(),
              color: AppColors.primary,
              child: prodProv.isLoading
                  ? const Center(child: CircularProgressIndicator(color: AppColors.primary))
                  : products.isEmpty
                      ? const EmptyState(
                          icon: Icons.inventory_2_outlined,
                          title: 'Barang Tidak Ditemukan',
                          message: 'Tidak ada barang yang cocok dengan kata kunci pencarian.',
                        )
                      : ListView.separated(
                          padding: const EdgeInsets.all(16),
                          itemCount: products.length,
                          separatorBuilder: (_, __) => const SizedBox(height: 10),
                          itemBuilder: (context, index) {
                            final product = products[index];
                            return AppCard(
                              padding: const EdgeInsets.all(14),
                              child: Row(
                                children: [
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          product.name,
                                          style: const TextStyle(
                                            fontSize: 15,
                                            fontWeight: FontWeight.w700,
                                            color: AppColors.textPrimary,
                                          ),
                                        ),
                                        const SizedBox(height: 4),
                                        Row(
                                          children: [
                                            LowStockBadge(
                                              stock: product.stock,
                                              minimumStock: product.minimumStock,
                                              unit: product.unitName ?? 'pcs',
                                            ),
                                            const SizedBox(width: 8),
                                            Text(
                                              'Min: ${product.minimumStock} ${product.unitName ?? 'pcs'}',
                                              style: const TextStyle(
                                                fontSize: 12,
                                                color: AppColors.textTertiary,
                                              ),
                                            ),
                                          ],
                                        ),
                                      ],
                                    ),
                                  ),
                                  const SizedBox(width: 8),
                                  ElevatedButton.icon(
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: AppColors.primaryContainer,
                                      foregroundColor: AppColors.primaryDark,
                                      elevation: 0,
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(10),
                                        side: BorderSide(color: AppColors.primary.withOpacity(0.3)),
                                      ),
                                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                                      minimumSize: const Size(0, 38),
                                    ),
                                    icon: const Icon(Icons.tune_rounded, size: 16),
                                    label: const Text(
                                      'Ubah Stok',
                                      style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700),
                                    ),
                                    onPressed: () => _openAdjustmentDialog(product),
                                  ),
                                ],
                              ),
                            );
                          },
                        ),
            ),
          ),
        ],
      ),
    );
  }
}
