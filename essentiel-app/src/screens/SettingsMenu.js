import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const MenuScreen = () => {
  const menuItems = [
    { title: "Language", onPress: () => {} },
    { title: "Notifications", onPress: () => {} },
    { title: "Data Controls", onPress: () => {} },
    { title: "Help & Support", onPress: () => {} },
  ];

  const MenuItem = ({ title, onPress, isLast }) => (
    <TouchableOpacity
      style={[
        styles.menuItem,
        !isLast && styles.menuItemWithBorder, // Add border if it's not the last item
      ]}
      onPress={onPress}
    >
      <Title style={styles.menuItemText}>{title}</Title>
      <FontAwesome5Icon name="chevron-right" size={24} color="white" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          title={item.title}
          onPress={item.onPress}
          isLast={index === menuItems.length - 1}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161616',
    borderRadius: 14,
    borderColor: '#282828',
    borderWidth: 1,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  menuItemWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuItemText: {
    color: 'white',
    fontSize: 18,
  },
});

export default MenuScreen;
