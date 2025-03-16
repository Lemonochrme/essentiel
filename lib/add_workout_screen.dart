import 'package:flutter/material.dart';

class AddWorkoutScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Ajouter un entraînement')),
      body: Center(child: Text('Formulaire d’ajout d’un entraînement')),
    );
  }
}
