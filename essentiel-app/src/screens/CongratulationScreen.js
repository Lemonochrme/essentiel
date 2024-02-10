import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import CustomButton from './CustomButtom';

const CongratulationScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* LottieView with absolute positioning */}
            <LottieView
                source={require('../../assets/confetti.json')}
                autoPlay
                loop={false}
                style={StyleSheet.absoluteFill}
            />
            <Text style={{ color: '#FFFFFF', textAlign: 'center', fontSize: 40, fontWeight: 'bold', marginTop: 200 }}>242 points</Text>
            <Image
                source={require('../../assets/illustration-victory-male.png')}
                style={{ width: 666 / 3, height: 954 / 3, alignSelf: 'center' }}
            />
            <CustomButton title="Got it !" onPress={() => navigation.navigate('Home')} />
        </View>
    );
}

export default CongratulationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161616',
        justifyContent: 'space-between',
        padding: 16,
    },
});
