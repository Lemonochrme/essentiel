import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/screens/HomePage';
import AppOptionsScreen from './src/screens/AppOptionsScreen';
import AddWorkoutScreen from './src/screens/AddWorkoutScreen';
import { Provider as PaperProvider, MD3DarkTheme, ProgressBar, IconButton } from 'react-native-paper';
import { View, StatusBar } from 'react-native';


// Status bar color white
StatusBar.setBarStyle('light-content', true);

const Stack = createStackNavigator();

const openAppOptions = ({ navigation }) => {
  navigation.navigate('AppOptions');
};

const CustomTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
  },
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
              backgroundColor: '#282828',
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
            name="AppOptions"
            component={AppOptionsScreen}
            options={({ route, navigation }) => ({
              headerShown: true,
              title: 'Settings',
              headerTintColor: 'white',
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: '#282828',
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
                backgroundColor: '#282828',
              },
              headerTitleStyle: {
                fontWeight: '600',
                color: 'white',
              },
              headerRight: () => (
                <IconButton
                  icon="calendar"
                  color="white"
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
