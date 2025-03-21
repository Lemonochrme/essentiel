import 'package:hive/hive.dart';

part 'workout.g.dart';

@HiveType(typeId: 0)
class Workout extends HiveObject {
  @HiveField(0)
  String id;

  @HiveField(1)
  DateTime date;

  @HiveField(2)
  List<WorkoutExercise> exercises;

  Workout({required this.id, required this.date, required this.exercises});
}

@HiveType(typeId: 1)
class WorkoutExercise extends HiveObject {
  @HiveField(0)
  String name;

  @HiveField(1)
  List<WorkoutSet> sets;

  WorkoutExercise({required this.name, required this.sets});
}

@HiveType(typeId: 2)
class WorkoutSet extends HiveObject {
  @HiveField(0)
  double weight;

  @HiveField(1)
  int repetitions;

  @HiveField(2)
  bool isCompleted;

  WorkoutSet({
    required this.weight,
    required this.repetitions,
    this.isCompleted = false,
  });
}
