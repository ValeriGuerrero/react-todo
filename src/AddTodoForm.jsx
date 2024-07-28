import React, { useState } from 'react';

const AddTodoForm = ({ onAddTodo }) => {
    const [todoTitle, setTodoTitle] = useState('');

    const handleTitleChange = ({ target }) => {
        const newTodoTitle = target.value;
        setTodoTitle(newTodoTitle)
    }

    const handleAddTodo = (event) => {
        console.log(event);
        event.preventDefault();

        onAddTodo({
            title: todoTitle,
            id: Date.now()
        });
        console.log(todoTitle);
        setTodoTitle('');//resets 
    };

    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title</label>
            <input text="title" id="todoTitle"

                value={todoTitle}
                onChange={handleTitleChange}
            />
            <button>Add</button>
        </form>
    )
};
export default AddTodoForm; 