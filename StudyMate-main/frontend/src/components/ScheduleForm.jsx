import React, { useState, useEffect } from 'react';
import Input from './Input';
import Select from './Select';
import Button from './Button';

const ScheduleForm = ({ initialData, subjects = [], onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    subject: subjects.length > 0 ? subjects[0]._id : '',
    topic: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '14:00',
    endTime: '16:00'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        subject: initialData.subject?._id || initialData.subject || (subjects[0]?._id || ''),
        topic: initialData.topic || '',
        date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : '',
        startTime: initialData.startTime || '14:00',
        endTime: initialData.endTime || '16:00'
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

  const subjectOptions = subjects.map((s) => ({ value: s._id, label: s.name }));

  return (
    <form onSubmit={handleSubmit}>
      <Select
        label="Subject"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        options={subjectOptions}
        required
        placeholder="Select a subject"
      />

      <Input
        label="Study Topic / Objective"
        name="topic"
        value={formData.topic}
        onChange={handleChange}
        placeholder="e.g. Chapter 4 - Binary Trees & Heap Sort"
        required
      />

      <Input
        label="Session Date"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />

      <div className="grid-2">
        <Input
          label="Start Time"
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
        />
        <Input
          label="End Time"
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {initialData ? 'Update Session' : 'Add Session'}
        </Button>
      </div>
    </form>
  );
};

export default ScheduleForm;
