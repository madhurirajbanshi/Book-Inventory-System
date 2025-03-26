import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const searchBooks = async () => {
    if (!searchTerm) return;

    try {
      const response = await axios.get(
        "http://localhost:5000/books/recentbooks"
      );
      const foundBooks = response.data.data.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setBooks(foundBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBookClick = (id) => {
    navigate(`/viewbookdetails/${id}`);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a book by title"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button onClick={searchBooks}>Search</button>

      {books.length > 0 && (
        <ul>
          {books.map((book) => (
            <li key={book._id} onClick={() => handleBookClick(book._id)}>
              {book.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBooks;
