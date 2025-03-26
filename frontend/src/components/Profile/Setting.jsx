import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";

const Setting = () => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/auth/userinformation",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAddress(response.data.address || "");
      } catch (error) {
        console.error("Error fetching user information:", error);
        setError("Failed to fetch user information");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found");
      return;
    }
    try {
      await axios.put(
        "http://localhost:5000/auth/updateuser",
        { address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Updated address:", address);
    } catch (error) {
      console.error("Error updating address:", error);
      setError("Failed to update address");
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h2>Update Address</h2>
      <label>
        <strong>Address:</strong>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <button onClick={handleUpdate}>Update Address</button>
    </div>
  );
};

export default Setting;
