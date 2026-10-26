import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Sparkles,
  Plus,
  ArrowRight,
  Calendar
} from 'lucide-react';
import { getDashboardData } from '../services/dashboardService';
import DashboardCard from '../components/DashboardCard';
import TaskCard from '../components/TaskCard';
import ScheduleCard from '../components/ScheduleCard';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import Button from '../components/Button';
import TaskForm from '../components/TaskForm';
import Modal from '../components/Modal';
import { getSubjects } from '../services/subjectService';
import { createTask, updateTask, deleteTask } from '../services/taskService';

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const fetchDashboard = async () => {
    try {
      const [dashRes, subjRes] = await Promise.all([
        getDashboardData(),
        getSubjects()
      ]);
      if (dashRes.success) setData(dashRes.data);
      if (subjRes.success) setSubjects(subjRes.data);
    } catch (err) {
      console.error('Error loading dashboard metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleToggleTaskStatus = async (task) => {
    const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    try {
      await updateTask(task._id, { status: newStatus });
      fetchDashboard();
    } catch (err) {
      console.error('Error toggling task:', err);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        fetchDashboard();
      } catch (err) {
        console.error('Error deleting task:', err);
      }
    }
  };

  const handleCreateTask = async (taskFormData) => {
    try {
      const res = await createTask(taskFormData);
      if (res.success) {
        setIsTaskModalOpen(false);
        fetchDashboard();
      }
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  if (loading) {
    return <LoadingState message="Aggregating student analytics and deadlines..." />;
  }

  const {
    studentName = '',
    totalTasks = 0,
    pendingTasks = 0,
    completedTasks = 0,
    highPriorityTasks = 0,
    overallProgress = 0,
    upcomingDeadlines = [],
    upcomingSessions = []
  } = data || {};

  return (
    <div>
      {/* Header Banner */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard Overview</h1>
          <p className="page-subtitle">Here is your academic progress breakdown and upcoming deadlines.</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Button variant="primary" icon={Plus} onClick={() => setIsTaskModalOpen(true)}>
            Add New Task
          </Button>
          <Link to="/ai-planner">
            <Button variant="secondary" icon={Sparkles}>
              AI Study Plan
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        <DashboardCard
          title="Total Tasks"
          value={totalTasks}
          subtitle="All academic assignments"
          icon={CheckSquare}
          color="var(--primary)"
          bgLight="var(--primary-light)"
        />
        <DashboardCard
          title="Pending Tasks"
          value={pendingTasks}
          subtitle="Awaiting completion"
          icon={Clock}
          color="var(--warning)"
          bgLight="var(--warning-light)"
        />
        <DashboardCard
          title="Completed"
          value={completedTasks}
          subtitle="Tasks finished"
          icon={CheckCircle2}
          color="var(--success)"
          bgLight="var(--success-light)"
        />
        <DashboardCard
          title="High Priority"
          value={highPriorityTasks}
          subtitle="Urgent focus needed"
          icon={AlertTriangle}
          color="var(--danger)"
          bgLight="var(--danger-light)"
        />
      </div>

      {/* Progress & Quick Actions Bar */}
      <div className="card" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>Overall Task Completion Rate</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>{overallProgress}%</span>
          </div>
          <div className="progress-bar-bg" style={{ height: '12px' }}>
            <div className="progress-bar-fill" style={{ width: `${overallProgress}%` }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/tasks" style={{ fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            View All Tasks ({totalTasks}) <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Main Grid: Deadlines & Schedules */}
      <div className="grid-2">
        {/* Left Column: Upcoming Task Deadlines */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={20} style={{ color: 'var(--warning)' }} />
              Upcoming Task Deadlines
            </h3>
            <Link to="/tasks" style={{ fontSize: '0.85rem', fontWeight: 600 }}>See All</Link>
          </div>

          {upcomingDeadlines.length === 0 ? (
            <EmptyState
              title="No upcoming task deadlines 🎯"
              description="Great job! You have completed all urgent tasks or haven't added any tasks yet."
              actionText="Add Task"
              onAction={() => setIsTaskModalOpen(true)}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {upcomingDeadlines.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onToggleStatus={handleToggleTaskStatus}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Upcoming Study Sessions */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={20} style={{ color: 'var(--primary)' }} />
              Scheduled Study Sessions
            </h3>
            <Link to="/schedule" style={{ fontSize: '0.85rem', fontWeight: 600 }}>Manage Schedule</Link>
          </div>

          {upcomingSessions.length === 0 ? (
            <EmptyState
              title="No study sessions scheduled 📅"
              description="Set up your daily study timetable or use the AI Study Planner to build one."
              actionText="Plan Study Session"
              onAction={() => window.location.href = '/schedule'}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {upcomingSessions.map((session) => (
                <ScheduleCard key={session._id} session={session} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Task Modal */}
      <Modal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} title="Add New Academic Task">
        <TaskForm
          subjects={subjects}
          onSubmit={handleCreateTask}
          onCancel={() => setIsTaskModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default DashboardPage;
