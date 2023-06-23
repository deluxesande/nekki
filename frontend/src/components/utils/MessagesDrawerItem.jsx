import { Badge, ListItemButton, Stack, Typography } from "@mui/material";
import React from "react";
import UserAvatar from "./UserAvatar";

const MessagesDrawerItem = ({ user, index }) => {
  return (
    <ListItemButton
      key={index}
      sx={{
        width: 250,
        marginRight: "10px",
        "&:hover": { backgroundColor: "#ccc" },
      }}
    >
      <UserAvatar image="profile.jpeg" />
      <div style={{ flexGrow: 1 }}>
        <Stack>
          <Typography variant="subtitle1">{user.name}</Typography>
          <Typography variant="caption">{user.text}</Typography>
        </Stack>
      </div>
      <Badge badgeContent={user.messages} color="primary" />
    </ListItemButton>
  );
};

export default MessagesDrawerItem;
