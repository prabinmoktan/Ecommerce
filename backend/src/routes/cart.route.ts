import  express from 'express';
import { addToCart } from '../controllers/cart.controller';

const router = express.Router();

router.route('/cart').post(addToCart)

export default router;