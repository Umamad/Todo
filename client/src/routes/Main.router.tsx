import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import App from "../App";
import LoginPage from "../pages/Auth/login.page";
import TodoPage from "../pages/todo/todo.page";

import Page404 from "../pages/errors/404.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/todo"} />,
      },
      {
        path: "/todo",
        element: <TodoPage />,
        index: true,
      },
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

const MainRouter = () => (
  <RouterProvider router={router} fallbackElement={<h1>Loading ...</h1>} />
);

export default MainRouter;
