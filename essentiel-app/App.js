import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/screens/HomePage';
import WorkoutTypeScreen from './src/screens/WorkoutTypeScreen';
import WorkoutIntensityScreen from './src/screens/WorkoutIntensityScreen';
import WorkoutTimeScreen from './src/screens/WorkoutTimeScreen';
import AppOptionsScreen from './src/screens/AppOptionsScreen';
import AddWorkoutScreen from './src/screens/AddWorkoutScreen';
import { Provider as PaperProvider, MD3DarkTheme, ProgressBar, IconButton } from 'react-native-paper';
import { View, StatusBar } from 'react-native';


// Status bar color white
StatusBar.setBarStyle('light-content', true);

const Stack = createStackNavigator();

const openAppOptions = ({ navigation }) => {
  console.log('Open app options');
  navigation.navigate('AppOptions');
};

const App = () => {
  return (
    <PaperProvider theme={MD3DarkTheme}>
      <NavigationContainer>
        <Stack.Navigator
            initialRouteName="Home"
            headerShown={false}
            screenOptions={{
              animationEnabled: false,
            }}
            presentation="modal" // To avoid white flickering while switching screens
        >
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={({ route, navigation }) => ({
            headerShown: true,
            title: 'Essentiel',
            headerStyle: {
              backgroundColor: '#28242c',
            },
            headerTitleStyle: {
              fontWeight: '600',
              color: 'white',
            },
            headerShadowVisible: false,
            headerRight: () => (
              <IconButton
                icon="dots-vertical"
                color="white"
                onPress={() => openAppOptions({ navigation })}
              />
            ),
          })}
        />
          
          
          <Stack.Screen
            name="WorkoutType"
            component={WorkoutTypeScreen}
            options={({ route, navigation }) => ({
              headerShown: true,
              title: '',
              headerTintColor: 'white',
              headerTransparent: true,
              headerRight: () => (
              <View style={{width: '60%', alignSelf: 'center', left: -40}}>
                <ProgressBar
                  progress={0.10}
                  color="white"
                  style={{borderRadius: 10}}
                />
              </View>
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
                <View style={{width: '60%', alignSelf: 'center', left: -40}}>
                  <ProgressBar
                    progress={0.50}
                    color="white"
                    style={{borderRadius: 10}}
                  />
                </View>
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
                <View style={{width: '60%', alignSelf: 'center', left: -40}}>
                  <ProgressBar
                    progress={0.90}
                    color="white"
                    style={{borderRadius: 10}}
                  />
                </View>
              ),
            })}
          />

          <Stack.Screen
            name="AppOptions"
            component={AppOptionsScreen}
            options={({ route, navigation }) => ({
              headerShown: true,
              title: 'Options',
              headerTintColor: 'white',
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: '#28242c',
              },
              headerTitleStyle: {
                fontWeight: '600',
                color: 'white',
              },
            })}
          />

          <Stack.Screen
            name="AddWorkout"
            component={AddWorkoutScreen}
            options={({ route, navigation }) => ({
              headerShown: true,
              title: 'Add Workout',
              headerTintColor: 'white',
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: '#28242c',
              },
              headerTitleStyle: {
                fontWeight: '600',
                color: 'white',
              },
            })}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
