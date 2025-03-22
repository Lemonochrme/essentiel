import 'package:hive/hive.dart';

part 'user_profile.g.dart';

@HiveType(typeId: 100)
class UserProfile extends HiveObject {
  @HiveField(0)
  String username;

  @HiveField(1)
  String gender;

  @HiveField(2)
  int weeklyMinutes;

  UserProfile({
    required this.username,
    required this.gender,
    required this.weeklyMinutes,
  });
}