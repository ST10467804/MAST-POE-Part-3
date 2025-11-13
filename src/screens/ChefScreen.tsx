import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { MenuItemType, Course } from '../types/Types';
import RNPickerSelect from 'react-native-picker-select';
import { v4 as uuidv4 } from 'uuid';
import { LinearGradient } from 'expo-linear-gradient'; 
type Props = {
  menuItems: MenuItemType[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItemType[]>>;
};

const ChefScreen: React.FC<Props> = ({ menuItems, setMenuItems }) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState<Course | null>(null);

  const addItem = () => {
    if (!name || !desc || !price || !course) {
      Alert.alert('Missing Info', 'Please fill out all fields');
      return;
    }

    const newItem: MenuItemType = {
      id: uuidv4(),
      name,
      description: desc,
      price: parseFloat(price),
      course,
    };

    setMenuItems([...menuItems, newItem]);
    setName('');
    setDesc('');
    setPrice('');
    setCourse(null);
  };

  const removeItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  return (
    <LinearGradient colors={['#007BFF', '#00A6FF']} style={styles.gradient}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Image source={require('../../assets/logo.jpg.png')} style={styles.logo} />
        <Text style={styles.header}>Chef Admin Panel</Text>

        {/* Add New Dish Section */}
        <View style={styles.form}>
          <Text style={styles.subHeader}>Add New Dish</Text>

          <TextInput
            placeholder="Dish Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholderTextColor="#ccc"
          />

          <TextInput
            placeholder="Description"
            value={desc}
            onChangeText={setDesc}
            style={styles.input}
            placeholderTextColor="#ccc"
          />

          <TextInput
            placeholder="Price (R)"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
            style={styles.input}
            placeholderTextColor="#ccc"
          />

          <RNPickerSelect
            placeholder={{ label: 'Select Course', value: null }}
            onValueChange={(value: Course) => setCourse(value)}
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

          <TouchableOpacity style={styles.addButton} onPress={addItem}>
            <Text style={styles.addButtonText}>Add Dish</Text>
          </TouchableOpacity>
        </View>

        {/* Remove Dishes Section */}
        <Text style={styles.subHeader}>Remove Dishes</Text>

        {menuItems.length === 0 ? (
          <Text style={styles.emptyText}>No dishes added yet.</Text>
        ) : (
          <FlatList
            data={menuItems}
            keyExtractor={item => item.id}
            scrollEnabled={false} // handled by outer ScrollView
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.itemText}>{item.name}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeItem(item.id)}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
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
  subHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
    marginTop: 10,
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 10,
    marginVertical: 6,
    color: '#fff',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#0400ffff',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  addButtonText: {
    color: '#ffffffff',
    fontWeight: '700',
    fontSize: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  removeButton: {
    backgroundColor: '#FF4B4B',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  emptyText: {
    color: '#fff',
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.8,
    marginTop: 10,
  },
});

export default ChefScreen;
