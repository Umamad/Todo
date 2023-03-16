import { useAppSelector } from "../../hooks/useAppRedux";

import { TodoType } from "../../types/Todo.type";

function TodoPage() {
  const { todoList } = useAppSelector((state) => state.todo);

  return (
    <div>
      {todoList.map((todo: TodoType) => (
        <div>
          <p>{todo.title}</p>
          <p>{todo.priority}</p>
        </div>
      ))}
    </div>
  );
}

export default TodoPage;
