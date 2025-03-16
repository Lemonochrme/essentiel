import 'package:flutter/material.dart';

class WorkoutBarChart extends StatelessWidget {
  final List<int> data;

  const WorkoutBarChart({Key? key, required this.data}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    int maxValue = data.isNotEmpty ? data.reduce((a, b) => a > b ? a : b) : 0;
    int range = maxValue > 0 ? (maxValue / 3).ceil() : 1;
    List<int> yAxisValues = List.generate(4, (i) => i * range).reversed.toList();
    bool isNoData = data.every((value) => value == 0);

    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(24),
        side: const BorderSide(color: Color(0xFF282828), width: 1),
      ),
      color: const Color(0xFF161616),
      child: Padding(
        padding: const EdgeInsets.all(10),
        child: isNoData
            ? const Center(
                child: Text(
                  "Nothing to see here",
                  style: TextStyle(fontSize: 16, color: Colors.grey),
                ),
              )
            : Row(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Column(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: yAxisValues
                        .map((value) => Text(
                              value.toString(),
                              style: const TextStyle(color: Colors.white),
                            ))
                        .toList(),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: List.generate(data.length, (index) {
                        double heightPercentage =
                            maxValue > 0 ? (data[index] / maxValue) * 76 : 0;
                        return Column(
                          children: [
                            Container(
                              width: 10,
                              height: heightPercentage,
                              decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(5),
                              ),
                            ),
                            const SizedBox(height: 5),
                            Text(
                              ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                                  [index],
                              style: const TextStyle(color: Colors.white),
                            ),
                          ],
                        );
                      }),
                    ),
                  ),
                ],
              ),
      ),
    );
  }
}
