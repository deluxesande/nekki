import { Box, Container } from "@mui/material";
import TextPost from "../utils/TextPost";
import PostCard from "../utils/PostCard";
import { useContext, useEffect, useState } from "react";
import { api_url } from "../../App";
import AuthContext from "../../context/AuthContext";
import useFetch from "../utils/useFetch";

const Body = () => {
  const { logoutUser, fetching, setFetching } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const api = useFetch();

  const fetchPosts = async () => {
    // console.log("Fetching...");
    const { response, data } = await api("/post/", "GET");

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
          <PostCard
            key={post.id}
            post={post}
            post_likes={post.post_like_count}
          />
        ))}
      </Container>
    </Box>
  );
};

export default Body;
