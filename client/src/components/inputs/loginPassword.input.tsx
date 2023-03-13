import { FC } from "react";

import { InputAdornment, TextFieldProps } from "@mui/material";

import LockIcon from "@mui/icons-material/Lock";

import AppInput from "./app.input";

const LoginPasswordInput: FC<TextFieldProps> = () => {
  return (
    <AppInput
      label="Password"
      variant="standard"
      type='password'
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LockIcon />
          </InputAdornment>
        ),
        autoComplete: "current-password"
      }}
      fullWidth
      margin="normal"
    />
  );
};

export default LoginPasswordInput;
