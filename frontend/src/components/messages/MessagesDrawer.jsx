import { Drawer, List } from "@mui/material";
import MessagesDrawerItem from "../utils/MessagesDrawerItem";

const MessagesDrawer = ({ users }) => {
  const drawerWidth = 270;
  return (
    <Drawer
      open
      variant="permanent"
      sx={{
        width: drawerWidth,
        overflowY: "auto",
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
