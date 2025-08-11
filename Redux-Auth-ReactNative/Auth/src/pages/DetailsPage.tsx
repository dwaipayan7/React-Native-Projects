import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useAppSelector } from '../components/hooks/hooks';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@react-native-vector-icons/material-icons';

export const CardView = ({
  title,
  value,
  subtitle,
  bgColor,
  icon,
  fullWidth,
  height,
  image, // optional
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: bgColor,
          width: fullWidth ? '100%' : '48%',
          height: height ?? 'auto',
        },
      ]}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{title}</Text>
        {icon}
      </View>

      <Text style={{ fontSize: 14, color: '#333', marginBottom: 2 }}>
        {value}
      </Text>

      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}

      {/* Render only if image is passed */}
      {image ? (
        <View style={styles.image}>
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              resizeMode: 'cover',
              borderRadius: 50,
        
            }}
          />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

//  {  //'https://randomuser.me/api/portraits/men/1.jpg'}
//{ route }

const DetailsPage = () => {
  // const { firstName, lastName, email, phone, gender } = route.params;

  const profile = useAppSelector(state => state.profile);
  const darkMode = useAppSelector(state => state.theme.darkMode)

    const themeStyles = {
    backgroundColor: darkMode ? '#121212' : '#f5f5f5',
    textColor: darkMode ? '#ffffff' : '#000000',
    cardBg: darkMode ? '#1e1e1e' : '#cccccc',
  };

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: themeStyles.backgroundColor}]}
      contentContainerStyle={{ paddingBottom: 20, padding: 16 }}
    >
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={[styles.headerText, {color: themeStyles.textColor}]}>👋Hi {profile.firstName}</Text>
        </View>
        <View style={styles.headerElement}>
          <CardView
            title={'Name: ' + profile.firstName + ' ' + profile.lastName}
            value={'Email: ' + profile.email}
            subtitle={
              'Phone: ' + profile.phone + '\n' + 'Gender: ' + profile.gender
            }
            bgColor="#FFD75F"
            icon={<MaterialIcons name="arrow-upward" size={20} color="black" />}
            fullWidth
            height={200}
            image={profile.profileImage}
          />
        </View>
        <View style={styles.grid}>
          <CardView
            title="TIME"
            value="6:24"
            subtitle="Global avg: 7:28\n23% faster"
            bgColor="#FFA07A"
            icon={<MaterialIcons name="timer" size={20} color="black" />}
            fullWidth={undefined}
            height={150}
            image={undefined}
          />

          <CardView
            title="STREAK"
            value="7"
            subtitle="Day streak, keep it up!\n19% more consistent"
            bgColor="#A4ECA4"
            icon={<MaterialIcons name="fire-hydrant" size={20} color="black" />}
            fullWidth={undefined}
            height={150}
            image={undefined}
          />
        </View>

        <View style={styles.grid}>
          <CardView
            title="LEVEL"
            value="2"
            subtitle="145 points to next level\nTop 5% for this book"
            bgColor="#9F9FFF"
            icon={<MaterialIcons name="power" size={20} color="black" />}
            fullWidth={undefined}
            height={150}
            image={undefined}
          />

          <CardView
            title="BADGES"
            value=""
            subtitle="Your achievements"
            bgColor="#7FDFFF"
            icon={<MaterialIcons name="star" size={20} color="black" />}
            fullWidth={undefined}
            height={150}
            image={undefined}
          />
        </View>
        <View style={styles.grid}>
          <CardView
            title="LEVEL"
            value="2"
            subtitle="145 points to next level\nTop 5% for this book"
            bgColor="#9F9FFF"
            icon={<MaterialIcons name="power" size={20} color="black" />}
            fullWidth={undefined}
            height={150}
            image={undefined}
          />

          <CardView
            title="BADGES"
            value=""
            subtitle="Your achievements"
            bgColor="#7FDFFF"
            icon={<MaterialIcons name="star" size={20} color="black" />}
            fullWidth={undefined}
            height={150}
            image={undefined}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

// <Text>{profile.firstName}</Text>
//   <Text>{profile.lastName}</Text>
//   <Text>{profile.email}</Text>
//   <Text>{profile.phone}</Text>
//   <Text>{profile.gender}</Text>

export default DetailsPage;

const styles = StyleSheet.create({
  image: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  container: {
    flex: 1,
    backgroundColor: '#F8F9FD',
  },
  header: {
    marginBottom: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  headerElement: {
    flex: 1,
  },
  subtitle: {
    fontSize: 12,
    color: '#333',
    lineHeight: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  card: {
    width: '48%', // 2 columns
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
});
