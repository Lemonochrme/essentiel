import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'theme.dart';

class ThemeProvider with ChangeNotifier {
  ThemeData _themeData = AppTheme.lightTheme;
  bool _isDarkMode = false;

  ThemeProvider() {
    _loadTheme(); // Charger le thème au démarrage
  }

  ThemeData get themeData => _themeData;
  bool get isDarkMode => _isDarkMode;

  void toggleTheme() async {
    _isDarkMode = !_isDarkMode;
    _themeData = _isDarkMode ? AppTheme.darkTheme : AppTheme.lightTheme;
    notifyListeners();
    _saveTheme(); // Sauvegarde du choix
  }

  void _loadTheme() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    _isDarkMode = prefs.getBool('darkMode') ?? false;
    _themeData = _isDarkMode ? AppTheme.darkTheme : AppTheme.lightTheme;
    notifyListeners();
  }

  void _saveTheme() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setBool('darkMode', _isDarkMode);
  }
}
