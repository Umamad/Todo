import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { Container } from "@mui/material";
import { RootState } from "./redux/store";

function App() {
  const { isLogin } = useSelector((state: RootState) => state.user);

  if (!isLogin) return <Navigate to="/login" />;

  return (
    <Container maxWidth="xl">
      Hello world
      <br />
      <Outlet />
    </Container>
  );
}

export default App;
