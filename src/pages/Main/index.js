import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  viewTitleAdd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    color: '#3498db',
  },
  addButton: {
    width: 30,
    height: 30,
    backgroundColor: '#3498db',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemsContainer: {
    flexDirection: 'row',
  },
  addButtonList: { flex: 1 },
  editButtonList: {},
  textList: {
    fontSize: 16,
  },
  deletButtonList: {},
  itemRead: {
    textDecorationLine: 'line-through',
  },
});
export default function Main({ navigation }) {
  const [books, setBooks] = useState([]);
  async function loadBooks() {
    try {
      const data = await AsyncStorage.getItem('books');
      const value = JSON.parse(data);
      setBooks(value);
    } catch (error) {
      Alert.alert('erro ao mostrar dados', error);
    }
  }

  useEffect(() => {
    loadBooks();
  }, [books]);
  function handleBook() {
    navigation.navigate('Book');
  }

  function handleEdit(bookId) {
    const book = books.find((item) => item.id === bookId);
    navigation.navigate('Book', { book, isEdit: true });
  }

  async function handleDelete(bookId) {
    const newBooks = books.filter((item) => item.id !== bookId);
    await AsyncStorage.setItem('books', JSON.stringify(newBooks));
    setBooks(newBooks);
  }

  async function handleRead(bookId) {
    const newBooks = books.map((item) => {
      if (item.id === bookId) {
        item.read = !item.read;
      }
      return item;
    });
    console.tron.warn(newBooks);
    await AsyncStorage.setItem('books', JSON.stringify(newBooks));
    setBooks(newBooks);
  }
  return (
    <View style={styles.container}>
      <View style={styles.viewTitleAdd}>
        <Text style={styles.title}>Lista de Leitura</Text>
        <TouchableOpacity onPress={handleBook} style={styles.addButton}>
          <Icon name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemsContainer}>
            <TouchableOpacity
              style={styles.addButtonList}
              onPress={() => handleRead(item.id)}
            >
              <Text style={[styles.itemText, item.read ? styles.itemRead : '']}>
                {item.title}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.editButtonList}
              onPress={() => handleEdit(item.id)}
            >
              <Icon name="create" size={22} color="#2ecc71" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deletButtonList}
              onPress={() => handleDelete(item.id)}
            >
              <Icon name="delete" size={22} color="#e74c3c" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
