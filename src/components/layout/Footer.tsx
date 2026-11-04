import { Link } from 'react-router-dom';
import { CONTACT_EMAIL } from '../../lib/contact';

const cols = [
  {
    heading: 'Lectura',
    links: [
      { label: 'Reporte IA 2025', path: '/reporte-ia-2025' },
      { label: 'Manifiesto', path: '/nosotros' },
    ],
  },
  {
    heading: 'Servicios',
    links: [
      { label: 'Academia iAprende', path: '/academia' },
      { label: 'Soluciones', path: '/soluciones' },
      { label: 'Laboratorio', path: '/laboratorio' },
    ],
  },
  {
    heading: 'Empresa',
    links: [
      { label: 'Quiénes somos', path: '/nosotros' },
      { label: 'Contacto', path: '/contacto' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacidad', path: '/privacidad' },
      { label: 'Términos', path: '/terminos' },
    ],
  },
];

export function Footer() {
  return (
    <footer style={{ background: 'var(--title-color)', color: '#F9F9F7' }}>
      <div className="container-inner" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div
          style={{ display: 'grid', alignItems: 'start' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))] gap-8 xl:gap-10"
        >
          {/* Brand column */}
          <div>
            <Link
              to="/"
              aria-label="Desarrollos Elaborados, inicio"
              style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', marginBottom: 16 }}
            >
              <img
                src="/logo.webp" width={800} height={258}
                alt="Desarrollos Elaborados"
                className="navbar-logo"
                style={{ borderRadius: 8 }}
              />
            </Link>
            <p
              className="font-serif"
              style={{
                fontStyle: 'italic',
                fontSize: '0.9375rem',
                lineHeight: 1.6,
                color: 'rgba(249,249,247,0.65)',
                margin: 0,
                maxWidth: 280,
              }}
            >
              Humanismo tecnológico. Skin in the Game. Construimos lo que enseñamos.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              style={{
                display: 'inline-block',
                marginTop: 14,
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.8125rem',
                color: 'rgba(249,249,247,0.6)',
                textDecoration: 'none',
              }}
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          {/* Nav columns */}
          {cols.map((col) => (
            <div key={col.heading}>
              <div
                className="font-mono uppercase"
                style={{
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  color: 'rgba(249,249,247,0.45)',
                  marginBottom: 14,
                }}
              >
                {col.heading}
              </div>
              {col.links.map((l) => (
                <div key={l.label} style={{ marginBottom: 10 }}>
                  <Link
                    to={l.path}
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '0.9375rem',
                      color: 'rgba(249,249,247,0.72)',
                      textDecoration: 'none',
                      transition: 'color 200ms',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#F9F9F7')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(249,249,247,0.72)')}
                  >
                    {l.label}
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: '1px solid rgba(249,249,247,0.12)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <span
            className="font-mono uppercase"
            style={{ fontSize: 11, letterSpacing: '0.08em', color: 'rgba(249,249,247,0.4)' }}
          >
            © {new Date().getFullYear()} Desarrollos Elaborados · Monclova, MX
          </span>
          <a
            href="https://iaprende-1415d.web.app/login"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.875rem',
              color: 'rgba(249,249,247,0.5)',
              textDecoration: 'none',
              transition: 'color 200ms',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-color)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(249,249,247,0.5)')}
          >
            Acceder a iAprende ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
