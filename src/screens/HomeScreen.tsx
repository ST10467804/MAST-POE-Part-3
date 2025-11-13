import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SectionList,
} from 'react-native';
import { MenuItemType } from '../types/Types';
import MenuItem from '../components/MenuItem';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { LinearGradient } from 'expo-linear-gradient'; // ✅ Expo gradient

type Props = NativeStackScreenProps<RootStackParamList, 'Home'> & {
  menuItems: MenuItemType[];
};

const HomeScreen: React.FC<Props> = ({ navigation, menuItems }) => {
  const courses = ['Starters', 'Mains', 'Desserts'];

  // Prepare sections for the SectionList
  const sections = courses.map(course => ({
    title: course,
    data: menuItems.filter(item => item.course === course),
  }));

  const averagePrice = (course: string) => {
    const items = menuItems.filter(i => i.course === course);
    const total = items.reduce((sum, item) => sum + item.price, 0);
    return items.length ? (total / items.length).toFixed(2) : '0.00';
  };

  return (
    <LinearGradient colors={['#007BFF', '#00A6FF']} style={styles.gradient}>
      <View style={styles.container}>
        {/* Header */}
        <Image source={require('../../assets/logo.jpg.png')} style={styles.logo} />
        <Text style={styles.header}>Chef Christoffel's Menu</Text>

        {/* Navigation Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Filter')}
          >
            <Text style={styles.buttonText}>Filter Courses</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Chef')}
          >
            <Text style={styles.buttonText}>Chef Admin</Text>
          </TouchableOpacity>
        </View>

        {/* SectionList for Courses */}
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MenuItem item={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.courseSection}>
              <Text style={styles.courseHeader}>
                {title}{' '}
                <Text style={styles.courseAvg}>
                  (Avg: R{averagePrice(title)})
                </Text>
              </Text>
            </View>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  logo: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#0056D2',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 40,
  },
  courseSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 8,
    marginBottom: 10,
    marginTop: 5,
  },
  courseHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  courseAvg: {
    fontSize: 16,
    fontWeight: '400',
    color: '#E0E0E0',
  },
});

export default HomeScreen;

