import Subject from '../models/Subject.js';
import Task from '../models/Task.js';
import { isMongoConnected } from '../config/db.js';
import { memoryStore } from '../utils/memoryStore.js';

export const getSubjects = async (req, res, next) => {
  try {
    if (!isMongoConnected()) {
      const subjects = await memoryStore.findSubjects(req.user._id);
      const allTasks = await memoryStore.findTasks(req.user._id);

      const subjectsWithMetrics = subjects.map(s => {
        const totalTasks = allTasks.filter(t => t.subject?._id === s._id || t.subject === s._id).length;
        const completedTasks = allTasks.filter(t => (t.subject?._id === s._id || t.subject === s._id) && t.status === 'Completed').length;
        const pendingTasks = totalTasks - completedTasks;
        const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        return { ...s, totalTasks, completedTasks, pendingTasks, progress };
      });

      return res.status(200).json({ success: true, data: subjectsWithMetrics });
    }

    const subjects = await Subject.find({ user: req.user._id }).sort({ name: 1 });
    const subjectsWithMetrics = await Promise.all(
      subjects.map(async (subject) => {
        const totalTasks = await Task.countDocuments({ user: req.user._id, subject: subject._id });
        const completedTasks = await Task.countDocuments({ user: req.user._id, subject: subject._id, status: 'Completed' });
        const pendingTasks = totalTasks - completedTasks;
        const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        return { ...subject.toObject(), totalTasks, completedTasks, pendingTasks, progress };
      })
    );

    res.status(200).json({ success: true, data: subjectsWithMetrics });
  } catch (error) {
    next(error);
  }
};

export const createSubject = async (req, res, next) => {
  try {
    const { name, color } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Subject name is required' });
    }

    if (!isMongoConnected()) {
      const subject = await memoryStore.createSubject({ user: req.user._id, name: name.trim(), color });
      return res.status(201).json({
        success: true,
        data: { ...subject, totalTasks: 0, completedTasks: 0, pendingTasks: 0, progress: 0 }
      });
    }

    const existing = await Subject.findOne({ user: req.user._id, name: { $regex: new RegExp(`^${name.trim()}$`, 'i') } });
    if (existing) {
      return res.status(400).json({ success: false, message: 'A subject with this name already exists' });
    }

    const subject = await Subject.create({ user: req.user._id, name: name.trim(), color: color || '#4F46E5' });
    res.status(201).json({
      success: true,
      data: { ...subject.toObject(), totalTasks: 0, completedTasks: 0, pendingTasks: 0, progress: 0 }
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubject = async (req, res, next) => {
  try {
    const { name, color } = req.body;
    if (!isMongoConnected()) {
      const subject = await memoryStore.updateSubject(req.params.id, req.user._id, { name, color });
      if (!subject) return res.status(404).json({ success: false, message: 'Subject not found' });
      return res.status(200).json({ success: true, data: subject });
    }

    const subject = await Subject.findOne({ _id: req.params.id, user: req.user._id });
    if (!subject) return res.status(404).json({ success: false, message: 'Subject not found' });
    if (name) subject.name = name.trim();
    if (color) subject.color = color;
    await subject.save();
    res.status(200).json({ success: true, data: subject });
  } catch (error) {
    next(error);
  }
};

export const deleteSubject = async (req, res, next) => {
  try {
    if (!isMongoConnected()) {
      await memoryStore.deleteSubject(req.params.id, req.user._id);
      return res.status(200).json({ success: true, message: 'Subject removed successfully' });
    }

    const subject = await Subject.findOne({ _id: req.params.id, user: req.user._id });
    if (!subject) return res.status(404).json({ success: false, message: 'Subject not found' });
    await Task.deleteMany({ user: req.user._id, subject: subject._id });
    await subject.deleteOne();
    res.status(200).json({ success: true, message: 'Subject removed successfully' });
  } catch (error) {
    next(error);
  }
};
