import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddTodoForm from './AddTodoForm'
import './App.css'
import TodoList from './TodoList.jsx';
import TodoListItem from './TodoListItem';
import BooksLogo from './images/Books.png';



const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  /*console.log(import.meta.env)*/

  const postData = async (newTodoTitle, newTodoRating = 0) => {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              title: newTodoTitle,
              rating: newTodoRating,
            }
          }
        ]
      })
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

      const newTodoItem = {
        id: data.records[0].id,
        title: data.records[0].fields.title,
        rating: data.records[0].fields.rating || 0, //saves the rating
      }

      setTodoList((prevTodoList) => [...prevTodoList, newTodoItem])
    } catch (error) {
      console.log("Error", error)
      return null;
    }
  }

  const updateRating = async (id, newRating) => {
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [
          {
            id: id,
            fields: {
              rating: newRating, // Update the rating in Airtable
            },
          },
        ],
      }),
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log("Rating updated:", data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      }
    }
    const url =
      `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`
    console.log('url', url);
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
          title: todo.fields.title,
          rating: todo.fields.rating || 0,
        }
      })
      console.log(todos)

      setTodoList(todos)
      setIsLoading(false)
    } catch (error) {
      console.log("Error", error)
      if (error.message === 'Failed to fetch') {
        alert('Network error. Please check your connection and try again.');
      }
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
      <nav className='navbar'>
        <img className='logo' src={BooksLogo} alt="Books Logo" />
        <ul className='navList'>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li><a className='booksLink' href='https://openlibrary.org/' target='_blank' rel="noopener noreferrer">More Books
          </a></li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={
          <>
            <div>
              <h1>To do list</h1>

              <AddTodoForm onAddTodo={addTodo} />

              {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList}
                onRemoveTodo={removeTodo} updateRating={updateRating} />}

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