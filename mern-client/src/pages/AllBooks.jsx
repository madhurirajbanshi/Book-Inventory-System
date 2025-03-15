import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Loader from "../components/Loader/Loader"; // Assuming Loader is located here
import BookCard from "../components/BookCard/BookCard"; // Assuming BookCard is a component
import axios from "axios";

const AllBooks = () => {
  const [data, setData] = useState([]); // State to hold book data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch books data from the backend
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/books/recentbooks"
        );
        console.log("Fetched Data:", response.data);
        setData(response.data.data); // Store books in state
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };

    fetchBooks(); // Call the fetch function
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="my-4 mx-auto container max-w-screen-2xl md:px-20 px-4">
      {loading ? (
        <Loader /> // Display the loader while fetching data
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {data.length > 0 ? (
            data.map((item, i) => (
              <div key={i}>
                {/* Wrap each BookCard with Link */}
                <Link to={`/view-book-details/${item.id}`}>
                  <BookCard data={item} /> {/* Render each book's card */}
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-5">No books found.</p> // Display if no books are found
          )}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
