
const todoList = [
    {
        id: 1,
        title: "Eat breakfast"
    },
    {
        id: 2,
        title: "Brush teeth"
    },
    {
        id: 3,
        title: "Shower"
    }
]
const TodoList = () => {
    return (
        <ul>
            {todoList.map((item) => {
                return (
                    <li key={item.id}>
                        {item.title}
                    </li>
                )
            })}
        </ul>
    )
}

export default TodoList;