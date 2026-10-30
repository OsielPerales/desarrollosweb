import React from 'react';

export function Button({ variant = 'primary', children, onClick, type = 'button', disabled }) {
  const base = {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontWeight: 500,
    fontSize: 14,
    padding: '10px 20px',
    borderRadius: 8,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 240ms cubic-bezier(0.2,0.6,0.2,1)',
    opacity: disabled ? 0.5 : 1,
  };
  const variants = {
    primary: { background: '#E07A5F', color: '#fff' },
    secondary: { background: '#fff', color: '#333', border: '1px solid #E8E6E1' },
    ghost: { background: 'transparent', color: '#2A4B7C', padding: '10px 12px' },
  };
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{ ...base, ...variants[variant] }}
      onMouseEnter={(e) => {
        if (disabled) return;
        if (variant === 'primary') e.currentTarget.style.background = '#C96647';
        if (variant === 'ghost') e.currentTarget.style.color = '#E07A5F';
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        if (variant === 'primary') e.currentTarget.style.background = '#E07A5F';
        if (variant === 'ghost') e.currentTarget.style.color = '#2A4B7C';
      }}
    >
      {children}
    </button>
  );
}
