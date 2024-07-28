
const TodoListItem = ({ todo, onRemoveTodo }) => {
    return (
        <li >
            <button onClick={() => onRemoveTodo(todo.id)}>Remove </button>
            {todo.title}
        </li >
    )
}
export default TodoListItem;