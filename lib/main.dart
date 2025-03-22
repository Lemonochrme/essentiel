import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'models/workout.dart';
import 'models/user_profile.dart';
import 'add_workout_screen.dart';
import 'navigation.dart';
import 'theme.dart';
import 'onboarding/onboarding_screen1.dart';
import 'onboarding/onboarding_screen2.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Hive.initFlutter();

  // Enregistrement des adapters Hive
  Hive.registerAdapter(WorkoutAdapter());
  Hive.registerAdapter(WorkoutExerciseAdapter());
  Hive.registerAdapter(WorkoutSetAdapter());
  Hive.registerAdapter(UserProfileAdapter());

  await Hive.openBox<Workout>('workouts');
  await Hive.openBox<UserProfile>('profile');

  final prefs = await SharedPreferences.getInstance();
  final isFirstLaunch = !(prefs.getBool('onboarding_complete') ?? false);

  runApp(SportJournalApp(showOnboarding: isFirstLaunch));
}

class SportJournalApp extends StatelessWidget {
  final bool showOnboarding;
  const SportJournalApp({super.key, required this.showOnboarding});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Essentiel Sport Journal',
      theme: AppTheme.lightTheme,
      home: showOnboarding ? const OnboardingFlow() : const MainNavigation(),
    );
  }
}

// Cette classe gère toute la logique de l’onboarding
class OnboardingFlow extends StatelessWidget {
  const OnboardingFlow({super.key});

  @override
  Widget build(BuildContext context) {
    return OnboardingScreen1(
      onNext: () => Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => OnboardingScreen2(
            onFinish: () => Navigator.pushReplacement(
              context,
              MaterialPageRoute(builder: (_) => const MainNavigation()),
            ),
          ),
        ),
      ),
    );
  }
}
