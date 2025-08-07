import React from 'react';
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

const ProfilePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Profile Page</Text>
        </View>
      </View>

      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          style={styles.profileImage}
        />
        <Text style={styles.profileNameText}>Dwaipayan Biswas</Text>
        <Text style={styles.profileEmailText}>biswasdwai007@gmail.com</Text>

        {/* Form Inputs */}
        <TextInput
          placeholder="What's your first name?"
          style={styles.textInput}
        />
        <TextInput placeholder="And your last name?" style={styles.textInput} />
        <TextInput placeholder="What's your email?" style={styles.textInput} />
        <View style={styles.phoneContainer}>
          <Image
            source={{ uri: 'https://flagcdn.com/w40/ng.png' }}
            style={styles.flag}
          />
          <View style={styles.divider} />
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="#888"
            keyboardType="phone-pad"
            style={styles.phoneInput}
          />
        </View>

        {/* {Select gender} */}

        <View style={styles.genderSelectionContainer}>
          <TextInput
            placeholder="Select Gender"
            placeholderTextColor="#888"
            style={styles.genderInput}
            // editable={false} // prevent keyboard if it's a dropdown
          />
          <MaterialIcons name="keyboard-arrow-down" size={24} color="#888" />
        </View>
      </View>

      <View style = {styles.submitCard}>
        <TouchableOpacity onPress={() => console.log("Pressed")
        }>
          <Text style ={styles.submitText}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({


  submitButton: {

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
    backgroundColor: '#494cd4ff'

  },

  genderSelectionContainer: {
    flexDirection: 'row',
    borderWidth: 0.6,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 16,
    borderRadius: 8
  },

  genderInput: {
    flex: 1,
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
