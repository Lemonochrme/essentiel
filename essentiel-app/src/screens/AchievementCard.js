import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const AchievementCard = ({ title, subtitle, currentProgress, totalProgress }) => {
  const completionText = `${currentProgress}/${totalProgress}`;
  const isCompleted = currentProgress === totalProgress;

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarLabelContainer}>
          <Text style={styles.progressLabel}>Progress</Text>
          {isCompleted ? (
            <FontAwesome5Icon name="check" style={styles.checkIcon} />
          ) : (
            <Text style={styles.progressText}>{completionText}</Text>
          )}
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFiller,
              isCompleted && { backgroundColor: 'lightgreen' },
              { width: `${(currentProgress / totalProgress) * 100}%` },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#282828',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
    marginTop: 8,
  },
  progressBarContainer: {
    flexDirection: 'column',
    marginTop: 12,
  },
  progressBarLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    color: 'white',
    fontSize: 14,
  },
  progressText: {
    color: 'white',
    fontSize: 14,
  },
  progressBar: {
    backgroundColor: '#161616',
    height: 10,
    borderRadius: 5,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFiller: {
    backgroundColor: 'white', // Default color
    height: '100%',
  },
  checkIcon: {
    color: 'lightgreen',
    fontSize: 20,
    marginRight: 5,
  },
});

export default AchievementCard;
