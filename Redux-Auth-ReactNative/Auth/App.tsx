// import { StyleSheet, View } from 'react-native';
// import AppNavigation from './src/components/navigation/AppNavigation';
// import { Provider } from 'react-redux';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { store } from './src/redux/store/store';
// import MyDrawer from './src/components/drawer/MyDrawer';
// import { NavigationContainer } from '@react-navigation/native';

// function App() {
//   const queryClient = new QueryClient();

//   return (
//     <Provider store={store}>
//       <QueryClientProvider client={queryClient}>
//         <View style={styles.container}>
//           {/* <RegisterPage /> */}
//           {/* <LoginPage /> */}
//           {/* <AppNavigation /> */}
//           <MyDrawer/>
//         </View>

//         {/* <NavigationContainer>
//       <MyDrawer />
//     </NavigationContainer> */}
//       </QueryClientProvider>
//     </Provider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;


// App.tsx
import { StyleSheet, View } from 'react-native';
import AppNavigation from './src/components/navigation/AppNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {/* <View style={styles.container}> */}
          <AppNavigation />
        {/* </View> */}
      </QueryClientProvider>
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
