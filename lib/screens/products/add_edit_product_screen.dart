import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../core/constants/app_constants.dart';
import '../../core/constants/app_strings.dart';
import '../../core/utils/currency_formatter.dart';
import '../../models/product_model.dart';
import '../../providers/product_provider.dart';
import '../../widgets/confirmation_dialog.dart';
import '../../widgets/money_text.dart';
import '../../widgets/primary_button.dart';

class AddEditProductScreen extends StatefulWidget {
  final ProductModel? product;

  const AddEditProductScreen({super.key, this.product});

  @override
  State<AddEditProductScreen> createState() => _AddEditProductScreenState();
}

class _AddEditProductScreenState extends State<AddEditProductScreen> {
  final _formKey = GlobalKey<FormState>();

  late TextEditingController _nameController;
  late TextEditingController _purchasePriceController;
  late TextEditingController _sellingPriceController;
  late TextEditingController _stockController;
  late TextEditingController _minimumStockController;
  late TextEditingController _barcodeController;

  int? _selectedCategoryId;
  int? _selectedUnitId;
  bool _isSaving = false;

  bool get isEditing => widget.product != null;

  @override
  void initState() {
    super.initState();
    final p = widget.product;
    _nameController = TextEditingController(text: p?.name ?? '');
    _purchasePriceController = TextEditingController(
      text: p != null ? CurrencyFormatter.formatNumberOnly(p.purchasePrice) : '',
    );
    _sellingPriceController = TextEditingController(
      text: p != null ? CurrencyFormatter.formatNumberOnly(p.sellingPrice) : '',
    );
    _stockController = TextEditingController(
      text: p != null ? '${p.stock}' : '10',
    );
    _minimumStockController = TextEditingController(
      text: p != null ? '${p.minimumStock}' : '${AppConstants.defaultMinimumStock}',
    );
    _barcodeController = TextEditingController(text: p?.barcode ?? '');

    _selectedCategoryId = p?.categoryId;
    _selectedUnitId = p?.unitId;
  }

  @override
  void dispose() {
    _nameController.dispose();
    _purchasePriceController.dispose();
    _sellingPriceController.dispose();
    _stockController.dispose();
    _minimumStockController.dispose();
    _barcodeController.dispose();
    super.dispose();
  }

  void _showAddCategoryDialog() {
    final catController = TextEditingController();
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: const Text('Tambah Kategori Baru'),
        content: TextField(
          controller: catController,
          autofocus: true,
          decoration: const InputDecoration(hintText: 'Nama kategori baru'),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('Batal')),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.primary, foregroundColor: Colors.white),
            onPressed: () async {
              if (catController.text.trim().isNotEmpty) {
                await context.read<ProductProvider>().addCategory(catController.text.trim());
                Navigator.pop(ctx);
              }
            },
            child: const Text('Tambah'),
          ),
        ],
      ),
    );
  }

  Future<void> _saveProduct() async {
    if (!_formKey.currentState!.validate()) return;

    final modal = CurrencyFormatter.parse(_purchasePriceController.text);
    final jual = CurrencyFormatter.parse(_sellingPriceController.text);

    // Validation: Jual < Modal warning
    if (jual < modal) {
      final proceed = await ConfirmationDialog.show(
        context,
        title: 'Harga Jual Lebih Rendah',
        message: 'Harga jual (${CurrencyFormatter.format(jual)}) lebih rendah dari harga modal (${CurrencyFormatter.format(modal)}). Anda akan mengalami kerugian pada setiap penjualan. Tetap lanjutkan?',
        confirmText: 'Tetap Simpan',
        cancelText: 'Ubah Harga',
        isDestructive: true,
      );
      if (proceed != true) return;
    }

    setState(() => _isSaving = true);

    final prodProv = context.read<ProductProvider>();
    final now = DateTime.now().toIso8601String();

    final stock = int.tryParse(_stockController.text) ?? 0;
    final minStock = int.tryParse(_minimumStockController.text) ?? AppConstants.defaultMinimumStock;

    try {
      if (isEditing) {
        final updated = widget.product!.copyWith(
          name: _nameController.text.trim(),
          categoryId: _selectedCategoryId,
          unitId: _selectedUnitId,
          barcode: _barcodeController.text.trim(),
          purchasePrice: modal,
          sellingPrice: jual,
          stock: stock,
          minimumStock: minStock,
        );
        await prodProv.updateProduct(updated);
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Barang berhasil diperbarui!'), backgroundColor: AppColors.success),
          );
        }
      } else {
        final newProd = ProductModel(
          name: _nameController.text.trim(),
          categoryId: _selectedCategoryId,
          unitId: _selectedUnitId,
          barcode: _barcodeController.text.trim(),
          purchasePrice: modal,
          sellingPrice: jual,
          stock: stock,
          minimumStock: minStock,
          createdAt: now,
          updatedAt: now,
        );
        await prodProv.addProduct(newProd);
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Barang baru berhasil ditambahkan!'), backgroundColor: AppColors.success),
          );
        }
      }

      if (mounted) Navigator.pop(context);
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Gagal menyimpan: ${e.toString()}'), backgroundColor: AppColors.danger),
        );
      }
    } finally {
      if (mounted) setState(() => _isSaving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final prodProv = context.watch<ProductProvider>();
    final categories = prodProv.categories;
    final units = prodProv.units;

    final modal = CurrencyFormatter.parse(_purchasePriceController.text);
    final jual = CurrencyFormatter.parse(_sellingPriceController.text);
    final margin = jual - modal;
    final marginPercent = CurrencyFormatter.calculateMarginPercent(jual, modal);

    return Scaffold(
      appBar: AppBar(
        title: Text(isEditing ? AppStrings.editProduct : AppStrings.addProduct),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Product Name
              const Text(
                AppStrings.productName,
                style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700),
              ),
              const SizedBox(height: 6),
              TextFormField(
                controller: _nameController,
                textCapitalization: TextCapitalization.words,
                decoration: const InputDecoration(
                  hintText: 'Contoh: Indomie Goreng Spesial',
                  prefixIcon: Icon(Icons.inventory_2_outlined, size: 20),
                ),
                validator: (val) {
                  if (val == null || val.trim().isEmpty) {
                    return 'Nama barang wajib diisi';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),

              // Category & Unit Row
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Category Dropdown
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text(
                              AppStrings.category,
                              style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700),
                            ),
                            InkWell(
                              onTap: _showAddCategoryDialog,
                              child: const Text(
                                '+ Baru',
                                style: TextStyle(
                                  fontSize: 12,
                                  color: AppColors.primary,
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 6),
                        DropdownButtonFormField<int>(
                          value: _selectedCategoryId,
                          hint: const Text('Pilih Kategori'),
                          isExpanded: true,
                          items: categories.map((cat) {
                            return DropdownMenuItem<int>(
                              value: cat.id,
                              child: Text(cat.name, maxLines: 1, overflow: TextOverflow.ellipsis),
                            );
                          }).toList(),
                          onChanged: (val) => setState(() => _selectedCategoryId = val),
                          decoration: const InputDecoration(
                            contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 14),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 12),

                  // Unit Dropdown
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          AppStrings.unit,
                          style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700),
                        ),
                        const SizedBox(height: 6),
                        DropdownButtonFormField<int>(
                          value: _selectedUnitId,
                          hint: const Text('Satuan'),
                          isExpanded: true,
                          items: units.map((u) {
                            return DropdownMenuItem<int>(
                              value: u.id,
                              child: Text(u.name),
                            );
                          }).toList(),
                          onChanged: (val) => setState(() => _selectedUnitId = val),
                          decoration: const InputDecoration(
                            contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 14),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),

              // Purchase Price (Modal) & Selling Price (Jual)
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          AppStrings.purchasePrice,
                          style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700),
                        ),
                        const SizedBox(height: 6),
                        TextFormField(
                          controller: _purchasePriceController,
                          keyboardType: TextInputType.number,
                          decoration: const InputDecoration(
                            prefixText: 'Rp ',
                            hintText: '0',
                          ),
                          onChanged: (_) => setState(() {}),
                          validator: (val) {
                            if (val == null || val.trim().isEmpty) return 'Wajib diisi';
                            return null;
                          },
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          AppStrings.sellingPrice,
                          style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700),
                        ),
                        const SizedBox(height: 6),
                        TextFormField(
                          controller: _sellingPriceController,
                          keyboardType: TextInputType.number,
                          decoration: const InputDecoration(
                            prefixText: 'Rp ',
                            hintText: '0',
                          ),
                          onChanged: (_) => setState(() {}),
                          validator: (val) {
                            if (val == null || val.trim().isEmpty) return 'Wajib diisi';
                            return null;
                          },
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),

              // Live Profit Margin Card
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                decoration: BoxDecoration(
                  color: margin >= 0 ? AppColors.primaryContainer : AppColors.dangerLight,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: margin >= 0 ? AppColors.primary.withOpacity(0.3) : AppColors.danger.withOpacity(0.3),
                  ),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Icon(
                          margin >= 0 ? Icons.trending_up : Icons.trending_down,
                          color: margin >= 0 ? AppColors.primaryDark : AppColors.danger,
                          size: 20,
                        ),
                        const SizedBox(width: 8),
                        Text(
                          AppStrings.margin,
                          style: TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.w600,
                            color: margin >= 0 ? AppColors.primaryDark : AppColors.danger,
                          ),
                        ),
                      ],
                    ),
                    Text(
                      '${margin >= 0 ? '+' : ''}${CurrencyFormatter.format(margin)} (${marginPercent.toStringAsFixed(1)}%)',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w800,
                        color: margin >= 0 ? AppColors.primaryDark : AppColors.danger,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // Initial Stock & Minimum Stock
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          isEditing ? AppStrings.currentStock : AppStrings.initialStock,
                          style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700),
                        ),
                        const SizedBox(height: 6),
                        TextFormField(
                          controller: _stockController,
                          keyboardType: TextInputType.number,
                          decoration: const InputDecoration(
                            hintText: '0',
                            prefixIcon: Icon(Icons.layers_outlined, size: 20),
                          ),
                          validator: (val) {
                            if (val == null || val.trim().isEmpty) return 'Wajib diisi';
                            return null;
                          },
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          AppStrings.minimumStock,
                          style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700),
                        ),
                        const SizedBox(height: 6),
                        TextFormField(
                          controller: _minimumStockController,
                          keyboardType: TextInputType.number,
                          decoration: const InputDecoration(
                            hintText: '5',
                            prefixIcon: Icon(Icons.warning_amber_rounded, size: 20),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),

              // Barcode (Optional)
              const Text(
                AppStrings.barcode,
                style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700),
              ),
              const SizedBox(height: 6),
              TextFormField(
                controller: _barcodeController,
                keyboardType: TextInputType.text,
                decoration: InputDecoration(
                  hintText: 'Ketik atau scan barcode',
                  prefixIcon: const Icon(Icons.qr_code_rounded, size: 20),
                  suffixIcon: _barcodeController.text.isNotEmpty
                      ? IconButton(
                          icon: const Icon(Icons.clear, size: 18),
                          onPressed: () {
                            _barcodeController.clear();
                            setState(() {});
                          },
                        )
                      : null,
                ),
              ),
              const SizedBox(height: 32),

              // Save Button
              PrimaryButton(
                text: isEditing ? 'Simpan Perubahan' : 'Simpan Barang Baru',
                icon: Icons.check_circle_rounded,
                isLoading: _isSaving,
                onPressed: _saveProduct,
              ),
              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }
}
