import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json({limit: "1mb"}));
app.use(express.urlencoded({extended: true, limit: "1mb"}));
app.use(express.static('public'));
dotenv.config();


//routes Import
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import categoryRouter from './routes/category.route';
import productRouter from './routes/product.route';
import userRouter from './routes/user.route';



//routes declaration 
app.use('/api/v1', categoryRouter);
app.use('/api/v1', productRouter);
app.use('/api/v1', userRouter);


export {app}