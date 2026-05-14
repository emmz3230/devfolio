import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { useState, useEffect } from "react";

const AppLayout = () => {
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
        <NavBar darkMode={darkMode} handleDarkMode={handleDarkMode} />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default AppLayout;