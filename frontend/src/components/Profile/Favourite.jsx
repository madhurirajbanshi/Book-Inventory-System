import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";

const Favourite = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get("http://localhost:5000/favourites/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavouriteBooks(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFavourites();
  }, []);

  const handleRemoveFavourite = async (_id) => {
    console.log("Trying to remove favorite with ID:", _id);
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:5000/favourites/remove/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFavouriteBooks(FavouriteBooks.filter((book) => book._id !== _id));
    } catch (error) {
      console.error("Error removing favourite:", error);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {FavouriteBooks.length === 0 && <>No Favorite Books</>}
      {FavouriteBooks?.map((item, i) => (
        <BookCard
          key={i}
          data={item}
          favourite={true}
          onRemove={handleRemoveFavourite}
        />
      ))}
    </div>
  );
};

export default Favourite;
