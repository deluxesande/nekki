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

import { useContext, useState } from "react";

import "../../css/postCard.css";
import { api_url } from "../../App";
import useFetch from "./useFetch";
import AuthContext from "../../context/AuthContext";

const PostCard = ({ width, height, post }) => {
  const api = useFetch();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const { setFetching } = useContext(AuthContext);

  const like_post = async () => {
    // Call the like view from the api
    const { response, data } = await api(`/post/like/${post.id}/`, "GET");
    if (response.status === 202) {
      console.info(`POST: ${post.post_caption} liked!`, data);
    } else if (response.status === 304) {
      console.info(`POST: ${post.post_caption} already liked!`, data);
    }
    setFetching(true);
  };

  const toggleLiked = () => {
    setLiked(!liked);
    like_post();
  };

  const toggleSaved = () => {
    setSaved(!saved);
  };

  const post_image = `${api_url}${post.post_image}`;
  const profile_pic = `${api_url}${post.profile}`;

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
        avatar={<UserAvatar image={profile_pic} />}
        title={post.post_account}
        color="inherit"
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      />

      <CardMedia
        component="img"
        height={height} // {height <= 600 ? height - 170 : 500}
        image={post_image}
        alt={post.post_caption}
      />

      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: 1,
          }}
        >
          <Typography variant="caption">{post.when_posted}</Typography>
          <Typography variant="subtitle2">{post.post_caption}</Typography>
          <Typography>{post.likes} likes</Typography>
        </Box>
      </CardContent>

      <CardActions disableSpacing>
        <Box sx={{ flexGrow: 1 }}>
          <IconButton aria-label="add-to-favorites" onClick={toggleLiked}>
            {liked === true ? (
              <Favorite sx={{ color: "red" }} />
            ) : (
              <Favorite sx={{ color: "#fff" }} />
            )}
          </IconButton>
          <IconButton aria-label="comment">
            <CommentIcon sx={{ color: "#fff" }} />
          </IconButton>
          <IconButton aria-label="share">
            <SendIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>

        <IconButton aria-label="save" onClick={toggleSaved}>
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
