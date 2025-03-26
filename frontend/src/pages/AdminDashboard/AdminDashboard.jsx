import React, { useState } from "react";
import { Link } from "react-router-dom";
import UploadBook from "./UploadBook";
import ManageBooks from "./ManageBooks";
import EditBook from "./EditBook";
const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [editingBook, setEditingBook] = useState(null); // Track book being edited
 const handleLogout = () => {
   localStorage.removeItem("token"); // Remove the token
   navigate("/"); // Redirect to home
 };
  return (
    <div className="flex h-50px ml-11 bg-white-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-8 flex flex-col">
        <div className="flex items-center space-x-2 mb-6">
          <img
            src="https://img.freepik.com/premium-photo/profile-icon-white-background_941097-161034.jpg?w=2000"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-gray-800 font-semibold">Demo User</span>
        </div>

        <nav className="flex-1 space-y-4">
          <Link
            to="#"
            onClick={() => setActiveSection("dashboard")}
            className="block px-4 py-3 text-gray-700 hover:bg-gray-200 rounded-lg"
          >
            📊 Dashboard
          </Link>
          <Link
            to="#"
            onClick={() => setActiveSection("uploadBook")}
            className="block px-4 py-3 text-gray-700 hover:bg-gray-200 rounded-lg"
          >
            📚 Upload Book
          </Link>
          <Link
            to="#"
            onClick={() => setActiveSection("manageBooks")}
            className="block px-4 py-3 text-gray-700 hover:bg-gray-200 rounded-lg"
          >
            📁 Manage Books
          </Link>

          
          <Link
            to="#"
            onClick={handleLogout}
            className="block px-4 py-3 text-gray-700 hover:bg-gray-200 rounded-lg"
          >
            🚪 Log Out
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-white-50">
        {editingBook ? (
          <EditBook book={editingBook} setEditingBook={setEditingBook} />
        ) : (
          <>
            {activeSection === "uploadBook" && <UploadBook />}
            {activeSection === "manageBooks" && (
              <ManageBooks
                onNavigate={setActiveSection}
                setEditingBook={setEditingBook}
              />
            )}
            {activeSection === "dashboard" && <DashboardContent />}
          </>
        )}
      </main>
    </div>
  );
};

const DashboardContent = () => (
  <div className="bg-white shadow-md rounded-lg p-6">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
    <p className="text-gray-600">Manage your books, users, and inventory.</p>
  </div>
);

export default AdminDashboard;
