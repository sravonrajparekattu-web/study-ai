import React, { useState, useEffect } from 'react';
import Input from './Input';
import Button from './Button';

const COLOR_PRESETS = [
  '#4F46E5', // Indigo
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EF4444'  // Red
];

const SubjectForm = ({ initialData, onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#4F46E5');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setColor(initialData.color || '#4F46E5');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, color });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Subject Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Data Structure & Algorithms"
        required
      />

      <div className="form-group">
        <label className="form-label">Subject Color Tag</label>
        <div style={{ display: 'flex', gap: '0.65rem', marginTop: '0.35rem' }}>
          {COLOR_PRESETS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: c,
                border: color === c ? '3px solid var(--text-main)' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {initialData ? 'Update Subject' : 'Add Subject'}
        </Button>
      </div>
    </form>
  );
};

export default SubjectForm;
