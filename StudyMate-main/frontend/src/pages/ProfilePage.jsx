import React from 'react';
import { User, Mail, Calendar, LogOut, ShieldCheck, GraduationCap } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';

const ProfilePage = () => {
  const { user, logoutUser } = useAuth();

  const formatDate = (d) => {
    if (!d) return 'N/A';
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Student Profile</h1>
          <p className="page-subtitle">Manage your personal account settings and security status.</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            fontWeight: 800
          }}>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
          </div>

          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>{user?.name || 'Student Name'}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              <Mail size={16} /> {user?.email || 'student@university.edu'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', padding: '1rem', background: '#f8fafc', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Calendar size={20} style={{ color: 'var(--primary)' }} />
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Member Since</div>
                <div style={{ fontWeight: 600 }}>{formatDate(user?.createdAt)}</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', padding: '1rem', background: '#f8fafc', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShieldCheck size={20} style={{ color: 'var(--success)' }} />
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Account Security Status</div>
                <div style={{ fontWeight: 600, color: 'var(--success)' }}>JWT Token Authenticated & Encrypted</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', padding: '1rem', background: '#f8fafc', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <GraduationCap size={20} style={{ color: 'var(--secondary)' }} />
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Data Isolation Privacy</div>
                <div style={{ fontWeight: 600 }}>Private Workspace (Scoped to Student ID)</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="danger" icon={LogOut} onClick={logoutUser}>
            Sign Out of Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
