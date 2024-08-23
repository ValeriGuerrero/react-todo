import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel'
import TodoList from './TodoList.jsx'

const AddTodoForm = ({ onAddTodo }) => {
    const [todoTitle, setTodoTitle] = useState('');

    const handleTitleChange = ({ target }) => {
        const newTodoTitle = target.value;
        setTodoTitle(newTodoTitle)
    }

    const handleAddTodo = (event) => {
        event.preventDefault();
        onAddTodo(todoTitle);
        setTodoTitle(''); //resets 
    };

    return (
        <form onSubmit={handleAddTodo}>

            <>
                <InputWithLabel
                    todoTitle={todoTitle}
                    handleTitleChange={handleTitleChange}
                >
                    Title
                </InputWithLabel>
            </>

            <button>Add</button>
        </form>
    )
};
export default AddTodoForm; 