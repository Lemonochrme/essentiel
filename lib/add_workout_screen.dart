import 'package:flutter/material.dart';

class AddWorkoutScreen extends StatelessWidget {
  const AddWorkoutScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Ajouter un entraînement')),
      body: Center(child: Text('Formulaire d’ajout d’un entraînement')),
    );
  }
}
