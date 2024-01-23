import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/screens/HomePage';
import WorkoutTypeScreen from './src/screens/WorkoutTypeScreen';
import WorkoutIntensityScreen from './src/screens/WorkoutIntensityScreen';
import WorkoutTimeScreen from './src/screens/WorkoutTimeScreen';
import { Provider as PaperProvider, MD3DarkTheme, ProgressBar } from 'react-native-paper';

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider theme={MD3DarkTheme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" headerMode="none">
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen
            name="WorkoutType"
            component={WorkoutTypeScreen}
            options={({ route, navigation }) => ({
              headerShown: true,
              title: '',
              headerTintColor: 'white',
              headerTransparent: true,
              headerRight: () => (
                <ProgressBar
                  progress={0.10}
                  color="white"
                  style={{ alignSelf: 'center', top: 30, left: -35 }}
                />
              ),
            })}
          />

          <Stack.Screen
            name="WorkoutIntensity"
            component={WorkoutIntensityScreen}
            options={({ route, navigation }) => ({
              headerShown: true,
              title: '',
              headerTintColor: 'white',
              headerTransparent: true,
              headerRight: () => (
                <ProgressBar
                  progress={0.50}
                  color="white"
                  style={{ alignSelf: 'center', top: 30, left: -35 }}
                />
              ),
            })}
          />

          <Stack.Screen
            name="WorkoutTime"
            component={WorkoutTimeScreen}
            options={({ route, navigation }) => ({
              headerShown: true,
              title: '',
              headerTintColor: 'white',
              headerTransparent: true,
              headerRight: () => (
                <ProgressBar
                  progress={0.90}
                  color="white"
                  style={{ alignSelf: 'center', top: 30, left: -35 }}
                />
              ),
            })}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
