import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.ts";

const router = Router();

router.route('/user/register').post(registerUser);
router.route('/user/login').post(loginUser);
router.route('/user/logout')



export default router;