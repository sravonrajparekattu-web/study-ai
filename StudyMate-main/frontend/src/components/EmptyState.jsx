import React from 'react';
import { Target } from 'lucide-react';
import Button from './Button';

const EmptyState = ({
  icon: Icon = Target,
  title = 'No items found',
  description = 'Add your first item to get started and keep your study workflow organized.',
  actionText,
  onAction
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3.5rem 2rem',
      textAlign: 'center',
      background: '#ffffff',
      borderRadius: 'var(--radius-lg)',
      border: '1px border var(--border)'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'var(--primary-light)',
        color: 'var(--primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.25rem'
      }}>
        <Icon size={30} />
      </div>
      <h4 style={{ fontSize: '1.15rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>{title}</h4>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '400px', marginBottom: '1.5rem' }}>{description}</p>
      {actionText && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
