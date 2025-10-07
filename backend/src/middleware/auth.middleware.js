import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
export const verifyJWT = async (req, res, next) => {
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
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken._id).select("-password -refreshtoken");
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
