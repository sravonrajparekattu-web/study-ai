import StudySession from '../models/StudySession.js';
import Subject from '../models/Subject.js';
import { isMongoConnected } from '../config/db.js';
import { memoryStore } from '../utils/memoryStore.js';

export const getStudySessions = async (req, res, next) => {
  try {
    if (!isMongoConnected()) {
      const sessions = await memoryStore.findStudySessions(req.user._id);
      return res.status(200).json({ success: true, count: sessions.length, data: sessions });
    }

    const sessions = await StudySession.find({ user: req.user._id })
      .populate('subject', 'name color')
      .sort({ date: 1, startTime: 1 });

    res.status(200).json({ success: true, count: sessions.length, data: sessions });
  } catch (error) {
    next(error);
  }
};

export const createStudySession = async (req, res, next) => {
  try {
    const { subject, topic, date, startTime, endTime } = req.body;
    if (!subject || !topic || !date || !startTime || !endTime) {
      return res.status(400).json({ success: false, message: 'Please fill in all session fields' });
    }

    if (!isMongoConnected()) {
      const session = await memoryStore.createStudySession({ user: req.user._id, subject, topic, date, startTime, endTime });
      return res.status(201).json({ success: true, data: session });
    }

    const subjectExists = await Subject.findOne({ _id: subject, user: req.user._id });
    if (!subjectExists) {
      return res.status(400).json({ success: false, message: 'Invalid subject selected' });
    }

    const session = await StudySession.create({ user: req.user._id, subject, topic, date, startTime, endTime });
    const populatedSession = await StudySession.findById(session._id).populate('subject', 'name color');
    res.status(201).json({ success: true, data: populatedSession });
  } catch (error) {
    next(error);
  }
};

export const updateStudySession = async (req, res, next) => {
  try {
    const { subject, topic, date, startTime, endTime } = req.body;
    if (!isMongoConnected()) {
      const session = await memoryStore.updateStudySession(req.params.id, req.user._id, { subject, topic, date, startTime, endTime });
      if (!session) return res.status(404).json({ success: false, message: 'Study session not found' });
      return res.status(200).json({ success: true, data: session });
    }

    let session = await StudySession.findOne({ _id: req.params.id, user: req.user._id });
    if (!session) return res.status(404).json({ success: false, message: 'Study session not found' });
    if (topic) session.topic = topic;
    if (date) session.date = date;
    if (startTime) session.startTime = startTime;
    if (endTime) session.endTime = endTime;
    if (subject) session.subject = subject;

    await session.save();
    const updatedSession = await StudySession.findById(session._id).populate('subject', 'name color');
    res.status(200).json({ success: true, data: updatedSession });
  } catch (error) {
    next(error);
  }
};

export const deleteStudySession = async (req, res, next) => {
  try {
    if (!isMongoConnected()) {
      await memoryStore.deleteStudySession(req.params.id, req.user._id);
      return res.status(200).json({ success: true, message: 'Study session deleted' });
    }

    const session = await StudySession.findOne({ _id: req.params.id, user: req.user._id });
    if (!session) return res.status(404).json({ success: false, message: 'Study session not found' });
    await session.deleteOne();
    res.status(200).json({ success: true, message: 'Study session deleted' });
  } catch (error) {
    next(error);
  }
};
