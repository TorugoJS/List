import './App.css';
import { useState, useEffect } from 'react'
import { BsTrash, BsbookmarkCheck, BsbookmarkCheckFill } from "react-icons/bs";

const API = "http://localhost:5000";

function App() {
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false);

  //Load todos on page load

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)

      const res = await fetch(API + "/todos")
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));

      setLoading(false)

      setTodos(res)

    }

    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todo = {
      id: Math.random(),
      title,
      time,
      done: false,
    };

    console.log(todo);

    await fetch(API + "/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTodos((prevState) => [...prevState, todo]);

    setTitle("");
    setTime("");
  };

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <div className="App">
      <div className='todo-header'>
        <h1>React Todo</h1>

        <div className="form-todo">
          <h2>Insira sua próxima tarefa:</h2>

          <form onSubmit={handleSubmit}>

            <div className='form-control'>
              <label htmlFor='title'>O que você quer fazer hoje?</label>

              <input
                type="text"
                name="tiltle"
                placeholder='Tarefa de hoje!!!'
                onChange={(e) => setTitle(e.target.value)}
                value={title || ""}
                required
              />

            </div>


            <div className='form-control'>
              <label htmlFor='time'>Duração:</label>

              <input
                type="number"
                name="text"
                placeholder='Tempo estimado (em horas)'
                onChange={(e) => setTime(e.target.value)}
                value={time || ""}
                required
              />

            </div>

            <input type="submit" value="Criar tarefa" />

          </form>

        </div>

        <div className="list-todo">

          <h2>Lista de tarefas:</h2>
          {todos.length === 0 && <p>Não há tarefas!</p>}
          {todos.map((todo) => (
            <div className="todo" key={todo.id}>
              <h3>{todo.title}</h3>
              <p>Duração {todo.time}</p>
              <div className="actions"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
