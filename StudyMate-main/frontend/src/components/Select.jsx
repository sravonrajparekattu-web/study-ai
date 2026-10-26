import React from 'react';

const Select = ({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
  required = false,
  error,
  placeholder = 'Select an option',
  ...props
}) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id || name} className="form-label">
          {label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}
        </label>
      )}
      <select
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="select-field"
        style={{ borderColor: error ? 'var(--danger)' : undefined }}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.25rem' }}>{error}</span>}
    </div>
  );
};

export default Select;
