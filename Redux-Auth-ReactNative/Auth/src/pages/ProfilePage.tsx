import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useAppDispatch, useAppSelector } from '../components/hooks/hooks';
import { setProfile } from '../features/auth/slices/ProfileSlice';
import { launchImageLibrary } from 'react-native-image-picker';

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().email().required(),
  phone: Yup.string().required(),
  gender: Yup.string().required(),
});

const ProfilePage = () => {
  const genders = ['Male', 'Female', 'Other'];
  const [profileImage, setProfileImage] = useState(
    'https://randomuser.me/api/portraits/men/1.jpg',
  );

  const pickImage = ({ setFieldValue }) => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, response => {
      if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri);
        setFieldValue('profileImage', response.assets[0].uri);
      }
    });
  };

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  // Dark mode state from Redux
  const darkMode = useAppSelector(state => state.theme.darkMode);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
  };

  const themeStyles = {
    background: { backgroundColor: darkMode ? '#121212' : '#f9f9fd' },
    cardBackground: { backgroundColor: darkMode ? '#1E1E1E' : '#fbfbfcff' },
    text: { color: darkMode ? '#fff' : '#000' },
    subText: { color: darkMode ? '#aaa' : '#b5b5bb' },
    border: { borderColor: darkMode ? '#444' : 'gray' },
    placeholder: darkMode ? '#aaa' : '#888',
  };

  return (
    <SafeAreaView style={[styles.container, themeStyles.background]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialIcons
            name="arrow-back-ios"
            size={24}
            color={themeStyles.text.color}
            onPress={() => navigation.navigate('Tabs', { screen: 'Main' })}
          />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={[styles.headerText, themeStyles.text]}>
            Profile Page
          </Text>
        </View>
      </View>

      {/* Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={ProfileSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(setProfile({ ...values, profileImage }));
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
              <TouchableOpacity onPress={() => pickImage({ setFieldValue })}>
                <Image
                  source={{ uri: profileImage }}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
              <Text style={[styles.profileNameText, themeStyles.text]}>
                Dwaipayan Biswas
              </Text>
              <Text style={[styles.profileEmailText, themeStyles.subText]}>
                biswasdwai007@gmail.com
              </Text>

              {/* First Name */}
              <TextInput
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                placeholder="What's your first name?"
                placeholderTextColor={themeStyles.placeholder}
                style={[
                  styles.textInput,
                  themeStyles.cardBackground,
                  themeStyles.text,
                  themeStyles.border,
                ]}
              />
              {touched.firstName && errors.firstName && (
                <Text style={styles.errorText}>{errors.firstName}</Text>
              )}

              {/* Last Name */}
              <TextInput
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                placeholder="And your last name?"
                placeholderTextColor={themeStyles.placeholder}
                style={[
                  styles.textInput,
                  themeStyles.cardBackground,
                  themeStyles.text,
                  themeStyles.border,
                ]}
              />
              {touched.lastName && errors.lastName && (
                <Text style={styles.errorText}>{errors.lastName}</Text>
              )}

              {/* Email */}
              <TextInput
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder="What's your email?"
                placeholderTextColor={themeStyles.placeholder}
                style={[
                  styles.textInput,
                  themeStyles.cardBackground,
                  themeStyles.text,
                  themeStyles.border,
                ]}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              {/* Phone */}
              <View
                style={[
                  styles.phoneContainer,
                  themeStyles.cardBackground,
                  themeStyles.border,
                ]}
              >
                <Image
                  source={{ uri: 'https://flagcdn.com/w40/ng.png' }}
                  style={styles.flag}
                />
                <View style={styles.divider} />
                <TextInput
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  placeholder="Phone Number"
                  placeholderTextColor={themeStyles.placeholder}
                  keyboardType="phone-pad"
                  style={[styles.phoneInput, themeStyles.text]}
                />
              </View>
              {touched.phone && errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}

              {/* Gender */}
              <View
                style={[
                  styles.genderSelectionContainer,
                  themeStyles.border,
                  themeStyles.cardBackground,
                ]}
              >
                <Picker
                  style={[styles.genderInput]}
                  selectedValue={values.gender}
                  dropdownIconColor={themeStyles.text.color}
                  onValueChange={handleChange('gender')}
                >
                  {genders.map((g, index) => (
                    <Picker.Item
                      label={g}
                      value={g}
                      key={index}
                      color={themeStyles.text.color}
                    />
                  ))}
                </Picker>
              </View>
              {touched.gender && errors.gender && (
                <Text style={styles.errorText}>{errors.gender}</Text>
              )}
            </View>

            <View style={styles.submitCard}>
              <TouchableOpacity onPress={handleSubmit}>
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
  submitText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
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
  },
  genderInput: { flex: 1, height: 50 },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    width: '100%',
    borderWidth: 0.6,
    borderRadius: 8,
    marginTop: 16,
    shadowRadius: 4,
  },
  flag: { width: 24, height: 16, resizeMode: 'contain', marginRight: 12 },
  divider: {
    width: 1,
    height: '50%',
    backgroundColor: '#ccc',
    marginRight: 12,
  },
  phoneInput: { flex: 1, fontSize: 16 },
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerContainer: { flex: 1, alignItems: 'center', marginRight: 24 },
  headerText: { fontSize: 18, fontWeight: '600' },
  profileContainer: {
    alignItems: 'center',
    marginTop: 32,
    paddingHorizontal: 16,
  },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  profileNameText: { fontWeight: '600', fontSize: 18, marginTop: 14 },
  profileEmailText: { fontWeight: '500', fontSize: 14, marginTop: 4 },
  textInput: {
    height: 60,
    width: '100%',
    paddingHorizontal: 12,
    marginTop: 16,
    borderRadius: 8,
    borderWidth: 0.6,
  },
});
