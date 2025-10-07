"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategory = exports.createCategory = void 0;
const category_model_1 = require("../models/category.model");
const createCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({
            success: false,
            message: "Category name is required.",
        });
    }
    try {
        const existingCategory = await category_model_1.Category.findOne({ name });
        if (existingCategory) {
            res.status(409).json({
                success: false,
                message: "Category already exists.",
            });
            return;
        }
        const category = await category_model_1.Category.create({ name });
        res.status(200).json({
            success: true,
            message: "Category created Successfully.",
            category,
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            message: "something went wrong while creatin Category.",
            error,
        });
        return;
    }
};
exports.createCategory = createCategory;
const getCategory = async (req, res) => {
    const category = await category_model_1.Category.find();
    if (!category) {
        res.status(400).json({
            message: "No categories found"
        });
        return;
    }
    res.status(200).json({ success: true, message: "Categories fetched successfully", category });
    return;
};
exports.getCategory = getCategory;
