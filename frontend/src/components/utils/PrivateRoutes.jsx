import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const PrivateRoutes = () => {
  const { authTokens } = useContext(AuthContext);
  // Check if their is a user logged in
  return authTokens ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
