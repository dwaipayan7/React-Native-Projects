// import { createDrawerNavigator } from '@react-navigation/drawer';
// import ProfilePage from '../../pages/ProfilePage';
// import DetailsPage from '../../pages/DetailsPage';
// import HomePage from '../../pages/HomePage'; // Import HomePage
// import { NavigationContainer } from '@react-navigation/native';
// import BottomTabNavigator from '../bottomNavBar/MainPage';

// const Drawer = createDrawerNavigator();

// const MyDrawer = () => {
//   return (
//     // REMOVED NavigationContainer wrapper
// //    <NavigationContainer>
//      <Drawer.Navigator
//       screenOptions={{
//         headerShown: false,
//         drawerPosition: 'left',
//       }}
//     >
//       {/* <Drawer.Screen name="Home" component={HomePage} />
//       <Drawer.Screen name="Profile" component={ProfilePage} />
//       <Drawer.Screen name="Details" component={DetailsPage} /> */}
//     </Drawer.Navigator>
//     {/* <BottomTabNavigator/> */}
// //    </NavigationContainer>
//   );
// };

// export default MyDrawer;

// src/components/drawer/MyDrawer.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from '../bottomNavBar/MainPage'; // Your BottomTabNavigator
import CustomDrawerContent from './CustomDrawerContent';
// import HomePage from '../../pages/HomePage';
// import ProfilePage from '../../pages/ProfilePage';
// import DetailsPage from '../../pages/DetailsPage';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Tabs"
        component={BottomTabNavigator}
        options={{
          drawerItemStyle: { display: 'none' },
          headerShown: false,
        }}
      />
      {/* <Drawer.Screen name="Home" component={HomePage} />
      <Drawer.Screen
        name="Profile"
        component={ProfilePage}
        // options={{
        //   headerShown: true,
        //   title: 'Profile',
        //   headerTitleAlign: 'center'
        // }}
      />
      <Drawer.Screen
        name="Details"
        component={DetailsPage}
        // options={{
        //   headerShown: true,
        //   title: 'Details',
        //   headerTitleAlign: 'center'
        // }}
      /> */}
    </Drawer.Navigator>
  );
};

export default MyDrawer;
