import { useAppSelector } from "../../hooks/useAppRedux";

import { List, Collapse } from "@mui/material";
import { TransitionGroup } from "react-transition-group";

import TodoListItem from "../listitems/todo.listitem";

import { ITodo } from "../../redux/todo/todoSlice";

const TodosList = () => {
  const { todoList } = useAppSelector((state) => state.todo);

  return (
    <List role="list" sx={{ bgcolor: "secondary.main" }}>
      <TransitionGroup>
        {todoList.map((todo: ITodo) => (
          <Collapse key={todo.id}>
            <TodoListItem todo={todo} />
          </Collapse>
        ))}
      </TransitionGroup>
    </List>
  );
};

export default TodosList;
