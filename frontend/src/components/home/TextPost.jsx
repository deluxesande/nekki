import { AddBox, Search } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  TextField,
} from "@mui/material";

const TextPost = () => {
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
      <TextField
        variant="outlined"
        color="warning"
        type="text"
        size="small"
        sx={{ width: "100%", backgroundColor: "#444", borderRadius: 1 }}
        placeholder="Create Post..."
        multiline
        maxRows={2}
      />
      <Box>
        <Button
          variant="contained"
          startIcon={<AddBox />}
          type="submit"
          color="warning"
          size="small"
          sx={{ fontSize: "14px", color: "#fff" }}
        >
          Post
        </Button>
      </Box>
    </Card>
  );
};

export default TextPost;
