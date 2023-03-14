import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { store } from "./redux/store";

import MainRouter from "./routes/Main.router";

import { ThemeProvider, CssBaseline } from "@mui/material";
import appTheme from "./components/appTheme";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <MainRouter />
        <ToastContainer theme="dark" limit={3} autoClose={3000} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
