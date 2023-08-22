import { Box, Button, Card, Stack, Typography } from "@mui/material";
import UserAvatar from "./UserAvatar";

import "../../css/followActivity.css";

const FollowActivity = () => {
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
      <UserAvatar image="/profile.jpeg" />
      <Stack sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">johndoe</Typography>
        <Typography variant="body2">started following you</Typography>
      </Stack>
      <Box>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          sx={{ fontSize: "12px", color: "#fff" }}
        >
          Follow
        </Button>
      </Box>
    </Card>
  );
};

export default FollowActivity;
