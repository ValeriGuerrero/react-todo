import AddTodoForm from './AddTodoForm'
import React from 'react';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const InputWithLabel = ({ todoTitle, handleTitleChange, children, }) => {
    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
    })

    return (
        <>
            <label htmlFor="todoTitle">{children}</label>
            <input
                type="text"
                id="todoTitle"
                value={todoTitle}
                onChange={handleTitleChange}
                ref={inputRef}
            />
        </>)
}

InputWithLabel.proptTypes = {
    todoTitle: PropTypes.string.isRequired,
    handleTitleChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}


export default InputWithLabel;