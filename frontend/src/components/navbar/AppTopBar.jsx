import { AddBox, Home, Message, Notifications } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import UserAvatar from "../utils/UserAvatar";

const NavIcon = ({ icon, color, badgeContent }) => {
  return (
    <IconButton>
      <Badge color={color} badgeContent={badgeContent}>
        {icon}
      </Badge>
    </IconButton>
  );
};

const AppTopBar = () => {
  return (
    <AppBar position="static" className="header" color="primary">
      <Toolbar className="toolbar">
        {/* LOGO */}
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            textTransform: "uppercase",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Nekki
        </Typography>

        {/* ICONS */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <NavIcon icon={<Home />} color={"success"} />
          <NavIcon icon={<AddBox />} />
          <NavIcon icon={<Message />} badgeContent={3} color={"secondary"} />
          <NavIcon
            icon={<Notifications />}
            badgeContent={100}
            color={"secondary"}
          />
        </Box>

        {/* USER PROFILE */}
        <Tooltip title="Open settings" arrow>
          <Box sx={{ marginLeft: "20px" }}>
            <UserAvatar image="/profile.jpeg " />
          </Box>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default AppTopBar;
