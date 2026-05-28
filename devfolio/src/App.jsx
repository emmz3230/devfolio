import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "./ui_components/AppLayout";
import HomePage from "./Pages/HomePage";
import DetailPage from "./Pages/DetailPage";
// import ProfilePage from "./Pages/ProfilePage";
import SignupPage from "./Pages/SignupPage";
import CreatePostPage from "./Pages/CreatePostPage";
import LoginPage from "./Pages/LoginPage";
import ProtectedRoute from "./ui_components/ProtectedRoute";
import { useEffect, useState } from "react";
import { getUsername } from "./services/apiBlog";
import { useQuery } from "@tanstack/react-query";


function App() {
  const [username, setUsername] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data } = useQuery({
    queryKey: ["username"],
    queryFn: getUsername,
  });

  useEffect(
    function () {
      if (data) {
        setUsername(data.username);
        setIsAuthenticated(true);
      }
    },
    [data]
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout
          isAuthenticated={isAuthenticated}
          username={username}
          setUsername={setUsername}
          setIsAuthenticated={setIsAuthenticated} />}>
          <Route index element={<HomePage />} />
          <Route path="blogs/:slug" element={<DetailPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="create" element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>} />
          <Route path="signin" element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />} />


          {/* <Route path="profile" element={<ProfilePage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

