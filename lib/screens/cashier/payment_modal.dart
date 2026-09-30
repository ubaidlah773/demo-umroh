import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../core/constants/app_strings.dart';
import '../../core/utils/currency_formatter.dart';
import '../../models/sale_model.dart';
import '../../providers/cart_provider.dart';
import '../../providers/product_provider.dart';
import '../../providers/sale_provider.dart';
import '../../widgets/money_text.dart';
import '../../widgets/primary_button.dart';

class PaymentModal extends StatefulWidget {
  const PaymentModal({super.key});

  @override
  State<PaymentModal> createState() => _PaymentModalState();
}

class _PaymentModalState extends State<PaymentModal> {
  final TextEditingController _paidController = TextEditingController();
  String _paymentMethod = 'Tunai'; // 'Tunai', 'Non-tunai'
  int _paidAmount = 0;
  bool _isProcessing = false;

  @override
  void initState() {
    super.initState();
    final cart = context.read<CartProvider>();
    _paidAmount = cart.totalAmount;
    _paidController.text = CurrencyFormatter.formatNumberOnly(_paidAmount);
  }

  @override
  void dispose() {
    _paidController.dispose();
    super.dispose();
  }

  void _onAmountChanged(String value) {
    setState(() {
      _paidAmount = CurrencyFormatter.parse(value);
    });
  }

  void _setPresetAmount(int amount) {
    setState(() {
      _paidAmount = amount;
      _paidController.text = CurrencyFormatter.formatNumberOnly(amount);
    });
  }

  List<int> _generatePresets(int total) {
    final Set<int> presets = {total};

    // Common Indonesian currency denominations
    const denominations = [10000, 20000, 50000, 100000];
    for (final d in denominations) {
      if (d >= total) {
        presets.add(d);
      }
    }

    // Round up to nearest 10k or 50k
    final round10k = ((total / 10000).ceil()) * 10000;
    if (round10k > total) presets.add(round10k);

    final round50k = ((total / 50000).ceil()) * 50000;
    if (round50k > total) presets.add(round50k);

    final sorted = presets.toList()..sort();
    return sorted.take(4).toList();
  }

  Future<void> _processPayment() async {
    final cart = context.read<CartProvider>();
    final saleProv = context.read<SaleProvider>();
    final prodProv = context.read<ProductProvider>();

    final total = cart.totalAmount;
    final change = _paymentMethod == 'Non-tunai' ? 0 : (_paidAmount - total);

    if (_paymentMethod == 'Tunai' && _paidAmount < total) {
      return; // Disabled anyway
    }

    setState(() => _isProcessing = true);

    final createdSale = await saleProv.processCheckout(
      items: cart.items,
      total: total,
      paid: _paymentMethod == 'Non-tunai' ? total : _paidAmount,
      change: change,
      paymentMethod: _paymentMethod,
    );

    setState(() => _isProcessing = false);

    if (!mounted) return;

    if (createdSale != null) {
      cart.clear();
      // Reload products to reflect updated stock in UI
      await prodProv.loadProducts();
      Navigator.of(context).pop(createdSale);
    } else {
      final err = saleProv.errorMessage ?? 'Gagal menyimpan transaksi. Silakan coba lagi.';
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(err),
          backgroundColor: AppColors.danger,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final cart = context.watch<CartProvider>();
    final total = cart.totalAmount;
    final change = _paidAmount - total;
    final isInsufficient = _paymentMethod == 'Tunai' && _paidAmount < total;
    final deficit = total - _paidAmount;

    final presets = _generatePresets(total);

    return Container(
      padding: EdgeInsets.only(
        left: 20,
        right: 20,
        top: 20,
        bottom: MediaQuery.of(context).viewInsets.bottom + 20,
      ),
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      child: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Modal Handle & Header
            Center(
              child: Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: AppColors.borderDark,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Pembayaran Kasir',
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
                IconButton(
                  icon: const Icon(Icons.close, color: AppColors.textSecondary),
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
            const SizedBox(height: 8),

            // Total Belanja Card
            Container(
              padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 18),
              decoration: BoxDecoration(
                color: AppColors.primaryContainer,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppColors.primary.withOpacity(0.3)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    AppStrings.totalShopping,
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w600,
                      color: AppColors.primaryDark,
                    ),
                  ),
                  const SizedBox(height: 4),
                  MoneyText(
                    amount: total,
                    fontSize: 26,
                    fontWeight: FontWeight.w800,
                    color: AppColors.primaryDark,
                  ),
                  Text(
                    '${cart.totalItemsCount} barang belanja',
                    style: const TextStyle(
                      fontSize: 12,
                      color: AppColors.textSecondary,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Payment Method Switcher
            Row(
              children: [
                Expanded(
                  child: _buildMethodTab(
                    label: AppStrings.cash,
                    icon: Icons.payments_rounded,
                    isSelected: _paymentMethod == 'Tunai',
                    onTap: () {
                      setState(() {
                        _paymentMethod = 'Tunai';
                      });
                    },
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _buildMethodTab(
                    label: AppStrings.nonCash,
                    icon: Icons.qr_code_2_rounded,
                    isSelected: _paymentMethod == 'Non-tunai',
                    onTap: () {
                      setState(() {
                        _paymentMethod = 'Non-tunai';
                        _setPresetAmount(total);
                      });
                    },
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),

            // Cash input & Presets (only for Cash)
            if (_paymentMethod == 'Tunai') ...[
              // Quick Preset Chips
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: presets.map((preset) {
                  final isExact = preset == total;
                  final isSelected = _paidAmount == preset;
                  return ChoiceChip(
                    label: Text(
                      isExact ? 'Uang Pas' : CurrencyFormatter.format(preset),
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w700,
                        color: isSelected ? Colors.white : AppColors.textPrimary,
                      ),
                    ),
                    selected: isSelected,
                    selectedColor: AppColors.primary,
                    backgroundColor: AppColors.surfaceVariant,
                    side: BorderSide(
                      color: isSelected ? AppColors.primary : AppColors.border,
                    ),
                    onSelected: (_) => _setPresetAmount(preset),
                  );
                }).toList(),
              ),
              const SizedBox(height: 16),

              // Uang Dibayar Input
              const Text(
                AppStrings.amountPaid,
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                  color: AppColors.textPrimary,
                ),
              ),
              const SizedBox(height: 6),
              TextField(
                controller: _paidController,
                keyboardType: TextInputType.number,
                style: const TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w700,
                  color: AppColors.textPrimary,
                ),
                decoration: InputDecoration(
                  prefixText: 'Rp ',
                  prefixStyle: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w700,
                    color: AppColors.textPrimary,
                  ),
                  hintText: '0',
                  suffixIcon: IconButton(
                    icon: const Icon(Icons.backspace_outlined, size: 20),
                    onPressed: () {
                      _paidController.clear();
                      _onAmountChanged('0');
                    },
                  ),
                ),
                onChanged: _onAmountChanged,
              ),
              const SizedBox(height: 16),

              // Change / Deficit Display
              if (isInsufficient)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                  decoration: BoxDecoration(
                    color: AppColors.dangerLight,
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: AppColors.danger.withOpacity(0.3)),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.error_outline, color: AppColors.danger, size: 20),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          'Uang pembayaran kurang ${CurrencyFormatter.format(deficit)}',
                          style: const TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.w700,
                            color: AppColors.danger,
                          ),
                        ),
                      ),
                    ],
                  ),
                )
              else
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                  decoration: BoxDecoration(
                    color: AppColors.surfaceVariant,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: AppColors.border),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        AppStrings.change,
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                          color: AppColors.textPrimary,
                        ),
                      ),
                      MoneyText(
                        amount: change,
                        fontSize: 18,
                        fontWeight: FontWeight.w800,
                        color: AppColors.primaryDark,
                      ),
                    ],
                  ),
                ),
            ],

            const SizedBox(height: 24),

            // Submit Button
            PrimaryButton(
              text: AppStrings.saveTransaction,
              icon: Icons.check_circle_outline_rounded,
              height: 52,
              isLoading: _isProcessing,
              onPressed: isInsufficient ? null : _processPayment,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMethodTab({
    required String label,
    required IconData icon,
    required bool isSelected,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 12),
        decoration: BoxDecoration(
          color: isSelected ? AppColors.primaryLight : AppColors.surfaceVariant,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected ? AppColors.primary : AppColors.border,
            width: isSelected ? 2 : 1,
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              icon,
              size: 20,
              color: isSelected ? AppColors.primaryDark : AppColors.textSecondary,
            ),
            const SizedBox(width: 8),
            Text(
              label,
              style: TextStyle(
                fontSize: 14,
                fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                color: isSelected ? AppColors.primaryDark : AppColors.textPrimary,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
