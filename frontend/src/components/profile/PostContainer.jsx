import PostCard from "../utils/PostCard";
import { Box, Container, Typography } from "@mui/material";

const PostContainer = ({ posts }) => {
  return (
    <Box className="post-container">
      <Typography variant="h4" sx={{ textTransform: "uppercase" }}>
        Posts
      </Typography>
      <Container sx={{ display: "flex", gap: 4 }}>
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
