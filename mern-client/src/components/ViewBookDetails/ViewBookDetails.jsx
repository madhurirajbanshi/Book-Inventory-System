import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Fetch book details from API
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/books/recentbooks"
        );
        console.log("Fetched Data:", response.data);
        // Find the book with the matching id
        const bookDetails = response.data.data.find((item) => item._id === id);
        if (bookDetails) {
          setBook(bookDetails); // Set the book if found
          setRating(bookDetails.rating || 4.2); // Default to 4.2 if not available
        } else {
          console.error("Book not found.");
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="text-yellow-500 text-2xl">
          ★
        </span>
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-500 text-2xl">
          ⭐
        </span>
      );
    }

    // Empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300 text-2xl">
          ★
        </span>
      );
    }

    return stars;
  };

  if (loading) {
    return <Loader />; // Show loader while fetching data
  }

  if (!book) {
    return <p className="text-center text-gray-600">Book not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 md:px-16 py-8">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Left Column with Image */}
        <div className="w-80% md:w-1/5">
          <img
            src={book.image}
            alt={book.title}
            className="w-full object-cover rounded-lg shadow-lg"
          />

          <div className="mt-6 bg-white p-4 rounded-lg shadow">
            <button className="w-full bg-pink-600 text-white text-lg py-3 rounded-md hover:bg-pink-700 transition duration-300 mb-3">
              Want to read
            </button>

            <div className="flex items-center justify-between border-t border-gray-200 pt-3">
              <div className="font-bold">Rs.{book.price || "10.99"}</div>
            </div>

            <div className="flex justify-center mt-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className="text-2xl text-gray-300 hover:text-yellow-500"
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column with Details */}
        <div className="w-full md:w-2/3 text-gray-800">
          <h1 className="text-4xl font-bold text-gray-900">{book.title}</h1>

          <div className="flex items-center mt-2">
            <Link
              to={`/author/${book.author}`}
              className="text-lg font-medium hover:underline"
            >
              {book.author}
            </Link>
            {book.verified && (
              <span className="ml-2 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                ✓ Verified Author
              </span>
            )}
          </div>

          <div className="flex items-center mt-4">
            <div className="flex mr-2">{renderStars(rating)}</div>
            <span className="text-2xl font-bold mr-2">{rating.toFixed(2)}</span>
            <span className="text-gray-500">
              {book.ratings || "7,784"} ratings · {book.reviews || "2,642"}{" "}
              reviews
            </span>
          </div>

          <div className="mt-8 bg-gray-50 p-5 rounded-lg border-l-4 border-pink-500">
            <p className="text-gray-800 leading-relaxed">
              {book.description ||
                "Brimming with magic and romance, a young fairy queen must form an unlikely alliance or risk an unspeakable danger destroying all she holds dear in this standalone YA novel from bestselling author."}
            </p>
          </div>

          <div className="mt-8">
            <p className="text-gray-800 leading-relaxed">
              {book.longDescription ||
                "It's been centuries since a warm-season fairy in Pixie Hollow has crossed into the Winter Woods, and while most fear the legends of monsters lurking in the frozen lands, Clarion, can't help being intrigued by Winter's stoic beauty. But under the watchful eyes of the current monarch and the court's seasonal ministers, Clarion has little time to dwell on daydreams while the days to her coronation dwindle away."}
            </p>

            <p className="text-gray-800 leading-relaxed mt-4">
              {
                "That is, until reports of a monster crossing from Winter into Spring make their way to the palace. Clarion sees defeating this threat as an opportunity to prove that she is worthy of her new role. But instead of finding a monster at the edge of Winter, she finds Milori, a young guardian of the Winter Woods. Together, they form an unlikely bond as they race to save their lands."
              }
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="bg-pink-600 text-white px-6 py-3 rounded-md hover:bg-pink-700 transition duration-300">
              Buy Now
            </button>
            <button className="bg-white border border-pink-600 text-pink-600 px-6 py-3 rounded-md hover:bg-pink-50 transition duration-300">
              Add to Cart
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition duration-300">
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBookDetails;
