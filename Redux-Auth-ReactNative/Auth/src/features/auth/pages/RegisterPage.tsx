import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { registerUser } from '../slices/AuthSlice';
import { useAppDispatch,useAppSelector } from '../../../components/hooks/hooks';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short').required(),
  email: Yup.string().email('Invalid Email').required(),
  password: Yup.string().min(4, 'Too Short').required(),
});

const RegisterPage = ({navigation}) => {

  const dispatch = useAppDispatch();

  const auth = useAppSelector(state => state);

  useEffect(()=> {
    if(auth?.token){
      navigation.navigate('Home');
    }
     if (auth?.error) {
          Alert.alert('Login Failed', auth.error);
        }
  }, [auth?.token, auth?.error, navigation])

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={RegisterSchema}
      onSubmit={(values) => {
        // Alert.alert('Form Submitted', JSON.stringify(values, null, 2));
        dispatch(registerUser(values))
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <Text style={styles.title}>RegisterPage</Text>

          <TextInput
            style={styles.textInput}
            placeholder="Name"
            placeholderTextColor="gray"
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
          />
          {touched.name && errors.name && (
            <Text style={styles.error}>{errors.name}</Text>
          )}

          <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor="gray"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {touched.email && errors.email && (
            <Text style={styles.error}>{errors.email}</Text>
          )}

          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="gray"
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          {touched.password && errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}

          <View style={styles.buttonStyle}>
            <Button title="Register" onPress={() => handleSubmit()} />
          </View>

          <View style={styles.account}>
            <Text>Already have an account?{' '}</Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={{ color: 'blue' }}>Login</Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: 'black',
    marginBottom: 10,
  },
  textInput: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 30,
    width: '90%',
    marginBottom: 10,
    paddingHorizontal: 15,
    color: 'black',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  buttonStyle: {
    width: '90%',
    marginBottom: 20,
  },
  account: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
