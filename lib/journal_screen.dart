import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';
import '../models/workout.dart';
import 'package:intl/intl.dart';

class JournalScreen extends StatelessWidget {
  const JournalScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Image.asset(
              'assets/icons/light-essentiel-logo.png',
              height: 20,
            ),
            const SizedBox(width: 4),
            const Text('Essentiel'),
          ],
        ),
      ),
      body: ValueListenableBuilder(
        valueListenable: Hive.box<Workout>('workouts').listenable(),
        builder: (context, Box<Workout> box, _) {
          if (box.isEmpty) {
            return const Center(child: Text('Aucun entraînement pour le moment.'));
          }

          return ListView.builder(
            itemCount: box.length,
            itemBuilder: (context, index) {
              final workout = box.getAt(index);
              if (workout == null) return const SizedBox.shrink();

              return Card(
                margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                child: Padding(
                  padding: const EdgeInsets.all(12.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        DateFormat('dd MMM yyyy, HH:mm').format(workout.date),
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 8),
                      ...workout.exercises.map((ex) => Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                ex.name,
                                style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                              ),
                              ...ex.sets.map(
                                (s) => Padding(
                                  padding: const EdgeInsets.symmetric(vertical: 2.0),
                                  child: Text("- ${s.weight} kg x ${s.repetitions} reps"),
                                ),
                              )
                            ],
                          )),
                    ],
                  ),
                ),
              );
            },
          );
        },
      ),
    );
  }
}
