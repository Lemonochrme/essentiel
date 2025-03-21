import 'package:flutter/material.dart';

class StatsScreen extends StatelessWidget {
  const StatsScreen({super.key});

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
            const SizedBox(width: 4), // Add some space between the logo and the text
            const Text('Essentiel'),
          ],
        ),
      ),
      body: Center(child: Text('Graphiques et stats')),
    );
  }
}
