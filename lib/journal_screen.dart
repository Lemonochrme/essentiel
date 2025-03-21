import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';
import '../models/workout.dart';
import 'package:intl/intl.dart';
import 'package:path_provider/path_provider.dart';
import 'dart:io';

class JournalScreen extends StatelessWidget {
  const JournalScreen({super.key});

  Future<void> exportToJson(BuildContext context) async {
    final box = Hive.box<Workout>('workouts');
    final workouts = box.values.map((w) => {
          'id': w.id,
          'date': w.date.toIso8601String(),
          'exercises': w.exercises.map((e) => {
                'name': e.name,
                'sets': e.sets
                    .map((s) => {
                          'weight': s.weight,
                          'repetitions': s.repetitions,
                          'isCompleted': s.isCompleted,
                        })
                    .toList(),
              }).toList(),
        }).toList();

    final jsonStr = const JsonEncoder.withIndent('  ').convert(workouts);
    final dir = await getApplicationDocumentsDirectory();
    final file = File('${dir.path}/workouts_export.json');
    await file.writeAsString(jsonStr);

    if (context.mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Exporté vers ${file.path}')),
      );
    }
  }

  Future<void> confirmDeleteAll(BuildContext context) async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Confirmer la suppression'),
        content: const Text('Es-tu sûr de vouloir supprimer tous les entraînements ? Cette action est irréversible.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('Annuler'),
          ),
          TextButton(
            onPressed: () => Navigator.of(context).pop(true),
            child: const Text('Supprimer', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );

    if (confirm == true) {
      final box = Hive.box<Workout>('workouts');
      await box.clear();
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Tous les entraînements ont été supprimés.')),
        );
      }
    }
  }

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
        actions: [
          PopupMenuButton<String>(
            onSelected: (value) {
              if (value == 'export') {
                exportToJson(context);
              } else if (value == 'clear') {
                confirmDeleteAll(context);
              }
            },
            itemBuilder: (context) => [
              const PopupMenuItem(
                value: 'export',
                child: Text('Export to JSON'),
              ),
              const PopupMenuItem(
                value: 'clear',
                child: Text('Delete all workouts'),
              ),
            ],
          )
        ],
      ),
      body: ValueListenableBuilder(
        valueListenable: Hive.box<Workout>('workouts').listenable(),
        builder: (context, Box<Workout> box, _) {
          if (box.isEmpty) {
            return const Center(child: Text('No workouts yet :( Start by adding one!'));
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
