"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("./../middleware/auth.middleware");
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
router.route('/user/register').post(user_controller_1.registerUser);
router.route('/user/login').post(user_controller_1.loginUser);
router.route('/user/logout').post(auth_middleware_1.verifyJWT, user_controller_1.logoutUser);
router.route('/user/refreshToken').post(user_controller_1.refreshAccessToken);
router.route('/user').get(user_controller_1.getUsers);
exports.default = router;
