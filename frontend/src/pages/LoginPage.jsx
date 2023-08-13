import { Box, Button, TextField } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

import "../css/login.css";
import { Link, Navigate } from "react-router-dom";

const LoginPage = () => {
  const { loginUSer, authTokens } = useContext(AuthContext);

  return (
    <>
      {authTokens ? (
        <Navigate to="/" />
      ) : (
        <Box sx={{ mt: "4rem" }}>
          <form onSubmit={loginUSer}>
            <TextField
              variant="outlined"
              label="Enter Username"
              margin="dense"
              autoFocus
              fullWidth
              required
              type="text"
              placeholder="Enter Username"
              name="username"
              sx={{ backgroundColor: "#333", borderRadius: "3px" }}
            />
            <TextField
              variant="outlined"
              label="Enter Password"
              margin="dense"
              // autoFocus
              required
              type="password"
              placeholder="Enter Password"
              name="password"
              sx={{ backgroundColor: "#333", borderRadius: "3px" }}
            />
            <Button variant="contained" type="submit">
              Log In
            </Button>
            <Link to="/register">Register</Link>
          </form>
        </Box>
      )}
    </>
  );
};

export default LoginPage;
