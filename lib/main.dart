// main.dart

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'dart:math';

void main() {
  runApp(EssentielApp());
}

class EssentielApp extends StatelessWidget {
  const EssentielApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Essentiel',
      theme: ThemeData(
        primarySwatch: Colors.teal,
        scaffoldBackgroundColor: Colors.grey[50],
      ),
      home: HomePage(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class Habit {
  String title;
  String description;
  List<String> days; // ["Mon", "Tue", ...]
  TimeOfDay? reminder;
  int streak;
  int totalDone;
  IconData icon;
  bool doneToday;

  Habit({
    required this.title,
    required this.description,
    required this.days,
    this.reminder,
    this.streak = 0,
    this.totalDone = 0,
    required this.icon,
    this.doneToday = false,
  });
}

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<Habit> habits = [];

  @override
  void initState() {
    super.initState();
    // Sample data
    habits.add(Habit(
      title: "Meditate",
      description: "10 minutes of mindfulness",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      icon: Icons.self_improvement,
    ));
  }

  void _markDone(int index) {
    setState(() {
      if (!habits[index].doneToday) {
        habits[index].doneToday = true;
        habits[index].streak++;
        habits[index].totalDone++;
      }
    });
  }

  void _addHabit() async {
    Habit? newHabit = await Navigator.push(
      context,
      MaterialPageRoute(builder: (_) => NewHabitPage()),
    );
    if (newHabit != null) {
      setState(() {
        habits.add(newHabit);
      });
    }
  }

  String _currentDay() {
    return DateFormat('EEE').format(DateTime.now());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Essentiel'),
        actions: [
          IconButton(
            icon: Icon(Icons.bar_chart),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => StatisticsPage(habits: habits)),
              );
            },
          ),
        ],
      ),
      body: ListView(
        padding: EdgeInsets.all(12),
        children: [
          Text(
            "Your habits for ${_currentDay()}",
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 12),
          ...habits.map((habit) {
            int index = habits.indexOf(habit);
            bool showToday = habit.days.contains(_currentDay());
            return showToday ? Card(
              elevation: 3,
              margin: EdgeInsets.symmetric(vertical: 8),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              child: ListTile(
                leading: Icon(habit.icon, size: 32),
                title: Text(habit.title),
                subtitle: Text(habit.description),
                trailing: habit.doneToday
                    ? Icon(Icons.check_circle, color: Colors.green)
                    : IconButton(
                  icon: Icon(Icons.check),
                  onPressed: () => _markDone(index),
                ),
              ),
            ) : SizedBox();
          }).toList(),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _addHabit,
        child: Icon(Icons.add),
      ),
    );
  }
}

class NewHabitPage extends StatefulWidget {
  @override
  _NewHabitPageState createState() => _NewHabitPageState();
}

class _NewHabitPageState extends State<NewHabitPage> {
  final _titleController = TextEditingController();
  final _descController = TextEditingController();
  List<String> selectedDays = [];
  TimeOfDay? reminder;
  IconData selectedIcon = Icons.star;

  List<String> weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  void _pickTime() async {
    TimeOfDay? time = await showTimePicker(
      context: context,
      initialTime: TimeOfDay.now(),
    );
    if (time != null) setState(() => reminder = time);
  }

  void _saveHabit() {
    if (_titleController.text.isEmpty || selectedDays.isEmpty) return;
    Navigator.pop(
      context,
      Habit(
        title: _titleController.text,
        description: _descController.text,
        days: selectedDays,
        reminder: reminder,
        icon: selectedIcon,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("New Habit")),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TextField(
                controller: _titleController,
                decoration: InputDecoration(labelText: "Title"),
              ),
              TextField(
                controller: _descController,
                decoration: InputDecoration(labelText: "Description"),
              ),
              SizedBox(height: 12),
              Text("Select days:"),
              Wrap(
                spacing: 8,
                children: weekDays.map((day) {
                  bool selected = selectedDays.contains(day);
                  return FilterChip(
                    label: Text(day),
                    selected: selected,
                    onSelected: (val) {
                      setState(() {
                        selected
                            ? selectedDays.remove(day)
                            : selectedDays.add(day);
                      });
                    },
                  );
                }).toList(),
              ),
              SizedBox(height: 12),
              Row(
                children: [
                  Text("Reminder: "),
                  reminder == null
                      ? Text("None")
                      : Text(reminder!.format(context)),
                  Spacer(),
                  TextButton(onPressed: _pickTime, child: Text("Pick Time"))
                ],
              ),
              SizedBox(height: 12),
              Text("Select Icon:"),
              Wrap(
                spacing: 8,
                children: [
                  Icons.fitness_center,
                  Icons.book,
                  Icons.star,
                  Icons.water_drop,
                  Icons.self_improvement,
                  Icons.run_circle,
                ].map((icon) {
                  return IconButton(
                    icon: Icon(icon,
                        color: selectedIcon == icon ? Colors.teal : Colors.grey),
                    onPressed: () => setState(() => selectedIcon = icon),
                  );
                }).toList(),
              ),
              SizedBox(height: 24),
              Center(
                child: ElevatedButton(
                  onPressed: _saveHabit,
                  child: Text("Save"),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}

class StatisticsPage extends StatelessWidget {
  final List<Habit> habits;

  StatisticsPage({required this.habits});

  @override
  Widget build(BuildContext context) {
    int totalHabits = habits.length;
    int completedToday = habits.where((h) => h.doneToday).length;
    int totalStreaks = habits.fold(0, (a, b) => a + b.streak);

    return Scaffold(
      appBar: AppBar(title: Text("Statistics")),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("Habits created: $totalHabits"),
            Text("Completed today: $completedToday"),
            Text("Total streaks: $totalStreaks"),
            SizedBox(height: 20),
            Text("Streaks by habit:", style: TextStyle(fontWeight: FontWeight.bold)),
            ...habits.map((h) => ListTile(
              title: Text(h.title),
              trailing: Text("${h.streak} 🔥"),
            ))
          ],
        ),
      ),
    );
  }
}
