/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  useColorScheme,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {theme} from './colors.js';

import {Colors} from 'react-native/Libraries/NewAppScreen';

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
  const addTodo = () => {
    if (text === '') {
      return;
    }
    const newTodos = Object.assign({}, Todos, {
      [Date.now()]: {text: text, working: working},
    });
    setTodos(newTodos);
    setText('');
    console.log(newTodos);
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
  },
  todoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default App;
