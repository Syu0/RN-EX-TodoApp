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
  View,
  TextInput,
  Alert,
} from 'react-native';
import {theme} from './colors.js';
import Header from './app/Header.js';
import Todo from './app/Todo.js';
import TabBar from './app/TabBar.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {} from 'react';
import {loadOptions} from '@babel/core';

const STORIGE_KEY_TODOS = '@toDos';
const WORK_MODE = '@working';

const App: () => Node = () => {
  const [working, setWorking] = useState(false);
  const [text, setText] = useState('');
  const [type, setType] = useState('Active');
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
      setTodos(JSON.parse(s));
      console.log(JSON.parse(s));
    } catch (error) {
      console.log('no data from STORIGE', error);
    }
  };

  const addTodo = async () => {
    if (text === '') {
      return;
    }
    const newTodos = Object.assign({}, Todos, {
      [Date.now()]: {text: text, working: working, done: false},
    });
    setTodos(newTodos);
    await saveTodos(newTodos);
    setText('');
    console.log(newTodos);
  };

  const toggleTodo = async id => {
    const newTodos = Object.assign({}, Todos);
    console.log(id, 'bbbbbb');
    newTodos[id].done = !newTodos[id].done;

    setTodos(newTodos);
    await saveTodos(newTodos);
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

  const initMode = async () => {
    const mode = await AsyncStorage.getItem(WORK_MODE);
    if (mode === 'work') {
      work();
    } else {
      travel();
    }
  };

  const saveMode = async mode => {
    await AsyncStorage.setItem(WORK_MODE, mode);
    console.log('now , ', mode);
  };

  const setMode = async mode => {
    if (mode === 'work') {
      work();
    } else {
      travel();
    }
    await saveMode(mode);
  };

  const editTodo = id => {
    console.log(Todos[id].text);
    return (
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={Todos[id].text}
      />
    );
  };

  useEffect(() => {
    initMode();
    loadToDos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="auto" />
      <Header mode={working} setMode={setMode} />
      <View>
        <TextInput
          style={styles.textinput}
          placeholder={working ? 'Add a to do' : 'where do you want a go?'}
          onChangeText={onChangeText}
          value={text}
          onSubmitEditing={addTodo}
        />
      </View>
      <Todo
        Todos={Todos}
        toggleTodo={toggleTodo}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        type={type}
        working={working}
      />
      <TabBar setType={setType} type={type} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 20, backgroundColor: theme.darkbg},
  textarea: {
    flex: 7,
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
});

export default App;
