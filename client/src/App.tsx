import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "./hooks/useAppRedux";
import { Container } from "@mui/material";

function App() {
  const { currentUser } = useAppSelector((state) => state.user);

  if (!currentUser) return <Navigate to="/login" />;

  return (
    <Container maxWidth="xl">
      Hello world
      <br />
      <Outlet />
    </Container>
  );
}

export default App;
