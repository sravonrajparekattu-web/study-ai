import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckSquare,
  BookOpen,
  Calendar,
  Sparkles,
  HelpCircle,
  User,
  LogOut,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Tasks', path: '/tasks', icon: CheckSquare },
    { label: 'Subjects', path: '/subjects', icon: BookOpen },
    { label: 'Study Schedule', path: '/schedule', icon: Calendar },
    { label: 'AI Study Planner', path: '/ai-planner', icon: Sparkles },
    { label: 'AI Topic Explainer', path: '/ai-explainer', icon: HelpCircle },
    { label: 'Profile', path: '/profile', icon: User }
  ];

  return (
    <>
      <aside
        style={{
          width: '260px',
          background: 'var(--sidebar-bg)',
          borderRight: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '1.5rem 1rem',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 90
        }}
      >
        <div>
          {/* Logo Branding */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 0.5rem 1.5rem 0.5rem', borderBottom: '1px solid var(--border)', marginBottom: '1.5rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <GraduationCap size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                StudyMate
              </h2>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Student Hub</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen && setMobileOpen(false)}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.925rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                    background: isActive ? 'var(--primary-light)' : 'transparent',
                    transition: 'var(--transition)'
                  })}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.925rem',
            fontWeight: 600,
            color: 'var(--danger)',
            background: 'var(--danger-light)',
            width: '100%',
            transition: 'var(--transition)'
          }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
