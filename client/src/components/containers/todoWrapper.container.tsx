import { styled } from "@mui/material";

const TodoWrapperContainer = styled("div")(({ theme }) => ({
  width: "70%",
  marginInline: "auto",
  marginTop: theme.spacing(3),
  borderRadius: 4,
  overflow: "hidden",
  height: `calc(100dvh - ${theme.spacing(4 * 2)} - 47px - ${theme.spacing(3)})`,

  "& > div:first-of-type": {
    marginBottom: theme.spacing(2),
  },

  [theme.breakpoints.down("md")]: {
    width: "85%",
    height: `calc(100dvh - ${theme.spacing(2 * 2)} - 47px - ${theme.spacing(
      3
    )})`,
  },

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: `calc(100dvh - ${theme.spacing(1 * 2)} - 47px - ${theme.spacing(
      3
    )})`,
  },
}));

export default TodoWrapperContainer;
