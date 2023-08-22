import { Box, Card, Container, Typography } from "@mui/material";
import FollowActivity from "../utils/FollowActivity";
import Footer from "./Footer";

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
        <FollowActivity />
        <FollowActivity />
        <FollowActivity />
        <FollowActivity />
        <Footer />
      </Container>
    </Box>
  );
};

export default Activities;
