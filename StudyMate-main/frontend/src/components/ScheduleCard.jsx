import React from 'react';
import { Clock, BookOpen, Edit, Trash2 } from 'lucide-react';

const ScheduleCard = ({ session, onEdit, onDelete }) => {
  const { topic, date, startTime, endTime, subject } = session;

  const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        <div style={{
          padding: '0.65rem 0.85rem',
          borderRadius: 'var(--radius-md)',
          background: subject?.color ? `${subject.color}15` : 'var(--primary-light)',
          color: subject?.color || 'var(--primary)',
          textAlign: 'center',
          minWidth: '90px'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>{formatDate(date)}</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center' }}>
            <Clock size={12} /> {startTime} - {endTime}
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: subject?.color || 'var(--primary)',
              background: subject?.color ? `${subject.color}15` : 'var(--primary-light)',
              padding: '0.15rem 0.5rem',
              borderRadius: 'var(--radius-sm)'
            }}>
              {subject?.name || 'General Study'}
            </span>
          </div>
          <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>{topic}</h4>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
        {onEdit && (
          <button onClick={() => onEdit(session)} style={{ color: 'var(--text-muted)', padding: '0.25rem' }}>
            <Edit size={16} />
          </button>
        )}
        {onDelete && (
          <button onClick={() => onDelete(session._id)} style={{ color: 'var(--danger)', padding: '0.25rem' }}>
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ScheduleCard;
