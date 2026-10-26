import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, ArrowUpDown } from 'lucide-react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import { getSubjects } from '../services/subjectService';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [sortBy, setSortBy] = useState('deadline');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const [taskRes, subjRes] = await Promise.all([
        getTasks({
          search,
          status: statusFilter,
          priority: priorityFilter,
          subject: subjectFilter,
          sortBy
        }),
        getSubjects()
      ]);

      if (taskRes.success) setTasks(taskRes.data);
      if (subjRes.success) setSubjects(subjRes.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search, statusFilter, priorityFilter, subjectFilter, sortBy]);

  const handleCreateOrUpdateTask = async (formData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask._id, formData);
      } else {
        await createTask(formData);
      }
      setIsModalOpen(false);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      console.error('Error saving task:', err);
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    try {
      await updateTask(task._id, { status: newStatus });
      fetchTasks();
    } catch (err) {
      console.error('Error toggling status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        fetchTasks();
      } catch (err) {
        console.error('Error deleting task:', err);
      }
    }
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const subjectOptions = [
    { value: 'All', label: 'All Subjects' },
    ...subjects.map((s) => ({ value: s._id, label: s.name }))
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Academic Task Manager</h1>
          <p className="page-subtitle">Track, filter, and complete your course assignments and deadlines.</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={openCreateModal}>
          Add New Task
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="card" style={{ marginBottom: '2rem', padding: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '1rem', alignItems: 'center' }}>
          <Input
            placeholder="Search tasks by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={Search}
          />

          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: 'All', label: 'All Statuses' },
              { value: 'Pending', label: 'Pending Only' },
              { value: 'Completed', label: 'Completed Only' }
            ]}
            placeholder={null}
          />

          <Select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            options={[
              { value: 'All', label: 'All Priorities' },
              { value: 'High', label: 'High Priority' },
              { value: 'Medium', label: 'Medium Priority' },
              { value: 'Low', label: 'Low Priority' }
            ]}
            placeholder={null}
          />

          <Select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            options={subjectOptions}
            placeholder={null}
          />

          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={[
              { value: 'deadline', label: 'Earliest Deadline' },
              { value: 'title', label: 'Title (A-Z)' },
              { value: 'created', label: 'Recently Added' }
            ]}
            placeholder={null}
          />
        </div>
      </div>

      {/* Task List */}
      {loading ? (
        <LoadingState message="Fetching tasks..." />
      ) : tasks.length === 0 ? (
        <EmptyState
          title="No tasks match your filters 🎯"
          description="Try clearing your search or add a new academic assignment to get started."
          actionText="Add First Task"
          onAction={openCreateModal}
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.25rem' }}>
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggleStatus={handleToggleStatus}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Task Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingTask ? 'Edit Task' : 'Add New Task'}>
        <TaskForm
          initialData={editingTask}
          subjects={subjects}
          onSubmit={handleCreateOrUpdateTask}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default TasksPage;
