import api from './api';

export const generateStudyPlan = async (plannerData) => {
  const response = await api.post('/ai/study-plan', plannerData);
  return response.data;
};

export const explainTopic = async (topicData) => {
  const response = await api.post('/ai/explain', topicData);
  return response.data;
};
