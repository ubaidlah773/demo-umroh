import 'package:intl/intl.dart';

class CurrencyFormatter {
  static final NumberFormat _formatter = NumberFormat.currency(
    locale: 'id_ID',
    symbol: 'Rp ',
    decimalDigits: 0,
  );

  static final NumberFormat _numberOnly = NumberFormat('#,###', 'id_ID');

  /// Formats an integer or num into Indonesian Rupiah: e.g. Rp 25.000
  static String format(num? amount) {
    if (amount == null) return 'Rp 0';
    return _formatter.format(amount);
  }

  /// Formats amount without the "Rp " prefix: e.g. 25.000
  static String formatNumberOnly(num? amount) {
    if (amount == null) return '0';
    return _numberOnly.format(amount);
  }

  /// Parses string input into integer Rupiah, ignoring non-digits
  static int parse(String? text) {
    if (text == null || text.trim().isEmpty) return 0;
    final clean = text.replaceAll(RegExp(r'[^0-9]'), '');
    if (clean.isEmpty) return 0;
    return int.tryParse(clean) ?? 0;
  }

  /// Calculates profit percentage
  static double calculateMarginPercent(int sellingPrice, int purchasePrice) {
    if (purchasePrice <= 0) return 0.0;
    return ((sellingPrice - purchasePrice) / purchasePrice) * 100.0;
  }
}
