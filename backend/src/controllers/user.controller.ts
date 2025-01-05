import { Cookies } from 'js-cookie';
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { NextFunction, Request, Response } from "express";

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
    return;
  }
  const { accessToken, refreshToken } = await generateRefreshAndAccessToken(user._id as string)
  res.status(200).json({
    success: true,
    message: "User Account created successfully",
    createUser,
    accessToken, 
    refreshToken
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
    .cookie("accessToken", accessToken, {...options, expires: new Date(Date.now() +  60* 60* 1000)})
    .cookie("refreshToken", refreshToken,{ ...options, expires: new Date(Date.now() + 7*24* 60* 60* 1000)})
    .json({
      success: true,
      message: "User logged in successfully",
      loggedInUser,
      accessToken,
      refreshToken,
    });
};

const logoutUser = async (req: Request, res: Response) => {
  

  await User.findByIdAndUpdate(
    // @ts-ignore
   req.user?._id,
    {
      $set: {
        refreshToken: undefined,
      },
     
    },
    {
      new: true
    }
  )
  
  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      success: true,
      message: "User logged out successfully",
    });
};

const refreshAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if(!incomingRefreshToken){
    res.status(401).json({success: false, message: "UnAuthorized request"})
  }
  try {
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET ) as jwt.JwtPayload;
    const user = await User.findById(decodedToken?._id); 
    if(!user){
      res.status(401).json({message: " Invalid Refresh token"})
    }
    if(incomingRefreshToken !== user?.refreshToken){
      res.status(401).json({
        message: "Invalid  or expired refresh token "
      })
      return;
    }
  const {accessToken, refreshToken} = await generateRefreshAndAccessToken(user._id as string)
  res.status(200)
  .cookie("accessToken", accessToken, {...options,expires: new Date(Date.now() +  60* 60* 1000)})
  .cookie("refreshToken",  refreshToken, {...options, expires: new Date(Date.now() + 7*24* 60* 60* 1000)})
  .json({success: true, message: "token successfully refreshed"}),
  accessToken, refreshToken
  } catch (error) {
    res.status(500).json({
      message: "Invalid refresh token"
    })
  }
};

export { registerUser, loginUser, logoutUser, refreshAccessToken };
