import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'models/workout.dart';
import 'add_workout_screen.dart';
import 'navigation.dart';
import 'theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Hive.initFlutter();

  Hive.registerAdapter(WorkoutAdapter());
  Hive.registerAdapter(WorkoutExerciseAdapter());
  Hive.registerAdapter(WorkoutSetAdapter());

  await Hive.openBox<Workout>('workouts');

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
      },
    );
  }
}
