import { styled, TextField } from "@mui/material";

const AppInput = styled(TextField)(({ theme }) => ({
  "& input": {
    color: "#FFF",
    fontSize: 16,
    caretColor: theme.palette.primary.main,
  },

  "& label.Mui-focused": {
    color: theme.palette.primary.main,
  },

  "& div.Mui-focused .MuiInputAdornment-positionStart": {
    color: theme.palette.primary.main,
    transition: theme.transitions.create("color"),
  },

  "& .Mui-error .MuiInputAdornment-positionStart": {
    color: theme.palette.error.dark,
    transition: theme.transitions.create("color"),
  },

  "& .MuiInput-underline:after": {
    borderBottomColor: theme.palette.primary.main,
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },

    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
  },
}));

export default AppInput;
