import { FC } from "react";

import {
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";

import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { ITodo } from "../../redux/todo/todoSlice";

type ITodoListItem = {
  todo: ITodo;
};

const TodoListItem: FC<ITodoListItem> = ({ todo }) => {
  return (
    <>
      <ListItem role="listitem">
        <ListItemText
          primary={todo.title}
          primaryTypographyProps={{
            variant: "h5",
            position: "relative",
            sx: {
              "&::after": {
                content: `"${todo.priority}"`,
                fontSize: 13,
                marginLeft: 1,
                border: `1px solid`,
                color: `priority.${todo.priority}`,
                borderRadius: 4,
                px: 0.8,
                pt: 0.1,
                pb: 0.2,
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
              },
            },
          }}
          secondary={todo.description && todo.description}
          secondaryTypographyProps={{
            variant: "subtitle1",
            color: "white",
            component: "p",
          }}
        />

        {!todo.is_done && (
          <Tooltip title="Complete">
            <IconButton color="success">
              <DoneIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Edit">
          <IconButton color="warning">
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </ListItem>
      <Divider variant="middle" component="hr" />
    </>
  );
};

export default TodoListItem;
