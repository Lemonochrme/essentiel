import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Card } from 'react-native-paper';

const WorkoutBarChart = ({ data }) => {
    const maxValue = Math.max(...data); // Find the maximum value in the data array
    const [selectedBarIndex, setSelectedBarIndex] = useState(null);

    const handleBarPress = (index) => {
        if (selectedBarIndex === index) {
            // Deselect the bar if it's already selected
            setSelectedBarIndex(null);
        } else {
            setSelectedBarIndex(index);
        }
    };

    return (
        <Card style={styles.card}>
            <View style={styles.container}>
                {data.map((value, index) => (
                    <Pressable
                        key={index}
                        onPress={() => handleBarPress(index)}
                        style={({ pressed }) => [
                            styles.barContainer,
                            {
                                opacity: pressed ? 0.5 : 1,
                            },
                        ]}
                    >
                        <View
                            style={[
                                styles.bar,
                                { height: `${(value / maxValue) * 80}%` },
                                selectedBarIndex === index ? styles.selectedBar : null,
                            ]}
                        />
                        {selectedBarIndex === index && (
                            <Text style={styles.value}>{value}</Text>
                        )}
                        <Text style={styles.label}>
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                        </Text>
                    </Pressable>
                ))}
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 10,
        margin: 10,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        height: 150,
    },
    barContainer: {
        alignItems: 'center',
        position: 'relative',
    },
    bar: {
        width: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        marginBottom: 5,
    },
    selectedBar: {
        backgroundColor: 'lightgrey', // Change the color of the selected bar
    },
    label: {
        fontSize: 10,
        color: 'grey',
    },
    value: {
        fontSize: 9,
        fontWeight: 'bold',
        marginTop: 5,
        position: 'absolute',
        top: -25, // To adjust the position of the value text
        color: 'grey',
        left: 0,
        right: 0,
        textAlign: 'center',
    },
});

export default WorkoutBarChart;
