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

    // Check if all data values are zero
    const isNoData = data.every((value) => value === 0);

    return (
        <Card style={styles.card}>
            {isNoData ? (
                <Text style={styles.noDataText}>No Data Available</Text>
            ) : (
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
                                    { height: `${(value / maxValue) * 76}%` },
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
            )}
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 10,
        marginTop: 16,
        backgroundColor: '#161616',
        borderColor: '#282828',
        borderWidth: 1,
        borderRadius: 24,
    },
    titleContainer: {
        marginLeft: 10, // Adjust the margin as needed
    },
    title: {
        fontSize: 14,
        color: 'grey',
        fontWeight: 'bold',
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
        backgroundColor: '#282828',
        marginBottom: 5,
    },
    selectedBar: {
        backgroundColor: 'white', // Change the color of the selected bar
    },
    label: {
        color: 'white',
    },
    value: {
        fontWeight: 'bold',
        marginTop: 5,
        position: 'absolute',
        top: -25, // To adjust the position of the value text
        color: 'grey',

        textAlign: 'center',
    },
    noDataText: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        color: 'lightgrey',
    },
});

export default WorkoutBarChart;
