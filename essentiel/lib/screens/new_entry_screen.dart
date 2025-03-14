import 'package:flutter/material.dart';

class NewEntryScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("New Workout Entry")),
      body: Center(child: Text("Form to add new workouts will go here.")),
    );
  }
}
