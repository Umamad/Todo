import { FC } from "react";

import { Typography, Button } from "@mui/material";

import useLoginFormik from "../../hooks/formik/useLoginFormik";

import LoginFormContainer from "../containers/loginForm.container";
import LoginEmailInput from "../inputs/loginEmail.input";
import LoginPasswordInput from "../inputs/loginPassword.input";

const LoginForm: FC = () => {
  const { formik, handleSubmit, loading } = useLoginFormik();

  return (
    <LoginFormContainer onSubmit={handleSubmit}>
      <Typography variant="h1" component="h1" textAlign="center">
        Login
      </Typography>

      <LoginEmailInput
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={!!formik.errors.email}
      />

      <LoginPasswordInput
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={!!formik.errors.password}
      />

      <Button
        variant="contained"
        type="submit"
        disabled={loading}
        disableElevation
        fullWidth
      >
        LOGIN
      </Button>
    </LoginFormContainer>
  );
};

export default LoginForm;
