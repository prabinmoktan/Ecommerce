import { Request, Response } from "express";
import { Category } from "../models/category.model";

const createCategory = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({
      success: false,
      message: "Category name is required.",
    });
  }

  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      res.status(409).json({
        success: false,
        message: "Category already exists.",
      });
      return;
    }
    const category = await Category.create({ name });
    res.status(200).json({
      success: true,
      message: "Category created Successfully.",
      category,
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: "something went wrong while creatin Category.",
      error,
    });
    return;
  }
};

const getCategory = async(req: Request, res: Response) => {
  const category = await Category.find();
  if(!category){
    res.status(400).json({
      message: "No categories found"
    })
    return;
  }
  res.status(200).json({success: true, message: "Categories fetched successfully", category})
  return;
}

export { createCategory, getCategory };
