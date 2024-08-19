import React, { useState, useEffect } from 'react';
import AddTodoForm from './AddTodoForm'
import './App.css'
import TodoList from './TodoList.jsx'
import TodoListItem from './TodoListItem';


const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingList = JSON.parse(localStorage.getItem('savedTodoList')) || [];
        const object = {
          data: {
            todoList: existingList,
          },
        };
        resolve(object);
      }, 2000);
    }).then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    })
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

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

        {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}

      </div>
    </>
  )
}

export default App