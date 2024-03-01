import express from "express";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 3000;
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import path from 'path';
import cors from 'cors';

const app = express(); 

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
    
connectDB();   

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

app.use(cors());

app.use('/public', express.static(path.join( 'public')));

console.log(path.join(__dirname, 'uploads'))

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => res.send("server ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server started @http://localhost:${port}`))