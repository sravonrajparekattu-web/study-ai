import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import studySessionRoutes from './routes/studySessionRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

// Middleware imports
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Configure CORS for production deployment compatibility
app.use(cors({
  origin: true, // Dynamically reflect request origin to prevent CORS preflight block
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Explicit handle preflight OPTIONS requests across all routes
app.options('*', cors());

// Body parser middleware
app.use(express.json());

// API Health Check Endpoint
app.get(['/api/health', '/health'], (req, res) => {
  res.status(200).json({
    status: 'online',
    message: 'StudyMate REST API Server is running smoothly',
    timestamp: new Date().toISOString()
  });
});

// Mount REST API Routes (supports both /api/* and /* for deployment tolerance)
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

app.use('/api/tasks', taskRoutes);
app.use('/tasks', taskRoutes);

app.use('/api/subjects', subjectRoutes);
app.use('/subjects', subjectRoutes);

app.use('/api/study-sessions', studySessionRoutes);
app.use('/study-sessions', studySessionRoutes);

app.use('/api/dashboard', dashboardRoutes);
app.use('/dashboard', dashboardRoutes);

app.use('/api/ai', aiRoutes);
app.use('/ai', aiRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 StudyMate Express Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
});
