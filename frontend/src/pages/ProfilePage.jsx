import { Container } from "@mui/material";
import ProfileCard from "../components/profile/ProfileCard";
import PostContainer from "../components/profile/PostContainer";

import "../css/profilePage.css";

const ProfilePage = ({ posts }) => {
  return (
    <Container sx={{ mt: "4rem" }}>
      <ProfileCard />
      <PostContainer posts={posts} />
    </Container>
  );
};

export default ProfilePage;
