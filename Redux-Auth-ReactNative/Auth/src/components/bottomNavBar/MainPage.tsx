import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../../pages/HomePage';
import DetailsPage from '../../pages/DetailsPage';
import ProfilePage from '../../pages/ProfilePage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAppSelector } from '../hooks/hooks';
import React from 'react';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const darkMode = useAppSelector(state => state.theme.darkMode);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: darkMode ? '#4da6ff' : '#007bff',
        tabBarInactiveTintColor: darkMode ? '#aaa' : '#777',
        tabBarStyle: {
          backgroundColor: darkMode ? '#121212' : '#fff',
          borderTopWidth: 0.5,
          borderTopColor: darkMode ? '#333' : '#ccc',
          paddingBottom: 5,
          height: 60,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: string = '';

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Details') {
            iconName = 'info';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Details" component={DetailsPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
