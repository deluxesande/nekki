import { AddBox, Home, Message, Notifications } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import UserAvatar from "../utils/UserAvatar";
import { useState } from "react";
import { Link } from "react-router-dom";

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
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      className="header"
      color="primary"
      sx={{ zIndex: theme.zIndex.drawer + 1 }} // Setting the appbars z index higher than the drawers
    >
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
        <Stack direction="row" spacing={2}>
          <Link to="/">
            <NavIcon icon={<Home />} color={"success"} />
          </Link>
          <NavIcon icon={<AddBox />} />
          <Link to="/messages">
            <NavIcon icon={<Message />} badgeContent={3} color={"secondary"} />
          </Link>
          <NavIcon
            icon={<Notifications />}
            badgeContent={100}
            color={"secondary"}
          />
        </Stack>

        {/* USER PROFILE */}
        <Box
          sx={{ marginLeft: "15px" }}
          id="user-profile-button"
          onClick={handleClick}
          aria-controls={open ? "user-profile-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <UserAvatar image="/profile.jpeg" />
        </Box>

        <Menu
          id="user-profile-menu"
          anchorEl={anchorEl}
          open={open}
          MenuListProps={{
            "aria-labelledby": "user-profile-button",
          }}
          onClose={handleClose}
        >
          <Link to="/profile">
            <MenuItem onClick={handleClose}>Profile</MenuItem>
          </Link>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem onClick={handleClose}>Log out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AppTopBar;
