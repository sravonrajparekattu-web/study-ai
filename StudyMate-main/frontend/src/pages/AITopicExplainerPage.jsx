import React, { useState } from 'react';
import { HelpCircle, BrainCircuit, Lightbulb, CheckCircle2, Code2, Sparkles, BookOpen } from 'lucide-react';
import { explainTopic } from '../services/aiService';
import Input from '../components/Input';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import LoadingState from '../components/LoadingState';

const AITopicExplainerPage = () => {
  const [topic, setTopic] = useState('');
  const [subjectContext, setSubjectContext] = useState('');
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!topic.trim()) {
      return setError('Please enter an academic topic to explain.');
    }

    setLoading(true);
    setExplanation(null);

    try {
      const res = await explainTopic({
        topic: topic.trim(),
        subjectContext: subjectContext.trim()
      });

      if (res.success) {
        setExplanation(res.data);
      }
    } catch (err) {
      console.error('AI Topic Explainer Error:', err);
      setError(err.response?.data?.message || 'Failed to generate explanation. Please verify network connection.');
    } finally {
      setLoading(false);
    }
  };

  const sampleTopics = [
    { topic: 'Database Normalization (1NF, 2NF, 3NF)', subject: 'DBMS' },
    { topic: 'Polymorphism & Interface Inheritance', subject: 'Object Oriented Programming' },
    { topic: 'Time Complexity & Big O Notation', subject: 'Data Structures & Algorithms' },
    { topic: 'Process Deadlock & Coffman Conditions', subject: 'Operating Systems' }
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BrainCircuit style={{ color: 'var(--accent)' }} />
            AI Topic Explainer & Tutor
          </h1>
          <p className="page-subtitle">Get beginner-friendly breakdowns of complex academic concepts with real-world analogies.</p>
        </div>
      </div>

      {/* Quick Sample Prompts */}
      <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          Try Prompting:
        </span>
        {sampleTopics.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              setTopic(item.topic);
              setSubjectContext(item.subject);
            }}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '9999px',
              background: '#ffffff',
              border: '1px solid var(--border)',
              fontSize: '0.8rem',
              color: 'var(--primary)',
              whiteSpace: 'nowrap',
              fontWeight: 500
            }}
          >
            {item.topic}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <ErrorMessage message={error} />

        <form onSubmit={handleSubmit}>
          <div className="grid-2">
            <Input
              label="Academic Topic / Concept"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Normalization in DBMS, Recursion, Memory Allocation"
              icon={HelpCircle}
              required
            />

            <Input
              label="Subject Context (Optional)"
              value={subjectContext}
              onChange={(e) => setSubjectContext(e.target.value)}
              placeholder="e.g. DBMS, Operating Systems, Mathematics"
              icon={BookOpen}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            style={{ width: '100%', padding: '0.85rem' }}
          >
            <Sparkles size={18} />
            {loading ? 'AI Tutor Analyzing Concept...' : 'Explain Concept Simply'}
          </Button>
        </form>
      </div>

      {/* Explanation Results */}
      {loading ? (
        <div className="card">
          <LoadingState message="Synthesizing beginner explanation and real-world analogy..." />
        </div>
      ) : explanation ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Card 1: Simple Explanation */}
          <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
              <BrainCircuit size={22} /> Simple Explanation
            </h3>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: 'var(--text-main)' }}>
              {explanation.simpleExplanation}
            </p>
          </div>

          {/* Card 2: Real-World Analogy */}
          <div className="card" style={{ borderLeft: '4px solid var(--warning)', background: '#fffbeb' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#b45309' }}>
              <Lightbulb size={22} /> Real-World Analogy
            </h3>
            <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#78350f', italic: 'true' }}>
              "{explanation.realWorldAnalogy}"
            </p>
          </div>

          <div className="grid-2">
            {/* Card 3: Practical Example */}
            <div className="card" style={{ borderLeft: '4px solid var(--secondary)' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)' }}>
                <Code2 size={20} /> Practical Example
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: 'var(--text-main)', whiteSpace: 'pre-line' }}>
                {explanation.example}
              </p>
            </div>

            {/* Card 4: Key Points */}
            <div className="card" style={{ borderLeft: '4px solid var(--success)' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)' }}>
                <CheckCircle2 size={20} /> Key Takeaways
              </h3>
              <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {explanation.keyPoints?.map((point, i) => (
                  <li key={i} style={{ fontSize: '0.925rem', color: 'var(--text-main)' }}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Summary Box */}
          <div className="card" style={{ textAlign: 'center', background: 'var(--primary-light)', borderColor: 'var(--border-focus)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.05em' }}>
              1-Sentence Summary
            </span>
            <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '0.25rem' }}>
              {explanation.summary}
            </p>
          </div>
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '3.5rem 2rem', color: 'var(--text-muted)' }}>
          <BrainCircuit size={48} style={{ color: 'var(--accent-light)', margin: '0 auto 1rem auto' }} />
          <h4>Ask AI To Explain Any Concept</h4>
          <p style={{ fontSize: '0.9rem', maxWidth: '400px', margin: '0.5rem auto 0 auto' }}>
            Enter any difficult subject topic above to receive a simple breakdown, real-world analogy, and key takeaways.
          </p>
        </div>
      )}
    </div>
  );
};

export default AITopicExplainerPage;
