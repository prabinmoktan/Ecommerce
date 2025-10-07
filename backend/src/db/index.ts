import mongoose from "mongoose";
import * as dotenv from 'dotenv';
// import { DB_NAME } from "../backendConstant";

dotenv.config();

export const dbConnect = async() => {
    console.log(`${process.env.MONGODB_URI}/`)
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/"Ecommerce"`);
        console.log(`\n MONGODB connect !! DB Host : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log('Error ==> ', error)
        process.exit(1)
        
    }
}