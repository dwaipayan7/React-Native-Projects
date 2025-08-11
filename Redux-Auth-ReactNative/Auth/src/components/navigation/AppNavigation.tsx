// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';
// import LoginPage from '../../features/auth/pages/LoginPage';
// import RegisterPage from '../../features/auth/pages/RegisterPage';
// import BottomTabNavigator from '../bottomNavBar/MainPage';
// import HomePage from '../../pages/HomePage';
// import MyDrawer from '../drawer/MyDrawer';
// // import MyDrawer from '../drawer/MyDrawer';

// const Stack = createNativeStackNavigator();

// const AppNavigation = () => {
//   //Root state

//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Login" component={LoginPage} />
//         <Stack.Screen name="Register" component={RegisterPage} />
//         {/* <Stack.Screen name="Home" component={HomePage} /> */}

//         <Stack.Screen name="MainPage" component={BottomTabNavigator} />
//       </Stack.Navigator>

//       {/* <NavigationContainer>
//         <MyDrawer />
//       </NavigationContainer> */}
//     </NavigationContainer>
//   );
// };

// export default AppNavigation;


// src/components/navigation/AppNavigation.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import LoginPage from '../../features/auth/pages/LoginPage';
import RegisterPage from '../../features/auth/pages/RegisterPage';
import MyDrawer from '../drawer/MyDrawer';
import { useAppSelector } from '../hooks/hooks';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {

  //useSelector((state: RootState) => state.theme.darkMode);
  const darkMode = useAppSelector(state => state.theme.darkMode);

  return (
    <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Main" component={MyDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
