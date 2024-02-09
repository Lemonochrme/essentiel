import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import CustomButton from './CustomButtom';

const GetStartedScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Essentiel</Text>
        <Text style={styles.subtitle}>Track your workouts and reach your goals</Text>
      </View>
      <View style={styles.imageContainer}>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton title="Get Started" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#161616',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: 100,
  },
  title: {
    fontSize: 34,
    color: 'white',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    width: 200,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 30,
  },
});

export default GetStartedScreen;
