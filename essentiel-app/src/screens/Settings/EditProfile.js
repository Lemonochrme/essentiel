import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/CustomButtom';

const EditProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [trainingTimeGoal, setTrainingTimeGoal] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      // Load saved data from AsyncStorage
      const savedData = await AsyncStorage.getItem('profileData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setName(parsedData.name || '');
        setGender(parsedData.gender || '');
        setTrainingTimeGoal(parsedData.trainingTimeGoal || '');
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>In dev</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
    padding: 16,
  },
  label: {
    color: 'white',
    fontSize: 18,
    marginBottom: 8,
  },
});

export default EditProfileScreen;
