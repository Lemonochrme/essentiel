import 'package:flutter/material.dart';
import 'onboarding_screen2.dart';

class OnboardingScreen1 extends StatelessWidget {
  final VoidCallback onNext;
  const OnboardingScreen1({super.key, required this.onNext});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 32),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Row(
              children: [
                const Icon(Icons.chevron_right, size: 28, color: Colors.black),
                const SizedBox(width: 4),
                const Text("Essentiel.", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
              ],
            ),
            const Spacer(),
            Image.asset('assets/images/onboarding_1.png'),
            const SizedBox(height: 24),
            const Text(
              "Unlock Your Potential with Essentiel: Simplify Your Fitness Journey",
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            const Text(
              "Streamlined. Focused. Effective. Essentiel keeps your workouts simple, so you can stay focused on your goals.",
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.black54),
            ),
            const SizedBox(height: 32),
            ElevatedButton.icon(
              style: ElevatedButton.styleFrom(minimumSize: const Size.fromHeight(50), backgroundColor: Colors.black),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => OnboardingScreen2(onFinish: onNext),
                  ),
                );
              },
              icon: const Icon(Icons.arrow_forward, color: Colors.white),
              label: const Text("Get started", style: TextStyle(color: Colors.white)),
            )
          ],
        ),
      ),
    );
  }
}