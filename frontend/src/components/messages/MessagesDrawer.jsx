import { Drawer, List, Toolbar } from "@mui/material";
import MessagesDrawerItem from "../utils/MessagesDrawerItem";

const MessagesDrawer = ({ users }) => {
  const drawerWidth = 240;
  return (
    <Drawer
      open
      variant="permanent"
      sx={{
        width: drawerWidth,
      }}
    >
      <List sx={{ mt: "4rem" }}>
        {users.map((user, index) => (
          <MessagesDrawerItem user={user} key={index} />
        ))}
      </List>
    </Drawer>
  );
};

export default MessagesDrawer;
