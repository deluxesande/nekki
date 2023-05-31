import { Box, Card, Container, Typography } from "@mui/material";
import Activity from "./Activity";

const Activities = () => {
  return (
    <Box sx={{ width: "35%" }}>
      <Container
        sx={{
          marginTop: "20px",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h5" sx={{ color: "#fff", fontWeight: 600 }}>
          Activities
        </Typography>
        <Activity />
        <Activity />
        <Activity />
        <Activity />
      </Container>
    </Box>
  );
};

export default Activities;
