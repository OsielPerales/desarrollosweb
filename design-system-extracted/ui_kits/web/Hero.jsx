import React from 'react';
import { Button } from './Button.jsx';

export function Hero() {
  return (
    <section
      style={{
        padding: '96px 48px 72px',
        background: '#F9F9F7',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 340,
          height: 340,
          borderRadius: '50%',
          background: '#D4E5DF',
          opacity: 0.35,
          top: -120,
          right: -80,
          filter: 'blur(2px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: '#E6E1F0',
          opacity: 0.4,
          bottom: -60,
          left: 200,
          filter: 'blur(2px)',
        }}
      />
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#8A8A8A',
          }}
        >
          Nº 014 · Abril 2026
        </span>
        <h1
          style={{
            fontFamily: "'Libre Baskerville', Georgia, serif",
            fontWeight: 700,
            fontSize: 64,
            lineHeight: 1.1,
            color: '#2A4B7C',
            margin: '16px 0 24px',
            maxWidth: 16 + 'ch' * 1 + 760,
            letterSpacing: '-0.01em',
            textWrap: 'balance',
          }}
        >
          Herramientas que respetan tu tiempo.
        </h1>
        <p
          style={{
            fontFamily: "'Libre Baskerville', Georgia, serif",
            fontStyle: 'italic',
            fontSize: 22,
            lineHeight: 1.5,
            color: '#333',
            maxWidth: 640,
            margin: '0 0 36px',
          }}
        >
          Diseñamos cada decisión pensando en quien la va a usar mañana — y en diez años.
          El código que escribimos es el código que usamos.
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button>Leer el manifiesto</Button>
          <Button variant="secondary">Ver ensayos →</Button>
        </div>
      </div>
    </section>
  );
}
