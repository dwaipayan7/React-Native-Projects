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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const HomePage = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.token);
  const darkMode = useAppSelector(state => state.theme.darkMode);

  const { data, isRefetching } = useSuspenseQuery(createTodoQueryOptions());

  const handleLogout = () => {
    dispatch(logout());
  };

  const themeStyles = {
    backgroundColor: darkMode ? '#121212' : '#f5f5f5',
    textColor: darkMode ? '#ffffff' : '#000000',
    cardBg: darkMode ? '#1e1e1e' : '#cccccc',
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}
    >
      <TouchableOpacity
        style={styles.drawerIcon}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <MaterialIcons
          name="menu"
          size={28}
          color={themeStyles.textColor}
        />
      </TouchableOpacity>

      <Text style={[styles.header, { color: themeStyles.textColor }]}>
        Welcome Home
      </Text>

      {isRefetching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {data?.map((todo: any) => (
            <View
              key={todo.id}
              style={[styles.card, { backgroundColor: themeStyles.cardBg }]}
            >
              <Text style={[styles.title, { color: themeStyles.textColor }]}>
                {todo.title}
              </Text>
              <Text style={[styles.status, { color: themeStyles.textColor }]}>
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
    padding: 15,
    marginBottom: 10,
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
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
