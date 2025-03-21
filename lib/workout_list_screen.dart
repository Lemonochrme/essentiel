import 'package:flutter/material.dart';

class WorkoutListScreen extends StatelessWidget {
  const WorkoutListScreen({super.key});

  final List<String> dummyExercises = const [
    'Bench Press',
    'Deadlift',
    'Overhead Press',
    'Pull-Up',
    'Row',
    'Squat',
  ];

  @override
  Widget build(BuildContext context) {
    final exercises = [...dummyExercises]..sort();
    return Scaffold(
      appBar: AppBar(title: const Text("Select Exercise")),
      body: ListView.builder(
        itemCount: exercises.length,
        itemBuilder: (context, index) {
          final exercise = exercises[index];
          return ListTile(
            title: Text(exercise),
            onTap: () => Navigator.pop(context, exercise),
          );
        },
      ),
    );
  }
}
