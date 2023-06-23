import { Typography } from "@mui/material";

const Logo = ({ moreStyles }) => {
  return (
    <Typography
      variant="h5"
      sx={{
        textTransform: "uppercase",
        fontWeight: 700,
        cursor: "pointer",
      }}
    >
      Nekki
    </Typography>
  );
};

export default Logo;
