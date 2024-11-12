import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/user';

interface CustomRequest extends Request {
  user?: any; 
}

const JWT_SECRET = process.env.JWT_SECRET || '';

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
   const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
     return res.status(403).json({ message: 'Authorization token is required' });
   }
   const token = authHeader.split(' ')[1]; 

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




