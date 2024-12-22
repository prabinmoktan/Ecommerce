import { Router } from "express"
import { createCategory } from "../controllers/category.controller.ts";

const router = Router();

router.route('/category').post(createCategory)

export default router;