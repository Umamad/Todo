import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import { useAppDispatch } from "../hooks/useAppRedux";
import { getTodoList } from "../redux/todo/todoActions";

import App from "../App";
import LoginPage from "../pages/Auth/login.page";
import TodoPage from "../pages/todo/todo.page";

import PageLoading from "../components/loadings/page.loading";
import Page404 from "../pages/errors/404.page";

function MakeRouter() {
  const dispatch = useAppDispatch();

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
          loader: async () => await dispatch(getTodoList()),
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

  return router;
}

const MainRouter = () => (
  <RouterProvider router={MakeRouter()} fallbackElement={<PageLoading />} />
);

export default MainRouter;
