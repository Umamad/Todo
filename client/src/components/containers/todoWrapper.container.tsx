import { styled } from "@mui/material";

const TodoWrapperContainer = styled("div")(({ theme }) => ({
  width: "70%",
  marginInline: "auto",
  marginBlock: theme.spacing(3),
  borderRadius: 4,
  overflow: "hidden",

  "& > div": {
    marginBottom: theme.spacing(2),
  },

  [theme.breakpoints.down("md")]: {
    width: "85%",
  },

  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export default TodoWrapperContainer;
