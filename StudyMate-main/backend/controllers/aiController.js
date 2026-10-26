import { generateAIStudyPlan, explainAITopic } from '../services/aiService.js';

/**
 * @desc    Generate personalized AI Study Plan
 * @route   POST /api/ai/study-plan
 * @access  Private
 */
export const getStudyPlan = async (req, res, next) => {
  try {
    const { subjects, deadlines, availableHours, preferredDuration } = req.body;

    if (!subjects || (Array.isArray(subjects) && subjects.length === 0)) {
      return res.status(400).json({ success: false, message: 'Please provide at least one subject' });
    }

    const plan = await generateAIStudyPlan({
      subjects,
      deadlines,
      availableHours,
      preferredDuration
    });

    res.status(200).json({
      success: true,
      data: plan
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Explain academic topic using AI
 * @route   POST /api/ai/explain
 * @access  Private
 */
export const explainTopic = async (req, res, next) => {
  try {
    const { topic, subjectContext } = req.body;

    if (!topic || !topic.trim()) {
      return res.status(400).json({ success: false, message: 'Please enter a topic to explain' });
    }

    const explanation = await explainAITopic({
      topic: topic.trim(),
      subjectContext: subjectContext ? subjectContext.trim() : ''
    });

    res.status(200).json({
      success: true,
      data: explanation
    });
  } catch (error) {
    next(error);
  }
};
