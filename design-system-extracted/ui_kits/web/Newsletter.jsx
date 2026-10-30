import React from 'react';
import { Button } from './Button.jsx';

export function Newsletter() {
  const [email, setEmail] = React.useState('');
  const [sent, setSent] = React.useState(false);
  return (
    <section style={{ padding: '72px 48px', background: '#fff' }}>
      <div
        style={{
          maxWidth: 720,
          margin: '0 auto',
          background: '#F9F9F7',
          padding: '56px 48px',
          borderRadius: 12,
          border: '1px solid #E8E6E1',
        }}
      >
        <h2
          style={{
            fontFamily: "'Libre Baskerville', Georgia, serif",
            fontWeight: 700,
            fontSize: 32,
            color: '#2A4B7C',
            margin: '0 0 12px',
            letterSpacing: '-0.005em',
          }}
        >
          Una carta cada dos semanas.
        </h2>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 16,
            lineHeight: 1.6,
            color: '#333',
            margin: '0 0 28px',
          }}
        >
          Te escribimos sólo cuando tenemos algo que merece tu tiempo. Sin anuncios,
          sin seguimiento, sin urgencias falsas.
        </p>
        {sent ? (
          <div
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontStyle: 'italic',
              color: '#2A4B7C',
              fontSize: 18,
            }}
          >
            Listo. Te escribimos pronto.
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            style={{ display: 'flex', gap: 10 }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '1px solid #E8E6E1',
                borderRadius: 8,
                fontFamily: 'Inter, sans-serif',
                fontSize: 15,
                color: '#333',
                background: '#fff',
                outline: 'none',
              }}
              onFocus={(e) => { e.target.style.borderColor = '#E07A5F'; e.target.style.boxShadow = '0 0 0 3px rgba(224,122,95,0.15)'; }}
              onBlur={(e) => { e.target.style.borderColor = '#E8E6E1'; e.target.style.boxShadow = 'none'; }}
            />
            <Button type="submit">Suscribirme</Button>
          </form>
        )}
      </div>
    </section>
  );
}
