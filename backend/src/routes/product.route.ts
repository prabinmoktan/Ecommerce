import express from "express"
import { upload } from "../middleware/multer.middleware";
import { createProduct, deleteProductById, getProducts, getProductsById,  updateProductById } from "../controllers/product.controller";

const router = express.Router();
router
.post('/products',upload.fields([{name: 'images', maxCount: 5}]),createProduct);

router.route('/products/:id').delete(deleteProductById);

router.patch('/products/:id',upload.fields([{name: 'images'}]), updateProductById);

router.route('/products').get(getProducts);
router.route('/products/:id').get(getProductsById);

export default router;