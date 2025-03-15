import React from "react";

const Feedback = () => {
  // Predefined feedback data
  const feedbackList = [
    {
      id: 1,
      feedback:
        "Great experience! The platform is very user-friendly and easy to navigate.",
      rating: 5,
    },
    {
      id: 2,
      feedback:
        "Good, but the interface can be improved in terms of responsiveness.",
      rating: 4,
    },
    {
      id: 3,
      feedback:
        "Needs some work. The layout looks outdated, and it's a bit slow.",
      rating: 2,
    },
    {
      id: 4,
      feedback:
        "I love this website! Excellent resource for learning algorithms with visualizations.",
      rating: 5,
    },
    {
      id: 5,
      feedback:
        "Pretty decent, but I had some trouble with the search feature.",
      rating: 3,
    },
    {
      id: 6,
      feedback:
        "The user interface is nice, but some features are hard to find.",
      rating: 4,
    },
    {
      id: 7,
      feedback:
        "Awesome platform! Everything works as expected, and the tutorials are great.",
      rating: 5,
    },
    {
      id: 8,
      feedback:
        "I encountered a few bugs, but overall it's a helpful platform.",
      rating: 3,
    },
  ];

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 ${
            i <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.75l-5.33 3.53 1.01-5.89-4.29-4.17 5.91-.85L12 2.25l2.99 6.9 5.91.85-4.29 4.17 1.01 5.89L12 17.75z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="feedback-section py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">User Feedback</h2>
        <p className="text-gray-600 mb-6">
          Here are some of the feedback from our users:
        </p>

        {/* Display Predefined Feedback Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {feedbackList.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-300 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 p-6"
            >
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">{renderStars(item.rating)}</div>
              </div>
              {/* Feedback Text */}
              <p className="text-gray-700">{item.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
