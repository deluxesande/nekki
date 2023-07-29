import { Stack, Typography } from "@mui/material";
import "../css/smallAvatar.css";
import MessagesDrawer from "../components/messages/MessagesDrawer";
import MessagesTab from "../components/messages/MessagesTab";

const MessagePage = () => {
  const users = [
    { name: "john doe", text: "hi", messages: 2 },
    { name: "jane doe", text: "Hello", messages: 4 },
    { name: "smith tom", text: "How are you", messages: 1 },
  ];
  return (
    <Stack direction="row">
      <MessagesDrawer users={users} />
      <MessagesTab />
    </Stack>
  );
};

export default MessagePage;
