import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Keyboard, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';
import CustomButton from './CustomButtom';
import NumberPicker from '../components/NumberPicker';

const OnboardingScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [selectedGender, setSelectedGender] = useState(null);
    const [showWelcomeText, setShowWelcomeText] = useState(false);
    const [selectedValue, setSelectedValue] = useState(0);

    const handleValueChange = (value) => {
        setSelectedValue(value);
    };

    const handleNameChange = (text) => {
        setName(text);
        setIsValid(text.trim().length > 0);
    };

    const handleGenderSelection = (gender) => {
        Keyboard.dismiss();
        setSelectedGender(gender);
    };

    const handleContinue = async () => {
        Keyboard.dismiss();
        setShowWelcomeText(true);
        
        const profileData = {
            name,
            gender: selectedGender,
            trainingTimeGoal: selectedValue,
        };

        try {
            await AsyncStorage.setItem('profileData', JSON.stringify(profileData));
            // Set onboarding completed flag to true
            await AsyncStorage.setItem('onboardingCompleted', 'true');

            setTimeout(() => {
                setShowWelcomeText(false);
                navigation.navigate('Home');
            }, 1000); // 1 second delay
        } catch (error) {
            console.error('Error saving profile data:', error);
            // Handle error saving data
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View>
                    <Image source={require('../../assets/logo.png')} style={{ width: 1768 / 8, height: 408 / 8, alignSelf: 'center', marginTop: 16 }} />
                    <View style={{ height: 2, width: '100%', backgroundColor: '#161616', borderRadius: 10 }} />
                    <Text style={styles.label}>What's your name ?</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={handleNameChange}
                        placeholder="Enter your name"
                        placeholderTextColor="white"
                    />
                    <Text style={styles.label}>What's your gender ?</Text>
                    <View style={styles.genderContainer}>
                        <TouchableOpacity
                            style={[styles.genderCard, selectedGender === 'male' && styles.selectedCard]}
                            onPress={() => handleGenderSelection('male')}
                        >
                            <FontAwesome5Icon name="mars" size={50} color="white" />
                            <Text style={styles.text}>Male</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.genderCard, selectedGender === 'female' && styles.selectedCard]}
                            onPress={() => handleGenderSelection('female')}
                        >
                            <FontAwesome5Icon name="venus" size={50} color="white" />
                            <Text style={styles.text}>Female</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.label}>And your weekly goal ?</Text>
                    <NumberPicker minValue={100} maxValue={400} step={10} onValueChange={handleValueChange} />
                    <Text style={{ color: "grey", fontSize: 16, paddingVertical: 32 }}>The WHO recommends dedicating at least 150 to 300 minutes per week to moderate-intensity activity.</Text>
                    <CustomButton
                        title="Continue"
                        onPress={handleContinue}
                        disabled={!isValid || !selectedGender}
                    />
                </View>
            </View>

            {showWelcomeText && (
                <View style={styles.overlay}>
                    <Image source={require('../../assets/illustration-get-started.png')} style={{ width: 1003/3, height: 825/3, marginTop: 16 }} />
                    <Text style={styles.welcomeText}>Welcome {name}!</Text>
                    <LottieView
                        source={require('../../assets/confetti.json')}
                        autoPlay
                        loop={true}
                        style={StyleSheet.absoluteFill}
                    />
                </View>
            )}
        </View>
    );
}

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161616',
        padding: 16,
        justifyContent: 'space-between',
    },
    contentContainer: {
        flex: 1,
        marginTop: 20,
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        paddingVertical: 16,
    },
    text: {
        color: 'white',
        fontSize: 20,     
    },
    input: {
        backgroundColor: '#282828',
        padding: 10,
        borderRadius: 5,
        marginBottom: 16,
        color: 'white',
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    genderCard: {
        width: '48%',
        backgroundColor: '#161616',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#282828',
        height: 200,
    },
    selectedCard: {
        borderColor: 'white',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#161616',
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
});
