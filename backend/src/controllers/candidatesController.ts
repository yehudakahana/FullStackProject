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

// הצבעה למועמד
export const vote = async (req: Request, res: Response) => {
  const { candidateName } = req.body;

  try {
    const candidate = await Candidate.findOne({ name: candidateName } ); 

    if (candidate) {
      candidate.votes += 1;
      
      await candidate.save(); 
      res.status(201).json({ message: 'Vote updated successfully' });
    } else {
      res.status(404).json({ message: 'Candidate not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating vote' });
  }
};
