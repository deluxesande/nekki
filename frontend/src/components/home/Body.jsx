import { Box, Container } from "@mui/material";
import TextPost from "./TextPost";

const Body = () => {
  return (
    <Box sx={{ width: "65%" }}>
      <Container
        sx={{
          marginTop: "20px",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Div for creating text based posts */}
        <TextPost />
      </Container>
    </Box>
  );
};

export default Body;
