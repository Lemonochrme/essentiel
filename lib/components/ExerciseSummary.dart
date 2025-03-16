import 'package:flutter/material.dart';

class ExerciseSummary extends StatelessWidget {
  final int hours; // Hours of exercise
  final int minutes; // Minutes of exercise
  final int percentageChange; // Percentage change compared to last week

  const ExerciseSummary({
    required this.hours,
    required this.minutes,
    required this.percentageChange,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF161616), // Background color
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
              "${hours}h ${minutes}min",
              style: const TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.bold,
                color: Colors.white, // Main text color
              ),
              ),
              const SizedBox(width: 6),
              Transform.translate(
              offset: const Offset(0, -20),
              child: Text(
                "+$percentageChange%",
                style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Colors.white, // Percentage change color
                ),
              ),
              ),
            ],
            ),
          const SizedBox(height: 5),
          const Text(
            "Of exercise this week",
            style: TextStyle(
              fontSize: 16,
              color: Colors.grey, // Secondary text color
            ),
          ),
        ],
      ),
    );
  }
}
