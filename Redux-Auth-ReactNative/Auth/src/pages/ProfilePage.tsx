import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useAppDispatch } from '../components/hooks/hooks';
import { setProfile } from '../features/auth/slices/ProfileSlice';
import { launchImageLibrary } from 'react-native-image-picker';
// import { useDispatch } from 'react-redux';

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().email().required(),
  phone: Yup.string().required(),
  gender: Yup.string().required(),
});

const ProfilePage = () => {
  // const [gender, setGender] = useState('');
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  // const [phone, setPhone] = useState('');

  const genders = ['Male', 'Female', 'Other'];

  const [profileImage, setProfileImage] = useState(
    'https://randomuser.me/api/portraits/men/1.jpg',
  );

  //image pickup
  const pickImage = ({setFieldValue}) => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, response => {
      if (response.didCancel) {
        console.log('User Cancelled Image Picker');
      } else if (response.errorMessage) {
        console.log('Error while picking image', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri);
        setFieldValue('profileImage', response.assets[0].uri);
      }
    });
  };

  const navigation = useNavigation();

  // const handleSubmit = () => {
  //   if (!firstName || !email || !phone || !gender || !lastName) {
  //     Alert.alert('Error', 'Please fill out all fields');
  //     return;
  //   }
  //   // Alert.alert(
  //   //   'Profile Saved!',

  //   //   `Name: ${firstName} ${lastName}\nEmail:${email}\nPhone:${phone}\nGender:${gender}`,
  //   // );

  //   // navigation.navigate('Details', {
  //   //   firstName,
  //   //   lastName,
  //   //   email,
  //   //   phone,
  //   //   gender,
  //   // });

  //   // setFirstName('');
  //   // setLastName('');
  //   // setEmail('');
  //   // setPhone('');
  //   // setGender('');
  // };

  const dispatch = useAppDispatch();

  let initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialIcons
            name="arrow-back-ios"
            size={24}
            color="black"
            onPress={navigation.navigate('Tabs', { screen: 'Main' })}
          />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Profile Page</Text>
        </View>
      </View>

      {/* Profile Info */}

      <Formik
        initialValues={initialValues}
        validationSchema={ProfileSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(setProfile({...values, profileImage}));
          navigation.navigate('Details');
          resetForm();
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <>
            <View style={styles.profileContainer}>
              <TouchableOpacity onPress={pickImage}>
                <Image
                  source={{
                    uri: profileImage,
                  }}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
              <Text style={styles.profileNameText}>Dwaipayan Biswas</Text>
              <Text style={styles.profileEmailText}>
                biswasdwai007@gmail.com
              </Text>

              {/* Form Inputs */}
              <TextInput
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                placeholder="What's your first name?"
                style={styles.textInput}
              />
              {touched.firstName && errors.firstName && (
                <Text style={styles.errorText}>{errors.firstName}</Text>
              )}
              <TextInput
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                placeholder="And your last name?"
                style={styles.textInput}
              />
              {touched.lastName && errors.lastName && (
                <Text style={styles.errorText}>{errors.lastName}</Text>
              )}
              <TextInput
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder="What's your email?"
                style={styles.textInput}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <View style={styles.phoneContainer}>
                <Image
                  source={{ uri: 'https://flagcdn.com/w40/ng.png' }}
                  style={styles.flag}
                />

                <View style={styles.divider} />
                <TextInput
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  placeholder="Phone Number"
                  placeholderTextColor="#888"
                  keyboardType="phone-pad"
                  style={styles.phoneInput}
                />
              </View>
              {touched.phone && errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}

              {/* {Select gender} */}

              <View style={styles.genderSelectionContainer}>
                {/* <TextInput
            placeholder="Select Gender"
            placeholderTextColor="#888"
            style={styles.genderInput}
            // editable={false} // prevent keyboard if it's a dropdown
          /> */}

                <Picker
                  style={styles.genderInput}
                  selectedValue={values.gender}
                  onValueChange={handleChange('gender')}
                >
                  {genders.map((g, index) => (
                    <Picker.Item label={g} value={g} key={index} />
                  ))}
                </Picker>

                {/* <MaterialIcons name="keyboard-arrow-down" size={24} color="#888" /> */}
              </View>
              {touched.gender && errors.gender && (
                <Text style={styles.errorText}>{errors.gender}</Text>
              )}
            </View>

            <View style={styles.submitCard}>
              {/* style = {styles.submitCard} */}
              <TouchableOpacity onPress={() => handleSubmit()}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    alignSelf: 'flex-start',
  },

  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  submitCard: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: '40%',
    height: '5%',
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: 12,
    backgroundColor: '#494cd4ff',
  },

  genderSelectionContainer: {
    flexDirection: 'row',
    borderWidth: 0.6,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 16,
    borderRadius: 8,
    borderColor: 'gray',
  },

  genderInput: {
    flex: 1,
    height: 50,
    borderColor: 'gray',
  },

  phoneContainer: {
    flexDirection: 'row',
    backgroundColor: '#fbfbfcff',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    width: '100%',
    borderWidth: 0.6,
    borderRadius: 8,
    borderColor: 'gray',
    marginTop: 16,
    shadowRadius: 4,
  },

  flag: {
    width: 24,
    height: 16,
    resizeMode: 'contain',
    marginRight: 12,
  },

  divider: {
    width: 1,
    height: '50%',
    backgroundColor: '#ccc',
    marginRight: 12,
  },

  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },

  container: {
    flex: 1,
    backgroundColor: '#f9f9fd',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: 24,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 32,
    paddingHorizontal: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileNameText: {
    fontWeight: '600',
    fontSize: 18,
    marginTop: 14,
  },
  profileEmailText: {
    fontWeight: '500',
    fontSize: 14,
    marginTop: 4,
    color: '#b5b5bb',
  },
  textInput: {
    height: 60,
    width: '100%',
    paddingHorizontal: 12,
    marginTop: 16,
    backgroundColor: '#fbfbfcff',
    borderRadius: 8,
    borderColor: 'gray',
    borderWidth: 0.6,
  },
});
