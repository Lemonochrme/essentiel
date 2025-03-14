import 'package:flutter/material.dart';

class JournalScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Workout Journal")),
      body: Center(child: Text("Your past workouts will appear here.")),
    );
  }
}
