import 'package:flutter/material.dart';
import 'components/WorkoutBarChart.dart';
import 'components/WeekdaysChecker.dart'; 
import 'components/WeeklyGoalProgress.dart';
import 'components/ExerciseSummary.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    double dummyProgress = 0.8; // 80% completion for demonstration

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Image.asset(
              'assets/icons/light-essentiel-logo.png',
              height: 20,
            ),
            const SizedBox(width: 4), // Add some space between the logo and the text
            const Text('Essentiel'),
          ],
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 16.0), // Add margin left, right, top, and bottom
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start, // Justify everything to the top
          children: [
            _buildWelcomeText(),
            const SizedBox(height: 10),
            WeeklyGoalProgress(progress: dummyProgress), // NEW Progress bar component
            const SizedBox(height: 20),
            _buildProgressText(),
            const SizedBox(height: 10),
            CustomWeekdays(
              workoutDays: [true, false, true, false, true, true, false], // Example workout days
            ),
            const SizedBox(height: 20), // Space between tracker and chart
            ExerciseSummary(
              hours: 1,
              minutes: 20,
              percentageChange: 20,
            ),
            const WorkoutBarChart(
              data: [12, 18, 10, 25, 100, 20, 20],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildWelcomeText() {
    return Align(
      alignment: Alignment.centerLeft,
      child: Text(
        'Hi, Robin ! Welcome back.',
        style: TextStyle(fontSize: 24, color: Colors.white, fontWeight: FontWeight.bold),
      ),
    );
  }

  Widget _buildProgressText() {
    return Align(
      alignment: Alignment.centerLeft,
      child: Text(
        'Track your progress this week',
        style: TextStyle(fontSize: 20, color: Colors.white, fontWeight: FontWeight.bold),
      ),
    );
  }
}