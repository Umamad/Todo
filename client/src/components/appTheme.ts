import { createTheme } from "@mui/material";

const PRIMARY_COLOR = "#F19805";
const SECONDARY_COLOR = "#444444";

const appTheme = createTheme({
  palette: {
    background: {
      default: "#333333",
    },
    primary: {
      main: PRIMARY_COLOR,
    },
    secondary: {
      main: SECONDARY_COLOR,
    },
  },
  typography: {
    allVariants: {
      color: "white",
    },
    body1: {
      fontSize: 18,
      // color: 'white',
    },
    h1: {
      fontSize: 40,
      fontWeight: "bolder",
      // color: "white",
    },
    h5: {
      fontSize: 24,
      color: PRIMARY_COLOR,
    },
    subtitle1: {
      fontSize: 16,
    },
    button: {
      textTransform: "none",
    }
  },
  shape: {
    borderRadius: 4,
  }
});

export default appTheme;
