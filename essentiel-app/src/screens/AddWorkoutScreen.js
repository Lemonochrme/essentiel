import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddWorkoutScreen = ({ navigation, route }) => {

  return (
    <View style={{ flex: 1, justifyContent: 'space-between', backgroundColor: '#1C1B1F' }}>
        <Text>Add</Text>
    </View>
  );
};

export default AddWorkoutScreen;
