import { FC } from "react";
import { Container } from "@mui/material";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "../../hooks/useAppRedux";

import LoginForm from "../../components/forms/login.form";

const LoginPage: FC = () => {
  const { currentUser } = useAppSelector((state) => state.user);

  if (currentUser) return <Navigate to="/todo" />;

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100dvh",
      }}
    >
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
