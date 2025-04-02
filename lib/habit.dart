import 'package:flutter/material.dart';
import 'package:hive/hive.dart';

part 'habit.g.dart';

@HiveType(typeId: 0)
class Habit extends HiveObject {
  @HiveField(0)
  String title;

  @HiveField(1)
  String description;

  @HiveField(2)
  List<String> days;

  @HiveField(3)
  int? hour;

  @HiveField(4)
  int? minute;

  @HiveField(5)
  int streak;

  @HiveField(6)
  int totalDone;

  @HiveField(7)
  int iconCode;

  @HiveField(8)
  bool doneToday;

  Habit({
    required this.title,
    required this.description,
    required this.days,
    this.hour,
    this.minute,
    this.streak = 0,
    this.totalDone = 0,
    required this.iconCode,
    this.doneToday = false,
  });

  IconData get icon => IconData(iconCode, fontFamily: 'MaterialIcons');

  TimeOfDay? get reminder =>
      hour != null && minute != null ? TimeOfDay(hour: hour!, minute: minute!) : null;
}
