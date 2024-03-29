import React, { createContext, useState, useEffect } from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomePage from './src/screens/HomePage';
import ParametersScreen from './src/screens/ParametersScreen';
import AddWorkoutScreen from './src/screens/AddWorkoutScreen';
import EditProfileScreen from './src/screens/Settings/EditProfile';
import CongratulationScreen from './src/screens/CongratulationScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import { Provider as PaperProvider, ProgressBar, IconButton, useTheme, DefaultTheme } from 'react-native-paper';
import { View, StatusBar, ActivityIndicator, Image } from 'react-native';
import BackgroundWorker from './src/utils/BackgroundWorker';


// Status bar color white
StatusBar.setBarStyle('light-content', true);
StatusBar.setBackgroundColor('#282828');


const Stack = createStackNavigator();

const openParameters = ({ navigation }) => {
  navigation.navigate('Parameters');
};

// Custom transition animation
const forFade = ({ current, closing }) => ({
  cardStyle: {
  },
});


const EssentielTheme = {
  ...DarkTheme,
  colors: {
    onSurfaceVariant: "#ffff",
    primary: '#ffff',
    background: '#282828', 
  },
};

const App = () => {
  const [onboardingCompleted, setOnboardingCompleted] = useState(null);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const onboardingStatus = await AsyncStorage.getItem('onboardingCompleted');
      setOnboardingCompleted(onboardingStatus === 'true');
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    }
  };

  if (onboardingCompleted === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#161616' }}>
        <Image source={require('./assets/logo.png')} style={{ width: 1768 / 8, height: 408 / 8, alignSelf: 'center', marginVertical: 16 }} />
        <ActivityIndicator size="large" color="#ffff" />
      </View>
    );
  }

  return (
    <PaperProvider theme={EssentielTheme}>
      <View style={{ flex: 1, backgroundColor: '#161616' }}>
      <BackgroundWorker />
      <NavigationContainer theme={EssentielTheme}>
        <Stack.Navigator
            initialRouteName={onboardingCompleted ? "Home" : "Onboarding"}
            headerShown={false}
            screenOptions={{
              animationEnabled: true,
            }}
        >
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={({ route, navigation }) => ({
            cardStyleInterpolator: forFade,
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
                onPress={() => openParameters({ navigation })}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Parameters"
          component={ParametersScreen}
          options={({ route, navigation }) => ({
            cardStyleInterpolator: forFade,
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
          name="EditProfile"
          component={EditProfileScreen}
          options={({ route, navigation }) => ({
            cardStyleInterpolator: forFade,
            headerShown: true,
            title: 'Edit Profile',
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
            cardStyleInterpolator: forFade,
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
        <Stack.Screen
          name="Congratulation"
          component={CongratulationScreen}
          options={({ route, navigation }) => ({
            cardStyleInterpolator: forFade,
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={({ route, navigation }) => ({
            cardStyleInterpolator: forFade,
            headerShown: false,
          })}
        />

        </Stack.Navigator>
      </NavigationContainer>
      </View>
    </PaperProvider>
  );
};

export default App;
