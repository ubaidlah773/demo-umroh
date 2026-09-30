import '../core/utils/currency_formatter.dart';
import '../core/utils/date_formatter.dart';
import '../models/sale_model.dart';
import '../repositories/settings_repository.dart';

class ReceiptService {
  /// Generates clean monospace receipt text suitable for 58mm/80mm thermal printers
  static String generateThermalReceiptText({
    required SaleModel sale,
    required StoreProfile storeProfile,
    int width = 32, // standard 58mm character width
  }) {
    final buffer = StringBuffer();
    final line = '=' * width;
    final dash = '-' * width;

    // Helper to center text
    String center(String text) {
      if (text.length >= width) return text;
      final leftPadding = (width - text.length) ~/ 2;
      return ' ' * leftPadding + text;
    }

    // Helper for 2 column alignment
    String twoColumns(String left, String right) {
      final available = width - right.length;
      if (left.length > available) {
        left = left.substring(0, available > 0 ? available : 0);
      }
      return left.padRight(width - right.length) + right;
    }

    // 1. Header
    buffer.writeln(line);
    buffer.writeln(center(storeProfile.name.toUpperCase()));
    if (storeProfile.address.isNotEmpty) {
      buffer.writeln(center(storeProfile.address));
    }
    if (storeProfile.phone.isNotEmpty) {
      buffer.writeln(center('Telp: ${storeProfile.phone}'));
    }
    buffer.writeln(line);

    // 2. Metadata
    final date = DateTime.tryParse(sale.date) ?? DateTime.now();
    buffer.writeln(twoColumns('No: ${sale.invoiceNumber}', ''));
    buffer.writeln(twoColumns('Tgl: ${DateFormatter.formatDateTime(date)}', ''));
    buffer.writeln(twoColumns('Metode: ${sale.paymentMethod}', ''));
    buffer.writeln(dash);

    // 3. Items
    for (final item in sale.items) {
      final pName = item.productName ?? 'Barang';
      buffer.writeln(pName);

      final qtyStr = '${item.quantity} x ${CurrencyFormatter.format(item.sellingPrice)}';
      final subtotalStr = CurrencyFormatter.format(item.subtotal);
      buffer.writeln(twoColumns('  $qtyStr', subtotalStr));
    }

    buffer.writeln(dash);

    // 4. Totals
    buffer.writeln(twoColumns('Total Barang', '${sale.totalItemsCount}'));
    buffer.writeln(twoColumns('TOTAL', CurrencyFormatter.format(sale.total)));
    buffer.writeln(twoColumns('BAYAR (${sale.paymentMethod.toUpperCase()})', CurrencyFormatter.format(sale.paid)));
    buffer.writeln(twoColumns('KEMBALIAN', CurrencyFormatter.format(sale.change)));

    buffer.writeln(line);

    // 5. Footer
    buffer.writeln(center(storeProfile.receiptFooter));
    buffer.writeln(center('Warung Mak Wi'));
    buffer.writeln();

    return buffer.toString();
  }
}
