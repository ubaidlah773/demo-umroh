import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../core/constants/app_strings.dart';
import '../../core/utils/currency_formatter.dart';
import '../../core/utils/date_formatter.dart';
import '../../models/product_model.dart';
import '../../models/purchase_detail_model.dart';
import '../../providers/product_provider.dart';
import '../../providers/purchase_provider.dart';
import '../../widgets/app_card.dart';
import '../../widgets/money_text.dart';
import '../../widgets/primary_button.dart';
import 'suppliers_screen.dart';

class AddPurchaseScreen extends StatefulWidget {
  const AddPurchaseScreen({super.key});

  @override
  State<AddPurchaseScreen> createState() => _AddPurchaseScreenState();
}

class _AddPurchaseScreenState extends State<AddPurchaseScreen> {
  int? _selectedSupplierId;
  DateTime _purchaseDate = DateTime.now();
  final TextEditingController _notesController = TextEditingController();

  final List<PurchaseDetailModel> _items = [];
  bool _isSaving = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<PurchaseProvider>().loadSuppliers();
      context.read<ProductProvider>().loadProducts();
    });
  }

  @override
  void dispose() {
    _notesController.dispose();
    super.dispose();
  }

  int get _grandTotal => _items.fold(0, (sum, i) => sum + i.subtotal);

  void _showAddItemDialog() {
    final prodProv = context.read<ProductProvider>();
    final products = prodProv.products;

    if (products.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Belum ada data barang. Silakan tambahkan barang terlebih dahulu.')),
      );
      return;
    }

    ProductModel selectedProduct = products.first;
    final qtyController = TextEditingController(text: '10');
    final priceController = TextEditingController(
      text: CurrencyFormatter.formatNumberOnly(selectedProduct.purchasePrice),
    );

    showDialog(
      context: context,
      builder: (ctx) => StatefulBuilder(
        builder: (context, setModalState) {
          final qty = int.tryParse(qtyController.text) ?? 0;
          final price = CurrencyFormatter.parse(priceController.text);
          final subtotal = qty * price;

          return AlertDialog(
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            title: const Text('Tambah Barang Kulakan', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
            content: SingleChildScrollView(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Pilih Barang', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700)),
                  const SizedBox(height: 4),
                  DropdownButtonFormField<int>(
                    value: selectedProduct.id,
                    isExpanded: true,
                    items: products.map((p) {
                      return DropdownMenuItem<int>(
                        value: p.id,
                        child: Text('${p.name} (Stok: ${p.stock})', maxLines: 1, overflow: TextOverflow.ellipsis),
                      );
                    }).toList(),
                    onChanged: (val) {
                      final found = products.firstWhere((p) => p.id == val);
                      setModalState(() {
                        selectedProduct = found;
                        priceController.text = CurrencyFormatter.formatNumberOnly(found.purchasePrice);
                      });
                    },
                  ),
                  const SizedBox(height: 12),

                  Row(
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text('Jumlah', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700)),
                            const SizedBox(height: 4),
                            TextField(
                              controller: qtyController,
                              keyboardType: TextInputType.number,
                              decoration: InputDecoration(
                                suffixText: selectedProduct.unitName ?? 'pcs',
                              ),
                              onChanged: (_) => setModalState(() {}),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text('Harga Modal', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700)),
                            const SizedBox(height: 4),
                            TextField(
                              controller: priceController,
                              keyboardType: TextInputType.number,
                              decoration: const InputDecoration(prefixText: 'Rp '),
                              onChanged: (_) => setModalState(() {}),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 14),

                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: AppColors.primaryContainer,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text('Subtotal:', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                        MoneyText(
                          amount: subtotal,
                          fontSize: 15,
                          fontWeight: FontWeight.w800,
                          color: AppColors.primaryDark,
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            actions: [
              TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('Batal')),
              ElevatedButton(
                style: ElevatedButton.styleFrom(backgroundColor: AppColors.primary, foregroundColor: Colors.white),
                onPressed: () {
                  if (qty <= 0) return;
                  setState(() {
                    _items.add(
                      PurchaseDetailModel(
                        productId: selectedProduct.id!,
                        productName: selectedProduct.name,
                        unitName: selectedProduct.unitName,
                        quantity: qty,
                        purchasePrice: price,
                        subtotal: subtotal,
                      ),
                    );
                  });
                  Navigator.pop(ctx);
                },
                child: const Text('Tambahkan'),
              ),
            ],
          );
        },
      ),
    );
  }

  Future<void> _savePurchase() async {
    if (_items.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Pilih minimal 1 barang pembelian.'), backgroundColor: AppColors.danger),
      );
      return;
    }

    setState(() => _isSaving = true);

    final purchaseProv = context.read<PurchaseProvider>();
    final prodProv = context.read<ProductProvider>();

    final success = await purchaseProv.addPurchase(
      supplierId: _selectedSupplierId,
      date: _purchaseDate,
      items: _items,
      notes: _notesController.text.trim(),
    );

    setState(() => _isSaving = false);

    if (mounted) {
      if (success) {
        await prodProv.loadProducts();
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Pembelian berhasil disimpan! Stok barang otomatis bertambah.'),
            backgroundColor: AppColors.success,
          ),
        );
        Navigator.pop(context);
      } else {
        final err = purchaseProv.errorMessage ?? 'Gagal menyimpan pembelian.';
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(err), backgroundColor: AppColors.danger),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final purchaseProv = context.watch<PurchaseProvider>();
    final suppliers = purchaseProv.suppliers;

    return Scaffold(
      appBar: AppBar(
        title: const Text(AppStrings.addPurchase, style: TextStyle(fontWeight: FontWeight.w700)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Supplier Selection Row
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  AppStrings.supplier,
                  style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700),
                ),
                InkWell(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (_) => const SuppliersScreen()),
                    );
                  },
                  child: const Text(
                    '+ Kelola Supplier',
                    style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: AppColors.primary),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 6),
            DropdownButtonFormField<int>(
              value: _selectedSupplierId,
              isExpanded: true,
              hint: const Text('Pilih Supplier (Opsional)'),
              items: [
                const DropdownMenuItem<int>(value: null, child: Text('Tanpa Supplier / Belanja Langsung')),
                ...suppliers.map((s) {
                  return DropdownMenuItem<int>(value: s.id, child: Text(s.name));
                }),
              ],
              onChanged: (val) => setState(() => _selectedSupplierId = val),
            ),
            const SizedBox(height: 16),

            // Date Picker
            const Text(
              AppStrings.purchaseDate,
              style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 6),
            InkWell(
              onTap: () async {
                final picked = await showDatePicker(
                  context: context,
                  initialDate: _purchaseDate,
                  firstDate: DateTime(2020),
                  lastDate: DateTime.now().add(const Duration(days: 30)),
                );
                if (picked != null) {
                  setState(() => _purchaseDate = picked);
                }
              },
              borderRadius: BorderRadius.circular(12),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppColors.border),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      DateFormatter.formatFull(_purchaseDate),
                      style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
                    ),
                    const Icon(Icons.calendar_today_rounded, size: 18, color: AppColors.primary),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 20),

            // Items List Section
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Daftar Barang Dibeli (${_items.length})',
                  style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w700),
                ),
                ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.primaryContainer,
                    foregroundColor: AppColors.primaryDark,
                    elevation: 0,
                    minimumSize: const Size(0, 36),
                    padding: const EdgeInsets.symmetric(horizontal: 12),
                  ),
                  icon: const Icon(Icons.add, size: 16),
                  label: const Text('+ Barang', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700)),
                  onPressed: _showAddItemDialog,
                ),
              ],
            ),
            const SizedBox(height: 10),

            if (_items.isEmpty)
              Container(
                padding: const EdgeInsets.all(24),
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: AppColors.surfaceVariant,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppColors.border),
                ),
                child: const Column(
                  children: [
                    Icon(Icons.add_shopping_cart_rounded, color: AppColors.textTertiary, size: 36),
                    SizedBox(height: 8),
                    Text(
                      'Belum ada barang yang ditambahkan',
                      style: TextStyle(color: AppColors.textSecondary, fontSize: 13),
                    ),
                  ],
                ),
              )
            else
              ListView.separated(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: _items.length,
                separatorBuilder: (_, __) => const SizedBox(height: 8),
                itemBuilder: (context, index) {
                  final item = _items[index];
                  return AppCard(
                    padding: const EdgeInsets.all(12),
                    child: Row(
                      children: [
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                item.productName ?? 'Barang',
                                style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700),
                              ),
                              const SizedBox(height: 2),
                              Text(
                                '${item.quantity} ${item.unitName ?? 'pcs'} x ${CurrencyFormatter.format(item.purchasePrice)}',
                                style: const TextStyle(fontSize: 12, color: AppColors.textSecondary),
                              ),
                            ],
                          ),
                        ),
                        MoneyText(
                          amount: item.subtotal,
                          fontSize: 14,
                          fontWeight: FontWeight.w800,
                          color: AppColors.primaryDark,
                        ),
                        IconButton(
                          icon: const Icon(Icons.delete_outline, size: 18, color: AppColors.danger),
                          onPressed: () {
                            setState(() => _items.removeAt(index));
                          },
                        ),
                      ],
                    ),
                  );
                },
              ),
            const SizedBox(height: 16),

            // Notes
            const Text('Catatan (Opsional)', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700)),
            const SizedBox(height: 6),
            TextField(
              controller: _notesController,
              decoration: const InputDecoration(hintText: 'Contoh: Kulakan mingguan dari agen'),
            ),
            const SizedBox(height: 20),

            // Grand Total Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.primaryLight.withOpacity(0.5),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: AppColors.primary.withOpacity(0.3)),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Total Pembelian:', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700)),
                  MoneyText(
                    amount: _grandTotal,
                    fontSize: 20,
                    fontWeight: FontWeight.w800,
                    color: AppColors.primaryDark,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Save CTA
            PrimaryButton(
              text: 'Simpan Pembelian & Tambah Stok',
              icon: Icons.check_circle_rounded,
              isLoading: _isSaving,
              onPressed: _savePurchase,
            ),
          ],
        ),
      ),
    );
  }
}
