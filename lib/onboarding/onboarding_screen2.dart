// onboarding_screen2.dart

import 'package:flutter/material.dart';
import 'package:hive/hive.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/user_profile.dart';

class OnboardingScreen2 extends StatefulWidget {
  final VoidCallback onFinish;
  const OnboardingScreen2({super.key, required this.onFinish});

  @override
  State<OnboardingScreen2> createState() => _OnboardingScreen2State();
}

class _OnboardingScreen2State extends State<OnboardingScreen2> {
  String username = '';
  String gender = '';
  int weeklyMinutes = 150;

  Future<void> finish() async {
    final profileBox = Hive.box<UserProfile>('profile');
    final user = UserProfile(
      username: username,
      gender: gender,
      weeklyMinutes: weeklyMinutes,
    );
    await profileBox.put('current', user);

    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('onboarding_complete', true);

    widget.onFinish();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 32),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const Icon(Icons.chevron_right, size: 28, color: Colors.black),
                const SizedBox(width: 4),
                const Text("Essentiel.", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
              ],
            ),
            const SizedBox(height: 24),
            const Text(
              "We believe in simplicity and effectiveness, so we just need a few quick details to personalize your experience.",
              style: TextStyle(fontSize: 16),
            ),
            const SizedBox(height: 24),
            TextField(
              decoration: const InputDecoration(
                labelText: 'Username',
                prefixIcon: Icon(Icons.person),
                hintText: 'Please enter your username',
              ),
              onChanged: (value) => username = value,
            ),
            const SizedBox(height: 24),
            Row(
              children: [
                Expanded(
                  child: GestureDetector(
                    onTap: () => setState(() => gender = 'female'),
                    child: Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        border: Border.all(color: gender == 'female' ? Colors.black : Colors.grey.shade300),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Column(
                        children: const [
                          Icon(Icons.female, size: 40),
                          SizedBox(height: 8),
                          Text("Female")
                        ],
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: GestureDetector(
                    onTap: () => setState(() => gender = 'male'),
                    child: Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        border: Border.all(color: gender == 'male' ? Colors.black : Colors.grey.shade300),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Column(
                        children: const [
                          Icon(Icons.male, size: 40),
                          SizedBox(height: 8),
                          Text("Male")
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),
            const Text(
              "The World Health Organization recommends between 150 and 300 minutes of physical activity per week. How many hours do you plan to dedicate to your workouts each week?",
              style: TextStyle(color: Colors.black54),
            ),
            const SizedBox(height: 16),
            SizedBox(
              height: 50,
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: List.generate(11, (i) {
                  final value = 130 + i * 10;
                  return Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 4),
                    child: ChoiceChip(
                      label: Text("$value"),
                      selected: weeklyMinutes == value,
                      onSelected: (_) => setState(() => weeklyMinutes = value),
                    ),
                  );
                }),
              ),
            ),
            const Spacer(),
            ElevatedButton.icon(
              style: ElevatedButton.styleFrom(minimumSize: const Size.fromHeight(50), backgroundColor: Colors.black),
              onPressed: finish,
              icon: const Icon(Icons.arrow_forward, color: Colors.white),
              label: const Text("Let's begin!", style: TextStyle(color: Colors.white)),
            )
          ],
        ),
      ),
    );
  }
}