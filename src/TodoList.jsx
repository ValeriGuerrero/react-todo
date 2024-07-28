import TodoListItem from './TodoListItem';



const TodoList = ({ todoList }) => {
    //const { todoList } = props;

    return (
        <ul>
            {todoList.map((item) => (
                < TodoListItem key={item.id} todo={item} />
            ))}
        </ul>
    );
};

export default TodoList;