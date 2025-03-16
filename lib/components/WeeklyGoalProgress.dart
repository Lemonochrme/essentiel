import 'package:flutter/material.dart';

class WeeklyGoalProgress extends StatelessWidget {
  final double progress; // Progress percentage (0.0 to 1.0)

  const WeeklyGoalProgress({required this.progress, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF282828),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "You completed ${(progress * 100).toInt()}% of your weekly goal.\nKeep going!",
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 10),
          ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: LinearProgressIndicator(
              value: progress, // Progress value
              minHeight: 10,
              backgroundColor: const Color(0xFF161616), // Dark background
              valueColor: const AlwaysStoppedAnimation<Color>(Colors.white), // White progress bar
            ),
          ),
        ],
      ),
    );
  }
}
