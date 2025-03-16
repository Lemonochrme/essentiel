import 'package:flutter/material.dart';
import 'navigation.dart';
import 'theme.dart';

void main() {
  runApp(SportJournalApp());
}

class SportJournalApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sport Journal',
      theme: AppTheme.lightTheme,
      home: MainNavigation(),
    );
  }
}
