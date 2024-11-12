import express from 'express';
import { getCandidates, vote} from '../controllers/candidatesController';

const router = express.Router();

// ראוט לקבלת מועמדים
router.get('/candidates', getCandidates);
router.put('/candidates/vote', vote);



export default router;
