import { uploadOnCloudinary } from "../service/cloudinary";
import { Product } from "../models/product.model";
import { Category } from "../models/category.model";
const createProduct = async (req, res) => {
    const { title, description, price, stock, category } = req.body;
    if ([title, description, price, stock, category].some((field) => !field || field.trim() === "")) {
        res
            .status(404)
            .json({ success: false, message: "All fields are required" });
        return;
    }
    const existingcategory = await Category.findOne({ name: category });
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
        const uploadImage = imagePath.map((file) => uploadOnCloudinary(file.path));
        const productImage = await Promise.all(uploadImage);
        const imageUrl = productImage.map((item) => item?.url);
        const product = await Product.create({
            title,
            description,
            price,
            stock,
            category: existingcategory?._id,
            images: imageUrl,
        });
        const populatedProduct = await Product.findById(product._id)
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
        const totalProducts = await Product.countDocuments();
        const products = await Product.find()
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
const getProductsById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId)
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
const deleteProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            res.status(404).json({ success: false, message: "Product not found" });
            return;
        }
        await Product.findByIdAndDelete(id);
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
const updateProductById = async (req, res) => {
    const productId = req.params.id;
    const { title, price, description, stock, category } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({ success: false, message: "Product not found" });
            return;
        }
        const existingcategory = await Category.findOne({ name: category });
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
        const uploadImages = await Promise.all(imagePath.map((image) => uploadOnCloudinary(image.path)));
        const imageUrl = uploadImages.map((file) => file?.url);
        const updatedProduct = await Product.findByIdAndUpdate(productId, {
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
export { createProduct, deleteProductById, updateProductById, getProductsById, getProducts, };
