import { Router } from "express"
import { upload } from "../middleware/multer.middleware.ts";
import { createProduct, deleteProduct, getProducts, getProductsById, updateProduct } from "../controllers/product.controller.ts";

const router = Router();
router
.post('/products',upload.fields([{name: 'images', maxCount: 5}]),createProduct);

router.route('/products/:id').delete(deleteProduct);

router.patch('/products/:id',upload.fields([{name: 'images'}]), updateProduct);

router.route('/products').get(getProducts);
router.route('/products/:id').get(getProductsById);

export default router;