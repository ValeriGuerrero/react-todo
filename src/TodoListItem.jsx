import React, { useState } from 'react';
import styled from './TodoListItem.module.css';
import { RatingReview } from './star';


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
                <button className='removeButton' onClick={() => onRemoveTodo(todo.id)}> Remove </button>
            </>
            <RatingReview rating={rating} setRating={handleRatingChange} />
        </li >
    )
}
export default TodoListItem;