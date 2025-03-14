import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Profile & Stats")),
      body: Center(child: Text("User progress and stats will be shown here.")),
    );
  }
}
