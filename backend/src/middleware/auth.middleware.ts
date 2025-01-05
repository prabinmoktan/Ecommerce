import { NextFunction, Response, Request } from "express";
import { User } from "../models/user.model";
import jwt from 'jsonwebtoken';



export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
  req.cookies?.accessToken ||
  (typeof req.headers["authorization"] === "string"
    ? req.headers["authorization"].replace("Bearer ", "")
    : null);
    if (!token) {
      res.status(401).json({ message: "Token not provided" });
      return;
    }
  
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById((decodedToken as jwt.JwtPayload)._id).select("-password -refreshToken");
    if(!user){
      res.status(401).json({message: "Invalid Access Token"});
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({message: "Invalid Access token"})
    return;
  }

};
