import { Drawer, List } from "@mui/material";
import MessagesDrawerItem from "../utils/MessagesDrawerItem";
import { useContext, useEffect, useState } from "react";
import useFetch from "../utils/useFetch";
import AuthContext from "../../context/AuthContext";
import websocketinstance from "../utils/Websocket";

const MessagesDrawer = ({
  setSocketConnection,
  setChatId,
  setReceiver,
  setFetching,
  socketConnection,
  fetching,
}) => {
  const { user } = useContext(AuthContext);
  const api = useFetch();
  const [chats, setChats] = useState([]);

  const drawerWidth = 270;

  const get_user_cahts = async () => {
    console.log("getting chats");
    const { response, data } = await api(`/chat/${user.account_id}/`);

    setChats(data);
    setFetching(false);
  };

  useEffect(() => {
    get_user_cahts();
  }, [fetching]);

  const connect_to_websocket = (chat_id) => {
    if (!socketConnection) {
      websocketinstance.connect(user.account_id);
      // console.log("Setting socket connection");
      setSocketConnection(true);
    }
    setTimeout(() => {
      websocketinstance.fetchMessages(user.user_id, chat_id);

      // Set the chat id to be used in sending messages
      setChatId(chat_id);
    }, 100);
  };

  let isValid = false;

  if (chats.length === 0) {
    isValid = true;
  }

  return (
    <Drawer
      open
      variant="permanent"
      sx={{
        width: drawerWidth,
        overflowY: "auto",
      }}
    >
      <List sx={{ mt: "4rem" }}>
        {isValid && (
          <p style={{ width: "240px", padding: "20px" }}>No Chats...</p>
        )}
        {chats.map((chat, index) => (
          <MessagesDrawerItem
            connect={() => connect_to_websocket(chat.id)}
            chat={chat}
            key={index}
            setReceiver={setReceiver}
          />
        ))}
      </List>
    </Drawer>
  );
};

export default MessagesDrawer;
