import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../core/constants/app_constants.dart';
import '../../core/constants/app_strings.dart';
import '../../providers/app_provider.dart';
import '../../providers/product_provider.dart';
import '../../providers/report_provider.dart';
import '../../providers/settings_provider.dart';
import '../../widgets/app_card.dart';
import '../../widgets/confirmation_dialog.dart';
import '../purchases/suppliers_screen.dart';
import 'backup_restore_screen.dart';
import 'store_profile_screen.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<SettingsProvider>().init();
    });
  }

  void _confirmReloadSampleData() async {
    final confirmed = await ConfirmationDialog.show(
      context,
      title: 'Muat Data Sampel',
      message: 'Ini akan mereset database dan memuat contoh barang warung Indonesia (Indomie, Aqua, Minyak, Telur, Kopi, dsb). Seluruh data transaksi saat ini akan digantikan. Lanjutkan?',
      confirmText: 'Muat Sampel',
      cancelText: 'Batal',
      isDestructive: true,
    );

    if (confirmed == true && mounted) {
      await context.read<SettingsProvider>().reloadSampleData();
      await context.read<ProductProvider>().init();
      await context.read<ReportProvider>().loadDashboardSummary();

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Data sampel warung berhasil dimuat!'),
            backgroundColor: AppColors.success,
          ),
        );
      }
    }
  }

  void _confirmClearTransactions() async {
    final confirmed = await ConfirmationDialog.show(
      context,
      title: 'Hapus Semua Transaksi',
      message: 'Seluruh riwayat transaksi penjualan, pembelian, dan mutasi stok akan dihapus. Daftar barang master tidak akan dihapus. Tindakan ini tidak dapat dibatalkan. Lanjutkan?',
      confirmText: 'Hapus Transaksi',
      cancelText: 'Batal',
      isDestructive: true,
    );

    if (confirmed == true && mounted) {
      await context.read<SettingsProvider>().clearTransactions();
      await context.read<ReportProvider>().loadDashboardSummary();

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Semua riwayat transaksi telah dibersihkan.'),
            backgroundColor: AppColors.primaryDark,
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final settingsProv = context.watch<SettingsProvider>();
    final profile = settingsProv.storeProfile;
    final stats = settingsProv.stats;
    final appProv = context.watch<AppProvider>();

    return Scaffold(
      appBar: AppBar(
        title: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              AppStrings.navSettings,
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: AppColors.textPrimary),
            ),
            Text(
              'Warung Mak Wi',
              style: TextStyle(fontSize: 12, color: AppColors.textSecondary, fontWeight: FontWeight.w500),
            ),
          ],
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Store Profile Card
            AppCard(
              padding: const EdgeInsets.all(16),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => const StoreProfileScreen()),
                );
              },
              child: Row(
                children: [
                  Container(
                    width: 52,
                    height: 52,
                    decoration: BoxDecoration(
                      color: AppColors.primaryContainer,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Icon(Icons.storefront_rounded, color: AppColors.primaryDark, size: 28),
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          profile.name,
                          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          profile.address,
                          style: const TextStyle(fontSize: 12, color: AppColors.textSecondary),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                        if (profile.phone.isNotEmpty) ...[
                          const SizedBox(height: 2),
                          Text(
                            profile.phone,
                            style: const TextStyle(fontSize: 12, color: AppColors.textTertiary),
                          ),
                        ],
                      ],
                    ),
                  ),
                  const Icon(Icons.chevron_right, color: AppColors.textTertiary),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Management Section
            const Text(
              'Pengelolaan Warung',
              style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: AppColors.textSecondary),
            ),
            const SizedBox(height: 8),

            AppCard(
              padding: EdgeInsets.zero,
              child: Column(
                children: [
                  _buildSettingTile(
                    icon: Icons.storefront_outlined,
                    iconColor: AppColors.primary,
                    title: 'Profil & Header Struk',
                    subtitle: 'Ubah nama warung, alamat, dan nomor HP',
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (_) => const StoreProfileScreen()),
                      );
                    },
                  ),
                  const Divider(height: 1, color: AppColors.border),
                  _buildSettingTile(
                    icon: Icons.local_shipping_outlined,
                    iconColor: const Color(0xFF8B5CF6),
                    title: 'Daftar Supplier',
                    subtitle: 'Kelola pemasok sembako & kulakan',
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (_) => const SuppliersScreen()),
                      );
                    },
                  ),
                  const Divider(height: 1, color: AppColors.border),
                  _buildSettingTile(
                    icon: Icons.backup_rounded,
                    iconColor: AppColors.tertiary,
                    title: 'Backup & Restore Data',
                    subtitle: 'Cadangkan dan pulihkan database secara offline',
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (_) => const BackupRestoreScreen()),
                      );
                    },
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Database Statistics
            const Text(
              AppStrings.databaseInfo,
              style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: AppColors.textSecondary),
            ),
            const SizedBox(height: 8),

            AppCard(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  _buildStatRow('Total Master Barang', '${stats.productCount} barang'),
                  const Divider(height: 16, color: AppColors.border),
                  _buildStatRow('Total Transaksi Penjualan', '${stats.transactionCount} transaksi'),
                  const Divider(height: 16, color: AppColors.border),
                  _buildStatRow('Total Transaksi Pembelian', '${stats.purchaseCount} pembelian'),
                  const Divider(height: 16, color: AppColors.border),
                  _buildStatRow('Total Data Supplier', '${stats.supplierCount} supplier'),
                  const Divider(height: 16, color: AppColors.border),
                  _buildStatRow('Ukuran Database Lokal', '${stats.databaseSizeKb} KB'),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Data Maintenance (Sample Data & Reset)
            const Text(
              'Pemeliharaan Data',
              style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: AppColors.textSecondary),
            ),
            const SizedBox(height: 8),

            AppCard(
              padding: EdgeInsets.zero,
              child: Column(
                children: [
                  _buildSettingTile(
                    icon: Icons.auto_awesome_rounded,
                    iconColor: AppColors.secondary,
                    title: AppStrings.loadSampleData,
                    subtitle: 'Muat produk contoh (Indomie, Aqua, Sembako, dsb)',
                    onTap: _confirmReloadSampleData,
                  ),
                  const Divider(height: 1, color: AppColors.border),
                  _buildSettingTile(
                    icon: Icons.delete_sweep_rounded,
                    iconColor: AppColors.danger,
                    title: 'Bersihkan Riwayat Transaksi',
                    subtitle: 'Hapus data penjualan dan pembelian saja',
                    onTap: _confirmClearTransactions,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // About Warung Pintar
            const Text(
              AppStrings.aboutApp,
              style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: AppColors.textSecondary),
            ),
            const SizedBox(height: 8),

            AppCard(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: AppColors.primaryLight,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: const Icon(Icons.store, color: AppColors.primaryDark, size: 24),
                      ),
                      const SizedBox(width: 12),
                      const Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            AppConstants.appName,
                            style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800),
                          ),
                          Text(
                            'Versi ${AppConstants.appVersion} • 100% Offline',
                            style: TextStyle(fontSize: 12, color: AppColors.textSecondary),
                          ),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    'Warung Mak Wi adalah aplikasi kasir (POS) dan pembukuan offline tanpa internet yang dirancang khusus untuk mempermudah pemilik warung dan toko kelontong di Indonesia mengelola barang, stok, penjualan, pembelian, serta menghitung laba bersih otomatis.',
                    style: TextStyle(fontSize: 12, color: AppColors.textSecondary, height: 1.4),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  Widget _buildSettingTile({
    required IconData icon,
    required Color iconColor,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
  }) {
    return ListTile(
      leading: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: iconColor.withOpacity(0.12),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Icon(icon, color: iconColor, size: 22),
      ),
      title: Text(
        title,
        style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700),
      ),
      subtitle: Text(
        subtitle,
        style: const TextStyle(fontSize: 12, color: AppColors.textSecondary),
      ),
      trailing: const Icon(Icons.chevron_right, size: 20, color: AppColors.textTertiary),
      onTap: onTap,
    );
  }

  Widget _buildStatRow(String label, String value) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          label,
          style: const TextStyle(fontSize: 13, color: AppColors.textSecondary),
        ),
        Text(
          value,
          style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: AppColors.textPrimary),
        ),
      ],
    );
  }
}
