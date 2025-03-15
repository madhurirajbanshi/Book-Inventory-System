import React from "react";
const Footer = () => {
  return (
    <footer className="bg-white text-black py-6 shadow-md">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-pink-600">
              About Us
            </h3>
            <p className="text-gray-600">
              Book Inventory System helps you manage books efficiently, track
              stock, and keep records effortlessly.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-pink-600">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-pink-600 transition duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-pink-600 transition duration-300"
                >
                  Inventory
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-pink-600 transition duration-300"
                >
                  Add Book
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-pink-600 transition duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-pink-600">
              Contact Us
            </h3>
            <p className="text-gray-600">Email: support@bookinventory.com</p>
            <p className="text-gray-600">Phone: +123 456 7890</p>
            <p className="text-gray-600">Address: 123 Library St, Booktown</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-300 mt-6 pt-4 text-center text-gray-600">
          <p>&copy; 2025 Book Inventory System | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
