import { Box, Button, TextField } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

import "../css/login.css";
import { Navigate } from "react-router-dom";

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
              variant="filled"
              label="Username"
              type="text"
              size="small"
              color="secondary"
              placeholder="Enter Username"
              name="username"
              sx={{ backgroundColor: "#555", borderRadius: "3px" }}
            />
            <TextField
              variant="filled"
              label="Password"
              type="password"
              size="small"
              color="secondary"
              placeholder="Enter Password"
              name="password"
              sx={{ backgroundColor: "#555", borderRadius: "3px" }}
            />
            <Button variant="contained" type="submit">
              Log In
            </Button>
          </form>
        </Box>
      )}
    </>
  );
};

export default LoginPage;
