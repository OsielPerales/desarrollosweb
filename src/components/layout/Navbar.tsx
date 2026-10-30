import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogIn, Menu, X } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Inicio' },
  { path: '/soluciones', label: 'Soluciones' },
  { path: '/academia', label: 'Academia' },
  { path: '/laboratorio', label: 'Laboratorio' },
  { path: '/reporte-ia-2025', label: 'Reporte IA' },
  { path: '/nosotros', label: 'Nosotros' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: '#fff',
        borderBottom: isScrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        transition: 'border-color 240ms cubic-bezier(0.2,0.6,0.2,1), box-shadow 240ms cubic-bezier(0.2,0.6,0.2,1)',
        boxShadow: isScrolled ? 'var(--shadow-sm)' : 'none',
      }}
    >
      <nav
        className="container-inner"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}
      >
        {/* Wordmark */}
        <Link
          to="/"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Desarrollos Elaborados, inicio"
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
        >
          <img
            src="/logo.png"
            alt="Desarrollos Elaborados"
            style={{
              width: 196,
              height: 52,
              objectFit: 'cover',
              objectPosition: 'center 54%',
            }}
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center" style={{ gap: 28 }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.9375rem',
                fontWeight: 500,
                color: isActive(link.path) ? 'var(--accent-color)' : 'var(--fg-1)',
                textDecoration: 'none',
                transition: 'color 200ms',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                if (!isActive(link.path)) e.currentTarget.style.color = 'var(--accent-color)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = isActive(link.path) ? 'var(--accent-color)' : 'var(--fg-1)';
              }}
            >
              {link.label}
              {isActive(link.path) && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: -4,
                    left: 0,
                    width: '100%',
                    height: 2,
                    background: 'var(--accent-color)',
                    borderRadius: 100,
                  }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center" style={{ gap: 12 }}>
          <a
            href="https://iaprende-1415d.web.app/login"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--fg-2)',
              textDecoration: 'none',
              transition: 'color 200ms',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-color)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-2)')}
          >
            <LogIn style={{ width: 15, height: 15 }} />
            Acceder a iAprende
          </a>
          <Link to="/contacto" className="btn-primary" style={{ fontSize: '0.875rem', padding: '9px 18px' }}>
            Iniciar diagnóstico
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden"
          aria-label="Menú"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: 8,
            border: '1px solid var(--border-color)',
            background: 'transparent',
            cursor: 'pointer',
            color: 'var(--fg-1)',
          }}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-navigation"
        className="md:hidden"
        style={{
          overflow: 'hidden',
          maxHeight: isMobileMenuOpen ? '28rem' : 0,
          transition: 'max-height 300ms cubic-bezier(0.2,0.6,0.2,1)',
          background: '#fff',
          borderTop: isMobileMenuOpen ? '1px solid var(--border-color)' : 'none',
        }}
      >
        <div className="container-inner py-5 flex flex-col" style={{ gap: 2 }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '1rem',
                fontWeight: 500,
                color: isActive(link.path) ? 'var(--accent-color)' : 'var(--fg-1)',
                textDecoration: 'none',
                padding: '10px 0',
                borderBottom: '1px solid var(--border-color)',
              }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://iaprende-1415d.web.app/login"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              marginTop: 12,
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.9375rem',
              fontWeight: 500,
              color: 'var(--fg-2)',
              textDecoration: 'none',
              padding: '10px 0',
            }}
          >
            <LogIn size={16} />
            Acceder a iAprende
          </a>
          <Link
            to="/contacto"
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn-primary"
            style={{ marginTop: 8, textAlign: 'center', justifyContent: 'center' }}
          >
            Iniciar diagnóstico
          </Link>
        </div>
      </div>
    </header>
  );
}
