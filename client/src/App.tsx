import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import type { TodoType } from "./types/Todo.type";

import { Container } from "@mui/material";

function App() {
  const todoList = useSelector((state: RootState) => state.todo.todoList);

  return (
    <Container maxWidth="xl">
      Hello world
      <br />
      {todoList.map((todo: TodoType) => (
        <div>
          <p>{todo.title}</p>
          <p>{todo.priority}</p>
        </div>
      ))}
    </Container>
  );
}

export default App;
