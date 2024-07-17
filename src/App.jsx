import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm'
import './App.css'
import TodoList from './TodoList.jsx'

function App() {
  const [todoList, setTodoList] = useState([])
  //const [newTodo, setNewTodo] = useState('');

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);

  };

  return (
    <>
      <div>
        <h1>To do list</h1>

        <AddTodoForm onAddTodo={addTodo} />

        <TodoList todoList={todoList} />

      </div>
    </>
  )
}
export default App
