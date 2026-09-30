import 'package:flutter/material.dart';

class AppProvider extends ChangeNotifier {
  int _currentNavIndex = 0;
  ThemeMode _themeMode = ThemeMode.light;

  int get currentNavIndex => _currentNavIndex;
  ThemeMode get themeMode => _themeMode;

  void setNavIndex(int index) {
    if (_currentNavIndex != index) {
      _currentNavIndex = index;
      notifyListeners();
    }
  }

  void setThemeMode(ThemeMode mode) {
    _themeMode = mode;
    notifyListeners();
  }

  void toggleTheme() {
    _themeMode = _themeMode == ThemeMode.light ? ThemeMode.dark : ThemeMode.light;
    notifyListeners();
  }
}
