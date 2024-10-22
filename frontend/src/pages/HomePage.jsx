import { Container } from "@mui/material";
import Body from "../components/home/Body";
import Activities from "../components/home/Activities";

const HomePage = () => {
  // All components in this home folder will be imported here
  return (
    <Container
      sx={{
        display: "flex",
        margin: "0 auto",
        flexDirection: "row",
        mt: "4rem",
      }}
    >
      <Body />
      <Activities />
    </Container>
  );
};

export default HomePage;
