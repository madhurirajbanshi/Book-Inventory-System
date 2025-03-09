import express from 'express';
import authenticateToken from '../middleware/authMiddleware.js';
import { getBooks, addBook, updateBook, deleteBook } from '../controllers/bookController.js';

const router = express.Router();

router.get('/', getBooks);

router.post('/add', authenticateToken, addBook);
router.put('/:id', authenticateToken, updateBook);
router.delete('/:id', authenticateToken, deleteBook);

export default router;