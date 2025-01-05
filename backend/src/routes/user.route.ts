import { verifyJWT } from './../middleware/auth.middleware';
import express from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller";

const router = express.Router();

router.route('/user/register').post(registerUser);
router.route('/user/login').post(loginUser);
router.route('/user/logout').post(verifyJWT,logoutUser);
router.route('/user/refreshToken').post( refreshAccessToken);



export default router;