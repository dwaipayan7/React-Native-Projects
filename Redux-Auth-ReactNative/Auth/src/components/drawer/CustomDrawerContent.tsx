import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
// import { useNavigation } from '@react-navigation/native';

const CustomDrawerContent = (props: any) => {
  // const navigation = useNavigation<any>();
    const navigation = props.navigation;
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Home"
        onPress={() => navigation.navigate('Tabs', { screen: 'Home' })}
      />
      <DrawerItem
        label="Profile"
        onPress={() => navigation.navigate('Tabs', { screen: 'Profile' })}
      />
      <DrawerItem
        label="Details"
        onPress={() => navigation.navigate('Tabs', { screen: 'Details' })}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
