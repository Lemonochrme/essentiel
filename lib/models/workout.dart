class Workout {
  final String id;
  final DateTime date;
  final List<WorkoutExercise> exercises;

  Workout({required this.id, required this.date, required this.exercises});
}

class WorkoutExercise {
  final String name;
  final List<WorkoutSet> sets;

  WorkoutExercise({required this.name, required this.sets});
}

class WorkoutSet {
  double weight;
  int repetitions;
  bool isCompleted;

  WorkoutSet({required this.weight, required this.repetitions, this.isCompleted = false});
}
