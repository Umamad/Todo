import { useAppSelector } from "../../hooks/useAppRedux";

import TodoWrapperContainer from "../../components/containers/todoWrapper.container";
import AddTodoForm from "../../components/forms/addTodo.form";

import { ITodo } from "../../redux/todo/todoSlice";

function TodoPage() {
  const { todoList } = useAppSelector((state) => state.todo);

  return (
    <TodoWrapperContainer>
      <AddTodoForm />
      {todoList.map((todo: ITodo) => (
        <div>
          <p>{todo.title}</p>
          <p>{todo.priority}</p>
        </div>
      ))}
    </TodoWrapperContainer>
  );
}

export default TodoPage;
