import jwt_decode from "jwt-decode";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { api_url } from "../../App";

const useFetch = () => {
  const { authTokens, refreshToken, setAuthTokens, setUser } =
    useContext(AuthContext);

  const config = {};

  const originalRequest = async (url, config) => {
    // console.log("Original Request");
    url = `${api_url}${url}`;
    const response = await fetch(url, config);
    const data = await response.json();
    // console.log("REQUESTING:", data);

    return { response, data };
  };

  const refreshAccessToken = async () => {
    // console.log("Refresh Tokens");
    const response = await fetch(`${api_url}/auth/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    const data = await response.json();

    if (response.status === 200) {
      localStorage.setItem("authTokens", JSON.stringify(data));
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
    } else {
      alert("Error getting tokens.");
    }

    return data;
  };

  const callFetch = async (url, method) => {
    // console.log("Call Fetch");
    const user = jwt_decode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (isExpired) setAuthTokens(await refreshAccessToken());

    config["method"] = method;
    config["headers"] = {
      Authorization: `Bearer ${authTokens?.access}`,
    };

    const { response, data } = await originalRequest(url, config);

    return { response, data };
  };

  return callFetch;
};

export default useFetch;
