import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Course, MenuItemType } from '../types/Types';
import RNPickerSelect from 'react-native-picker-select';
import MenuItem from '../components/MenuItem';
import { LinearGradient } from 'expo-linear-gradient'; // ✅ Expo gradient

type Props = {
  menuItems: MenuItemType[];
};

const FilterScreen: React.FC<Props> = ({ menuItems }) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filteredItems =
    selectedCourse === null
      ? []
      : menuItems.filter(item => item.course === selectedCourse);

  return (
    <LinearGradient colors={['#007BFF', '#00A6FF']} style={styles.gradient}>
      <View style={styles.container}>
        <Image source={require('../../assets/logo.jpg.png')} style={styles.logo} />
        <Text style={styles.header}>Filter Menu by Course</Text>

        <View style={styles.filterBox}>
          <RNPickerSelect
            placeholder={{ label: 'Select Course', value: null }}
            onValueChange={(value: Course) => setSelectedCourse(value)}
            items={[
              { label: 'Starters', value: 'Starters' },
              { label: 'Mains', value: 'Mains' },
              { label: 'Desserts', value: 'Desserts' },
            ]}
            style={{
              inputIOS: styles.input,
              inputAndroid: styles.input,
              placeholder: { color: '#ccc' },
            }}
          />
        </View>

        {selectedCourse === null ? (
          <Text style={styles.infoText}>Please select a course above</Text>
        ) : filteredItems.length === 0 ? (
          <Text style={styles.infoText}>No dishes found for {selectedCourse}</Text>
        ) : (
          <FlatList
            data={filteredItems}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={styles.menuCard}>
                <MenuItem item={item} />
              </View>
            )}
          />
        )}
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
    paddingTop: 40,
    paddingBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
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
  filterBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    padding: 12,
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 10,
    color: '#fff',
    fontSize: 16,
  },
  infoText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.9,
    marginTop: 10,
  },
  list: {
    paddingBottom: 60,
  },
  menuCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    marginVertical: 6,
    padding: 6,
  },
});

export default FilterScreen;
