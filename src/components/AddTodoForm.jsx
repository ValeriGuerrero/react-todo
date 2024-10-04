import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel'
import TodoList from './TodoList.jsx'
import { RatingReview } from '../star.jsx';
import PropTypes from 'prop-types'; // ES6

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

            <div className='bookTitle'>
                <InputWithLabel
                    todoTitle={todoTitle}
                    handleTitleChange={handleTitleChange}
                >
                    Book Title
                </InputWithLabel>
            </div>

            <button className='addButton'>Add</button>
        </form>
    )
};

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm; 