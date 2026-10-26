import api from './api';

export const getStudySessions = async () => {
  const response = await api.get('/study-sessions');
  return response.data;
};

export const createStudySession = async (sessionData) => {
  const response = await api.post('/study-sessions', sessionData);
  return response.data;
};

export const updateStudySession = async (id, sessionData) => {
  const response = await api.put(`/study-sessions/${id}`, sessionData);
  return response.data;
};

export const deleteStudySession = async (id) => {
  const response = await api.delete(`/study-sessions/${id}`);
  return response.data;
};
