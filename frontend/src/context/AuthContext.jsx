import { createContext, useEffect, useState } from "react";
import { api_url } from "../App";

import jwt_decode from "jwt-decode";
import { Box, CircularProgress } from "@mui/material";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const authState = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;

  const userState = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")) // jwt_decode(localStorage.getItem("authTokens"))
    : null;

  const [user, setUser] = useState(() => userState);
  const [authTokens, setAuthTokens] = useState(() => authState);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  // Login user and set the tokens in local storage
  const loginUSer = async (e) => {
    e.preventDefault();
    // console.log("Log in called");
    const response = await fetch(`${api_url}/auth/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      localStorage.setItem("refreshToken", data.refresh);
    } else {
      alert("Error getting tokens.");
    }
  };

  // Delete tokens from local storage
  const logout_from_the_backend = async () => {
    const access_config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`,
      },
    };
    const response = await fetch(`${api_url}/auth/logout/`, access_config);
    console.log(response);
  };
  const logoutUser = () => {
    // console.log("Log out called");

    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("authTokens");
    logout_from_the_backend();
  };

  // Setting the values to used in the app
  const contextData = {
    user: user,
    authTokens: authTokens,
    refreshToken: localStorage.getItem("refreshToken"),
    fetching: fetching,
    setFetching: setFetching,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    loginUSer: loginUSer,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    if (authTokens) setUser(jwt_decode(authTokens.access));

    setTimeout(() => setLoading(false), 2000);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            minHeight: "100vh",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
