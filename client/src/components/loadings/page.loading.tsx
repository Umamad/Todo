import { FC } from "react";
import { CircularProgress, Box } from "@mui/material";

const PageLoading: FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default PageLoading;
