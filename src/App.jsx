import AddTodoForm from './AddTodoForm'
import './App.css'
import TodoList from './TodoList.jsx'

function App() {

  return (
    <>
      <div>
        <h1>To do list</h1>

        <AddTodoForm />
        <TodoList />

      </div>
    </>
  )
}
export default App
