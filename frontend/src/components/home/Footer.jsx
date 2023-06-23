import { Copyright } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <div style={{ color: "#fff", margin: "0 auto" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <p>Home</p>
        <p>Profile</p>
        <p>Notiifcations</p>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Copyright size="small" />
        <Typography>Nekki by Deluxe</Typography>
      </Box>
    </div>
  );
};

export default Footer;
