import { Box, Button, TextField } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

import "../css/login.css";
import { Navigate } from "react-router-dom";
import useFetch from "../components/utils/useFetch";
import { api_url } from "../App";

const RegisterPage = () => {
  const { authTokens } = useContext(AuthContext);
  const api = useFetch();

  const registerUser = async (e) => {
    e.preventDefault();
    const { response, data } = await fetch(`${api_url}/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        username: e.target.username.value,
        email: e.target.email.value,
        password1: e.target.password1.value,
        password2: e.target.password2.value,
      },
    });
    console.log(response);
    <Navigate to="/" />;
  };

  return (
    <Box sx={{ mt: "4rem" }}>
      <form onSubmit={registerUser}>
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
          label="Email"
          type="email"
          size="small"
          color="secondary"
          placeholder="Enter Email"
          name="email"
          sx={{ backgroundColor: "#555", borderRadius: "3px" }}
        />
        <TextField
          variant="filled"
          label="Password"
          type="password"
          size="small"
          color="secondary"
          placeholder="Enter Password"
          name="password1"
          sx={{ backgroundColor: "#555", borderRadius: "3px" }}
        />
        <TextField
          variant="filled"
          label="Re-enter Password"
          type="password"
          size="small"
          color="secondary"
          placeholder="Re-enter Password"
          name="password2"
          sx={{ backgroundColor: "#555", borderRadius: "3px" }}
        />
        <Button variant="contained" type="submit">
          Register
        </Button>
      </form>
    </Box>
  );
};

export default RegisterPage;
