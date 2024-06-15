import './App.css'

let todoList = [
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
    title: "shower"
  }
]

function App() {

  return (
    <>
      <div>
        <h1>To do list</h1>
        <ul>
          {todoList.map((item) => {
            return (
              <li key={item.id}>
                {item.title}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default App
