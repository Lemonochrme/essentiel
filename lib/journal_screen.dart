import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';
import '../models/workout.dart';
import 'package:intl/intl.dart';
import 'package:path_provider/path_provider.dart';
import 'dart:io';

class JournalScreen extends StatefulWidget {
  const JournalScreen({super.key});

  @override
  State<JournalScreen> createState() => _JournalScreenState();
}

class _JournalScreenState extends State<JournalScreen> {
  final Set<int> selectedIndexes = {};

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
        title: const Text('Confirm Deletion'),
        content: const Text('Are you sure you want to delete all workouts? This action is irreversible. Think twice, lift once!'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () => Navigator.of(context).pop(true),
            child: const Text('Delete', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );

    if (confirm == true) {
      final box = Hive.box<Workout>('workouts');
      await box.clear();
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('All workouts have been deleted. Time to start fresh!')),
        );
      }
    }
  }

  Future<void> deleteSelected() async {
    final box = Hive.box<Workout>('workouts');
    final keys = box.keys.toList();
    for (final index in selectedIndexes) {
      await box.delete(keys[index]);
    }
    setState(() {
      selectedIndexes.clear();
    });
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
          if (selectedIndexes.isNotEmpty)
            IconButton(
              icon: const Icon(Icons.delete),
              onPressed: () async {
                final confirm = await showDialog<bool>(
                  context: context,
                    builder: (context) => AlertDialog(
                    title: const Text('Delete selected items?'),
                    content: Text('You are about to delete ${selectedIndexes.length} workout(s). Proceed?'),
                    actions: [
                      TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Cancel')),
                      TextButton(onPressed: () => Navigator.pop(context, true), child: const Text('Delete')),
                    ],
                    ),
                  );
                  if (confirm == true) {
                    await deleteSelected();
                    if (mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Selected workouts deleted. Time to make new gains!')),
                    );
                  }
                }
              },
            )
          else
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
                  child: Text('Exporter to JSON (for the nerds)'),
                ),
                const PopupMenuItem(
                  value: 'clear',
                  child: Text('Delete all workouts (no regrets)'),
                ),
              ],
            )
        ],
      ),
      body: ValueListenableBuilder(
        valueListenable: Hive.box<Workout>('workouts').listenable(),
        builder: (context, Box<Workout> box, _) {
          if (box.isEmpty) {
            return const Center(child: Text('No workouts yet. Time to hit the gym!'));
          }

          return ListView.builder(
            itemCount: box.length,
            itemBuilder: (context, index) {
              final workout = box.getAt(index);
              if (workout == null) return const SizedBox.shrink();

              final isSelected = selectedIndexes.contains(index);

              return GestureDetector(
                onLongPress: () {
                  setState(() {
                    if (isSelected) {
                      selectedIndexes.remove(index);
                    } else {
                      selectedIndexes.add(index);
                    }
                  });
                },
                onTap: () {
                  if (selectedIndexes.isNotEmpty) {
                    setState(() {
                      if (isSelected) {
                        selectedIndexes.remove(index);
                      } else {
                        selectedIndexes.add(index);
                      }
                    });
                  }
                },
                child: Card(
                  color: isSelected ? Colors.red[50] : null,
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
                ),
              );
            },
          );
        },
      ),
    );
  }
}
