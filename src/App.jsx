import React, { useState, useEffect } from 'react';
import AddTodoForm from './AddTodoForm'
import './App.css'
import TodoList from './TodoList.jsx'
import TodoListItem from './TodoListItem';

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /*console.log(import.meta.env)*/

  const fetchData = async () => {
    const options = {}
    options.method = 'GET';
    options.headers = {
      Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
    }
    const url =
      `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`
    /*console.log('url', url)*/
    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json()
      console.log(data)

      const todos = data.records.map((todo) => {
        return {
          id: todo.id,
          title: todo.fields.title
        }
      })
      console.log(todos)

      setTodoList(todos)
      setIsLoading(false)
    } catch (error) {
      console.log("Error", error)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


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
