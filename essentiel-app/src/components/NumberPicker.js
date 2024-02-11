import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const NumberPicker = ({ minValue, maxValue, step = 1, onValueChange }) => {
  const [selectedValue, setSelectedValue] = useState(minValue);

  const handleValueChange = (value) => {
    setSelectedValue(value);
    onValueChange(value);
  };

  const renderNumbers = () => {
    const numbers = [];
    for (let i = minValue; i <= maxValue; i += step) {
      const isSelected = i === selectedValue;
      numbers.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.numberContainer,
            isSelected ? styles.selected : styles.unselected,
          ]}
          onPress={() => handleValueChange(i)}>
          <Text style={[styles.numberText, isSelected && styles.selectedText]}>{i} min</Text>
        </TouchableOpacity>
      );
    }
    return numbers;
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      overScrollMode="never"
      contentContainerStyle={styles.scrollContainer}>
      {renderNumbers()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  numberContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  numberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  selected: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  unselected: {
    backgroundColor: 'transparent',
    borderColor: '#282828',
  },
  selectedText: {
    color: 'black',
  },
});

export default NumberPicker;
