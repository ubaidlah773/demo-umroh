import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../core/constants/app_strings.dart';
import '../../core/utils/currency_formatter.dart';
import '../../models/product_model.dart';
import '../../providers/product_provider.dart';
import '../../widgets/app_card.dart';
import '../../widgets/confirmation_dialog.dart';
import '../../widgets/custom_search_bar.dart';
import '../../widgets/empty_state.dart';
import '../../widgets/low_stock_badge.dart';
import 'add_edit_product_screen.dart';

class ProductsScreen extends StatefulWidget {
  const ProductsScreen({super.key});

  @override
  State<ProductsScreen> createState() => _ProductsScreenState();
}

class _ProductsScreenState extends State<ProductsScreen> {
  final TextEditingController _searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<ProductProvider>().init();
    });
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  void _confirmDelete(ProductModel product) async {
    final prodProv = context.read<ProductProvider>();
    final hasHistory = await prodProv.hasTransactionHistory(product.id!);

    if (!mounted) return;

    final String message = hasHistory
        ? 'Barang "${product.name}" memiliki riwayat transaksi penjualan/pembelian. Menghapus barang ini akan menghapus data master barang. Apakah Anda yakin ingin menghapus?'
        : 'Apakah Anda yakin ingin menghapus barang "${product.name}"?';

    final confirmed = await ConfirmationDialog.show(
      context,
      title: 'Hapus Barang',
      message: message,
      confirmText: AppStrings.delete,
      cancelText: AppStrings.cancel,
      isDestructive: true,
    );

    if (confirmed == true && mounted) {
      final success = await prodProv.deleteProduct(product.id!);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(success ? 'Barang "${product.name}" telah dihapus.' : 'Gagal menghapus barang.'),
            backgroundColor: success ? AppColors.primaryDark : AppColors.danger,
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final prodProv = context.watch<ProductProvider>();
    final products = prodProv.products;
    final activeFilter = prodProv.activeFilter;

    return Scaffold(
      appBar: AppBar(
        title: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              AppStrings.navProducts,
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w800,
                color: AppColors.textPrimary,
              ),
            ),
            Text(
              'Warung Mak Wi',
              style: TextStyle(
                fontSize: 12,
                color: AppColors.textSecondary,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
      body: Column(
        children: [
          // Search & Filter Bar
          Container(
            padding: const EdgeInsets.fromLTRB(16, 8, 16, 10),
            color: Colors.white,
            child: Column(
              children: [
                CustomSearchBar(
                  controller: _searchController,
                  hintText: AppStrings.productSearchPlaceholder,
                  onChanged: (val) => prodProv.setSearchQuery(val),
                ),
                const SizedBox(height: 8),

                // Filter Chips
                Row(
                  children: [
                    _buildFilterChip('Semua', 'all', activeFilter, prodProv),
                    const SizedBox(width: 8),
                    _buildFilterChip('Stok Menipis', 'low_stock', activeFilter, prodProv),
                    const SizedBox(width: 8),
                    _buildFilterChip('Stok Habis', 'out_of_stock', activeFilter, prodProv),
                  ],
                ),
              ],
            ),
          ),
          const Divider(height: 1, color: AppColors.border),

          // Products List
          Expanded(
            child: RefreshIndicator(
              onRefresh: () => prodProv.loadProducts(),
              color: AppColors.primary,
              child: prodProv.isLoading
                  ? const Center(child: CircularProgressIndicator(color: AppColors.primary))
                  : products.isEmpty
                      ? EmptyState(
                          icon: Icons.inventory_2_outlined,
                          title: 'Belum Ada Barang',
                          message: activeFilter != 'all'
                              ? 'Tidak ada barang dengan filter yang dipilih.'
                              : 'Tambahkan barang pertama untuk mulai mengelola stok warung Anda.',
                          actionText: activeFilter == 'all' ? '+ Tambah Barang' : 'Reset Filter',
                          onAction: () {
                            if (activeFilter == 'all') {
                              Navigator.push(
                                context,
                                MaterialPageRoute(builder: (_) => const AddEditProductScreen()),
                              );
                            } else {
                              prodProv.setFilter('all');
                            }
                          },
                        )
                      : ListView.separated(
                          padding: const EdgeInsets.fromLTRB(16, 12, 16, 80),
                          itemCount: products.length,
                          separatorBuilder: (_, __) => const SizedBox(height: 10),
                          itemBuilder: (context, index) {
                            final product = products[index];
                            return _buildProductItem(product);
                          },
                        ),
            ),
          ),
        ],
      ),

      // Floating Action Button
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: AppColors.primary,
        foregroundColor: Colors.white,
        elevation: 3,
        icon: const Icon(Icons.add),
        label: const Text(
          AppStrings.addProduct,
          style: TextStyle(fontWeight: FontWeight.w700),
        ),
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (_) => const AddEditProductScreen(),
            ),
          );
        },
      ),
    );
  }

  Widget _buildFilterChip(
    String label,
    String value,
    String activeValue,
    ProductProvider provider,
  ) {
    final isSelected = activeValue == value;
    return ChoiceChip(
      label: Text(label),
      selected: isSelected,
      selectedColor: AppColors.primary,
      labelStyle: TextStyle(
        fontSize: 12,
        fontWeight: FontWeight.w600,
        color: isSelected ? Colors.white : AppColors.textPrimary,
      ),
      onSelected: (_) => provider.setFilter(value),
    );
  }

  Widget _buildProductItem(ProductModel product) {
    final margin = product.margin;
    final marginPct = product.marginPercentage;

    return AppCard(
      padding: const EdgeInsets.all(14),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Top Row: Name, Category & Stock Badge
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      product.name,
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w700,
                        color: AppColors.textPrimary,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      '${product.categoryName ?? 'Umum'} • ${product.unitName ?? 'pcs'}${product.barcode != null && product.barcode!.isNotEmpty ? ' • ${product.barcode}' : ''}',
                      style: const TextStyle(
                        fontSize: 12,
                        color: AppColors.textSecondary,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ),
              LowStockBadge(
                stock: product.stock,
                minimumStock: product.minimumStock,
                unit: product.unitName ?? 'pcs',
              ),
            ],
          ),
          const SizedBox(height: 12),
          const Divider(height: 1, color: AppColors.border),
          const SizedBox(height: 10),

          // Price & Margin Row
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Harga Modal',
                    style: TextStyle(fontSize: 11, color: AppColors.textTertiary),
                  ),
                  Text(
                    CurrencyFormatter.format(product.purchasePrice),
                    style: const TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w600,
                      color: AppColors.textSecondary,
                    ),
                  ),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Harga Jual',
                    style: TextStyle(fontSize: 11, color: AppColors.textTertiary),
                  ),
                  Text(
                    CurrencyFormatter.format(product.sellingPrice),
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w800,
                      color: AppColors.primaryDark,
                    ),
                  ),
                ],
              ),
              // Profit Margin Badge
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: margin >= 0 ? AppColors.primaryLight : AppColors.dangerLight,
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  '${margin >= 0 ? '+' : ''}${CurrencyFormatter.format(margin)} (${marginPct.toStringAsFixed(0)}%)',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                    color: margin >= 0 ? AppColors.primaryDark : AppColors.danger,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),

          // Actions Row
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              IconButton(
                icon: const Icon(Icons.edit_outlined, size: 20, color: AppColors.primary),
                tooltip: AppStrings.edit,
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (_) => AddEditProductScreen(product: product),
                    ),
                  );
                },
              ),
              IconButton(
                icon: const Icon(Icons.delete_outline_rounded, size: 20, color: AppColors.danger),
                tooltip: AppStrings.delete,
                onPressed: () => _confirmDelete(product),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
