import 'package:flutter/material.dart';
import 'navigation.dart';
import 'theme.dart';

void main() {
  runApp(SportJournalApp());
}

class SportJournalApp extends StatelessWidget {
  const SportJournalApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sport Journal',
      theme: AppTheme.darkTheme,
      home: MainNavigation(),
    );
  }
}
