import {
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const Activity = () => {
  return (
    <Card
      elevation={3}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: "2px 10px",
        backgroundColor: "#333",
      }}
    >
      <IconButton>
        <Avatar variant="circular" src="/profile.jpeg" />
      </IconButton>
      <Stack>
        <Typography variant="subtitle2">@johndoe</Typography>
        <Typography variant="body2">John Doe is following you</Typography>
      </Stack>
      <Box>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{ fontSize: "10px", color: "#fff" }}
        >
          Follow
        </Button>
      </Box>
    </Card>
  );
};

export default Activity;
