import React from 'react';

const DashboardCard = ({ title, value, subtitle, icon: Icon, color = 'var(--primary)', bgLight = 'var(--primary-light)' }) => {
  return (
    <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {title}
        </span>
        <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.2rem 0', color: 'var(--text-main)' }}>
          {value}
        </h3>
        {subtitle && <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{subtitle}</p>}
      </div>
      <div style={{
        width: '52px',
        height: '52px',
        borderRadius: 'var(--radius-lg)',
        background: bgLight,
        color: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        {Icon && <Icon size={26} />}
      </div>
    </div>
  );
};

export default DashboardCard;
