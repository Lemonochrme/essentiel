import 'package:flutter/material.dart';
import 'navigation.dart';
import 'theme.dart';
import 'workout/workout_screen.dart';

void main() {
  runApp(const SportJournalApp());
}

class SportJournalApp extends StatelessWidget {
  const SportJournalApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Essentiel Sport Journal',
      theme: AppTheme.lightTheme,
      home: MainNavigation(),
      routes: {
        '/workout': (context) => const WorkoutScreen(),
      },
    );
  }
}
