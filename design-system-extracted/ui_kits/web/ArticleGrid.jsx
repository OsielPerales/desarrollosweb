import React from 'react';
import { ArticleCard } from './ArticleCard.jsx';

export function ArticleGrid() {
  const items = [
    {
      tag: 'Ensayo',
      title: 'Por qué escribimos con skin in the game',
      excerpt: 'Lo que publicamos lo usamos. Lo que recomendamos lo pagamos. El criterio se paga con consecuencias.',
      date: '21 ABR 2026',
      mins: 6,
      accent: '#D4E5DF',
    },
    {
      tag: 'Caso',
      title: 'Herramientas con memoria larga',
      excerpt: 'Un software que sigue siendo útil en diez años, no en diez semanas. Tres decisiones de diseño.',
      date: '08 ABR 2026',
      mins: 9,
      accent: '#E6E1F0',
    },
    {
      tag: 'Ensayo',
      title: 'Contra la urgencia',
      excerpt: 'La notificación es una factura emocional. Quien diseña interfaces decide cuándo cobrarla.',
      date: '31 MAR 2026',
      mins: 4,
      accent: '#F4DDD4',
    },
  ];
  return (
    <section style={{ padding: '72px 48px', background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 40 }}>
          <h2
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontWeight: 700,
              fontSize: 36,
              color: '#2A4B7C',
              margin: 0,
              letterSpacing: '-0.005em',
            }}
          >
            Ensayos recientes
          </h2>
          <a
            href="#"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              color: '#2A4B7C',
              textDecoration: 'none',
              borderBottom: '1px solid currentColor',
              paddingBottom: 2,
            }}
          >
            Ver archivo completo →
          </a>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
        >
          {items.map((i) => <ArticleCard key={i.title} {...i} />)}
        </div>
      </div>
    </section>
  );
}
