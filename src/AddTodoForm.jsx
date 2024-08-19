import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel'

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
        //console.log(todoTitle);
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