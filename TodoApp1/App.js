/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  useColorScheme,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {theme} from './colors.js';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {} from 'react';
import {loadOptions} from '@babel/core';

const STORIGE_KEY_TODOS = '@toDos';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [working, setWorking] = useState(false);
  const [text, setText] = useState('');
  const work = () => setWorking(true);
  const travel = () => setWorking(false);
  const [Todos, setTodos] = useState({});
  const onChangeText = payload => {
    setText(payload);
  };
  const saveTodos = async toSave => {
    await AsyncStorage.setItem(STORIGE_KEY_TODOS, JSON.stringify(toSave));
  };
  const loadToDos = async () => {
    try {
      const s = await AsyncStorage.getItem(STORIGE_KEY_TODOS);
      setTodos(JSON.parse(s))
      console.log(JSON.parse(s));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadToDos();
  }, []);

  const addTodo = async () => {
    if (text === '') {
      return;
    }
    const newTodos = Object.assign({}, Todos, {
      [Date.now()]: {text: text, working: working},
    });
    setTodos(newTodos);
    await saveTodos(newTodos);
    setText('');
    console.log(newTodos);
  };

  const deleteTodo = async id => {
    Alert.alert('Are you sure?', 'Delete this job.', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          const newTodos = Object.assign({}, Todos);
          delete newTodos[id];

          setTodos(newTodos);
          await saveTodos(newTodos);
        },
      },
    ]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{
              ...styles.btnText,
              color: working ? 'white' : theme.grey,
            }}>
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? 'white' : theme.grey,
            }}>
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          style={styles.textinput}
          placeholder={working ? 'Add a to do' : 'where do you want a go?'}
          onChangeText={onChangeText}
          value={text}
          onSubmitEditing={addTodo}
        />
      </View>
      <ScrollView>
        {Object.keys(Todos).map(key =>
          working === Todos[key].working ? (
            <View key={key} style={styles.todo}>
              <Text style={styles.todoText}>{Todos[key].text}</Text>
              <TouchableOpacity
                onPress={() => {
                  deleteTodo(key);
                }}>
                <Text>💥</Text>
              </TouchableOpacity>
            </View>
          ) : null,
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 20, backgroundColor: theme.darkbg},
  header: {
    backgroundColor: theme.darkbg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btnText: {
    fontSize: 38,
    fontWeight: '600',
  },
  highlight: {
    fontWeight: '700',
  },
  textinput: {
    backgroundColor: theme.lightbg,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 10,
    fontSize: 17,
  },
  todo: {
    backgroundColor: theme.todobg,

    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  todoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default App;
