import React from 'react';
import { View, Text, Image, StyleSheet, Vibration } from 'react-native';
import LottieView from 'lottie-react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import CustomButton from '../components/CustomButtom';

const CongratulationScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <LottieView
                source={require('../../assets/confetti-alt.json')}
                autoPlay
                speed={2}
                loop={false}
                style={{ position: 'absolute', width: 350, height: 350, alignSelf: 'center', top: 180 }}
            />
            <Image
                source={require('../../assets/illustration-get-started.png')}
                style={{ width: 1003 / 3, height: 825 / 3, alignSelf: 'center', top: 64 }}
            />
            <View>
                <FontAwesome5Icon name="check" size={64} color="white" style={{ alignSelf: 'center' }} />
                <Text style={{ color: '#FFFFFF', textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>You successfully added a new workout !</Text>
                <Text style={{ color: 'grey', textAlign: 'center', fontSize: 24 }}>Every step counts</Text>
            </View>
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
        paddingTop: 64,
    },
});
