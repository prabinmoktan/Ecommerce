import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
const options = {
    httpOnly: true,
    secure: true,
    // sameSite: Strict
};
const generateRefreshAndAccessToken = async (userId) => {
    try {
        const user = await User.findById(userId);
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
        const existingUser = await User.findOne({
            $or: [{ email }, { firstName }],
        });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const user = await User.create({
            firstName,
            lastName,
            email,
            gender,
            password,
            role: userRole,
        });
        const createUser = await User.findById(user._id).select("-password -refreshToken");
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
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            res.status(400).json({ message: "Email is required" });
            return;
        }
        const user = await User.findOne({ email });
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
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
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
const logoutUser = async (req, res) => {
    await User.findByIdAndUpdate(
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
const refreshAccessToken = async (req, res, next) => {
    const incomingRefreshToken = req.body.refreshToken || req.cookies.refreshToken;
    if (!incomingRefreshToken) {
        res.status(401).json({ success: false, message: "UnAuthorized request" });
    }
    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id);
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
const getUsers = async (req, res) => {
    const users = await User.find().select("-password -refreshToken");
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
export { registerUser, loginUser, logoutUser, refreshAccessToken, getUsers };
