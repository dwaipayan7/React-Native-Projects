import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/slices/AuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

const HomePage = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.token);

  const handleLogout = () => {
    dispatch(logout());
    if (auth === null) {
      navigation.navigate('Login');
    }
    // dispatch(log)
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 22 }}>Welcome Home!</Text>
      <Button
        title="Logout"
        onPress={() => {
          // dispatch(logout())
          handleLogout();
        }}
      />
    </View>
  );
};

export default HomePage;
