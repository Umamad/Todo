import { useAppSelector } from "../../hooks/useAppRedux";

import { ITodo } from "../../redux/todo/todoSlice";

function TodoPage() {
  const { todoList } = useAppSelector((state) => state.todo);

  return (
    <div>
      {todoList.map((todo: ITodo) => (
        <div>
          <p>{todo.title}</p>
          <p>{todo.priority}</p>
        </div>
      ))}
    </div>
  );
}

export default TodoPage;
