import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from './models/user';  
import Candidate from './models/Candidate';  

const router = express.Router();

//  ראוט לרישום משתמש חדש
router.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      isAdmin: false, 
      hasVoted: false, 
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

//  ראוט להתחברות
router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    res.json({
      user: { id: user._id, username: user.username, isAdmin: user.isAdmin },
    });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

//  ראוט לקבלת רשימת המועמדים
router.get('/candidates', async (req: Request, res: Response) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching candidates' });
  }
});

export default router;
