import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SimpleCalendar = () => {
  const today = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const displayedDays = [];

  for (let i = -2; i <= 2; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() + i);
    displayedDays.push({
      dayName: days[day.getDay()],
      dayNumber: day.getDate(),
    });
  }

  return (
    <View style={styles.container}>
      {displayedDays.map((day, index) => (
        <View
          key={index}
          style={[
            styles.dayContainer,
            index === 2 && styles.currentDayContainer,
            index === 0 && styles.separator,
            index === 3 && styles.separator,
          ]}
        >
          <Text style={styles.dayNumber}>{day.dayNumber}</Text>
          <Text style={[styles.dayText, index === 2 && styles.currentDayText]}>
            {day.dayName}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
  },
  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentDayContainer: {
    borderRadius: 30,
    borderColor: '#282828',
    borderWidth: 1,
  },
  separator: {
    borderRightWidth: 1,
    borderColor: '#282828',
  },
  dayText: {
    fontSize: 16,
    color: 'white',
  },
  currentDayText: {
  },
  dayNumber: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SimpleCalendar;
