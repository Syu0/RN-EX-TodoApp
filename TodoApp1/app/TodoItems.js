import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../colors.js';

const getVisibleTodos = (todos, type, working) => {
  const newTodos = Object.assign({}, todos);
  Object.keys(newTodos).map(key => {
    if (newTodos[key].working != working) {
      delete newTodos[key];
    } else {
      switch (type) {
        case 'All':
          break;
        case 'Complate':
          if (newTodos[key].done === false) delete newTodos[key];
          break;
        case 'Active':
          if (newTodos[key].done === true) delete newTodos[key];
          break;
        default:
          break;
      }
    }
  });

  todos = newTodos;
  return todos;
};
const TodoItems = ({
  Todos,
  toggleTodo,
  editTodo,
  deleteTodo,
  type,
  working,
}) => {
  Todos = getVisibleTodos(Todos, type, working);
  return Object.keys(Todos).map(key => (
    <View
      key={key}
      style={Todos[key].done != true ? styles.todo : styles.doneTodo}>
      <TouchableOpacity
        style={styles.btns}
        onPress={() => {
          toggleTodo(key);
        }}>
        {Todos[key].done != true ? <Text>⚪</Text> : <Text>🔘</Text>}
      </TouchableOpacity>
      <TouchableOpacity
        style={
          Todos[key].done != true ? styles.textarea : styles.doneTodoTextArea
        }
        onPress={() => {
          editTodo(key);
        }}>
        <Text
          style={
            Todos[key].done != true ? styles.todoText : styles.doneTodoText
          }>
          {Todos[key].text}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btns}
        onPress={() => {
          deleteTodo(key);
        }}>
        <Icon name="trash" size={20} color="#4a8bfc" />
      </TouchableOpacity>
    </View>
  ));
};
const styles = StyleSheet.create({
  btns: {
    flexDirection: 'row',
    alignContent: 'flex-end',
    flex: 1,
  },
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
export default TodoItems;
