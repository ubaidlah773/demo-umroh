import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../core/constants/app_strings.dart';
import '../../providers/product_provider.dart';
import '../../providers/report_provider.dart';
import '../../providers/settings_provider.dart';
import '../../widgets/app_card.dart';
import '../../widgets/confirmation_dialog.dart';
import '../../widgets/primary_button.dart';
import '../../widgets/secondary_button.dart';

class BackupRestoreScreen extends StatefulWidget {
  const BackupRestoreScreen({super.key});

  @override
  State<BackupRestoreScreen> createState() => _BackupRestoreScreenState();
}

class _BackupRestoreScreenState extends State<BackupRestoreScreen> {
  final TextEditingController _restoreJsonController = TextEditingController();
  bool _isProcessing = false;

  @override
  void dispose() {
    _restoreJsonController.dispose();
    super.dispose();
  }

  Future<void> _handleExportFile() async {
    setState(() => _isProcessing = true);
    final settingsProv = context.read<SettingsProvider>();
    final result = await settingsProv.exportBackup();
    setState(() => _isProcessing = false);

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(result.message),
          backgroundColor: result.isSuccess ? AppColors.success : AppColors.danger,
        ),
      );
    }
  }

  Future<void> _handleCopyJson() async {
    setState(() => _isProcessing = true);
    final settingsProv = context.read<SettingsProvider>();
    final json = await settingsProv.getBackupJsonString();
    await Clipboard.setData(ClipboardData(text: json));
    setState(() => _isProcessing = false);

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Seluruh data database berhasil disalin dalam format JSON ke clipboard!'),
          backgroundColor: AppColors.primaryDark,
        ),
      );
    }
  }

  Future<void> _handleRestore() async {
    final text = _restoreJsonController.text.trim();
    if (text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Tempelkan teks JSON backup terlebih dahulu.')),
      );
      return;
    }

    final confirmed = await ConfirmationDialog.show(
      context,
      title: 'Konfirmasi Restore Data',
      message: 'Data saat ini akan diganti dengan data backup. Lanjutkan?',
      confirmText: 'Ya, Pulihkan',
      cancelText: 'Batal',
      isDestructive: true,
    );

    if (confirmed != true) return;

    setState(() => _isProcessing = true);
    final settingsProv = context.read<SettingsProvider>();
    final result = await settingsProv.restoreBackup(text);
    setState(() => _isProcessing = false);

    if (mounted) {
      if (result.isSuccess) {
        // Refresh all providers
        await context.read<ProductProvider>().init();
        await context.read<ReportProvider>().loadDashboardSummary();
        _restoreJsonController.clear();
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(result.message),
            backgroundColor: AppColors.success,
          ),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(result.message),
            backgroundColor: AppColors.danger,
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Backup & Restore Data', style: TextStyle(fontWeight: FontWeight.w700)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Backup Section Card
            AppCard(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Row(
                    children: [
                      Icon(Icons.cloud_upload_outlined, color: AppColors.primary, size: 24),
                      SizedBox(width: 10),
                      Text(
                        '1. Cadangkan Data (Backup)',
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Simpan semua produk, riwayat transaksi kasir, pembelian, data supplier, dan mutasi stok ke penyimpanan lokal atau salin teks data cadangan.',
                    style: TextStyle(fontSize: 13, color: AppColors.textSecondary, height: 1.4),
                  ),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      Expanded(
                        child: PrimaryButton(
                          text: 'Simpan ke File',
                          icon: Icons.save_alt_rounded,
                          height: 46,
                          isLoading: _isProcessing,
                          onPressed: _handleExportFile,
                        ),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: SecondaryButton(
                          text: 'Salin Teks JSON',
                          icon: Icons.copy_rounded,
                          height: 46,
                          onPressed: _handleCopyJson,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Restore Section Card
            AppCard(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Row(
                    children: [
                      Icon(Icons.settings_backup_restore_rounded, color: AppColors.secondary, size: 24),
                      SizedBox(width: 10),
                      Text(
                        '2. Pulihkan Data (Restore)',
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Tempelkan teks JSON backup pada kolom di bawah ini untuk memulihkan seluruh data warung.',
                    style: TextStyle(fontSize: 13, color: AppColors.textSecondary, height: 1.4),
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _restoreJsonController,
                    maxLines: 5,
                    style: const TextStyle(fontSize: 12, fontFamily: 'monospace'),
                    decoration: InputDecoration(
                      hintText: 'Tempelkan teks data JSON backup di sini...',
                      suffixIcon: IconButton(
                        icon: const Icon(Icons.paste_rounded, size: 20, color: AppColors.primary),
                        tooltip: 'Tempel dari Clipboard',
                        onPressed: () async {
                          final data = await Clipboard.getData('text/plain');
                          if (data != null && data.text != null) {
                            setState(() {
                              _restoreJsonController.text = data.text!;
                            });
                          }
                        },
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  PrimaryButton(
                    text: 'Pulihkan Data Sekarang',
                    icon: Icons.restore_rounded,
                    backgroundColor: AppColors.secondary,
                    height: 48,
                    isLoading: _isProcessing,
                    onPressed: _handleRestore,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
