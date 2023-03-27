import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "./hooks/useAppRedux";

import PageContainer from "./components/containers/page.container";
import { Grid, Typography } from "@mui/material";

function App() {
  const { currentUser } = useAppSelector((state) => state.user);

  if (!currentUser) return <Navigate to="/login" />;

  return (
    <PageContainer
      sx={{
        p: { xs: 1, sm: 2, md: 4 },
      }}
    >
      <Grid container justifyContent="center">
        <Typography variant="h1" component="h1">
          My Todos
        </Typography>
      </Grid>

      <Outlet />
    </PageContainer>
  );
}

export default App;
