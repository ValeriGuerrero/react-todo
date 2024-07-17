import React, { useState } from 'react';

const AddTodoForm = ({ onAddTodo }) => {
    const [todoTitle, setTodoTitle] = useState('');

    //const [newTodo, setNewTodo] = useState('');

    const handleTitleChange = ({ target }) => {
        const newTodoTitle = target.value;
        setTodoTitle(newTodoTitle)
    }

    const handleAddTodo = (event) => {
        console.log(event);
        event.preventDefault();
        //const todoTitle = newTodo;
        onAddTodo({
            title: todoTitle,
            id: Date.now()
        });
        console.log(todoTitle);
        setTodoTitle('');//resets 
    };
    //console.log(newTodo)
    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title</label>
            <input text="title" id="todoTitle"
                //value={newTodo} // Bind the input value to 'searchTerm' state
                //onChange={(e) => setNewTodo(e.target.value)}
                value={todoTitle}
                onChange={handleTitleChange}
            />
            <button>Add</button>
        </form>
    )
};
export default AddTodoForm; 