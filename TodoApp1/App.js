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
import Icon from 'react-native-vector-icons/Ionicons';

const STORIGE_KEY_TODOS = '@toDos';
const WORK_MODE = '@working';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [working, setWorking] = useState(false);
  const [text, setText] = useState('');
  const [done, setDone] = useState('');
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
      console.log(error);
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

  const doneTodo = async id => {
    const newTodos = Object.assign({}, Todos);
    newTodos[id].done = true;
    console.log('done , ', newTodos[id]);

    setTodos(newTodos);
    await saveTodos(newTodos);
  };

  const notDone = async id => {
    const newTodos = Object.assign({}, Todos);
    newTodos[id].done = false;
    console.log('not done , ', newTodos[id]);

    setTodos(newTodos);
    await saveTodos(newTodos);
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
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            setMode('work');
          }}>
          <Text
            style={{
              ...styles.btnText,
              color: working ? 'white' : theme.grey,
            }}>
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setMode('travel');
          }}>
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
            Todos[key].done != true ? (
              <View key={key} style={styles.todo}>
                <TouchableOpacity
                  style={styles.btns}
                  onPress={() => {
                    doneTodo(key);
                  }}>
                  <Text>⚪</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.textarea}
                  onPress={() => {
                    editTodo(key);
                  }}>
                  <Text style={styles.todoText}>{Todos[key].text}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btns}
                  onPress={() => {
                    deleteTodo(key);
                  }}>
                  <Icon name="trash" size={20} color="#4a8bfc" />
                </TouchableOpacity>
              </View>
            ) : null
          ) : null,
        )}
        {Object.keys(Todos).map(key =>
          working === Todos[key].working ? (
            Todos[key].done === true ? (
              <View key={key} style={styles.doneTodo}>
                <TouchableOpacity
                  style={styles.btns}
                  onPress={() => {
                    notDone(key);
                  }}>
                  <Text>🔘</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.doneTodoTextArea}>
                  <Text>{Todos[key].text}</Text>
                </TouchableOpacity>

                <View style={styles.btns}>
                  <TouchableOpacity
                    onPress={() => {
                      deleteTodo(key);
                    }}>
                    <Icon name="trash" size={20} color="#4a8bfc" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : null
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
  btns: {
    flexDirection: 'row',
    alignContent: 'flex-end',
    flex: 1,
  },
  btnText: {
    fontSize: 38,
    fontWeight: '600',
  },
  textarea: {
    flex: 7,
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
    alignContent: 'flex-start',
  },
  doneTodo: {
    backgroundColor: theme.grey,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignContent: 'flex-start',
  },
  doneTodoTextArea: {
    flex: 7,
    flexDirection: 'row',
    alignContent: 'flex-start',
  },
  doneTodoText: {
    flex: 1,
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
  todoText: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  btn: {
    marginRight: 5,
    flex: 1,
  },
});

export default App;
