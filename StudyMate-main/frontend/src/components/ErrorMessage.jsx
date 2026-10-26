import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.85rem 1.15rem',
      backgroundColor: 'var(--danger-light)',
      color: 'var(--danger)',
      borderRadius: 'var(--radius-md)',
      fontSize: '0.9rem',
      fontWeight: 500,
      marginBottom: '1.25rem',
      border: '1px solid #fca5a5'
    }}>
      <AlertCircle size={20} style={{ flexShrink: 0 }} />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
