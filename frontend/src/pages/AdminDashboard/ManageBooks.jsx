import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { RiChatDeleteLine } from "react-icons/ri";

const ManageBooks = ({ onNavigate, setEditingBook }) => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 4;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/books/");
        const result = await response.json();

        if (result.status === "Success" && Array.isArray(result.data)) {
          setBooks(result.data);
        } else {
          console.error("Invalid data format:", result);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch(`http://localhost:5000/books/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setBooks(books.filter((book) => book._id !== id));
      } else {
        console.error("Failed to delete book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const totalPages = Math.ceil(books.length / booksPerPage);
  const currentBooks = books.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-0 bg-white-100  mt-8 rounded-lg">
    

      <div className="overflow-x-auto max-h-[calc(100vh-200px)]">
        <table className="min-w-full table-auto bg-white border-collapse shadow-md rounded-lg mt-0 ">
          <thead>
            <tr className="text-black">
             
              <th className="px-6 py-3 text-left border-b border-gray-300">
                Title
              </th>
              <th className="px-6 py-3 text-left border-b border-gray-300">
                Author
              </th>
              <th className="px-6 py-3 text-left border-b border-gray-300">
                Category
              </th>
              <th className="px-6 py-3 text-left border-b border-gray-300">
                Price
              </th>
              <th className="px-6 py-3 text-left border-b border-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto max-h-[calc(100vh-300px)]">
            {currentBooks.length > 0 ? (
              currentBooks.map((book) => (
                <tr key={book._id} className="border-b hover:bg-gray-50">

                  <td className="px-6 py-3">{book.title}</td>
                  <td className="px-6 py-3">{book.author}</td>
                  <td className="px-6 py-3">{book.category}</td>
                  <td className="px-6 py-3">Rs.{book.price}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => handleEdit(book)}
                      className="px-4 py-2 text-green-500 rounded-md mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="px-2 py-2 text-red-500 rounded-md"
                    >
                      <RiChatDeleteLine />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-3 text-center">
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(index + 1)}
            className={`px-1 py-1 mx-1 rounded-full ${
              currentPage === index + 1
                ? "bg-blue-500"
                : "bg-gray-300 text-black"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageBooks;
