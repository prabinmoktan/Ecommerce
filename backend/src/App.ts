import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();

app.use(cors());
app.use(express.json({limit: "1mb"}));
app.use(express.urlencoded({extended: true, limit: "1mb"}));
app.use(express.static('public'));
dotenv.config();


//routes Import
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import categoryRouter from './routes/category.route.ts';
import productRouter from './routes/product.route.ts';
import userRouter from './routes/user.route.ts'

//routes declaration 
app.use('/api/v1', categoryRouter);
app.use('/api/v1', productRouter);
app.use('/api/v1', userRouter);


export {app}