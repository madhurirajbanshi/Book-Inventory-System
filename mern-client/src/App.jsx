import React from "react";
import Home from "./pages/Home";
import AllBooks from "./pages/AllBooks";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Banner from "./components/Banner/Banner";
import { Routes, Route } from "react-router-dom";
import RecentlyAdded from "./components/Home/RecentlyAdded";
import BookSection from "./components/BookSection/BookSection";
import Feedback from "./components/Feedback/Feedback";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";

const App = () => {
  return (
    <div>
        <Navbar />
        <Routes>
          {/* Define the routes here */}
          <Route
            path="/"
            element={
              <>
                <Banner />
                <RecentlyAdded />
                <BookSection />
                <Feedback />
              </>
            }
          />
          <Route path="/allbooks" element={<AllBooks />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
        </Routes>
        {/* Footer will be displayed on all pages except /allbooks */}
        <Footer />
    </div>
  );
};

export default App;
