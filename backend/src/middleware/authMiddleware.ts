import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/user';

interface CustomRequest extends Request {
  user?: any; 
}

const JWT_SECRET = process.env.JWT_SECRET || '';

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
     res.status(403).json({ message: 'Token is required' });
     return;
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: 'Invalid or expired token' });
      return;
    }

    req.user! = decoded; 

    next();
  });
};
