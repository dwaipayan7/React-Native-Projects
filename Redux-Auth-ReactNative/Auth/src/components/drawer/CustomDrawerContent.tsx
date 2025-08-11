import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { toggleTheme } from '../../features/auth/slices/ThemeSlice';
import { Text, StyleSheet } from 'react-native';

const CustomDrawerContent = (props: any) => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(state => state.theme.darkMode);
  const navigation = props.navigation;

  return (
    <DrawerContentScrollView 
      {...props} 
      style={{ backgroundColor: darkMode ? '#121212' : '#ffffff' }}
    >
      {/* Theme Toggle */}
      <DrawerItem
        label={() => (
          <Text style={[styles.label, { color: darkMode ? 'white' : 'black' }]}>
            {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </Text>
        )}
        onPress={() => dispatch(toggleTheme())}
      />

      {/* Navigation Items */}
      <DrawerItem
        label={() => (
          <Text style={[styles.label, { color: darkMode ? 'white' : 'black' }]}>Home</Text>
        )}
        onPress={() => navigation.navigate('Tabs', { screen: 'Home' })}
      />
      <DrawerItem
        label={() => (
          <Text style={[styles.label, { color: darkMode ? 'white' : 'black' }]}>Profile</Text>
        )}
        onPress={() => navigation.navigate('Tabs', { screen: 'Profile' })}
      />
      <DrawerItem
        label={() => (
          <Text style={[styles.label, { color: darkMode ? 'white' : 'black' }]}>Details</Text>
        )}
        onPress={() => navigation.navigate('Tabs', { screen: 'Details' })}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
  },
});

export default CustomDrawerContent;
