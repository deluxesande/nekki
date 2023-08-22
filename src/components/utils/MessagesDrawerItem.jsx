import { ListItemButton, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import UserAvatar from "./UserAvatar";
import { api_url } from "../../App";
import AuthContext from "../../context/AuthContext";

const MessagesDrawerItem = ({ chat, connect, setReceiver }) => {
  const { user } = useContext(AuthContext);

  let chat_profile = "";
  if (chat.participants[0] === user.username) {
    chat_profile = chat.profiles[1]["url"];
  } else {
    chat_profile = chat.profiles[0]["url"];
  }

  useEffect(() => {
    if (chat.participants[0] === user.username) {
      setReceiver(chat.profiles[1]["id"]);
    } else {
      setReceiver(chat.profiles[0]["id"]);
    }
  });

  return (
    <ListItemButton
      onClick={connect}
      sx={{
        paddingTop: "20px",
        width: 270,
        "&:hover": { backgroundColor: "#ccc" },
        "&:focus": { backgroundColor: "#444", color: "#ccc" },
      }}
    >
      {/* Add logic to check if user is online */}
      <UserAvatar image={`${api_url}${chat_profile}/`} variant="standard" />
      <Stack sx={{ flexGrow: 1, ml: "10px" }}>
        {/* Checking if the is another participant in the chat and display that participant */}
        {chat.participants[0] === user.username ? (
          <Typography>{chat.participants[1]}</Typography>
        ) : (
          <Typography>{chat.participants[0]}</Typography>
        )}
        <Typography variant="caption">
          {chat.messages.slice(0, 25)}...
        </Typography>
      </Stack>
      <Stack
        sx={{
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        {/* {chat.seen ? null : (
          <Badge badgeContent={chat.seen} variant="dot" color="success" />
        )}
        <Typography variant="caption" sx={{ color: chatColor }}>
          {chat.sent}
        </Typography> */}
      </Stack>
    </ListItemButton>
  );
};

export default MessagesDrawerItem;
