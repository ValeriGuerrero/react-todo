import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import AddTodoForm from './components/AddTodoForm'
import './App.css'
import TodoList from './components/TodoList.jsx';
import BooksLogo from './images/Books.png';
import Switch from './switch';
import { About } from './About';
import { useCallback } from 'react';

function sortTodosAscending(objectA, objectB) {
  const titleA = objectA.toLowerCase();
  const titleB = objectB.toLowerCase();

  if (titleA < titleB) {
    return -1;
  } else if (titleA > titleB) {
    return 1;
  } else {
    return 0;
  }
}

function sortTodosDescending(objectA, objectB) {
  const titleA = objectA.toLowerCase();
  const titleB = objectB.toLowerCase();

  if (titleA < titleB) {
    return 1;
  } else if (titleA > titleB) {
    return -1;
  } else {
    return 0;
  }
}

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const footerRef = useRef(null);


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

      setTodoList((prevTodoList) =>
        prevTodoList.map((todo) =>
          todo.id === id ? { ...todo, rating: newRating } : todo
        )
      )

    } catch (error) {
      console.log("Error", error);
    }
  };

  const onRemoveTodo = async (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${id}`;

    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      console.log(`Todo with ID ${id} has been deleted from Airtable.`);
    } catch (error) {
      console.log("Error deleting todo:", error);
    }
  };

  const fetchData = useCallback(async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      }
    }
    const url =
      `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=asc`
    console.log('url', url);
    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json()
      console.log("Data:", data)


      const todos = data.records.map((todo) => {
        return {
          id: todo.id,
          title: todo.fields.title || 'Untitled',
          rating: todo.fields.rating || 0,
        }
      })

      const sortedTodos = sortTodos(todos, sortAsc)
      setTodoList(sortedTodos)
      setIsLoading(false);
    } catch (error) {
      console.log("Error", error)
      if (error.message === 'Failed to fetch') {
        alert('Network error. Please check your connection and try again.');
      }
    }
  }, [sortAsc])

  useEffect(() => {
    fetchData();
  }, [fetchData])


  function sortTodos(todos, sortAsc) {
    return todos.sort((objectA, objectB) => {
      if (sortAsc) {
        return sortTodosAscending(objectA.title, objectB.title)
      } else {
        return sortTodosDescending(objectA.title, objectB.title)
      }
    });
  }




  function handleSortToggleClick() {
    setSortAsc((prevSortAsc) => {
      const newSortAsc = !prevSortAsc;
      setTodoList((prevTodos) => sortTodos(prevTodos, newSortAsc));
      return newSortAsc;
    });
  }

  const addTodo = (newTodoTitle) => {
    // setTodoList([...todoList, newTodo]);
    postData(newTodoTitle)
  }

  const removeTodo = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id)
    setTodoList(newTodoList)
  }

  const scrollToFooter = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to the footer
    }
  };

  return (
    <BrowserRouter>
      <nav className='navbar'>
        <img className='logo' src={BooksLogo} alt="Books Logo" />
        <ul className='navList'>
          <li><Link to="/" className='nav-home'>Home</Link></li>
          <li><Link to="/about" className='nav-about'>About</Link></li>
          <li><a className='nav-contact' onClick={scrollToFooter}>Contact</a></li>
          <li><a className='booksLink' href='https://libbyapp.com/library/hcpl/spotlight-new/page-1' target='_blank' rel="noopener noreferrer">More Books
          </a></li>
        </ul>
      </nav>

      <Routes>
        <Route path='/' element={

          <div>
            <h1 className='todo-title'>To do list from: {import.meta.env.VITE_TABLE_NAME}</h1>
            <AddTodoForm onAddTodo={addTodo} />
            <div className='switch-toggle-button'>
              <Switch sortAsc={sortAsc} handleSortToggleClick={handleSortToggleClick} />
            </div>

            {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList}

              updateRating={updateRating} onRemoveTodo={onRemoveTodo} />}

          </div>
        } >
        </Route>
        <Route path='/about' element={
          <div>
            <About />
          </div>
        }>
        </Route>
      </Routes>

      <footer className='footer' ref={footerRef}>
        <span>&copy; 2024 Book Tracker App. All rights reserved. VG</span>
        <h4>Contact Us</h4>
        <p>books@gmail.com</p>
        <p>800-888-8080</p>

      </footer>

    </BrowserRouter >
  )
}

export default App