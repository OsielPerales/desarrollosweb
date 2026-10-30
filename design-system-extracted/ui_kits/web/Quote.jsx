import React from 'react';

export function Quote() {
  return (
    <section style={{ padding: '96px 48px', background: '#F9F9F7' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'left' }}>
        <div
          style={{
            fontFamily: "'Libre Baskerville', Georgia, serif",
            fontSize: 72,
            color: '#E07A5F',
            lineHeight: 1,
            marginBottom: -16,
          }}
        >
          «
        </div>
        <blockquote
          style={{
            fontFamily: "'Libre Baskerville', Georgia, serif",
            fontWeight: 700,
            fontSize: 34,
            lineHeight: 1.35,
            color: '#2A4B7C',
            margin: 0,
            letterSpacing: '-0.005em',
            textWrap: 'balance',
          }}
        >
          No confíes en quien te vende algo que no usaría. La única
          credencial honesta es la cicatriz propia.
        </blockquote>
        <div
          style={{
            marginTop: 28,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: '#8A8A8A',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          — Del manifiesto interno, v3.2
        </div>
      </div>
    </section>
  );
}
