import { createContext, useEffect, useState } from "react";
import { api_url } from "../App";

import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { Box, CircularProgress } from "@mui/material";

import Cookies from "js-cookie";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const authState = Cookies.get("authTokens")
    ? JSON.parse(Cookies.get("authTokens"))
    : null;

  const userState = Cookies.get("authTokens")
    ? jwt_decode(Cookies.get("authTokens"))
    : null;

  // const authState = localStorage.getItem("authTokens")
  //   ? JSON.parse(localStorage.getItem("authTokens"))
  //   : null;

  // const userState = localStorage.getItem("authTokens")
  //   ? jwt_decode(localStorage.getItem("authTokens"))
  //   : null;

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
      Cookies.set("authTokens", JSON.stringify(data), {
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("refreshToken", data.refresh, {
        secure: true,
        sameSite: "Strict",
      });
      // localStorage.setItem("authTokens", JSON.stringify(data));
      // localStorage.setItem("refreshToken", data.refresh);
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
    // console.log(response);
  };
  const logoutUser = () => {
    // console.log("Log out called");

    setAuthTokens(null);
    setUser(null);
    Cookies.remove("refreshToken");
    Cookies.remove("authTokens");
    // localStorage.removeItem("refreshToken");
    // localStorage.removeItem("authTokens");
    logout_from_the_backend();
  };

  // Setting the values to used in the app
  const contextData = {
    user: user,
    authTokens: authTokens,
    // Remember when changing
    refreshToken: Cookies.get("refreshToken"),
    fetching: fetching,
    setFetching: setFetching,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    loginUSer: loginUSer,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    if (authTokens) setUser(jwt_decode(authTokens.access));

    setLoading(false);
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
