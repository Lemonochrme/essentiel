import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Vibration, TouchableOpacity } from 'react-native';
import { Button, Dialog, Portal, Text, Provider, Card, Title } from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingsMenu from './SettingsMenu';

const ParametersScreen = ({ navigation }) => {
  const onPressEditProfile = () => {
    navigation.navigate('EditProfile');
    Vibration.vibrate(70);
  };

  return (
    <Provider>
      <View style={styles.container}>
        <TouchableOpacity onPress={onPressEditProfile}>
          <Card style={{ backgroundColor: '#161616', borderColor: '#282828', borderWidth: 1 }}>
            <Card.Content>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesome5Icon name="user-circle" size={50} color="white" style={{ marginRight: 16 }} />
                  <View style={{ top: -3 }}>
                    <Title style={{ color: 'white' }}>Profile</Title>
                    <Text style={{ color: 'white' }}>Edit Profile</Text>
                  </View>
                </View>
                <FontAwesome5Icon name="chevron-right" size={24} color="white" />
              </View>
            </Card.Content>
          </Card>
        </TouchableOpacity>

        <View style={{ paddingTop: 16 }}>
          <SettingsMenu />
        </View>
        
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#161616',
  },
});

export default ParametersScreen;
