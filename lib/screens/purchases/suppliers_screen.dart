import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../models/supplier_model.dart';
import '../../providers/purchase_provider.dart';
import '../../widgets/app_card.dart';
import '../../widgets/confirmation_dialog.dart';
import '../../widgets/empty_state.dart';
import '../../widgets/primary_button.dart';

class SuppliersScreen extends StatefulWidget {
  const SuppliersScreen({super.key});

  @override
  State<SuppliersScreen> createState() => _SuppliersScreenState();
}

class _SuppliersScreenState extends State<SuppliersScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<PurchaseProvider>().loadSuppliers();
    });
  }

  void _showAddEditSupplierDialog([SupplierModel? supplier]) {
    final nameController = TextEditingController(text: supplier?.name ?? '');
    final phoneController = TextEditingController(text: supplier?.phone ?? '');
    final addressController = TextEditingController(text: supplier?.address ?? '');
    final notesController = TextEditingController(text: supplier?.notes ?? '');

    final isEdit = supplier != null;

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: Text(isEdit ? 'Edit Supplier' : 'Tambah Supplier Baru'),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: nameController,
                decoration: const InputDecoration(labelText: 'Nama Supplier *'),
              ),
              const SizedBox(height: 10),
              TextField(
                controller: phoneController,
                keyboardType: TextInputType.phone,
                decoration: const InputDecoration(labelText: 'Nomor Telepon'),
              ),
              const SizedBox(height: 10),
              TextField(
                controller: addressController,
                decoration: const InputDecoration(labelText: 'Alamat'),
              ),
              const SizedBox(height: 10),
              TextField(
                controller: notesController,
                decoration: const InputDecoration(labelText: 'Catatan'),
              ),
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Batal'),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.primary,
              foregroundColor: Colors.white,
            ),
            onPressed: () async {
              if (nameController.text.trim().isEmpty) return;
              final prov = context.read<PurchaseProvider>();
              if (isEdit) {
                await prov.updateSupplier(
                  supplier.copyWith(
                    name: nameController.text.trim(),
                    phone: phoneController.text.trim(),
                    address: addressController.text.trim(),
                    notes: notesController.text.trim(),
                  ),
                );
              } else {
                await prov.addSupplier(
                  SupplierModel(
                    name: nameController.text.trim(),
                    phone: phoneController.text.trim(),
                    address: addressController.text.trim(),
                    notes: notesController.text.trim(),
                    createdAt: DateTime.now().toIso8601String(),
                  ),
                );
              }
              Navigator.pop(ctx);
            },
            child: const Text('Simpan'),
          ),
        ],
      ),
    );
  }

  void _confirmDeleteSupplier(SupplierModel supplier) async {
    final confirmed = await ConfirmationDialog.show(
      context,
      title: 'Hapus Supplier',
      message: 'Apakah Anda yakin ingin menghapus supplier "${supplier.name}"?',
      confirmText: 'Hapus',
      cancelText: 'Batal',
      isDestructive: true,
    );

    if (confirmed == true && mounted) {
      await context.read<PurchaseProvider>().deleteSupplier(supplier.id!);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Supplier ${supplier.name} berhasil dihapus.'),
            backgroundColor: AppColors.primaryDark,
          ),
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
        title: const Text('Daftar Supplier', style: TextStyle(fontWeight: FontWeight.w700)),
      ),
      body: suppliers.isEmpty
          ? EmptyState(
              icon: Icons.local_shipping_outlined,
              title: 'Belum Ada Supplier',
              message: 'Daftarkan supplier grosir untuk mempermudah pencatatan pembelian barang.',
              actionText: '+ Tambah Supplier',
              onAction: () => _showAddEditSupplierDialog(),
            )
          : ListView.separated(
              padding: const EdgeInsets.fromLTRB(16, 16, 16, 80),
              itemCount: suppliers.length,
              separatorBuilder: (_, __) => const SizedBox(height: 10),
              itemBuilder: (context, index) {
                final s = suppliers[index];
                return AppCard(
                  padding: const EdgeInsets.all(14),
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: const Color(0xFFF3E8FF),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: const Icon(Icons.storefront_rounded, color: Color(0xFF8B5CF6)),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              s.name,
                              style: const TextStyle(
                                fontSize: 15,
                                fontWeight: FontWeight.w700,
                                color: AppColors.textPrimary,
                              ),
                            ),
                            if (s.phone != null && s.phone!.isNotEmpty) ...[
                              const SizedBox(height: 2),
                              Text(
                                s.phone!,
                                style: const TextStyle(fontSize: 12, color: AppColors.textSecondary),
                              ),
                            ],
                            if (s.address != null && s.address!.isNotEmpty) ...[
                              const SizedBox(height: 2),
                              Text(
                                s.address!,
                                style: const TextStyle(fontSize: 12, color: AppColors.textTertiary),
                              ),
                            ],
                          ],
                        ),
                      ),
                      IconButton(
                        icon: const Icon(Icons.edit_outlined, size: 20, color: AppColors.primary),
                        onPressed: () => _showAddEditSupplierDialog(s),
                      ),
                      IconButton(
                        icon: const Icon(Icons.delete_outline, size: 20, color: AppColors.danger),
                        onPressed: () => _confirmDeleteSupplier(s),
                      ),
                    ],
                  ),
                );
              },
            ),
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: AppColors.primary,
        foregroundColor: Colors.white,
        icon: const Icon(Icons.add),
        label: const Text('Tambah Supplier', style: TextStyle(fontWeight: FontWeight.w700)),
        onPressed: () => _showAddEditSupplierDialog(),
      ),
    );
  }
}
