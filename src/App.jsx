import "./App.css";

import AppTopBar from "./components/navbar/AppTopBar";
import HomePage from "./pages/HomePage";
import MessagePage from "./pages/MessagePage";
import ProfilePage from "./pages/ProfilePage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PrivateRoutes from "./components/utils/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";

export const api_url = "http://127.0.0.1:8000";

function App() {
  return (
    <>
      <AuthProvider>
        <AppTopBar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<HomePage />} exact />
            <Route path="/messages" element={<MessagePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
