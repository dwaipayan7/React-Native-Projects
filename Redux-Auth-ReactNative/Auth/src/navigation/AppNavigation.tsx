import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import HomePage from '../pages/HomePage';
import BottomTabNavigator from '../bottomNavBar/MainPage';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  //Root state

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Home" component={HomePage} />

        <Stack.Screen name='MainPage' component={BottomTabNavigator}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
