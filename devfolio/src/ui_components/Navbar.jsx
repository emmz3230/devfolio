import { Switch } from "@/components/ui/switch";
import { FaHamburger } from "react-icons/fa";
import ResponsiveNavBar from "./ResponsiveNavbar";

import { useState } from "react";

const NavBar = () => {

    const [showNavBar, setShowNavBar] = useState(false)

  return (
    <>
      <nav className="max-container padding-x py-6 flex justify-between items-center  gap-6 sticky top-0 z-10 bg-[#141624] dark:bg-[#FFFFFF]">
        <a to="/" className="text-[#141624] text-2xl  dark:text-[#141624]">
          DevFolio
        </a>
        <ul className="flex items-center  justify-end gap-9 text-[#3B3C4A] lg:flex-1 max-md:hidden dark:text-[#141624]">
          <li>Hi, Clinton</li>

          <li>Logout</li>
          <li>Login</li>
          <li>Register</li>
          <li className="font-semibold">Create post</li>
        </ul>

        <Switch />
        <FaHamburger className="text-2xl cursor-pointer hidden max-md:block dark:text-[#141624]" onClick={() => setShowNavBar(curr => !curr)} />
      </nav>

      {showNavBar && <ResponsiveNavBar />}
    </>
  );
};

export default NavBar;
