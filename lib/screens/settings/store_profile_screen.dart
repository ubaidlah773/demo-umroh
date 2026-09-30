import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../core/constants/app_strings.dart';
import '../../providers/settings_provider.dart';
import '../../widgets/primary_button.dart';

class StoreProfileScreen extends StatefulWidget {
  const StoreProfileScreen({super.key});

  @override
  State<StoreProfileScreen> createState() => _StoreProfileScreenState();
}

class _StoreProfileScreenState extends State<StoreProfileScreen> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _nameController;
  late TextEditingController _addressController;
  late TextEditingController _phoneController;
  late TextEditingController _footerController;
  bool _isSaving = false;

  @override
  void initState() {
    super.initState();
    final profile = context.read<SettingsProvider>().storeProfile;
    _nameController = TextEditingController(text: profile.name);
    _addressController = TextEditingController(text: profile.address);
    _phoneController = TextEditingController(text: profile.phone);
    _footerController = TextEditingController(text: profile.receiptFooter);
  }

  @override
  void dispose() {
    _nameController.dispose();
    _addressController.dispose();
    _phoneController.dispose();
    _footerController.dispose();
    super.dispose();
  }

  Future<void> _saveProfile() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isSaving = true);
    final settingsProv = context.read<SettingsProvider>();

    await settingsProv.updateProfile(
      name: _nameController.text.trim(),
      address: _addressController.text.trim(),
      phone: _phoneController.text.trim(),
      footer: _footerController.text.trim(),
    );

    setState(() => _isSaving = false);

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Profil warung berhasil diperbarui!'),
          backgroundColor: AppColors.success,
        ),
      );
      Navigator.pop(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(AppStrings.storeProfile, style: TextStyle(fontWeight: FontWeight.w700)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Informasi ini akan dicetak pada kepala struk transaksi penjualan kasir.',
                style: TextStyle(fontSize: 13, color: AppColors.textSecondary),
              ),
              const SizedBox(height: 16),

              const Text(AppStrings.storeName, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700)),
              const SizedBox(height: 6),
              TextFormField(
                controller: _nameController,
                decoration: const InputDecoration(
                  hintText: 'Contoh: Warung Makmur Barokah',
                  prefixIcon: Icon(Icons.storefront_outlined),
                ),
                validator: (val) => val == null || val.trim().isEmpty ? 'Nama warung wajib diisi' : null,
              ),
              const SizedBox(height: 16),

              const Text(AppStrings.storeAddress, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700)),
              const SizedBox(height: 6),
              TextFormField(
                controller: _addressController,
                decoration: const InputDecoration(
                  hintText: 'Contoh: Jl. Mawar No. 10, RT 02/04',
                  prefixIcon: Icon(Icons.location_on_outlined),
                ),
              ),
              const SizedBox(height: 16),

              const Text(AppStrings.storePhone, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700)),
              const SizedBox(height: 6),
              TextFormField(
                controller: _phoneController,
                keyboardType: TextInputType.phone,
                decoration: const InputDecoration(
                  hintText: 'Contoh: 081234567890',
                  prefixIcon: Icon(Icons.phone_outlined),
                ),
              ),
              const SizedBox(height: 16),

              const Text(AppStrings.receiptFooter, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700)),
              const SizedBox(height: 6),
              TextFormField(
                controller: _footerController,
                decoration: const InputDecoration(
                  hintText: 'Contoh: Terima kasih atas kunjungan Anda! 🙏',
                  prefixIcon: Icon(Icons.format_quote_outlined),
                ),
              ),
              const SizedBox(height: 32),

              PrimaryButton(
                text: 'Simpan Profil Warung',
                icon: Icons.check,
                isLoading: _isSaving,
                onPressed: _saveProfile,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
