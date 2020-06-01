
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  pageTitle: {
    textAlign: 'center',
    fontSize: 22,
  },
  input: {
    fontSize: 16,
    borderBottomColor: '#f39c12',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  cameraButton: {
    marginTop: 20,
    width: 50,
    height: 50,
    backgroundColor: '#f39c12',
    borderRadius: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  saveButton: {
    backgroundColor:'#2ecc71',
    borderRadius: 8,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginBottom:20
  },
  saveButtonInvalid: {
    backgroundColor: '#f39c12',
  },

  saveButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  cancelButton: {
    marginTop: 10,

    alignSelf: 'center',
  },
  cancelButtonText: {
    color: '#95a5a6',
    fontSize: 16,
  },
});

export default function Book({ navigation, route }) {
  const [books, setBooks] = useState([]);

  const isEdit = route.params?.isEdit ?
  route.params?.isEdit : false

  console.log('isEdit',isEdit)

  const book = route.params?.book ?
  route.params.book:{
   title:'',
   description:'',
   photo:'',
   read:false,
  }
  const [title, setTitle] = useState(book.title);
  const [description, setDescription] = useState(book.description);
  const [photo, setPhoto] = useState(book.photo);
  const [read, setRead] = useState(book.read);

  useEffect(() => {
    async function loadBooks() {
      const data = await AsyncStorage.getItem('books');
      const value = JSON.parse(data);
      setBooks(value);
    }
    loadBooks();
  }, []);
  function handdleMain() {
    navigation.goBack();
  }
  const isValid = () => {
    if (
      title !== undefined &&
      description !== undefined &&
      title !== '' &&
      description !== ''
    ) {
      console.log('verdadeiro')
      return true;
    }
    console.log('falso')

    return false;
  };

  async function onSave() {
    try {
      if(isEdit){
        let newBooks = books;

        newBooks.map(item=>{
          if(item.id===book.id){
            item.title=title;
            item.description=description;
            item.photo=photo;
            item.read=read;
          }
          return item;
        })
        await AsyncStorage.setItem('books', JSON.stringify(newBooks));
        navigation.goBack();
      }else{

        if (isValid()) {
          console.log('entrou add')
          const id = Math.random(5000).toString();
          const data = {
            id,
            title,
            description,
            read,
            photo,
          };

          const arrData = [data];
          const storedData = await AsyncStorage.getItem('books');
          const storedDataParsed = JSON.parse(storedData);
          setBooks(storedDataParsed);

          let newData = [];

          if (storedData === null) {
            await AsyncStorage.setItem('books', JSON.stringify(arrData));
          } else {
            newData = [...storedDataParsed, data];
            await AsyncStorage.setItem('books', JSON.stringify(newData));
          }
          books.push(data);
          navigation.goBack();
          Keyboard.dismiss();
        }
      }
    } catch (error) {
      Alert.alert('erro ao salvar', error);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Incluir um novo livro...</Text>
      <TextInput
        style={styles.input}
        placeholder="Titulo"
        value={title}
        onChangeText={(text) =>{setTitle(text)}}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={(text) =>{
          setDescription(text)
        }
      }
      />
      <TouchableOpacity style={styles.cameraButton}>
        <Icon name="photo-camera" size={30} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.saveButton,
          !isValid() ? styles.saveButtonInvalid :''
        ]}
        onPress={onSave}
      >
        <Text style={styles.saveButtonText}>{isEdit ? 'Atualizar': 'Cadastrar'} </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handdleMain} style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}> Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}
