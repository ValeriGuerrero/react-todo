import React, { useState } from 'react';
import styled from './TodoListItem.module.css';
import { RatingReview } from '../star.jsx';
import PropTypes from 'prop-types';

const TodoListItem = ({ todo, onRemoveTodo, updateRating }) => {
    const [rating, setRating] = useState(todo.rating || 0);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        updateRating(todo.id, newRating)
    }

    return (
        <li className={styled.ListItem} >
            <>
                {todo.title}
                <RatingReview rating={rating} setRating={handleRatingChange} />
            </>
            <>
                <button className='removeButton' onClick={() => onRemoveTodo(todo.id)}> Remove </button>
            </>

        </li >
    )
}

TodoListItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        rating: PropTypes.number
    }).isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    updateRating: PropTypes.func.isRequired,
}

export default TodoListItem;