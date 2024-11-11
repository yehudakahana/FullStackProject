import Candidate from '../models/candidate'; 
import { Request, Response } from 'express';

// קבלת מועמדים
export const getCandidates = async (req: Request, res: Response) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching candidates' });
  }
};
