import Book from '../models/Book.js';
import Feedback from '../models/Feedback.js';
import User from '../models/User.js';

const addFeedback = async (req, res) => {
  try {
    // Check if the user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    
    const { bookId, feedback } = req.body;
    
    if (!bookId || !feedback) {
      return res.status(400).json({ 
        message: "Book ID and feedback text are required" 
      });
    }
    
    // Find the book to get its details
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    
    // Create a new feedback entry in the database
    const newFeedback = await Feedback.create({
      userId: req.user.id,
      bookId: bookId,
      username:User.username,
      bookTitle: book.title,
      author: book.author,
      image: book.image,
      feedback: feedback,
      createdAt: new Date()
    });
    
    res.status(201).json({ 
      success: true, 
      message: "Feedback added successfully",
      data: newFeedback
    });
  } catch (error) {
    console.error("Error adding feedback:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error", 
      error: error.message 
    });
  }
};

// Get all feedbacks
const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    
    res.status(200).json({ 
      success: true,
      data: feedbacks
    });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error", 
      error: error.message 
    });
  }
};

// Delete feedback
const deleteFeedback = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    
    const { feedbackId } = req.params;
    
    // Find the feedback
    const feedback = await Feedback.findById(feedbackId);
    
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    
    // Check if the feedback belongs to the authenticated user
    if (feedback.userId.toString() !== req.user.id) {
      return res.status(403).json({ 
        message: "You are not authorized to delete this feedback" 
      });
    }
    
    // Delete the feedback
    await Feedback.findByIdAndDelete(feedbackId);
    
    res.status(200).json({ 
      success: true,
      message: "Feedback deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error", 
      error: error.message 
    });
  }
};

export { addFeedback, getFeedbacks, deleteFeedback };