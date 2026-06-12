import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";

const AppLayout = ({ isAuthenticated, username, setIsAuthenticated, setUsername }) => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("dark") === "true");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("dark", newMode ? "true" : "false");
      return newMode;
    });
  };

  return (
    <div>
      <main className="w-full bg-[#ffffff] dark:bg-[#181A2A]">
        <NavBar darkMode={darkMode}
          handleDarkMode={handleDarkMode}
          isAuthenticated={isAuthenticated}
          username={username} setIsAuthenticated={setIsAuthenticated}
          setUsername={setUsername} />
        <ToastContainer />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default AppLayout;