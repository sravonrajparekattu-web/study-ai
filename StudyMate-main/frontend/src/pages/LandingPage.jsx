import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Sparkles,
  CheckCircle,
  Clock,
  BookOpen,
  BrainCircuit,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import Button from '../components/Button';

const LandingPage = () => {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', color: 'var(--text-main)' }}>
      {/* Navigation Header */}
      <header style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '1.5rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff'
          }}>
            <GraduationCap size={26} />
          </div>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            StudyMate
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/login">
            <Button variant="secondary">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="primary">Get Started Free</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '4rem 2rem 5rem 2rem',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 1rem',
          borderRadius: '9999px',
          background: 'var(--primary-light)',
          color: 'var(--primary)',
          fontSize: '0.875rem',
          fontWeight: 600,
          marginBottom: '1.5rem'
        }}>
          <Sparkles size={18} />
          <span>Smart AI-Powered Student Productivity System</span>
        </div>

        <h1 style={{
          fontSize: '3.5rem',
          lineHeight: 1.15,
          fontWeight: 800,
          maxWidth: '900px',
          margin: '0 auto 1.5rem auto',
          letterSpacing: '-0.03em'
        }}>
          Plan Your Study. Track Your Progress.{' '}
          <span style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Learn Smarter.
          </span>
        </h1>

        <p style={{
          fontSize: '1.2rem',
          color: 'var(--text-muted)',
          maxWidth: '700px',
          margin: '0 auto 2.5rem auto',
          lineHeight: 1.6
        }}>
          The ultimate workspace for engineering students to streamline academic assignments, manage course subjects, schedule study sessions, and master complex topics using LLM AI tools.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/register">
            <Button variant="primary" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
              Create Free Student Account <ArrowRight size={20} />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" style={{ padding: '0.9rem 1.75rem', fontSize: '1.05rem' }}>
              Existing Student Login
            </Button>
          </Link>
        </div>

        {/* Hero Visual Mockup Container */}
        <div style={{
          marginTop: '4rem',
          background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-xl)',
          maxWidth: '1000px',
          margin: '4rem auto 0 auto'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', textAlign: 'left' }}>
            <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}><CheckCircle size={24} /></div>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Task Tracker</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Prioritize DBMS & Java assignments with automated deadline warnings.</p>
            </div>
            <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              <div style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}><Sparkles size={24} /></div>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>AI Study Schedule</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Generate optimized study routines matching your exact available hours.</p>
            </div>
            <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              <div style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}><BrainCircuit size={24} /></div>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>AI Concept Breakdown</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ask AI to explain complex topics like Normalization with real-world analogies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section style={{ background: 'var(--bg-gradient)', padding: '5rem 2rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>How StudyMate Elevates Your Learning</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3.5rem' }}>Built on the modern full-stack MERN architecture for maximum privacy, security, and performance.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-light)', marginBottom: '0.5rem' }}>01</div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Organize Courses</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Group tasks and exams by specific academic subjects and course modules.</p>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-light)', marginBottom: '0.5rem' }}>02</div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Track Deadlines</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Stay ahead of pending tasks with clear priority indicators and completion metrics.</p>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-light)', marginBottom: '0.5rem' }}>03</div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>AI Study Planning</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Leverage LLM intelligence to build tailored daily study timetables before exams.</p>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-light)', marginBottom: '0.5rem' }}>04</div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Private & Secure</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>JWT authentication ensures your data remains strictly confidential and isolated.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 2rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        <div>© 2026 StudyMate. Built for the workshop "Project Building with AI Tools".</div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <span>MERN Stack Architecture</span>
          <span>MongoDB Atlas</span>
          <span>Google Gemini API</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
