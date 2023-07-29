import "./App.css";

import AppTopBar from "./components/navbar/AppTopBar";
import HomePage from "./pages/HomePage";
import MessagePage from "./pages/MessagePage";
import ProfilePage from "./pages/ProfilePage";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

export const api_url = "http://127.0.0.1:8000";

function App() {
  const [posts, setPosts] = useState([]);
  const [fetching, setFetching] = useState(false);

  const fetchPosts = async () => {
    // console.log("Fetching...");
    const response = await fetch(`${api_url}/post/`);
    const data = await response.json();
    setFetching(true);
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
    setFetching(false);
  }, [fetching]);

  return (
    <>
      <AppTopBar />
      <Routes>
        <Route path="/" element={<HomePage posts={posts} />} exact />
        <Route path="/messages" element={<MessagePage />} exact />
        <Route path="/profile" element={<ProfilePage posts={posts} />} exact />
      </Routes>
    </>
  );
}

export default App;
