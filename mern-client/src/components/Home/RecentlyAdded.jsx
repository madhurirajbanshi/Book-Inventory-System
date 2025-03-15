import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";

const RecentlyAdded = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/books/recentbooks"
        );
        console.log("Fetched Data:", response.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="my-4 mx-auto container max-w-screen-2xl md:px-20  px-4">
      <h2 className="text-xl font-bold mb-3">Recently Added</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {data.length > 0 ? (
          data.map((item, i) => (
            <div key={i}>
              <BookCard data={item} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-5">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default RecentlyAdded;
