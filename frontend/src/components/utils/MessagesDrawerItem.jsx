import { Badge, ListItemButton, Stack, Typography } from "@mui/material";
import React from "react";
import UserAvatar from "./UserAvatar";

const MessagesDrawerItem = ({ user }) => {
  return (
    <ListItemButton
      sx={{
        paddingTop: "20px",
        width: 250,
        marginRight: "10px",
        "&:hover": { backgroundColor: "#ccc" },
      }}
    >
      {/* Add logic to check if user is online */}
      <UserAvatar image="profile.jpeg" variant="standard" />
      <Stack sx={{ flexGrow: 1, ml: "10px" }}>
        <Typography>{user.name}</Typography>
        <Typography variant="caption">{user.text}</Typography>
      </Stack>
      <Badge badgeContent={user.messages} variant="dot" color="primary" />
    </ListItemButton>
  );
};

export default MessagesDrawerItem;
