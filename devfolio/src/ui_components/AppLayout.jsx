import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { useState,useEffect } from "react";


const AppLayout = () => {

    useEffect(() => {
    if(localStorage.getItem("dark") === "dark") {
      localStorage.setItem("dark", "false");
      handleDarkMode();
    }
  }, []);

  const [darkMode, setDarkMode] = useState(false)
  
  const handleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem("dark", newDarkMode ? "true" : "false");
  }

  return (
    <div className={darkMode ? "dark" : ""}>
    <main className="w-full bg-[#ffffff] dark:bg-[#181A2A]">
      <NavBar darkMode={darkMode}  handleDarkMode={handleDarkMode}/>
      <Outlet />
      <Footer />
    </main>
    </div>
  );
};

export default AppLayout;