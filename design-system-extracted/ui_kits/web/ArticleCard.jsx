import React from 'react';
import { Chip } from './Chip.jsx';

export function ArticleCard({ tag, title, excerpt, date, mins, accent }) {
  const [hover, setHover] = React.useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: '#fff',
        borderRadius: 12,
        padding: 28,
        boxShadow: hover
          ? '0 8px 24px rgba(51,51,51,0.08)'
          : '0 2px 8px rgba(51,51,51,0.06)',
        transition: 'box-shadow 240ms cubic-bezier(0.2,0.6,0.2,1)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      {accent && (
        <div
          style={{
            width: '100%',
            height: 120,
            borderRadius: 8,
            background: accent,
            marginBottom: 6,
          }}
        />
      )}
      <Chip tone={tag === 'Ensayo' ? 'mint' : 'lavender'}>{tag}</Chip>
      <h3
        style={{
          fontFamily: "'Libre Baskerville', Georgia, serif",
          fontWeight: 700,
          fontSize: 22,
          lineHeight: 1.25,
          color: '#2A4B7C',
          margin: 0,
          textWrap: 'balance',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          lineHeight: 1.55,
          color: '#5C5C5C',
          margin: 0,
        }}
      >
        {excerpt}
      </p>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: '#8A8A8A',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginTop: 'auto',
          paddingTop: 12,
          borderTop: '1px solid #E8E6E1',
        }}
      >
        {date} · {mins} min
      </div>
    </article>
  );
}
