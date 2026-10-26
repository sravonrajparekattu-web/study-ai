import Task from '../models/Task.js';
import Subject from '../models/Subject.js';
import { isMongoConnected } from '../config/db.js';
import { memoryStore } from '../utils/memoryStore.js';

export const getTasks = async (req, res, next) => {
  try {
    const { search, status, priority, subject, sortBy } = req.query;

    if (!isMongoConnected()) {
      const data = await memoryStore.findTasks(req.user._id, { search, status, priority, subject, sortBy });
      return res.status(200).json({ success: true, count: data.length, data });
    }

    const query = { user: req.user._id };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    if (status && status !== 'All') query.status = status;
    if (priority && priority !== 'All') query.priority = priority;
    if (subject && subject !== 'All') query.subject = subject;

    let sortOptions = { deadline: 1 };
    if (sortBy === 'title') sortOptions = { title: 1 };
    if (sortBy === 'created') sortOptions = { createdAt: -1 };

    const tasks = await Task.find(query).populate('subject', 'name color').sort(sortOptions);
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    if (!isMongoConnected()) {
      const tasks = await memoryStore.findTasks(req.user._id);
      const task = tasks.find(t => t._id === req.params.id);
      if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
      return res.status(200).json({ success: true, data: task });
    }

    const task = await Task.findOne({ _id: req.params.id, user: req.user._id }).populate('subject', 'name color');
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title, description, subject, priority, deadline } = req.body;
    if (!title || !subject || !deadline) {
      return res.status(400).json({ success: false, message: 'Please provide task title, subject, and deadline' });
    }

    if (!isMongoConnected()) {
      const task = await memoryStore.createTask({
        user: req.user._id,
        subject,
        title,
        description,
        priority,
        deadline
      });
      return res.status(201).json({ success: true, data: task });
    }

    const subjectExists = await Subject.findOne({ _id: subject, user: req.user._id });
    if (!subjectExists) {
      return res.status(400).json({ success: false, message: 'Selected subject is invalid' });
    }

    const task = await Task.create({
      user: req.user._id,
      subject,
      title,
      description: description || '',
      priority: priority || 'Medium',
      deadline,
      status: 'Pending'
    });

    const populatedTask = await Task.findById(task._id).populate('subject', 'name color');
    res.status(201).json({ success: true, data: populatedTask });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { title, description, subject, priority, deadline, status } = req.body;

    if (!isMongoConnected()) {
      const task = await memoryStore.updateTask(req.params.id, req.user._id, { title, description, subject, priority, deadline, status });
      if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
      return res.status(200).json({ success: true, data: task });
    }

    let task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (priority) task.priority = priority;
    if (deadline) task.deadline = deadline;
    if (status) task.status = status;
    if (subject) task.subject = subject;

    await task.save();
    const updatedTask = await Task.findById(task._id).populate('subject', 'name color');
    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    if (!isMongoConnected()) {
      await memoryStore.deleteTask(req.params.id, req.user._id);
      return res.status(200).json({ success: true, message: 'Task deleted successfully' });
    }

    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    await task.deleteOne();
    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};
