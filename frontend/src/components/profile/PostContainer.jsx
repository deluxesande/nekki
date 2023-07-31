import PostCard from "../utils/PostCard";
import { Box, Container, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { api_url } from "../../App";
import AuthContext from "../../context/AuthContext";

const PostContainer = () => {
  const { logoutUser, authTokens } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    // console.log("Fetching...");
    const response = await fetch(`${api_url}/post/get-posts/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });

    const data = await response.json();

    if (response.status === 200) {
      setPosts(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Box className="post-container">
      <Typography
        variant="h4"
        sx={{ textTransform: "uppercase", display: { xs: "none", md: "flex" } }}
      >
        Posts
      </Typography>
      <Container sx={{ columnCount: 2, gap: 2 }}>
        {/* FIGURE OUT HOW TO DISPLAY POSTS IN GRID */}
        {/* <PostCard width={600} height={550} />
        <PostCard width={600} height={550} /> */}
        {posts.map((post, index) => (
          <PostCard
            key={index}
            post={post}
            post_likes={post.post_likes_count}
          />
        ))}
      </Container>
    </Box>
  );
};

export default PostContainer;
