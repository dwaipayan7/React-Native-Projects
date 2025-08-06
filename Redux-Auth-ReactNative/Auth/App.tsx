
import {  StyleSheet, View } from 'react-native';
import AppNavigation from './src/navigation/AppNavigation';
import { Provider } from 'react-redux';
import { store } from './src/store/store';


function App() {


  return (
    <Provider store={store}>
          <View style={styles.container}>
      {/* <RegisterPage /> */}
      {/* <LoginPage /> */}
      <AppNavigation/>
    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
