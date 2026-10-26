import React, { useState, useEffect } from 'react';
import Input from './Input';
import Select from './Select';
import Button from './Button';

const TaskForm = ({ initialData, subjects = [], onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: subjects.length > 0 ? subjects[0]._id : '',
    priority: 'Medium',
    deadline: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        subject: initialData.subject?._id || initialData.subject || (subjects[0]?._id || ''),
        priority: initialData.priority || 'Medium',
        deadline: initialData.deadline ? new Date(initialData.deadline).toISOString().split('T')[0] : ''
      });
    }
  }, [initialData, subjects]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const subjectOptions = subjects.map((subj) => ({
    value: subj._id,
    label: subj.name
  }));

  const priorityOptions = [
    { value: 'Low', label: 'Low Priority' },
    { value: 'Medium', label: 'Medium Priority' },
    { value: 'High', label: 'High Priority' }
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Task Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="e.g. Complete DBMS Assignment 2"
        required
      />

      <div className="form-group">
        <label className="form-label">Description (Optional)</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="textarea-field"
          placeholder="Add key notes or submission instructions..."
        />
      </div>

      <Select
        label="Subject"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        options={subjectOptions}
        required
        placeholder="Select a subject"
      />

      <div className="grid-2">
        <Select
          label="Priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          options={priorityOptions}
          required
        />

        <Input
          label="Deadline Date"
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {initialData ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
