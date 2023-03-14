import { FC } from "react";

import { InputAdornment, TextFieldProps } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

import AppInput from "./app.input";

const LoginEmailInput: FC<TextFieldProps> = (props) => {
  return (
    <AppInput
      label="Email"
      type="email"
      variant="standard"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <EmailIcon />
          </InputAdornment>
        ),
        autoComplete: "username"
      }}
      fullWidth
      margin="normal"
      {...props}
    />
  );
};

export default LoginEmailInput;
