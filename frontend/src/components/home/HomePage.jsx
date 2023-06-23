import { Container } from "@mui/material";
import Body from "./Body";
import Activities from "./Activities";

const HomePage = ({ posts }) => {
  // All components in this home folder will be imported here
  return (
    <Container
      sx={{
        display: "flex",
        margin: "0 auto",
        flexDirection: "row",
      }}
    >
      <Body posts={posts} />
      <Activities />
    </Container>
  );
};

export default HomePage;
