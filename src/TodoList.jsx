import TodoListItem from './TodoListItem';

const todoList = [
    {
        id: 1,
        title: 'Eat breakfast'
    },
    {
        id: 2,
        title: 'Brush teeth'
    },
    {
        id: 3,
        title: 'Shower'
    }
];

const TodoList = () => {
    return (
        <ul>
            {todoList.map((item) => (
                <TodoListItem key={item.id} todo={item} />
            ))}
        </ul>
    );
};

export default TodoList;