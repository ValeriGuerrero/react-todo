import TodoListItem from './TodoListItem';
import PropTypes from 'prop-types';

const TodoList = ({ todoList, updateRating, onRemoveTodo }) => {

    return (
        <ul className='form-todo-list'>
            {todoList.map((item) => (
                < TodoListItem key={item.id} todo={item} updateRating={updateRating} onRemoveTodo={onRemoveTodo} />
            ))}

        </ul>
    );
};

TodoList.propTypes = {
    todoList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            rating: PropTypes.number
        })
    ).isRequired,
    updateRating: PropTypes.func.isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
}


export default TodoList;
