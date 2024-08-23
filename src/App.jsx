import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddTodoForm from './AddTodoForm'
import './App.css'
import TodoList from './TodoList.jsx'
import TodoListItem from './TodoListItem'



const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /*console.log(import.meta.env)*/

  const postData = async (newTodoTitle) => {
    const options = {}
    options.method = 'POST';
    options.headers = {
      Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
      options.body = JSON.stringify({
        records: [
          {
            fields: {
              title: newTodoTitle,
            }
          }
        ]
      })
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

      const newTodoItem = {
        id: data.records[0].id,
        title: data.records[0].fields.title,
      }

      setTodoList((prevTodoList) => [...prevTodoList, newTodoItem])
    } catch (error) {
      console.log("Error", error)
      return null;
    }
  }

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
      return null;
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const addTodo = (newTodoTitle) => {
    // setTodoList([...todoList, newTodo]);
    postData(newTodoTitle)
  }

  const removeTodo = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id)
    setTodoList(newTodoList)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <>
            <div>
              <h1>To do list</h1>

              <AddTodoForm onAddTodo={addTodo} />

              {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}

            </div>
          </>
        } >
        </Route>
        <Route path='/new' element={
          <h1>New Todo List </h1>
        }>
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App