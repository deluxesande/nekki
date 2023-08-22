import { Stack } from "@mui/material";
import "../css/smallAvatar.css";
import MessagesDrawer from "../components/messages/MessagesDrawer";
import MessagesTab from "../components/messages/MessagesTab";
import { useState } from "react";

const MessagePage = () => {
  const [socketConnection, setSocketConnection] = useState(false);
  const [chatId, setChatId] = useState(0);
  const [receiver, setReceiver] = useState("");
  const [fetching, setFetching] = useState(false);

  return (
    <Stack direction="row">
      <MessagesDrawer
        setFetching={setFetching}
        setSocketConnection={setSocketConnection}
        setChatId={setChatId}
        setReceiver={setReceiver}
        socketConnection={socketConnection}
        fetching={fetching}
      />
      <MessagesTab
        socketConnection={socketConnection}
        setFetching={setFetching}
        chatId={chatId}
        receiver={receiver}
      />
    </Stack>
  );
};

export default MessagePage;
