import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

const UserOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false); 
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:5000/orders/getorders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data.orders); // Assuming orders contain book details
      } catch (err) {
        setError("Failed to fetch orders");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    // Cleanup function
    return () => {
      setOrders([]); // Optional: Reset orders if needed
      setError(null); // Optional: Reset error if needed
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen p-5`}
    >
      <button
        onClick={toggleMode}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-5 hover:bg-blue-400"
      >
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>

      <h2 className="text-2xl font-semibold mb-4">Your Order History</h2>

      {orders.length === 0 ? (
        <p className="text-lg text-gray-600">No order history available.</p>
      ) : (
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Book Title</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-4">{order._id}</td>
                <td className="p-4">{order.book ? order.book.title : "N/A"}</td>
                <td className="p-4">{order.status}</td>
                <td className="p-4">
                  ${order.book ? order.book.price : "N/A"}
                </td>
                <td className="p-4">{order.book ? order.book.stock : "N/A"}</td>
                <td className="p-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400"
                    onClick={() => alert(`Order ID: ${order._id}`)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserOrderHistory;
