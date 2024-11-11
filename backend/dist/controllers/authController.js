"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
// רישום משתמש חדש
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, isAdmin } = req.body;
    try {
        const existingUser = yield user_1.default.findOne({ username });
        if (existingUser) {
            res.status(400).json({ message: 'Username already exists' });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new user_1.default({
            username,
            password: hashedPassword,
            isAdmin,
            hasVoted: false,
        });
        yield newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Error registering user' });
    }
});
exports.registerUser = registerUser;
// התחברות משתמש
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ username });
        if (!user) {
            res.status(400).json({ message: 'Invalid username or password' });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid username or password' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, username: user.username, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '1h' });
        res.json({
            user: { id: user._id, username: user.username, isAdmin: user.isAdmin },
            token,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error logging in' });
    }
});
exports.loginUser = loginUser;
// import bcrypt from 'bcrypt';
// import User from '../models/user';  
// import { Request, Response } from 'express';
// // רישום משתמש חדש
// export const registerUser = async (req: Request, res: Response) => {
//   const { username, password,isAdmin } = req.body;
//   try {
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       res.status(400).json({ message: 'Username already exists' });
//       return;
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       username,
//       password: hashedPassword,
//       isAdmin,
//       hasVoted: false,
//     });
//     await newUser.save();
//     res.status(201).json({ message: 'User created successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error registering user' });
//   }
// };
// // התחברות משתמש
// export const loginUser = async (req: Request, res: Response) => {
//   const { username, password } = req.body;
//   try {
//     const user = await User.findOne({ username });
//     if (!user) {
//        res.status(400).json({ message: 'Invalid username or password' });
//        return;
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//      res.status(400).json({ message: 'Invalid username or password' });
//      return;
//     }
//     res.json({
//       user: { id: user._id, username: user.username, isAdmin: user.isAdmin },
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Error logging in' });
//   }
// };
