import { FC } from "react";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import LoginForm from "../../components/forms/login.form";

import { RootState } from "../../redux/store";

const LoginPage: FC = () => {
  const { isLogin } = useSelector((state: RootState) => state.user);

  if (isLogin) return <Navigate to="/todo" />;

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
      }}
    >
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
