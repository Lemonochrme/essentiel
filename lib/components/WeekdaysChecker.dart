import 'package:flutter/material.dart';

class CustomWeekdays extends StatelessWidget {
  final List<bool> workoutDays; // List of booleans indicating workout days

  CustomWeekdays({required this.workoutDays, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final List<String> weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: List.generate(weekdays.length, (index) {
        bool isChecked = workoutDays[index]; // Determine if the day is a workout day

        return Column(
          children: [
            Icon(
              isChecked ? Icons.check_box : Icons.check_box_outline_blank, // Material icons
              color: isChecked ? Colors.white : Colors.grey[600],
              size: 26,
            ),
            SizedBox(height: 4),
            Text(
              weekdays[index],
              style: TextStyle(fontSize: 18, color: Colors.grey[600], fontWeight: FontWeight.bold),
            ),
          ],
        );
      }),
    );
  }
}
