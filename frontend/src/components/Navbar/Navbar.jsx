import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/allbooks" },
    ...(isLoggedIn
      ? [
          { title: "Cart", link: "/cart" },
          { title: "Dashboard", link: "/AdminDashboard" },
          { title: "Profile", link: "/profile" },
        ]
      : []),
  ];

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (searchQuery.trim()) {
        navigate(`/search?title=${searchQuery}`);
      }
    }
  };

  return (
    <nav
      className={`px-6 md:px-10 py-3 transition-all duration-300 border-b ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center justify-between max-w-screen mx-auto">
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <img
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="PageVoyage Logo"
            className="h-10 w-10"
          />
          <h1 className="text-3xl font-bold">PageVoyage</h1>
        </div>

        {/* Hamburger Icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl focus:outline-none"
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Links & Actions */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-center gap-6 absolute md:static top-16 left-0 w-full md:w-auto bg-white dark:bg-gray-900 bg-opacity-90 md:bg-transparent shadow-lg md:shadow-none md:rounded-none p-4 md:p-0 transition-all duration-300 ease-in-out`}
        >
          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row gap-6">
            {links.map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className="hover:text-blue-500 transition-all duration-300"
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="pl-12 pr-4 py-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            <FiSearch
              className="absolute left-4 top-3 text-gray-500 text-lg cursor-pointer"
              onClick={handleSearch}
            />
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full text-xl transition-all duration-300"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>

          {/* Login & Signup */}
          {!isLoggedIn && (
            <div className="flex gap-4">
              <Link
                to="/LogIn"
                className="px-4 py-2 border border-blue-500 text-blue-500 rounded-full font-semibold transition-all hover:bg-blue-500 hover:text-white"
              >
                Sign In
              </Link>
              
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
