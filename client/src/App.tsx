import { Outlet } from "react-router-dom";

import { Container } from "@mui/material";

function App() {
  return (
    <Container maxWidth="xl">
      Hello world
      <br />
      <Outlet />
    </Container>
  );
}

export default App;
