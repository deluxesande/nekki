import "./App.css";
import AppTopBar from "./components/navbar/AppTopBar";
import HomePage from "./components/home/HomePage";
import MessagePage from "./components/messages/MessagePage";
import ProfilePage from "./components/profile/ProfilePage";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

export const api_url = "http://127.0.0.1:8000";

function App() {
  const [posts, setPosts] = useState([]);
  const [fetching, setFetching] = useState([false]);

  const fetchPosts = async () => {
    // console.log("Fetching...");
    const response = await fetch(`${api_url}/post/view-posts/`);
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
  	setTimeout(() => {
    	fetchPosts();
  	}, 2000)
    // console.log(posts);
  });

  return (
    <>
      <AppTopBar />
      <Routes>
        <Route path="/" element={<HomePage posts={posts} />} />
        <Route path="/messages" element={<MessagePage />} />
        <Route path="/profile" element={<ProfilePage posts={posts} />} />
      </Routes>
    </>
  );
}

export default App;
