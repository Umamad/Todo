import { styled } from "@mui/material";

const TodoListContainer = styled("div")(({ theme }) => ({
  height: `calc(100dvh - ${theme.spacing(4 * 2)} - 47px - ${theme.spacing(
    3
  )} - 215.5px - ${theme.spacing(2)})`,
  overflowY: "auto",
  width: "100%",

  [theme.breakpoints.down("md")]: {
    height: `calc(100dvh - ${theme.spacing(2 * 2)} - 47px - ${theme.spacing(
      3
    )} - 215.5px - ${theme.spacing(2)})`,
  },

  [theme.breakpoints.down("sm")]: {
    height: `calc(100dvh - ${theme.spacing(1 * 2)} - 47px - ${theme.spacing(
      3
    )} - 215.5px - ${theme.spacing(2)})`,
  },
}));

export default TodoListContainer;
