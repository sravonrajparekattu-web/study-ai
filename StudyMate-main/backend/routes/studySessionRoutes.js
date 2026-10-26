import express from 'express';
import {
  getStudySessions,
  createStudySession,
  updateStudySession,
  deleteStudySession
} from '../controllers/studySessionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getStudySessions)
  .post(createStudySession);

router.route('/:id')
  .put(updateStudySession)
  .delete(deleteStudySession);

export default router;
