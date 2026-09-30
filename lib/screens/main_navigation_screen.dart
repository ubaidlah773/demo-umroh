import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../core/constants/app_colors.dart';
import '../core/constants/app_strings.dart';
import '../providers/app_provider.dart';
import '../providers/cart_provider.dart';
import 'cashier/cashier_screen.dart';
import 'dashboard/dashboard_screen.dart';
import 'products/products_screen.dart';
import 'reports/reports_screen.dart';
import 'settings/settings_screen.dart';

class MainNavigationScreen extends StatelessWidget {
  const MainNavigationScreen({super.key});

  static const List<Widget> _screens = [
    DashboardScreen(),
    CashierScreen(),
    ProductsScreen(),
    ReportsScreen(),
    SettingsScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    final appProv = context.watch<AppProvider>();
    final cart = context.watch<CartProvider>();
    final currentIndex = appProv.currentNavIndex;

    return Scaffold(
      body: IndexedStack(
        index: currentIndex,
        children: _screens,
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: currentIndex,
        onDestinationSelected: (index) {
          appProv.setNavIndex(index);
        },
        destinations: [
          const NavigationDestination(
            icon: Icon(Icons.home_outlined),
            selectedIcon: Icon(Icons.home_rounded),
            label: AppStrings.navHome,
          ),
          NavigationDestination(
            icon: Badge(
              isLabelVisible: cart.isNotEmpty,
              label: Text('${cart.totalItemsCount}'),
              backgroundColor: AppColors.primary,
              child: const Icon(Icons.shopping_cart_outlined),
            ),
            selectedIcon: Badge(
              isLabelVisible: cart.isNotEmpty,
              label: Text('${cart.totalItemsCount}'),
              backgroundColor: AppColors.primaryDark,
              child: const Icon(Icons.shopping_cart_rounded),
            ),
            label: AppStrings.navCashier,
          ),
          const NavigationDestination(
            icon: Icon(Icons.inventory_2_outlined),
            selectedIcon: Icon(Icons.inventory_2_rounded),
            label: AppStrings.navProducts,
          ),
          const NavigationDestination(
            icon: Icon(Icons.bar_chart_outlined),
            selectedIcon: Icon(Icons.bar_chart_rounded),
            label: AppStrings.navReports,
          ),
          const NavigationDestination(
            icon: Icon(Icons.settings_outlined),
            selectedIcon: Icon(Icons.settings_rounded),
            label: AppStrings.navSettings,
          ),
        ],
      ),
    );
  }
}
