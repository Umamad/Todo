import TodoWrapperContainer from "../../components/containers/todoWrapper.container";
import AddTodoForm from "../../components/forms/addTodo.form";
import TodosList from "../../components/lists/todos.list";

function TodoPage() {
  return (
    <TodoWrapperContainer>
      <AddTodoForm />
      <TodosList />
    </TodoWrapperContainer>
  );
}

export default TodoPage;
