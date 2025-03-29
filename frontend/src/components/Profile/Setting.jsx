import React, { useState } from "react";
import axios from "axios";

const Setting = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email address");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/reset-password",
        {
          email: email,
        }
      );

      setSuccess(true);
      setMessage(
        response.data.message ||
          "Password reset instructions sent to your email."
      );
    } catch (error) {
      setSuccess(false);
      setMessage(
        error.response?.data?.message ||
          "An error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Account Settings
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Reset Password</h3>

        {success ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {message}
          </div>
        ) : message ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {message}
          </div>
        ) : null}

        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter your email address"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 text-white text-lg py-2 rounded-md hover:bg-pink-700 transition duration-300"
          >
            {loading ? "Processing..." : "Send Reset Link"}
          </button>
        </form>
      </div>

      {/* You can add other settings sections here */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Account Information</h3>
        <p className="text-gray-600 mb-4">
          Update your account information and manage your preferences.
        </p>
        <button className="text-pink-600 hover:underline">Edit Profile</button>
      </div>
    </div>
  );
};

export default Setting;
