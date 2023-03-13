import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { TodoType } from "../../types/Todo.type";

function TodoPage() {
  const todoList = useSelector((state: RootState) => state.todo.todoList);

  return <div>
    {todoList.map((todo: TodoType) => (
        <div>
          <p>{todo.title}</p>
          <p>{todo.priority}</p>
        </div>
      ))}
  </div>;
}

export default TodoPage;
