import jwt from "jsonwebtoken";
import { User } from "../models/user.model.ts";
import { Request, Response } from "express";

const options = {
  httpOnly: true,
  secure: true,
};

const generateRefreshAndAccessToken = async (userId: string) => {
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
  } catch (error) {
    throw Error(
      "Sometin went wrong while generating access Token and Refres Token"
    );
  }
};

const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, gender, password } = req.body;
  console.log(req.body);
  if (
    [firstName, lastName, email, password, gender].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    res
      .status(400)
      .json({ success: false, message: "All fields are required" });
    return;
  }
  const existingUser = await User.findOne({ $or: [{ email }, { firstName }] });
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
  });
  const createUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createUser) {
    res.status(400).json({ message: "Something went wrong while registering" });
  }
  res.status(200).json({
    success: true,
    message: "User Account created successfully",
    createUser,
  });
};

const loginUser = async (req: Request, res: Response) => {
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
    res.status(400).json({ message: "Invalid password" });
  }
  const { accessToken, refreshToken } = await generateRefreshAndAccessToken(
    user._id as string
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      success: true,
      message: "User logged in successfully",
      loggedInUser,
      accessToken,
      refreshToken,
    });
};

const logoutUser = async (req: Request, res: Response) => {
  // @ts-ignore
  if (!req.user) {
    return res
      .status(400)
      .json({ success: false, message: "User not authenticated" });
  }
  await User.findByIdAndUpdate(
    // @ts-ignore
    req.user._id,
    {
      $unset: { refreshToken: 1 },
    },
    { new: true }
  );
  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      success: true,
      message: "User logged out successfully",
    });
};

const refreshAndAccessToken = async (req: Request, res: Response) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    return res.status(401).json({ message: "Unauthrized Request." });
  }
  const secretToken = process.env.REFRESH_TOKEN_SECRET;
  if (!secretToken) {
    console.error(
      "REFRESH_TOKEN_SECRET is not defined in environment variables."
    );
    return res.status(500).json({ message: "Internal Server Error." });
  }
  try {
    const decodedToken = jwt.verify(incomingRefreshToken, secretToken) as {
      _id: string;
    };

    const user = await User.findById(decodedToken._id);
    if (!user) {
      res.status(401).json({
        message: "Invalid Refresh token",
      });
    }
    if (incomingRefreshToken !== user?.refreshToken) {
     return res.status(401).json({
        message: "Refresh token expired",
      });
    }
    // @ts-ignore
    const {accessToken, refreshToken} = await generateRefreshAndAccessToken(user?._id);


  } catch (error) {}
};

export { registerUser, loginUser, logoutUser };
