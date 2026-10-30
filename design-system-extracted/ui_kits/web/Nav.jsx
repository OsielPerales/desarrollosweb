import React from 'react';

export function Nav({ active = 'Ensayos', onNavigate }) {
  const items = ['Ensayos', 'Manifiesto', 'Herramientas', 'Contacto'];
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 48px',
        background: '#fff',
        borderBottom: '1px solid #E8E6E1',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: '#2A4B7C',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: 12,
              height: 12,
              background: '#E07A5F',
              borderRadius: '50%',
              top: 7,
              right: 6,
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "'Libre Baskerville', Georgia, serif",
            fontWeight: 700,
            fontSize: 18,
            color: '#2A4B7C',
          }}
        >
          Editorial
        </span>
      </div>
      <div style={{ display: 'flex', gap: 32 }}>
        {items.map((it) => (
          <button
            key={it}
            onClick={() => onNavigate && onNavigate(it)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              fontWeight: 500,
              color: active === it ? '#E07A5F' : '#333',
              padding: 0,
              transition: 'color 240ms',
            }}
          >
            {it}
          </button>
        ))}
      </div>
      <button
        style={{
          background: '#E07A5F',
          color: '#fff',
          border: 'none',
          padding: '8px 18px',
          borderRadius: 8,
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          fontSize: 14,
          cursor: 'pointer',
        }}
      >
        Suscribirse
      </button>
    </nav>
  );
}
