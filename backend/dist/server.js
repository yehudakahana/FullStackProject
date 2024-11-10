"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import cors from 'cors';
const dotenv_1 = __importDefault(require("dotenv"));
// import router from './routes';  
const data_1 = __importDefault(require("./DAL/data"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Middleware
app.use(express_1.default.json());
// app.use(cors());
// חיבור ל-MongoDB
(0, data_1.default)();
// חיבור לראוטים
// app.use('/api', router);
// הפעלת השרת
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
