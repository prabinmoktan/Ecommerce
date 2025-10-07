"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_middleware_1 = require("../middleware/multer.middleware");
const product_controller_1 = require("../controllers/product.controller");
const router = express_1.default.Router();
router
    .post('/products', multer_middleware_1.upload.fields([{ name: 'images', maxCount: 5 }]), product_controller_1.createProduct);
router.route('/products/:id').delete(product_controller_1.deleteProductById);
router.patch('/products/:id', multer_middleware_1.upload.fields([{ name: 'images' }]), product_controller_1.updateProductById);
router.route('/products').get(product_controller_1.getProducts);
router.route('/products/:id').get(product_controller_1.getProductsById);
exports.default = router;
