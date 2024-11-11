import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';  
import { Request, Response } from 'express';
import dotenv from "dotenv"
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET;

// רישום משתמש חדש
export const registerUser = async (req: Request, res: Response) => {
  const { username, password, isAdmin } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: 'Username already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      isAdmin,
      hasVoted: false,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Error registering user' });
  }
};


// התחברות משתמש
export const loginUser = async (req: Request, res: Response) => {

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
     res.status(400).json({ message: 'Invalid username or password' });
     return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
     res.status(400).json({ message: 'Invalid username or password' });
     return;
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, isAdmin: user.isAdmin },
      JWT_SECRET!,
      { expiresIn: '1h' } 
    );

    res.json({
      user: { id: user._id, username: user.username, isAdmin: user.isAdmin },
      token, 
    });
  } catch (err) {

    console.log(err);
    res.status(500).json({ message: 'Error logging in' });
  }
};



















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
