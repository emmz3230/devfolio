import React from 'react'

const ResponsiveNavBar = () => {
  return (
    <nav className="max-container padding-x py-6 max-md:block hidden dark:text-[#141624]">
    <ul className="flex items-center justify-center gap-6 text-[#FFFFFF] lg:flex-1 flex-col  dark:text-[#141624]">

              <li>Hi, Clinton</li>
              <li>Logout</li>
              <li>Login</li>
              <li>Register</li>

    </ul>
  </nav>
  )
}

export default ResponsiveNavBar