import React from 'react';
import { View, Text } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const CustomWeekdays = ({ workoutDays }) => {
  // Defines the weekdays starting from Monday
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      {weekdays.map((day, index) => {
        // Direct mapping of workoutDays to weekdays, no adjustment needed
        const isChecked = workoutDays[index] !== 0; // Check if the corresponding day is marked as a workout day

        return (
          <View key={day} style={{ alignItems: 'center' }}>
            <FontAwesome5Icon
              name={isChecked ? 'check-square' : 'square'} // Display check-square if workout day, else square
              color={'white'}
              size={26}
              solid={isChecked} // Use solid icon if it's a workout day
            />
            <Text style={{ fontSize: 18, color: 'white' }}>{day}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default CustomWeekdays;
