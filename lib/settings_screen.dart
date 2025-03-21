import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  final TextEditingController _controller = TextEditingController();
  late Box<String> _journalBox;
  bool _isHiveInitialized = false;

  @override
  void initState() {
    super.initState();
    _initHive();
  }

  Future<void> _initHive() async {
    await Hive.initFlutter();
    _journalBox = await Hive.openBox<String>('journal');
    setState(() {
      _isHiveInitialized = true;
    });
  }

  void _addEntry(String text) {
    if (text.trim().isEmpty) return;
    _journalBox.add(text.trim());
    _controller.clear();
    setState(() {});
  }

  void _deleteEntry(int index) {
    _journalBox.deleteAt(index);
    setState(() {});
  }

  @override
  void dispose() {
    _controller.dispose();
    Hive.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!_isHiveInitialized) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    final entries = _journalBox.values.toList().reversed.toList();

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Image.asset(
              'assets/icons/light-essentiel-logo.png',
              height: 20,
            ),
            const SizedBox(width: 4),
            const Text('Essentiel'),
          ],
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _controller,
              decoration: const InputDecoration(
                labelText: 'Nouvelle entrée',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 12),
            ElevatedButton(
              onPressed: () => _addEntry(_controller.text),
              child: const Text('Enregistrer'),
            ),
            const SizedBox(height: 20),
            const Text(
              'Historique des entrées :',
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Expanded(
              child: ListView.builder(
                itemCount: entries.length,
                itemBuilder: (context, index) {
                  final realIndex = entries.length - 1 - index;
                  return Dismissible(
                    key: Key(entries[index]),
                    direction: DismissDirection.endToStart,
                    background: Container(
                      color: Colors.red,
                      alignment: Alignment.centerRight,
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      child: const Icon(Icons.delete, color: Colors.white),
                    ),
                    onDismissed: (_) => _deleteEntry(realIndex),
                    child: ListTile(
                      leading: const Icon(Icons.note),
                      title: Text(entries[index]),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
