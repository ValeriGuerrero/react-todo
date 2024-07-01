import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm'
import './App.css'
import TodoList from './TodoList.jsx'

function App() {

  const [newTodo, setNewTodo] = useState('');

  return (
    <>
      <div>
        <h1>To do list</h1>

        <AddTodoForm onAddTodo={setNewTodo} />
        <p>{newTodo} </p>
        <TodoList />

      </div>
    </>
  )
}
export default App
