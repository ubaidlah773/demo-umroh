import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../core/constants/app_strings.dart';
import '../../core/utils/currency_formatter.dart';
import '../../models/product_model.dart';
import '../../models/sale_model.dart';
import '../../providers/cart_provider.dart';
import '../../providers/product_provider.dart';
import '../../widgets/app_card.dart';
import '../../widgets/custom_search_bar.dart';
import '../../widgets/empty_state.dart';
import '../../widgets/low_stock_badge.dart';
import '../../widgets/money_text.dart';
import '../../widgets/primary_button.dart';
import '../../widgets/quantity_stepper.dart';
import 'payment_modal.dart';
import 'payment_success_dialog.dart';

class CashierScreen extends StatefulWidget {
  const CashierScreen({super.key});

  @override
  State<CashierScreen> createState() => _CashierScreenState();
}

class _CashierScreenState extends State<CashierScreen> {
  final TextEditingController _searchController = TextEditingController();
  int? _selectedCategory;

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

  void _openCartBottomSheet() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => _buildCartDetailsModal(ctx),
    );
  }

  void _openPaymentModal() async {
    final cart = context.read<CartProvider>();
    if (cart.isEmpty) return;

    final SaleModel? completedSale = await showModalBottomSheet<SaleModel>(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => const PaymentModal(),
    );

    if (completedSale != null && mounted) {
      showDialog(
        context: context,
        barrierDismissible: false,
        builder: (_) => PaymentSuccessDialog(
          sale: completedSale,
          onNewTransaction: () {
            // Already cleared, stay on cashier
          },
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final prodProv = context.watch<ProductProvider>();
    final cart = context.watch<CartProvider>();
    final products = prodProv.products;
    final categories = prodProv.categories;

    return Scaffold(
      appBar: AppBar(
        title: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              AppStrings.navCashier,
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
        actions: [
          if (cart.isNotEmpty)
            TextButton.icon(
              icon: const Icon(Icons.delete_sweep_rounded, color: AppColors.danger, size: 20),
              label: const Text(
                'Kosongkan',
                style: TextStyle(color: AppColors.danger, fontSize: 13, fontWeight: FontWeight.w600),
              ),
              onPressed: () {
                cart.clear();
              },
            ),
        ],
      ),
      body: Column(
        children: [
          // Search & Scanner Header
          Container(
            padding: const EdgeInsets.fromLTRB(16, 8, 16, 8),
            color: Colors.white,
            child: Column(
              children: [
                CustomSearchBar(
                  controller: _searchController,
                  hintText: AppStrings.cashierSearchPlaceholder,
                  onChanged: (val) {
                    prodProv.setSearchQuery(val);
                  },
                  onScanBarcode: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Kamera scanner dapat digunakan saat sensor barcode aktif.'),
                        duration: Duration(seconds: 2),
                      ),
                    );
                  },
                ),
                const SizedBox(height: 8),

                // Category Chips Filter
                SizedBox(
                  height: 36,
                  child: ListView(
                    scrollDirection: Axis.horizontal,
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(right: 6),
                        child: ChoiceChip(
                          label: const Text('Semua'),
                          selected: _selectedCategory == null,
                          selectedColor: AppColors.primary,
                          labelStyle: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w600,
                            color: _selectedCategory == null ? Colors.white : AppColors.textPrimary,
                          ),
                          onSelected: (_) {
                            setState(() => _selectedCategory = null);
                            prodProv.setCategoryFilter(null);
                          },
                        ),
                      ),
                      ...categories.map((cat) {
                        final isSel = _selectedCategory == cat.id;
                        return Padding(
                          padding: const EdgeInsets.only(right: 6),
                          child: ChoiceChip(
                            label: Text(cat.name),
                            selected: isSel,
                            selectedColor: AppColors.primary,
                            labelStyle: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w600,
                              color: isSel ? Colors.white : AppColors.textPrimary,
                            ),
                            onSelected: (_) {
                              setState(() => _selectedCategory = isSel ? null : cat.id);
                              prodProv.setCategoryFilter(isSel ? null : cat.id);
                            },
                          ),
                        );
                      }),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const Divider(height: 1, color: AppColors.border),

          // Product List
          Expanded(
            child: prodProv.isLoading
                ? const Center(child: CircularProgressIndicator(color: AppColors.primary))
                : products.isEmpty
                    ? const EmptyState(
                        icon: Icons.search_off_rounded,
                        title: 'Barang Tidak Ditemukan',
                        message: 'Coba periksa kata kunci pencarian atau ganti kategori.',
                      )
                    : ListView.separated(
                        padding: const EdgeInsets.fromLTRB(16, 12, 16, 80),
                        itemCount: products.length,
                        separatorBuilder: (_, __) => const SizedBox(height: 8),
                        itemBuilder: (context, index) {
                          final product = products[index];
                          final inCartQty = cart.getItemQuantity(product.id ?? 0);
                          final isOutOfStock = product.isOutOfStock;

                          return _buildProductRow(
                            product: product,
                            inCartQty: inCartQty,
                            isOutOfStock: isOutOfStock,
                            onTap: () {
                              if (isOutOfStock) {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text('Stok ${product.name} telah habis!'),
                                    backgroundColor: AppColors.danger,
                                    duration: const Duration(seconds: 1),
                                  ),
                                );
                                return;
                              }
                              final success = cart.addItem(product);
                              if (!success) {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text('Stok ${product.name} tersisa ${product.stock} ${product.unitName ?? 'pcs'}'),
                                    backgroundColor: AppColors.secondary,
                                    duration: const Duration(seconds: 1),
                                  ),
                                );
                              }
                            },
                          );
                        },
                      ),
          ),
        ],
      ),

      // Sticky Bottom Cart Bar
      bottomNavigationBar: cart.isEmpty
          ? null
          : Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              decoration: BoxDecoration(
                color: Colors.white,
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.08),
                    blurRadius: 10,
                    offset: const Offset(0, -4),
                  ),
                ],
              ),
              child: SafeArea(
                child: Row(
                  children: [
                    // Cart Info & Summary
                    Expanded(
                      child: InkWell(
                        onTap: _openCartBottomSheet,
                        borderRadius: BorderRadius.circular(8),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                const Icon(Icons.shopping_bag_outlined, size: 16, color: AppColors.primary),
                                const SizedBox(width: 4),
                                Text(
                                  '${cart.totalItemsCount} Barang',
                                  style: const TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.w600,
                                    color: AppColors.textSecondary,
                                  ),
                                ),
                                const SizedBox(width: 4),
                                const Icon(Icons.keyboard_arrow_up_rounded, size: 16, color: AppColors.textTertiary),
                              ],
                            ),
                            const SizedBox(height: 2),
                            MoneyText(
                              amount: cart.totalAmount,
                              fontSize: 18,
                              fontWeight: FontWeight.w800,
                              color: AppColors.primaryDark,
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    // Pay Button
                    SizedBox(
                      width: 130,
                      height: 48,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppColors.primary,
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                          elevation: 0,
                        ),
                        onPressed: _openPaymentModal,
                        child: const Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              AppStrings.pay,
                              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
                            ),
                            SizedBox(width: 4),
                            Icon(Icons.arrow_forward_rounded, size: 18),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
    );
  }

  Widget _buildProductRow({
    required ProductModel product,
    required int inCartQty,
    required bool isOutOfStock,
    required VoidCallback onTap,
  }) {
    return AppCard(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      onTap: onTap,
      child: Row(
        children: [
          // Product Initial Icon Container
          Container(
            width: 46,
            height: 46,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: isOutOfStock
                  ? AppColors.surfaceVariant
                  : AppColors.primaryLight.withOpacity(0.5),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Text(
              product.name.isNotEmpty ? product.name.substring(0, 1).toUpperCase() : '?',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w800,
                color: isOutOfStock ? AppColors.textTertiary : AppColors.primary,
              ),
            ),
          ),
          const SizedBox(width: 12),

          // Details
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  product.name,
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w700,
                    color: isOutOfStock ? AppColors.textSecondary : AppColors.textPrimary,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 3),
                Row(
                  children: [
                    MoneyText(
                      amount: product.sellingPrice,
                      fontSize: 14,
                      fontWeight: FontWeight.w700,
                      color: isOutOfStock ? AppColors.textSecondary : AppColors.primaryDark,
                    ),
                    const SizedBox(width: 6),
                    Text(
                      '/ ${product.unitName ?? 'pcs'}',
                      style: const TextStyle(fontSize: 12, color: AppColors.textTertiary),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                LowStockBadge(
                  stock: product.stock,
                  minimumStock: product.minimumStock,
                  unit: product.unitName ?? 'pcs',
                ),
              ],
            ),
          ),

          // Cart Quantity Action Indicator
          if (inCartQty > 0)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
              decoration: BoxDecoration(
                color: AppColors.primary,
                borderRadius: BorderRadius.circular(20),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Icons.shopping_cart, size: 14, color: Colors.white),
                  const SizedBox(width: 4),
                  Text(
                    '$inCartQty',
                    style: const TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w800,
                      color: Colors.white,
                    ),
                  ),
                ],
              ),
            )
          else if (!isOutOfStock)
            Container(
              width: 34,
              height: 34,
              decoration: BoxDecoration(
                color: AppColors.surfaceVariant,
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: AppColors.border),
              ),
              child: const Icon(Icons.add, size: 20, color: AppColors.primary),
            ),
        ],
      ),
    );
  }

  Widget _buildCartDetailsModal(BuildContext ctx) {
    return Consumer<CartProvider>(
      builder: (context, cart, _) {
        return Container(
          height: MediaQuery.of(context).size.height * 0.75,
          decoration: const BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
          ),
          child: Column(
            children: [
              // Handle & Header
              const SizedBox(height: 12),
              Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: AppColors.borderDark,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        const Icon(Icons.shopping_bag_outlined, color: AppColors.primary),
                        const SizedBox(width: 8),
                        Text(
                          '${AppStrings.cartTitle} (${cart.totalItemsCount})',
                          style: const TextStyle(
                            fontSize: 17,
                            fontWeight: FontWeight.w800,
                            color: AppColors.textPrimary,
                          ),
                        ),
                      ],
                    ),
                    IconButton(
                      icon: const Icon(Icons.close),
                      onPressed: () => Navigator.pop(ctx),
                    ),
                  ],
                ),
              ),
              const Divider(height: 1, color: AppColors.border),

              // Itemized list
              Expanded(
                child: cart.isEmpty
                    ? const EmptyState(
                        icon: Icons.remove_shopping_cart_outlined,
                        title: AppStrings.cartEmpty,
                        message: AppStrings.cartEmptyDesc,
                      )
                    : ListView.separated(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                        itemCount: cart.items.length,
                        separatorBuilder: (_, __) => const Divider(color: AppColors.border, height: 16),
                        itemBuilder: (context, index) {
                          final item = cart.items[index];
                          return Row(
                            children: [
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      item.product.name,
                                      style: const TextStyle(
                                        fontSize: 14,
                                        fontWeight: FontWeight.w700,
                                        color: AppColors.textPrimary,
                                      ),
                                    ),
                                    const SizedBox(height: 2),
                                    Text(
                                      '${CurrencyFormatter.format(item.product.sellingPrice)} / ${item.product.unitName ?? 'pcs'}',
                                      style: const TextStyle(
                                        fontSize: 12,
                                        color: AppColors.textSecondary,
                                      ),
                                    ),
                                    const SizedBox(height: 4),
                                    MoneyText(
                                      amount: item.subtotal,
                                      fontSize: 14,
                                      fontWeight: FontWeight.w800,
                                      color: AppColors.primaryDark,
                                    ),
                                  ],
                                ),
                              ),
                              QuantityStepper(
                                value: item.quantity,
                                max: item.product.stock,
                                onChanged: (newVal) {
                                  cart.setQuantity(item.product.id!, newVal);
                                },
                              ),
                            ],
                          );
                        },
                      ),
              ),

              // Bottom Checkout Panel
              if (cart.isNotEmpty)
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    border: const Border(top: BorderSide(color: AppColors.border)),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.05),
                        blurRadius: 10,
                        offset: const Offset(0, -4),
                      ),
                    ],
                  ),
                  child: SafeArea(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text(
                              AppStrings.total,
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w700,
                                color: AppColors.textPrimary,
                              ),
                            ),
                            MoneyText(
                              amount: cart.totalAmount,
                              fontSize: 22,
                              fontWeight: FontWeight.w800,
                              color: AppColors.primaryDark,
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        PrimaryButton(
                          text: AppStrings.pay,
                          icon: Icons.payments_rounded,
                          height: 50,
                          onPressed: () {
                            Navigator.pop(ctx);
                            _openPaymentModal();
                          },
                        ),
                      ],
                    ),
                  ),
                ),
            ],
          ),
        );
      },
    );
  }
}
