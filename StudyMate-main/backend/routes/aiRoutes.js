import express from 'express';
import { getStudyPlan, explainTopic } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/study-plan', getStudyPlan);
router.post('/explain', explainTopic);

export default router;
