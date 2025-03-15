import React, { useState } from "react";
import { FiSearch } from "react-icons/fi"; // Import search icon
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Track if the menu is open or not
  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/allbooks" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
  ];
  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
  if(isLoggedIn==false){
    links.splice(2,2)
  }
  return (
    <>
      <nav>
        <div
          className={`flex px-10 py-3 items-center justify-between  transition-all duration-300 max-w-screen mx-auto ${
            darkMode ? "bg-zinc-800 text-white" : "bg-white text-black"
          }`}
          aria-label="Main navigation"
        >
          {/* Logo Section */}
          <div className="flex ml-9 items-center space-x-3">
            <img
              src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
              alt="BookHeaven Logo"
              className="h-10 w-10"
            />
            <h1 className="text-3xl font-bold">PageVoyage</h1>
          </div>

          {/* Menu Icon for Mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-xl text-black"
          >
            {menuOpen ? "✖" : "☰"}
          </button>

          {/* Navigation Links */}
          <div
            className={`${
              menuOpen ? "flex" : "hidden"
            } md:flex items-center gap-6 flex-col md:flex-row md:static absolute md:w-auto top-16 left-0 w-full bg-white md:bg-transparent lg:gap-6`}
          >
            <div className="flex gap-6 md:flex-row flex-col ml-6">
              {" "}
              {/* Add ml-6 to shift left */}
              {links.map((item, i) => (
                <Link
                  key={i}
                  to={item.link}
                  className={`hover:text-blue-500 transition-all duration-300 ${
                    darkMode ? "text-gray-300" : "text-black"
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Search Bar with Icon */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search books..."
                className={`pl-12 pr-2 py-2 w-60 outline-none rounded-full focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-500 focus:ring-blue-500"
                    : "bg-white text-black border-gray-300 focus:ring-blue-500"
                }`}
              />
              <FiSearch className="absolute right-4 top-4 text-gray-500 text-lg" />
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full text-xl transition-all duration-300"
            >
              {darkMode ? "🌞" : "🌙"}
            </button>

            {/* Sign In / Sign Up Buttons */}
            <div className="flex gap-4">
              <Link
                to="/LogIn"
                className={`px-2 py-1 rounded-full text-lg font-semibold transition-all duration-300 ${
                  darkMode
                    ? "border border-blue-400 text-blue-400 hover:bg-blue-500 hover:text-white"
                    : "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                }`}
              >
                LogIn
              </Link>
              <Link
                to="SignUp"
                className={`px-2 py-1 rounded-full text-lg font-semibold transition-all duration-300 ${
                  darkMode
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
