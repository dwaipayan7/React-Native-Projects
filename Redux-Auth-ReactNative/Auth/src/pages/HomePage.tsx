import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { logout } from '../features/auth/slices/AuthSlice';
import createTodoQueryOptions from '../components/queryOptions/todoQueryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../components/hooks/hooks';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';


//{ navigation }
const HomePage = () => {

  // const drawer = useNavigation();
  const navigation = useNavigation();

  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.token);

  const { data, isRefetching } = useSuspenseQuery(createTodoQueryOptions());

  const handleLogout = () => {
    dispatch(logout());
    if (auth === null) {
      // navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.drawerIcon}
        // onPress={() => navigation.openDrawer()
       onPress={() => navigation.dispatch(DrawerActions.openDrawer())



        } 
      >
        <MaterialIcons name="menu" size={28} color="#000" />
      </TouchableOpacity>

      <Text style={styles.header}>Welcome Home</Text>

      {isRefetching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {data?.map((todo: any) => (
            <View key={todo.id} style={styles.card}>
              <Text style={styles.title}>{todo.title}</Text>
              <Text style={styles.status}>
                {todo.completed ? 'Completed' : 'Pending'}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}

      <View style={styles.buttonContainer}>
        <Button title="LogOut" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    borderRadius: 12,
    backgroundColor: 'gray',
    padding: 15,
    marginBottom: 10,
  },
  title: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: 'white',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  drawerIcon: {
    position: 'absolute',
    top: 58,
    left: 10,
    zIndex: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
