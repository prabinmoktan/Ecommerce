"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.getProductsById = exports.updateProductById = exports.deleteProductById = exports.createProduct = void 0;
const cloudinary_1 = require("../service/cloudinary");
const product_model_1 = require("../models/product.model");
const category_model_1 = require("../models/category.model");
const createProduct = async (req, res) => {
    const { title, description, price, stock, category } = req.body;
    if ([title, description, price, stock, category].some((field) => !field || field.trim() === "")) {
        res
            .status(404)
            .json({ success: false, message: "All fields are required" });
        return;
    }
    const existingcategory = await category_model_1.Category.findOne({ name: category });
    if (!existingcategory) {
        res.status(404).json({
            success: false,
            message: "Invalid category",
        });
        return;
    }
    try {
        //   @ts-ignore
        const imagePath = req.files?.images;
        if (!imagePath || imagePath.length === 0) {
            res
                .status(400)
                .json({ success: false, message: "Product image is required" });
            return;
        }
        const uploadImage = imagePath.map((file) => (0, cloudinary_1.uploadOnCloudinary)(file.path));
        const productImage = await Promise.all(uploadImage);
        const imageUrl = productImage.map((item) => item?.url);
        const product = await product_model_1.Product.create({
            title,
            description,
            price,
            stock,
            category: existingcategory?._id,
            images: imageUrl,
        });
        const populatedProduct = await product_model_1.Product.findById(product._id)
            .populate("category", "name")
            .exec();
        res.status(200).json({
            success: true,
            message: "Product created Successfully",
            populatedProduct,
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error Occured when creating product",
            error,
        });
        return;
    }
};
exports.createProduct = createProduct;
const getProducts = async (req, res) => {
    try {
        // query parameters with default value
        const limit = parseInt(req.query.limit || "10");
        const page = parseInt(req.query.page || "1");
        if (isNaN(limit)) {
            res.status(400).json({ success: false, message: "Invalid limit " });
            return;
        }
        if (isNaN(page)) {
            res.status(400).json({ success: false, message: "Invalid page " });
            return;
        }
        const skip = (page - 1) * limit;
        const totalProducts = await product_model_1.Product.countDocuments();
        const products = await product_model_1.Product.find()
            .populate("category", "name")
            .skip(skip)
            .limit(limit)
            .exec();
        if (!products || products.length === 0) {
            res.status(404).json({ success: false, message: "No products found" });
            return;
        }
        const totalPages = Math.ceil(totalProducts / limit);
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            products,
            meta: {
                currentPage: page,
                totalProducts,
                totalPages,
                limit,
                hasNextPage: page < totalPages,
            }
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error occured when accessing products",
        });
        return;
    }
};
exports.getProducts = getProducts;
const getProductsById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await product_model_1.Product.findById(productId)
            .populate("category", "name")
            .exec();
        if (!product) {
            res.status(404).json({ success: false, message: "Product not found" });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Product by id successfully fetched",
            product,
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            message: "Server error occured when accessing products by id",
        });
    }
};
exports.getProductsById = getProductsById;
const deleteProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await product_model_1.Product.findById(id);
        if (!product) {
            res.status(404).json({ success: false, message: "Product not found" });
            return;
        }
        await product_model_1.Product.findByIdAndDelete(id);
        res
            .status(200)
            .json({ success: true, message: "Product deleted Successfully" });
        return;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error Occured when deleting,error",
            error,
        });
        return;
    }
};
exports.deleteProductById = deleteProductById;
const updateProductById = async (req, res) => {
    const productId = req.params.id;
    const { title, price, description, stock, category } = req.body;
    try {
        const product = await product_model_1.Product.findById(productId);
        if (!product) {
            res.status(404).json({ success: false, message: "Product not found" });
            return;
        }
        const existingcategory = await category_model_1.Category.findOne({ name: category });
        console.log(existingcategory);
        if (!existingcategory) {
            res.status(404).json({ success: false, message: "Category not found" });
            return;
        }
        // @ts-ignore
        const imagePath = req.files?.images;
        if (!imagePath || imagePath.length === 0) {
            res
                .status(400)
                .json({ success: false, message: "Product image is required" });
            return;
        }
        const uploadImages = await Promise.all(imagePath.map((image) => (0, cloudinary_1.uploadOnCloudinary)(image.path)));
        const imageUrl = uploadImages.map((file) => file?.url);
        const updatedProduct = await product_model_1.Product.findByIdAndUpdate(productId, {
            title,
            price,
            description,
            stock,
            category: existingcategory._id,
            images: imageUrl,
        }, { new: true }).populate("category", "name");
        if (!updatedProduct) {
            res
                .status(404)
                .json({ success: false, message: "Product is not updated" });
            return;
        }
        res
            .status(200)
            .json({
            success: true,
            message: "Product updated Successfully",
            updatedProduct,
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error Occured when updating product",
            error,
        });
        return;
    }
};
exports.updateProductById = updateProductById;
