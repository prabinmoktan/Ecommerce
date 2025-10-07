"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.refreshAccessToken = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const options = {
    httpOnly: true,
    secure: true,
    // sameSite: Strict
};
const generateRefreshAndAccessToken = async (userId) => {
    try {
        const user = await user_model_1.User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user?.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    }
    catch (error) {
        throw Error("Sometin went wrong while generating access Token and Refres Token");
    }
};
const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, gender, password, role } = req.body;
        if ([firstName, lastName, email, password, gender].some((field) => !field || field.trim() === "")) {
            res
                .status(400)
                .json({ success: false, message: "All fields are required" });
            return;
        }
        const userRole = role || "user";
        const existingUser = await user_model_1.User.findOne({
            $or: [{ email }, { firstName }],
        });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const user = await user_model_1.User.create({
            firstName,
            lastName,
            email,
            gender,
            password,
            role: userRole,
        });
        const createUser = await user_model_1.User.findById(user._id).select("-password -refreshToken");
        if (!createUser) {
            res
                .status(400)
                .json({ message: "Something went wrong while registering" });
            return;
        }
        const { accessToken, refreshToken } = await generateRefreshAndAccessToken(user._id);
        res.status(200).json({
            success: true,
            message: "User Account created successfully",
            createUser,
            accessToken,
            refreshToken,
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error occured while creating an user",
            error,
        });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            res.status(400).json({ message: "Email is required" });
            return;
        }
        const user = await user_model_1.User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "User not found" });
            return;
        }
        const isValidPassword = await user.isPasswordCorrect(password);
        if (!isValidPassword) {
            res
                .status(401)
                .json({ success: false, message: "Invalid/Incorrect password" });
            return;
        }
        const { accessToken, refreshToken } = await generateRefreshAndAccessToken(user._id);
        const loggedInUser = await user_model_1.User.findById(user._id).select("-password -refreshToken");
        res
            .status(200)
            .cookie("accessToken", accessToken, {
            ...options,
            expires: new Date(Date.now() + 60 * 60 * 1000),
        })
            .cookie("refreshToken", refreshToken, {
            ...options,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })
            .json({
            success: true,
            message: "User logged in successfully",
            loggedInUser,
            accessToken,
            refreshToken,
        });
        return;
    }
    catch (error) {
        res.status(500).json({ success: false, message: "server error", error });
        return;
    }
};
exports.loginUser = loginUser;
const logoutUser = async (req, res) => {
    await user_model_1.User.findByIdAndUpdate(
    // @ts-ignore
    req.user?._id, {
        $set: {
            refreshToken: undefined,
        },
    }, {
        new: true,
    });
    res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({
        success: true,
        message: "User logged out successfully",
    });
};
exports.logoutUser = logoutUser;
const refreshAccessToken = async (req, res, next) => {
    const incomingRefreshToken = req.body.refreshToken || req.cookies.refreshToken;
    if (!incomingRefreshToken) {
        res.status(401).json({ success: false, message: "UnAuthorized request" });
    }
    try {
        const decodedToken = jsonwebtoken_1.default.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await user_model_1.User.findById(decodedToken?._id);
        if (!user) {
            res.status(401).json({ message: " Invalid Refresh token" });
            return;
        }
        if (incomingRefreshToken !== user?.refreshToken) {
            res.status(401).json({
                message: "Invalid  or expired refresh token ",
            });
            return;
        }
        const { accessToken, refreshToken } = await generateRefreshAndAccessToken(user._id);
        user.refreshToken = refreshToken;
        await user.save();
        res
            .status(200)
            .cookie("accessToken", accessToken, {
            ...options,
            expires: new Date(Date.now() + 60 * 60 * 1000),
        })
            .cookie("refreshToken", refreshToken, {
            ...options,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })
            .json({
            success: true,
            message: "token successfully refreshed",
            accessToken,
            refreshToken,
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            message: "Invalid refresh token",
        });
        return;
    }
};
exports.refreshAccessToken = refreshAccessToken;
const getUsers = async (req, res) => {
    const users = await user_model_1.User.find().select("-password -refreshToken");
    if (!users) {
        res.status(404).json({ success: false, message: "No Users found" });
        return;
    }
    res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        users,
    });
    return;
};
exports.getUsers = getUsers;
