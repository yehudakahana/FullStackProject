"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const candidateRouter_1 = __importDefault(require("./routes/candidateRouter"));
const data_1 = __importDefault(require("./DAL/data"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// חיבור ל-MongoDB
(0, data_1.default)();
// חיבור לראוטים
app.use('/api', authRouter_1.default);
app.use('/api', candidateRouter_1.default);
//@ts-ignore
app.use('/api', authMiddleware_1.verifyToken);
// הפעלת השרת
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// import express, { Request, Response } from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import  authRoutes from './routes/authRouter';  
// import candidateRoutes from './routes/candidateRouter'  
// import  connectDB  from './DAL/data';
// dotenv.config();  
// const app = express();
// const port = process.env.PORT || 5000;
// // Middleware
// app.use(express.json()); 
// app.use(cors());
// // חיבור ל-MongoDB
// connectDB();
// // חיבור לראוטים
// app.use('/api', authRoutes);  
// app.use('/api', candidateRoutes); 
// // הפעלת השרת
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
