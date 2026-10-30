import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

export function NotFound() {
  useSEO({ title: 'Página no encontrada | Desarrollos Elaborados', description: 'La página solicitada no está disponible.', canonicalPath: '/404', robots: 'noindex, follow' });
  return (
    <main className="min-h-[75vh] pt-36 pb-20 px-6 flex items-center justify-center">
      <div className="max-w-xl text-center">
        <p className="font-mono text-orange text-lg mb-4">404</p>
        <h1 className="font-serif text-4xl text-graphite mb-6">Página no encontrada</h1>
        <p className="text-graphite/70 mb-8">Puedes volver al inicio o contarnos qué necesitas.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/" className="btn-primary">Volver al inicio</Link>
          <Link to="/contacto" className="btn-secondary">Contacto</Link>
        </div>
      </div>
    </main>
  );
}
