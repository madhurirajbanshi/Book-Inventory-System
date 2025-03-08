import Book from '../models/Book.js';

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
};

const addBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.json(savedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error saving book', error: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error: error.message });
  }
};

  
  const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully', deletedBook });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error: error.message });
  }
};


export { getBooks, addBook,updateBook,deleteBook};
