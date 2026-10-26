import React from 'react';
import { CheckCircle2, Circle, Calendar, Edit, Trash2 } from 'lucide-react';

const TaskCard = ({ task, onToggleStatus, onEdit, onDelete }) => {
  const isCompleted = task.status === 'Completed';

  const priorityClass = `badge badge-${task.priority ? task.priority.toLowerCase() : 'medium'}`;

  const formatDate = (dateStr) => {
    if (!dateStr) return 'No deadline';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        gap: '1rem',
        background: isCompleted ? '#f8fafc' : '#ffffff',
        borderLeft: `4px solid ${task.subject?.color || 'var(--primary)'}`,
        opacity: isCompleted ? 0.85 : 1
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => onToggleStatus(task)}
              title={isCompleted ? 'Mark as Pending' : 'Mark as Completed'}
              style={{ color: isCompleted ? 'var(--success)' : 'var(--text-light)', cursor: 'pointer' }}
            >
              {isCompleted ? <CheckCircle2 size={22} /> : <Circle size={22} />}
            </button>
            <h4
              style={{
                fontSize: '1.05rem',
                fontWeight: 600,
                color: isCompleted ? 'var(--text-muted)' : 'var(--text-main)',
                textDecoration: isCompleted ? 'line-through' : 'none'
              }}
            >
              {task.title}
            </h4>
          </div>
          <span className={priorityClass}>{task.priority} Priority</span>
        </div>

        {task.description && (
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              marginBottom: '1rem',
              lineHeight: '1.4',
              paddingLeft: '2rem'
            }}
          >
            {task.description}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border)', fontSize: '0.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {task.subject && (
            <span
              style={{
                background: `${task.subject.color}15`,
                color: task.subject.color,
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600
              }}
            >
              {task.subject.name}
            </span>
          )}
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
            <Calendar size={14} />
            {formatDate(task.deadline)}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {onEdit && (
            <button
              onClick={() => onEdit(task)}
              style={{ color: 'var(--text-muted)', padding: '0.25rem', borderRadius: '4px' }}
              title="Edit Task"
            >
              <Edit size={16} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(task._id)}
              style={{ color: 'var(--danger)', padding: '0.25rem', borderRadius: '4px' }}
              title="Delete Task"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
