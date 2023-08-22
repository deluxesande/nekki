import { Avatar, Badge, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: "0 0 0 2px #44b700",
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const UserAvatar = ({ image, variant }) => {
  return (
    <IconButton>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        // If the variant is suplied use that
        // else the default of dot is used
        variant={variant ? variant : "dot"}
      >
        <Avatar variant="circular" src={image} />
      </StyledBadge>
    </IconButton>
  );
};

export default UserAvatar;
