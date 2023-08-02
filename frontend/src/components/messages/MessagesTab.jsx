import {
  Box,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import "../../css/MessagesTab.css";

const MessagesTab = () => {
  return (
    <Container
      sx={{
        mt: "4rem",
        // backgroundColor: "red",
        width: "100%",
        height: "90vh",
      }}
    >
      <Box className="message-box">
        <Box className="message incoming-message">
          <Typography className="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
            rem autem? Magni deserunt eum inventore blanditiis id, accusantium,
            at asperiores voluptas omnis non modi voluptatem veritatis totam
            adipisci quaerat natus? Possimus voluptate nisi eius aliquid,
            ratione, beatae, distinctio quos animi modi suscipit perspiciatis
            excepturi voluptatibus. Eius eum tempore minus aperiam quasi nostrum
            ullam, nihil modi vel impedit cupiditate rem odit?
          </Typography>
        </Box>

        <Box className="message outgoing-message">
          <Typography className="text">Ipsum.</Typography>
        </Box>

        <Box className="message incoming-message">
          <Typography className="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
            rem autem? Magni deserunt eum inventore blanditiis id, accusantium,
            at asperiores voluptas omnis non modi voluptatem veritatis totam
            adipisci quaerat natus? Possimus voluptate nisi eius aliquid,
            ratione, beatae, distinctio quos animi modi suscipit perspiciatis
            excepturi voluptatibus. Eius eum tempore minus aperiam quasi nostrum
            ullam, nihil modi vel impedit cupiditate rem odit?
          </Typography>
        </Box>

        <Box className="message outgoing-message">
          <Typography className="text">Ipsum.</Typography>
        </Box>
        <Box className="message outgoing-message">
          <Typography className="text">Ipsum.</Typography>
        </Box>

        <Box className="message incoming-message">
          <Typography className="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
            rem autem? Magni deserunt eum inventore blanditiis id, accusantium,
            at asperiores voluptas omnis non modi voluptatem veritatis totam
            adipisci quaerat natus? Possimus voluptate nisi eius aliquid,
            ratione, beatae, distinctio quos animi modi suscipit perspiciatis
            excepturi voluptatibus. Eius eum tempore minus aperiam quasi nostrum
            ullam, nihil modi vel impedit cupiditate rem odit?
          </Typography>
        </Box>
      </Box>

      <Box className="message-input-box">
        <TextField
          className="message-input"
          type="text"
          placeholder="Enter Message"
          size="small"
        />
        <IconButton aria-label="send" aria-hidden={false}>
          <SendIcon className="icon" sx={{ color: "#fff" }} />
        </IconButton>
      </Box>
    </Container>
  );
};

export default MessagesTab;
