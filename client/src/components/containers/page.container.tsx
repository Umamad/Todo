import { Container, styled, ContainerProps } from "@mui/material";

const PageContainer = styled((props: ContainerProps) => (
  <Container maxWidth="xl" {...props}></Container>
))(({ theme }) =>
  theme.unstable_sx({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    height: "100vh",
  })
);

export default PageContainer;
