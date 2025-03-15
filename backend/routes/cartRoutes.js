import express from 'express';
import authenticateToken from '../middleware/authMiddleware.js';
import { addToCart,removeFromCart,getCart} from '../controllers/cart.js';


const router = express.Router();
router.post('/add', authenticateToken, addToCart);
router.delete('/remove/:bookId', authenticateToken, removeFromCart);
router.get('/getcart', authenticateToken, getCart);
export default router;