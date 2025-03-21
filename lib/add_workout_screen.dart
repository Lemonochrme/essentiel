import 'dart:async';
import 'package:flutter/material.dart';
import '../models/workout.dart';
import 'workout_list_screen.dart';

class AddWorkoutScreen extends StatefulWidget {
  const AddWorkoutScreen({super.key});

  @override
  State<AddWorkoutScreen> createState() => _AddWorkoutScreenState();
}

class _AddWorkoutScreenState extends State<AddWorkoutScreen> {
  bool workoutStarted = false;
  Stopwatch stopwatch = Stopwatch();
  Timer? timer;
  List<WorkoutExercise> selectedExercises = [];

  void startWorkout() {
    setState(() {
      workoutStarted = true;
      stopwatch.start();
      timer = Timer.periodic(const Duration(seconds: 1), (_) => setState(() {}));
    });
  }

  String formatDuration(Duration duration) {
    return duration.toString().split('.').first.padLeft(8, "0");
  }

  void addExercise(WorkoutExercise exercise) {
    setState(() {
      selectedExercises.add(exercise);
    });
  }

  void finishWorkout() {
    // Ici on pourrait sauvegarder avec Hive
    stopwatch.stop();
    timer?.cancel();
    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text("Workout saved!")));
    setState(() {
      workoutStarted = false;
      selectedExercises.clear();
      stopwatch.reset();
    });
  }

  void addSet(int index) {
    setState(() {
      selectedExercises[index].sets.add(WorkoutSet(weight: 0, repetitions: 0));
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Essentiel"),
        actions: [
          if (selectedExercises.isNotEmpty)
            IconButton(
              icon: const Icon(Icons.check),
              onPressed: finishWorkout,
            )
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(12),
        child: workoutStarted
            ? Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Text("Workout of the day", style: TextStyle(fontSize: 20)),
                      const Spacer(),
                      Text(formatDuration(stopwatch.elapsed), style: const TextStyle(fontSize: 16)),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Expanded(
                    child: ListView.builder(
                      itemCount: selectedExercises.length,
                      itemBuilder: (context, i) {
                        final exercise = selectedExercises[i];
                        return Card(
                          elevation: 3,
                          margin: const EdgeInsets.symmetric(vertical: 8),
                          child: Padding(
                            padding: const EdgeInsets.all(12),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(exercise.name, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                                const SizedBox(height: 8),
                                ...exercise.sets.asMap().entries.map((entry) {
                                  int idx = entry.key;
                                  WorkoutSet set = entry.value;
                                  return Container(
                                    margin: const EdgeInsets.symmetric(vertical: 4),
                                    decoration: BoxDecoration(
                                      color: set.isCompleted ? Colors.green[100] : null,
                                      borderRadius: BorderRadius.circular(8),
                                      border: Border.all(color: Colors.grey),
                                    ),
                                    child: Row(
                                      children: [
                                        Padding(
                                          padding: const EdgeInsets.all(8.0),
                                          child: Text("Set ${idx + 1}"),
                                        ),
                                        Expanded(
                                          child: TextField(
                                            keyboardType: TextInputType.number,
                                            decoration: const InputDecoration(hintText: "Weight (kg)"),
                                            onChanged: (val) {
                                              set.weight = double.tryParse(val) ?? 0;
                                            },
                                          ),
                                        ),
                                        Expanded(
                                          child: TextField(
                                            keyboardType: TextInputType.number,
                                            decoration: const InputDecoration(hintText: "Reps"),
                                            onChanged: (val) {
                                              set.repetitions = int.tryParse(val) ?? 0;
                                            },
                                          ),
                                        ),
                                        IconButton(
                                          icon: Icon(
                                            set.isCompleted ? Icons.check_box : Icons.check_box_outline_blank,
                                            color: set.isCompleted ? Colors.green : null,
                                          ),
                                          onPressed: () {
                                            setState(() {
                                              set.isCompleted = !set.isCompleted;
                                            });
                                          },
                                        ),
                                      ],
                                    ),
                                  );
                                }),
                                TextButton.icon(
                                  onPressed: () => addSet(i),
                                  icon: const Icon(Icons.add),
                                  label: const Text("Add Set"),
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                  const SizedBox(height: 8),
                  Center(
                    child: ElevatedButton.icon(
                      icon: const Icon(Icons.add),
                      label: const Text("Add Exercise"),
                      onPressed: () async {
                        final result = await Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const WorkoutListScreen(),
                          ),
                        );
                        if (result != null && result is String) {
                          addExercise(WorkoutExercise(name: result, sets: [WorkoutSet(weight: 0, repetitions: 0)]));
                        }
                      },
                    ),
                  )
                ],
              )
            : Center(
                child: ElevatedButton(
                  onPressed: startWorkout,
                  child: const Text("Start Workout"),
                ),
              ),
      ),
    );
  }
}
