import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ user, loading }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token and other session data from localStorage
    localStorage.removeItem("token");

    // Optionally, you can reset the state or redirect the user
    // After logout, navigate to the login page or home
    navigate("/login"); // Redirect to the login page
  };

  return (
    <aside className="bg-white p-6 rounded-xl  shadow-lg w-full flex flex-col items-center">
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : user ? (
        <div className="text-center">
          {/* Avatar */}
          <img
            src={user.avatar || "https://via.placeholder.com/100"}
            alt="Profile Avatar"
            className="w-24 h-24 rounded-full ml-5 mb-4 border border-gray-300 object-cover"
          />

          {/* User Details */}
          <h3 className="font-semibold text-xl text-gray-800">
            {user.username}
          </h3>
          <p className="text-gray-600 text-sm">{user.email}</p>

          {/* Navigation Links */}
          <nav className="mt-5 space-y-3 w-full">
            <SidebarLink to="/profile" label="❤️ Favorites" />
            <SidebarLink to="/profile/orderhistory" label="📦 Order History" />
            <SidebarLink to="/profile/settings" label="⚙️ Settings" />
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-6 p-2 text-center bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg w-full"
          >
            🚪 Logout
          </button>
        </div>
      ) : (
        <p className="text-gray-500">No user data available.</p>
      )}
    </aside>
  );
};

// Reusable Sidebar Link Component
const SidebarLink = ({ to, label }) => (
  <Link
    to={to}
    className="block p-3 text-center bg-gray-100 hover:bg-gray-200 transition-all rounded-lg text-gray-700 font-medium"
  >
    {label}
  </Link>
);

export default Sidebar;
