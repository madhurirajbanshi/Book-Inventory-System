import { Link } from "react-router-dom";

const BookCard = ({ data }) => {
  return (
    <>
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-all">
          <div className="relative">
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            {/* Rating Badge */}
            <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
              {data.rating}★
            </div>
          </div>

          <div className="mt-2">
            <h3 className="text-sm font-semibold truncate">{data.title}</h3>
            <p className="text-xs text-gray-600">{data.author}</p>
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-bold text-pink-600">
              {data.price}
            </span>
            <button className="px-2 py-1 bg-pink-600 text-white text-xs rounded hover:bg-pink-700 transition">
              Buy Now
            </button>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BookCard;
