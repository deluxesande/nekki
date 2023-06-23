import { Box, Stack, Typography } from "@mui/material";
import "../../css/smallAvatar.css";
import MessagesDrawer from "./MessagesDrawer";

const MessagePage = () => {
  const users = [
    { name: "johndoe", text: "hi", messages: 2 },
    { name: "janedoe", text: "Hello", messages: 4 },
    { name: "smithtom", text: "How are you", messages: 1 },
  ];
  return (
    <Stack direction="row" spacing={5}>
      <MessagesDrawer users={users} />
      <Box>
        <Typography>Messages</Typography>
      </Box>
    </Stack>
  );
};

export default MessagePage;
