import { createContext, useEffect, useState } from "react";
import { api_url } from "../App";

// import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const authState = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;

  const acessState = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : null;

  const refreshState = localStorage.getItem("refeshToken")
    ? localStorage.getItem("refeshToken")
    : null;

  const userState = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")) // jwt_decode(localStorage.getItem("authTokens"))
    : null;

  const [user, setUser] = useState(() => userState);
  const [authTokens, setAuthTokens] = useState(() => authState);
  const [accessToken, setAccesToken] = useState(() => acessState);
  const [refreshToken, setRefreshToken] = useState(() => refreshState);
  const [loading, setLoading] = useState(true);

  // Login user and set the tokens in local storage
  const loginUSer = async (e) => {
    e.preventDefault();
    console.log("Log in called");
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
      setAccesToken(data.access);
      setRefreshToken(data.refresh);
      setUser(data.access);
      // setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
    } else {
      alert("Error getting tokens.");
    }
  };

  // Delete tokens from local storage
  const logoutUser = () => {
    console.log("Log out called");

    setAuthTokens(null);
    setRefreshToken(null);
    setAccesToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("authTokens");
  };

  // Update tokens in local storage
  const updateToken = async () => {
    console.log("Update token called");

    const response = await fetch(`${api_url}/auth/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: localStorage.getItem("refreshToken")
          ? localStorage.getItem("refreshToken")
          : null,
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(data.access);
      // setUser(jwt_decode(data.access));
      localStorage.setItem("accessToken", data.access);
      console.log("Updated");
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  };

  // Setting the values to used in the app
  const contextData = {
    user: user,
    authTokens: authTokens,
    loginUSer: loginUSer,
    logoutUser: logoutUser,
  };

  // Update the tokens
  useEffect(() => {
    if (loading) {
      updateToken();
    }

    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, 1000 * 60 * 4);

    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
