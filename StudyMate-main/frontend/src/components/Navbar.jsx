import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { UserCircle, Sparkles } from 'lucide-react';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header
      style={{
        height: '70px',
        background: '#ffffff',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 80
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
          Welcome back to study focus,
        </span>
        <strong style={{ color: 'var(--text-main)', fontWeight: 700 }}>
          {user?.name || 'Student'}! 🚀
        </strong>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 0.85rem',
          background: 'var(--primary-light)',
          color: 'var(--primary)',
          borderRadius: '9999px',
          fontSize: '0.8rem',
          fontWeight: 600
        }}>
          <Sparkles size={16} />
          <span>AI Study Assistant Active</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '1rem'
          }}>
            {user?.name ? user.name.charAt(0).toUpperCase() : <UserCircle size={24} />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
