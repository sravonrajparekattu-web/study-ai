import Task from '../models/Task.js';
import Subject from '../models/Subject.js';
import StudySession from '../models/StudySession.js';
import { isMongoConnected } from '../config/db.js';
import { memoryStore } from '../utils/memoryStore.js';

export const getDashboardData = async (req, res, next) => {
  try {
    const userId = req.user._id;

    if (!isMongoConnected()) {
      const allTasks = await memoryStore.findTasks(userId);
      const allSubjects = await memoryStore.findSubjects(userId);
      const allSessions = await memoryStore.findStudySessions(userId);

      const totalTasks = allTasks.length;
      const completedTasks = allTasks.filter(t => t.status === 'Completed').length;
      const pendingTasks = totalTasks - completedTasks;
      const highPriorityTasks = allTasks.filter(t => t.status === 'Pending' && t.priority === 'High').length;
      const totalSubjects = allSubjects.length;
      const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      const upcomingDeadlines = allTasks.filter(t => t.status === 'Pending').slice(0, 5);
      const upcomingSessions = allSessions.slice(0, 5);
      const recentTasks = [...allTasks].reverse().slice(0, 5);

      return res.status(200).json({
        success: true,
        data: {
          studentName: req.user.name,
          totalTasks,
          pendingTasks,
          completedTasks,
          highPriorityTasks,
          totalSubjects,
          overallProgress,
          upcomingDeadlines,
          upcomingSessions,
          recentTasks
        }
      });
    }

    // MongoDB Atlas
    const totalTasks = await Task.countDocuments({ user: userId });
    const completedTasks = await Task.countDocuments({ user: userId, status: 'Completed' });
    const pendingTasks = totalTasks - completedTasks;
    const highPriorityTasks = await Task.countDocuments({ user: userId, status: 'Pending', priority: 'High' });
    const totalSubjects = await Subject.countDocuments({ user: userId });
    const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const upcomingDeadlines = await Task.find({ user: userId, status: 'Pending' })
      .populate('subject', 'name color')
      .sort({ deadline: 1 })
      .limit(5);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingSessions = await StudySession.find({ user: userId, date: { $gte: today } })
      .populate('subject', 'name color')
      .sort({ date: 1, startTime: 1 })
      .limit(5);

    const recentTasks = await Task.find({ user: userId })
      .populate('subject', 'name color')
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        studentName: req.user.name,
        totalTasks,
        pendingTasks,
        completedTasks,
        highPriorityTasks,
        totalSubjects,
        overallProgress,
        upcomingDeadlines,
        upcomingSessions,
        recentTasks
      }
    });
  } catch (error) {
    next(error);
  }
};
