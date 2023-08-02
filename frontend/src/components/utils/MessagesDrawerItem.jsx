import { Badge, ListItemButton, Stack, Typography } from "@mui/material";
import React from "react";
import UserAvatar from "./UserAvatar";

const MessagesDrawerItem = ({ user }) => {
  return (
    <ListItemButton
      sx={{
        paddingTop: "20px",
        width: 270,
        "&:hover": { backgroundColor: "#ccc" },
        "&:focus": { backgroundColor: "#444", color: "#ccc" },
      }}
    >
      {/* Add logic to check if user is online */}
      <UserAvatar image="profile.jpeg" variant="standard" />
      <Stack sx={{ flexGrow: 1, ml: "10px" }}>
        <Typography>{user.name}</Typography>
        <Typography variant="caption">{user.text}</Typography>
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
        <Badge badgeContent={user.messages} variant="dot" color="success" />
        <Typography variant="caption" sx={{ color: "green" }}>
          12:35
        </Typography>
      </Stack>
    </ListItemButton>
  );
};

export default MessagesDrawerItem;
