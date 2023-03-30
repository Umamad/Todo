import { useAppSelector } from "../../hooks/useAppRedux";

import { List, Collapse } from "@mui/material";
import { TransitionGroup } from "react-transition-group";

import TodoListItem from "../listitems/todo.listitem";
import TodoListContainer from "../containers/todoList.container";

import { ITodo } from "../../redux/todo/todoSlice";

const TodosList = () => {
  const { todoList } = useAppSelector((state) => state.todo);

  return (
    <TodoListContainer>
      <List role="list" sx={{ bgcolor: "secondary.main" }}>
        <TransitionGroup>
          {todoList.map((todo: ITodo) => (
            <Collapse key={todo.id}>
              <TodoListItem todo={todo} />
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </TodoListContainer>
  );
};

export default TodosList;
