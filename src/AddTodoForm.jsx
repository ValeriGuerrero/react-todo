import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel'
import TodoList from './TodoList.jsx'
import { RatingReview } from './star';

const AddTodoForm = ({ onAddTodo }) => {
    const [todoTitle, setTodoTitle] = useState('');
    const [rating, setRating] = useState(0);

    const handleTitleChange = ({ target }) => {
        const newTodoTitle = target.value;
        setTodoTitle(newTodoTitle)
    }

    const handleAddTodo = (event) => {
        event.preventDefault();
        onAddTodo(todoTitle);
        setTodoTitle(''); //resets 
        setRating(0);
    };


    return (
        <form onSubmit={handleAddTodo} className='todoForm"' >

            <>
                <InputWithLabel
                    todoTitle={todoTitle}
                    className='title'
                    handleTitleChange={handleTitleChange}
                >
                    Book Title
                </InputWithLabel>
                <RatingReview rating={rating} setRating={setRating} /> {/* Rating input */}
            </>

            <button className='addButton'>Add</button>
        </form>
    )
};
export default AddTodoForm; 