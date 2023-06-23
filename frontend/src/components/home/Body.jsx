import { Box, Container } from "@mui/material";
import TextPost from "../utils/TextPost";
import PostCard from "../utils/PostCard";
import { useEffect, useState } from "react";

import api_url from "../../App";

const Body = ({ posts }) => {
  return (
    <Box sx={{ width: "58%" }}>
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
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Container>
    </Box>
  );
};

export default Body;
