import logo from "./logo.svg";
import "./App.css";
import { gql, useQuery } from "@apollo/client";

const GET_TODOS = gql`
  query GetTodos {
    todos {
      data {
        id
        title
      }
    }
  }
`;

const GET_TODO = gql`
  query GetTodo($id: ID!) {
    todo(id: $id) {
      id
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const todos = data?.todos.data;

  const todo = useQuery(GET_TODO, { variables: { id: "18" } });
  console.log("todo", todo.data);

  console.log(todos);
  if (error) {
    return <p>Shit hit the fan</p>;
  }
  if (loading || !todos) {
    return <p>Is Loading</p>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {todos.map((todo) => {
          return <p key={todo.id}>{todo.id}</p>;
        })}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
