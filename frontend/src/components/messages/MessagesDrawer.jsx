import { Drawer, List, Typography } from "@mui/material";
import MessagesDrawerItem from "../utils/MessagesDrawerItem";
import Logo from "../utils/Logo";

const MessagesDrawer = ({ users }) => {
  const drawerWidth = 240;
  return (
    <Drawer
      open
      variant="permanent"
      sx={{
        width: drawerWidth,
      }}
      classes={{ paper: { width: drawerWidth } }}
    >
      <List>
        {users.map((user, index) => (
          <MessagesDrawerItem user={user} index={index} />
        ))}
      </List>
    </Drawer>
  );
};

export default MessagesDrawer;
