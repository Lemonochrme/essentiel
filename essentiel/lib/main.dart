import 'package:flutter/material.dart';
import 'screens/home_screen.dart';
import 'screens/journal_screen.dart';
import 'screens/new_entry_screen.dart';
import 'screens/profile_screen.dart';

void main() {
  runApp(SportJournalApp());
}

class SportJournalApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: "Sport Journal",
      theme: ThemeData(primarySwatch: Colors.blue),
      initialRoute: "/",
      routes: {
        "/": (context) => HomeScreen(),
        "/journal": (context) => JournalScreen(),
        "/new_entry": (context) => NewEntryScreen(),
        "/profile": (context) => ProfileScreen(),
      },
    );
  }
}
