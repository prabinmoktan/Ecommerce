import mongoose from "mongoose";
import dotenv from 'dotenv';
import { DB_NAME } from "../../../frontend/src/constant.js";

dotenv.config();

export const dbConnect = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MONGODB connect !! DB Host : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log('Error ==> ', error)
        process.exit(1)
        
    }
}