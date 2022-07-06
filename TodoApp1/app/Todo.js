import React from 'react';
import {ScrollView} from 'react-native';
import TodoItems from './TodoItems.js';

const Todo = ({Todos, toggleTodo, editTodo, deleteTodo, type, working}) => (
  <ScrollView>
    <TodoItems
      Todos={Todos}
      toggleTodo={toggleTodo}
      editTodo={editTodo}
      deleteTodo={deleteTodo}
      type={type}
      working={working}
    />
  </ScrollView>
);

export default Todo;
