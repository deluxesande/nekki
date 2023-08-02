import PostCard from "../utils/PostCard";
import { Box, Container, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { api_url } from "../../App";
import AuthContext from "../../context/AuthContext";
import useFetch from "../utils/useFetch";

const PostContainer = () => {
  const api = useFetch();

  const { logoutUser, fetching, setFetching } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    // console.log("Fetching...");
    const { response, data } = await api("/post/get-posts/", "GET");

    if (response.status === 200) {
      setPosts(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  useEffect(() => {
    fetchPosts();
    setFetching(false);
  }, [fetching]);

  return (
    <Box className="post-container">
      <Typography
        variant="h4"
        sx={{ textTransform: "uppercase", display: { xs: "none", md: "flex" } }}
      >
        Posts
      </Typography>
      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, min(500px, 500px))",
          // columnCount: { xs: 1, md: 2 },
          gap: 2,
        }}
      >
        {posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </Container>
    </Box>
  );
};

export default PostContainer;
