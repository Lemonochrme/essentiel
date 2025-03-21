import 'package:flutter/material.dart';

class AddWorkoutScreen extends StatelessWidget {
  const AddWorkoutScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Image.asset(
              'assets/icons/essentiel-logo.png',
              height: 20,
            ),
            const SizedBox(width: 4),
            const Text('Essentiel'),
          ],
        ),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/workout');
              },
              child: const Text('Start Workout'),
            ),
          ],
        ),
      ),
    );
  }
}


