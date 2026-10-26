import React from 'react';

const Input = ({
  label,
  id,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  icon: Icon,
  ...props
}) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id || name} className="form-label">
          {label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {Icon && (
          <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}>
            <Icon size={18} />
          </div>
        )}
        <input
          id={id || name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="input-field"
          style={{
            paddingLeft: Icon ? '2.5rem' : '1rem',
            borderColor: error ? 'var(--danger)' : undefined
          }}
          {...props}
        />
      </div>
      {error && <span style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.25rem' }}>{error}</span>}
    </div>
  );
};

export default Input;
