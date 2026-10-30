import React from 'react';

export function Chip({ tone = 'mint', children }) {
  const tones = {
    mint: { background: '#D4E5DF', color: '#1F4A3A' },
    lavender: { background: '#E6E1F0', color: '#3D2E5C' },
    neutral: { background: '#F9F9F7', color: '#333', border: '1px solid #E8E6E1' },
    solid: { background: '#2A4B7C', color: '#fff' },
    accent: { background: '#E07A5F', color: '#fff' },
  };
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 12px',
        borderRadius: 100,
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: 12,
        fontWeight: 500,
        ...tones[tone],
      }}
    >
      {children}
    </span>
  );
}
