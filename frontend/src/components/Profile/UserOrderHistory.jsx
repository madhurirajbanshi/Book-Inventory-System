import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

const UserOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 4;

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:5000/orders/getorders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(response.data.orders);
      } catch (err) {
        setError("Failed to fetch orders");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    return () => {
      setOrders([]);
      setError(null);
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  // Calculate pagination values
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const currentOrders = orders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen mt-10 p-4 md:p-6">
      {orders.length === 0 ? (
        <p className="text-lg text-gray-600 text-center">
          No order history available.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto max-h-[calc(100vh-200px)]">
            <table className="w-full bg-white rounded-lg border shadow-md">
              <thead>
                <tr className="bg-white-200 text-gray-700">
                  <th className="p-3 text-left text-sm md:text-base">
                    Order ID
                  </th>
                  <th className="p-3 text-left text-sm md:text-base">
                    Book Title
                  </th>
                  <th className="p-3 text-left text-sm md:text-base">Status</th>
                  <th className="p-3 text-left text-sm md:text-base">Price</th>
                  <th className="p-3 text-left text-sm md:text-base">Stock</th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto max-h-[calc(100vh-300px)]">
                {currentOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-t text-sm md:text-base hover:bg-gray-50"
                  >
                    <td className="p-3">{order._id}</td>
                    <td className="p-3">
                      {order.book ? order.book.title : "N/A"}
                    </td>
                    <td className="p-3">{order.status}</td>
                    <td className="p-3">
                      Rs.{order.book ? order.book.price : "N/A"}
                    </td>
                    <td className="p-3">
                      {order.book ? order.book.stock : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageClick(index + 1)}
                  className={`px-1 py-1 mx-1 rounded-full ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserOrderHistory;
