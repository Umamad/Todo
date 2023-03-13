import { FC } from "react";

import { Typography, Button } from "@mui/material";

import LoginFormContainer from "../containers/loginForm.container";
import LoginEmailInput from "../inputs/loginEmail.input";
import LoginPasswordInput from "../inputs/loginPassword.input";

const LoginForm: FC = () => {
  return (
    <LoginFormContainer>
      <Typography variant="h1" component="h1" textAlign="center">
        Login
      </Typography>

      <LoginEmailInput />

      <LoginPasswordInput />

      <Button variant="contained" disableElevation fullWidth>
        LOGIN
      </Button>
    </LoginFormContainer>
  );
};

export default LoginForm;
