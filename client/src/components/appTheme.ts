import { createTheme } from "@mui/material";

import { PriorityType } from "../redux/todo/todoSlice";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    priority?: {
      [PriorityType.high]?: string;
      [PriorityType.medium]?: string;
      [PriorityType.low]?: string;
    };
  }
}

const PRIMARY_COLOR = "#F19805";
const SECONDARY_COLOR = "#444444";

const appTheme = createTheme({
  palette: {
    background: {
      default: "#333333",
      paper: "#333333",
    },
    primary: {
      main: PRIMARY_COLOR,
    },
    secondary: {
      main: SECONDARY_COLOR,
    },
    priority: {
      [PriorityType.high]: "#DB4437",
      [PriorityType.medium]: "#F4B400",
      [PriorityType.low]: "#4285F4",
    },
  },
  typography: {
    allVariants: {
      color: "white",
    },

    body1: {
      fontSize: 18,
    },
    h1: {
      fontSize: 40,
      fontWeight: "bolder",
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
    },
  },
  shape: {
    borderRadius: 4,
  },
});

export default appTheme;
