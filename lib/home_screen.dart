import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
        Icon(Icons.arrow_forward),
        SizedBox(width: 8),
        Text('Essentiel'),
          ],
        ),
      ),
      body: Center(
        child: Text(
          'Bienvenue dans Essentiel !',
          style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}
