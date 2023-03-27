import { styled, Grid, GridProps } from "@mui/material";

const AddTodoFormContainer = styled((props: GridProps) => (
  <Grid container {...props}></Grid>
))(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  padding: theme.spacing(2),
  justifyContent: "space-between",
  rowGap: theme.spacing(1),

  "& button": {
    color: "white",
    fontSize: 18,
    marginTop: theme.spacing(1)
  },
}));

export default AddTodoFormContainer;
