import React, { useState, useEffect } from 'react';
import AddTodoForm from './AddTodoForm'
import './App.css'
import TodoList from './TodoList.jsx'
import TodoListItem from './TodoListItem';


const useSemiPersistentState = () => {
  let [todoList, setTodoList] = useState(JSON.parse(
    localStorage.getItem('savedTodoList')) || []);

  useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));
  }, [todoList]);

  return [todoList, setTodoList];
}

const App = () => {

  const [todoList, setTodoList] = useSemiPersistentState();

  let addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);

  };

  const removeTodo = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id)
    setTodoList(newTodoList)
  }

  return (
    <>
      <div>
        <h1>To do list</h1>

        <AddTodoForm onAddTodo={addTodo} />

        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />

      </div>
    </>
  )
}

export default App
