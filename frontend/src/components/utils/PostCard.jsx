import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import UserAvatar from "./UserAvatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Favorite } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import CommentIcon from "@mui/icons-material/Comment";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import TurnedInIcon from "@mui/icons-material/TurnedIn";

import { useState } from "react";

import "../../css/postCard.css";

const PostCard = ({ width, height, post }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggleLiked = () => {
    setLiked(!liked);
  };

  const toggleSaved = () => {
    setSaved(!saved);
  };

  return (
    <Card
      sx={{
        color: "#fff",
        width: width,
        height: height,
        backgroundColor: "#333",
      }}
    >
      <CardHeader
        sx={{ height: "60px" }}
        avatar={<UserAvatar image="/profile.jpeg" />}
        title={post.post_account}
        subheader={post.created}
        color="inherit"
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      />

      <CardContent>
        <Typography>{post.post_caption}</Typography>
      </CardContent>

      <CardMedia
        component="img"
        height={height <= 600 ? height - 190 : 500}
        image="/post.jpg"
        alt="Paella dish"
      />

      <CardActions disableSpacing>
        <Box sx={{ flexGrow: 1 }}>
          <IconButton aria-label="add to favorites" onClick={toggleLiked}>
            {liked === true ? (
              <Favorite sx={{ color: "red" }} />
            ) : (
              <Favorite sx={{ color: "#fff" }} />
            )}
          </IconButton>
          <IconButton aria-label="share">
            <CommentIcon sx={{ color: "#fff" }} />
          </IconButton>
          <IconButton aria-label="share">
            <SendIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>

        <IconButton aria-label="share" onClick={toggleSaved}>
          {saved === true ? (
            <TurnedInIcon sx={{ color: "#fff" }} />
          ) : (
            <TurnedInNotIcon sx={{ color: "#fff" }} />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PostCard;
