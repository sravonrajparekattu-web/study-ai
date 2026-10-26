import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please provide a subject name'],
    trim: true
  },
  color: {
    type: String,
    default: '#4F46E5' // Default accent color for subject badges
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;
