import express from 'express';
import { getCandidates } from '../controllers/candidatesController';

const router = express.Router();

// ראוט לקבלת מועמדים
router.get('/candidates', getCandidates);

export default router;
