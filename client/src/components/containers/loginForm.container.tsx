import { styled, Box, BoxProps } from "@mui/material";

const LoginFormContainer = styled((props: BoxProps) => (
  <Box {...props} component="form">
    {props.children}
  </Box>
))(({ theme }) => ({
  width: "clamp(300px, 350px, 400px)",
  borderRadius: 8,
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.2) 100%)",
  backdropFilter: "blur(10px)",
  padding: theme.spacing(4),

  "& h1": {
    marginBottom: theme.spacing(3),
  },

  "& button": {
    marginTop: theme.spacing(3),
    borderRadius: theme.spacing(1),
    color: "#FFF",
  },
}));

export default LoginFormContainer;
