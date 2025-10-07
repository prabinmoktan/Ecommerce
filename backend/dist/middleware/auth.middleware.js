"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken ||
            (typeof req.headers["authorization"] === "string"
                ? req.headers["authorization"].replace("Bearer ", "")
                : null);
        if (!token) {
            res.status(401).json({ message: "Token not provided" });
            return;
        }
        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new Error("ACCESS_TOKEN_SECRET is not defined in environment variables");
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await user_model_1.User.findById(decodedToken._id).select("-password -refreshtoken");
        if (!user) {
            res.status(401).json({ message: "Invalid Access Token" });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid Token", error });
        return;
    }
};
exports.verifyJWT = verifyJWT;
