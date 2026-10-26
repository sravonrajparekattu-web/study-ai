import mongoose from 'mongoose';

const studySessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: [true, 'Please select a subject']
  },
  topic: {
    type: String,
    required: [true, 'Please specify the study topic'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Please select the session date']
  },
  startTime: {
    type: String,
    required: [true, 'Please specify the start time (e.g. 14:00)']
  },
  endTime: {
    type: String,
    required: [true, 'Please specify the end time (e.g. 16:00)']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const StudySession = mongoose.model('StudySession', studySessionSchema);
export default StudySession;
