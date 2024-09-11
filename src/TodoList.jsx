import TodoListItem from './TodoListItem';

const TodoList = ({ todoList, onRemoveTodo, updateRating }) => {

    return (
        <ul>
            {todoList.map((item) => (
                < TodoListItem key={item.id} todo={item} onRemoveTodo={onRemoveTodo} updateRating={updateRating} />
            ))}

        </ul>
    );
};

export default TodoList;
