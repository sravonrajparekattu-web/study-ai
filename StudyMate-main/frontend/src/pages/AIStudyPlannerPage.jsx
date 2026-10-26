import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { generateStudyPlan } from '../services/aiService';
import { getSubjects } from '../services/subjectService';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import LoadingState from '../components/LoadingState';

const AIStudyPlannerPage = () => {
  const [subjectsList, setSubjectsList] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState('');
  const [deadlines, setDeadlines] = useState('');
  const [availableHours, setAvailableHours] = useState('3');
  const [preferredDuration, setPreferredDuration] = useState('60');

  const [planResult, setPlanResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubjs = async () => {
      try {
        const res = await getSubjects();
        if (res.success && res.data.length > 0) {
          setSubjectsList(res.data);
          setSelectedSubjects(res.data.map(s => s.name).join(', '));
        }
      } catch (err) {
        console.error('Error fetching subjects for AI planner:', err);
      }
    };
    fetchSubjs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!selectedSubjects.trim()) {
      return setError('Please enter or select at least one subject.');
    }

    setLoading(true);
    setPlanResult(null);

    try {
      const res = await generateStudyPlan({
        subjects: selectedSubjects,
        deadlines,
        availableHours: parseFloat(availableHours),
        preferredDuration: parseInt(preferredDuration)
      });

      if (res.success) {
        setPlanResult(res.data);
      }
    } catch (err) {
      console.error('AI Study Plan Generation Error:', err);
      setError(err.response?.data?.message || 'Failed to generate study plan. Please verify network connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles style={{ color: 'var(--secondary)' }} />
            AI Study Schedule Generator
          </h1>
          <p className="page-subtitle">Input your upcoming exams and daily time constraints to let AI calculate an optimal revision routine.</p>
        </div>
      </div>

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>Study Parameters</h3>

          <ErrorMessage message={error} />

          <form onSubmit={handleSubmit}>
            <Input
              label="Subjects / Course Modules"
              value={selectedSubjects}
              onChange={(e) => setSelectedSubjects(e.target.value)}
              placeholder="e.g. DBMS, Java, Linear Algebra"
              required
            />

            <div className="form-group">
              <label className="form-label">Upcoming Deadlines & Exams</label>
              <textarea
                value={deadlines}
                onChange={(e) => setDeadlines(e.target.value)}
                rows={3}
                className="textarea-field"
                placeholder="e.g. Java assignment due tomorrow, DBMS exam in 4 days, Maths exam in 7 days"
              />
            </div>

            <div className="grid-2">
              <Input
                label="Available Study Hours / Day"
                type="number"
                min="1"
                max="16"
                value={availableHours}
                onChange={(e) => setAvailableHours(e.target.value)}
                required
              />

              <Select
                label="Session Block Duration"
                value={preferredDuration}
                onChange={(e) => setPreferredDuration(e.target.value)}
                options={[
                  { value: '30', label: '30 Minutes' },
                  { value: '45', label: '45 Minutes' },
                  { value: '60', label: '60 Minutes (1 Hour)' },
                  { value: '90', label: '90 Minutes' }
                ]}
                placeholder={null}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              style={{ width: '100%', marginTop: '1rem', padding: '0.85rem' }}
            >
              <Sparkles size={18} />
              {loading ? 'AI Engine Calculating Schedule...' : 'Generate AI Study Schedule'}
            </Button>
          </form>
        </div>

        {/* Results Column */}
        <div>
          {loading ? (
            <div className="card">
              <LoadingState message="Connecting to AI Service & generating prioritized study timetable..." />
            </div>
          ) : planResult ? (
            <div>
              <div className="card" style={{ marginBottom: '1.25rem', background: 'var(--primary-light)', borderColor: 'var(--border-focus)' }}>
                <h4 style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <CheckCircle2 size={20} /> AI Strategy Summary
                </h4>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-main)' }}>{planResult.summary}</p>
              </div>

              <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Generated Timetable</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {planResult.schedule?.map((item, idx) => (
                  <div key={idx} className="card" style={{ borderLeft: `4px solid ${item.priority === 'High' ? 'var(--danger)' : 'var(--primary)'}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, background: 'var(--primary)', color: '#ffffff', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                          {item.day}
                        </span>
                        <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>{item.subject}</h4>
                      </div>
                      <span className={`badge badge-${item.priority ? item.priority.toLowerCase() : 'medium'}`}>
                        {item.priority} Priority
                      </span>
                    </div>

                    <p style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                      🎯 Focus: {item.topic}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14} /> Duration: {item.duration}</span>
                      <span>💡 {item.reason}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '3.5rem 2rem', color: 'var(--text-muted)' }}>
              <Sparkles size={48} style={{ color: 'var(--primary-light)', margin: '0 auto 1rem auto' }} />
              <h4>Your AI Study Plan Will Appear Here</h4>
              <p style={{ fontSize: '0.9rem', maxWidth: '350px', margin: '0.5rem auto 0 auto' }}>
                Fill out your course modules and available study hours on the left to receive a custom AI schedule.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIStudyPlannerPage;
