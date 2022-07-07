import React from 'react';
import {ScrollView} from 'react-native';
import TodoItems from './TodoItems.js';

const Todo = ({
  Todos,
  toggleTodo,
  editTodo,
  setEditMode,
  onEditingText,
  deleteTodo,
  editCancel,
  type,
  working,
}) => (
  <ScrollView>
    <TodoItems
      Todos={Todos}
      toggleTodo={toggleTodo}
      setEditMode={setEditMode}
      editTodo={editTodo}
      onEditingText={onEditingText}
      deleteTodo={deleteTodo}
      editCancel={editCancel}
      type={type}
      working={working}
    />
  </ScrollView>
);

export default Todo;
