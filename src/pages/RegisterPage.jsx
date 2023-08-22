import { Box, Button, TextField } from "@mui/material";

import "../css/login.css";
import { Link, Navigate } from "react-router-dom";
import { api_url } from "../App";
import { useState } from "react";

const RegisterPage = () => {
  const [registered, setRegistered] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    const response = await fetch(`${api_url}/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        email: e.target.email.value,
        password1: e.target.password1.value,
        password2: e.target.password2.value,
      }),
    });

    // console.log(response);
    if (response.status === 201) setRegistered(true);
  };

  return (
    <>
      {registered ? (
        <Navigate to="/" />
      ) : (
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
            <Link to="/">Log In</Link>
          </form>
        </Box>
      )}
    </>
  );
};

export default RegisterPage;
