import 'package:flutter/material.dart';
import 'home_screen.dart';
import 'journal_screen.dart';
import 'add_workout_screen.dart';
import 'stats_screen.dart';
import 'settings_screen.dart';

class MainNavigation extends StatefulWidget {
  const MainNavigation({super.key});

  @override
  _MainNavigationState createState() => _MainNavigationState();
}

class _MainNavigationState extends State<MainNavigation> {
  int _selectedIndex = 0;

  static final List<Widget> _screens = [
    HomeScreen(),
    JournalScreen(),
    AddWorkoutScreen(),
    StatsScreen(),
    SettingsScreen(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
  selectedItemColor: Colors.white,
  unselectedItemColor: Colors.grey,
  items: const [
    BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Accueil'),
    BottomNavigationBarItem(icon: Icon(Icons.book), label: 'Journal'),
    BottomNavigationBarItem(icon: Icon(Icons.add_circle), label: 'Ajouter'),
    BottomNavigationBarItem(icon: Icon(Icons.bar_chart), label: 'Stats'),
    BottomNavigationBarItem(icon: Icon(Icons.settings), label: 'Paramètres'),
  ],
  currentIndex: _selectedIndex,
  type: BottomNavigationBarType.fixed,
  backgroundColor: Colors.grey[850],
  onTap: _onItemTapped,
),

    );
  }
}
