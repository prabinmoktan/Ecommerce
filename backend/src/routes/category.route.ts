import  express  from "express"
import { createCategory, getCategory } from "../controllers/category.controller";

const router = express.Router();

router.post('/category',createCategory)
router.route('/category').get(getCategory);

export default router;