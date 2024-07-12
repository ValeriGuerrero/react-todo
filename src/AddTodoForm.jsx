import React, { useState } from 'react';
const AddTodoForm = ({ onAddTodo }) => {
    const [newTodo, setNewTodo] = useState('');

    const handleAddTodo = (event) => {
        console.log(event);
        event.preventDefault();
        const todoTitle = newTodo;
        onAddTodo(newTodo);
        console.log(todoTitle);
    };
    console.log(newTodo)
    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title</label>

            <input text="title" id="todoTitle"
                value={newTodo} // Bind the input value to 'searchTerm' state
                onChange={(e) => setNewTodo(e.target.value)}
            />

            <button>Add</button>

        </form>

    )
};

export default AddTodoForm;

