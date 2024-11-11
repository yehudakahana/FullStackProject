"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const candidateRouter_1 = __importDefault(require("./routes/candidateRouter"));
const data_1 = __importDefault(require("./DAL/data"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// חיבור ל-MongoDB
(0, data_1.default)();
// חיבור לראוטים
app.use('/api', authRouter_1.default);
app.use('/api', candidateRouter_1.default);
// הפעלת השרת
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
