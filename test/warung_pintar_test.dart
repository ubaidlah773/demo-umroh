import 'package:flutter_test/flutter_test.dart';
import 'package:warung_pintar/core/utils/currency_formatter.dart';
import 'package:warung_pintar/models/cart_item_model.dart';
import 'package:warung_pintar/models/product_model.dart';
import 'package:warung_pintar/models/sale_detail_model.dart';
import 'package:warung_pintar/models/sale_model.dart';
import 'package:warung_pintar/repositories/settings_repository.dart';
import 'package:warung_pintar/services/receipt_service.dart';

void main() {
  group('CurrencyFormatter Tests', () {
    test('formats Indonesian Rupiah properly without decimals', () {
      expect(CurrencyFormatter.format(10000), contains('10.000'));
      expect(CurrencyFormatter.format(125000), contains('125.000'));
      expect(CurrencyFormatter.format(1250000), contains('1.250.000'));
      expect(CurrencyFormatter.format(0), contains('0'));
    });

    test('parses Rupiah string back to int cleanly', () {
      expect(CurrencyFormatter.parse('Rp 10.000'), equals(10000));
      expect(CurrencyFormatter.parse('Rp 1.250.000'), equals(1250000));
      expect(CurrencyFormatter.parse(''), equals(0));
    });

    test('calculates margin percentage accurately', () {
      // Modal 2500, Jual 3000 -> Profit 500 -> 20%
      final marginPct = CurrencyFormatter.calculateMarginPercent(3000, 2500);
      expect(marginPct, closeTo(20.0, 0.01));
    });
  });

  group('ProductModel Tests', () {
    final product = ProductModel(
      id: 1,
      name: 'Indomie Goreng',
      purchasePrice: 2500,
      sellingPrice: 3000,
      stock: 4,
      minimumStock: 5,
      createdAt: '2026-09-30T00:00:00Z',
      updatedAt: '2026-09-30T00:00:00Z',
    );

    test('calculates profit margin correctly', () {
      expect(product.margin, equals(500));
      expect(product.marginPercentage, closeTo(20.0, 0.01));
    });

    test('detects low stock status', () {
      expect(product.isLowStock, isTrue);
      expect(product.isOutOfStock, isFalse);

      final outOfStockProduct = product.copyWith(stock: 0);
      expect(outOfStockProduct.isOutOfStock, isTrue);
      expect(outOfStockProduct.isLowStock, isFalse);
    });
  });

  group('CartItemModel Tests', () {
    final product = ProductModel(
      id: 1,
      name: 'Aqua 600ml',
      purchasePrice: 2500,
      sellingPrice: 3500,
      stock: 20,
      minimumStock: 5,
      createdAt: '2026-09-30T00:00:00Z',
      updatedAt: '2026-09-30T00:00:00Z',
    );

    test('computes subtotal, cost and profit per item', () {
      final cartItem = CartItemModel(product: product, quantity: 3);
      expect(cartItem.subtotal, equals(10500)); // 3 * 3500
      expect(cartItem.cost, equals(7500)); // 3 * 2500
      expect(cartItem.profit, equals(3000)); // 3 * (3500 - 2500)
    });
  });

  group('ReceiptService Tests', () {
    test('generates thermal receipt text with correct structure and calculations', () {
      final sale = SaleModel(
        id: 1,
        invoiceNumber: 'TRX-20260930-001',
        date: '2026-09-30T19:45:00',
        total: 12000,
        paid: 20000,
        change: 8000,
        paymentMethod: 'Tunai',
        createdAt: '2026-09-30T19:45:00',
        items: [
          SaleDetailModel(
            id: 1,
            saleId: 1,
            productId: 1,
            productName: 'Indomie Goreng',
            quantity: 2,
            purchasePrice: 2500,
            sellingPrice: 3000,
            subtotal: 6000,
            profit: 1000,
          ),
          SaleDetailModel(
            id: 2,
            saleId: 1,
            productId: 2,
            productName: 'Aqua 600ml',
            quantity: 2,
            purchasePrice: 2500,
            sellingPrice: 3000,
            subtotal: 6000,
            profit: 1000,
          ),
        ],
      );

      final storeProfile = StoreProfile(
        name: 'WARUNG MAK WI',
        address: 'Jl. Contoh No. 10',
        phone: '081234567890',
        receiptFooter: 'Terima kasih 🙏',
      );

      final text = ReceiptService.generateThermalReceiptText(
        sale: sale,
        storeProfile: storeProfile,
      );

      expect(text, contains('WARUNG MAK WI'));
      expect(text, contains('TRX-20260930-001'));
      expect(text, contains('Indomie Goreng'));
      expect(text, contains('Aqua 600ml'));
      expect(text, contains('TOTAL'));
      expect(text.toUpperCase(), contains('TUNAI'));
      expect(text, contains('KEMBALIAN'));
      expect(text, contains('Terima kasih 🙏'));
    });
  });
}
