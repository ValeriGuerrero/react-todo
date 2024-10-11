import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddTodoForm from './components/AddTodoForm'
import './App.css'
import TodoList from './components/TodoList.jsx';
import TodoListItem from './components/TodoListItem';
import BooksLogo from './images/Books.png';
import Switch from './switch';

function sortTodosAscending(objectA, objectB) {
  if (objectA < objectB) {
    return -1;
  } else if (objectA > objectB) {
    return 1;
  } else {
    return 0;
  }
};

function sortTodosDescending(objectA, objectB) {
  if (objectA < objectB) {
    return 1;
  } else if (objectA > objectB) {
    return -1;
  } else {
    return 0;
  }
};

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);
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

      setTodoList((prevTodoList) =>
        prevTodoList.map((todo) =>
          todo.id === id ? { ...todo, rating: newRating } : todo
        )
      )

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

      const sortedTodos = sortTodos(todos)


      setTodoList(sortedTodos)
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

  function sortTodos(todos) {
    return todos.sort((objectA, objectB) => {
      if (sortAsc) {
        return sortTodosAscending(objectA.title, objectB.title)
      } else {
        return sortTodosDescending(objectA.title, objectB.title)
      }
    });
  }

  function handleSortToggleClick() {
    setTodoList((prevTodos) => sortTodos(prevTodos))
    setSortAsc(!sortAsc)


    //setSortAsc((prevSortAsc) => !prevSortAsc); // Toggle sorting order
    //setTodoList((prevTodos) => sortTodos([...prevTodos]));
  }

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
              <div className='switch-toggle-button'>
                <Switch sortAsc={sortAsc} handleSortToggleClick={handleSortToggleClick} />
              </div>
              {"sortAscendant: " + sortAsc}
              <>
                {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList}

                  updateRating={updateRating} onRemoveTodo={removeTodo} />}
              </>

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