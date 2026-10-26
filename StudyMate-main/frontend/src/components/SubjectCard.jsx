import React from 'react';
import { BookOpen, CheckCircle, Clock, Edit, Trash2 } from 'lucide-react';

const SubjectCard = ({ subject, onEdit, onDelete }) => {
  const { name, color = '#4F46E5', totalTasks = 0, completedTasks = 0, pendingTasks = 0, progress = 0 } = subject;

  return (
    <div className="card" style={{ borderTop: `4px solid ${color}` }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            background: `${color}15`,
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <BookOpen size={20} />
          </div>
          <h4 style={{ fontSize: '1.15rem', color: 'var(--text-main)' }}>{name}</h4>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          {onEdit && (
            <button onClick={() => onEdit(subject)} style={{ color: 'var(--text-muted)', padding: '0.2rem' }}>
              <Edit size={16} />
            </button>
          )}
          {onDelete && (
            <button onClick={() => onDelete(subject._id)} style={{ color: 'var(--danger)', padding: '0.2rem' }}>
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
          <span>Subject Progress</span>
          <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{progress}%</span>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${progress}%`, background: color }} />
        </div>
      </div>

      {/* Stats Breakdown */}
      <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)', fontSize: '0.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
          <Clock size={14} style={{ color: 'var(--warning)' }} />
          <span>{pendingTasks} Pending</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
          <CheckCircle size={14} style={{ color: 'var(--success)' }} />
          <span>{completedTasks} Done</span>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
