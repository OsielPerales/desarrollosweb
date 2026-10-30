import React from 'react';

export function Footer() {
  return (
    <footer
      style={{
        padding: '48px',
        background: '#2A4B7C',
        color: '#F9F9F7',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 40,
          alignItems: 'start',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontWeight: 700,
              fontSize: 20,
              marginBottom: 10,
            }}
          >
            Editorial
          </div>
          <p
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 15,
              lineHeight: 1.55,
              color: 'rgba(249,249,247,0.75)',
              margin: 0,
              maxWidth: 320,
            }}
          >
            Humanismo tecnológico. Skin in the game. Construimos lo que usamos.
          </p>
        </div>
        {[
          { h: 'Lectura', links: ['Ensayos', 'Manifiesto', 'Archivo'] },
          { h: 'Sobre', links: ['Quiénes somos', 'Contacto', 'Prensa'] },
          { h: 'Legal', links: ['Privacidad', 'Términos', 'Colofón'] },
        ].map((col) => (
          <div key={col.h}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(249,249,247,0.55)',
                marginBottom: 14,
              }}
            >
              {col.h}
            </div>
            {col.links.map((l) => (
              <div key={l} style={{ marginBottom: 8 }}>
                <a
                  href="#"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 14,
                    color: '#F9F9F7',
                    textDecoration: 'none',
                  }}
                >
                  {l}
                </a>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div
        style={{
          maxWidth: 1200,
          margin: '48px auto 0',
          paddingTop: 24,
          borderTop: '1px solid rgba(249,249,247,0.15)',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: 'rgba(249,249,247,0.55)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        © 2026 Editorial · Hecho con cuidado
      </div>
    </footer>
  );
}
