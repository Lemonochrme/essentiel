import 'package:flutter/material.dart';
import 'package:hive/hive.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/user_profile.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  UserProfile? profile;

  @override
  void initState() {
    super.initState();
    final box = Hive.box<UserProfile>('profile');
    profile = box.get('current');
  }

  Future<void> resetOnboarding() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('onboarding_complete');
    if (context.mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Onboarding reset. Restart the app to see it again.')),
      );
    }
  }

  Future<void> clearAllData() async {
    final workouts = Hive.box('workouts');
    final profile = Hive.box('profile');
    await workouts.clear();
    await profile.clear();
    if (context.mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('All data has been deleted. Poof!')),
      );
    }
  }

  void goToEditProfile() {
    // You can create an EditProfileScreen and call it here
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Profile editing not implemented yet. Stay tuned!')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Settings')),
      body: ListView(
        children: [
          const Padding(
            padding: EdgeInsets.all(16),
            child: Text('User Profile', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
          ),
          if (profile != null) ...[
            ListTile(
              title: const Text('First Name'),
              subtitle: Text(profile!.username),
            ),
            ListTile(
              title: const Text('Gender'),
              subtitle: Text(profile!.gender),
            ),
            ListTile(
              title: const Text('Weekly Goal'),
              subtitle: Text('${profile!.weeklyMinutes} min'),
            ),
            ListTile(
              leading: const Icon(Icons.edit),
              title: const Text('Edit My Profile'),
              onTap: goToEditProfile,
            ),
          ],
          const Divider(),
          const Padding(
            padding: EdgeInsets.all(16),
            child: Text('Application', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
          ),
          ListTile(
            leading: const Icon(Icons.restart_alt),
            title: const Text('Reset Onboarding'),
            subtitle: const Text('Useful for debugging or switching profiles.'),
            onTap: resetOnboarding,
          ),
          ListTile(
            leading: const Icon(Icons.delete_forever, color: Colors.red),
            title: const Text('Delete All Data'),
            subtitle: const Text('Erases profile and workouts.'),
            onTap: () async {
              final confirm = await showDialog<bool>(
                context: context,
                builder: (context) => AlertDialog(
                  title: const Text('Confirm Deletion'),
                  content: const Text('Are you sure you want to delete all data?'),
                  actions: [
                    TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Cancel')),
                    TextButton(onPressed: () => Navigator.pop(context, true), child: const Text('Delete')),
                  ],
                ),
              );
              if (confirm == true) await clearAllData();
            },
          ),
        ],
      ),
    );
  }
}
