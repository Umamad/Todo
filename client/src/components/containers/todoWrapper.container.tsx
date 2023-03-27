import { styled } from "@mui/material";

const TodoWrapperContainer = styled("div")(({ theme }) => ({
  width: "70%",
  marginInline: "auto",
  marginTop: theme.spacing(3),

  [theme.breakpoints.down("md")]: {
    width: "85%",
  },

  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export default TodoWrapperContainer;
