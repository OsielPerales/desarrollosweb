import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';

const Home           = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Soluciones     = lazy(() => import('./pages/Soluciones').then(m => ({ default: m.Soluciones })));
const Academia       = lazy(() => import('./pages/Academia').then(m => ({ default: m.Academia })));
const Laboratorio    = lazy(() => import('./pages/Laboratorio').then(m => ({ default: m.Laboratorio })));
const Nosotros       = lazy(() => import('./pages/Nosotros').then(m => ({ default: m.Nosotros })));
const Contacto       = lazy(() => import('./pages/Contacto').then(m => ({ default: m.Contacto })));
const StrategicReport = lazy(() => import('./pages/StrategicReport').then(m => ({ default: m.StrategicReport })));
const Privacidad     = lazy(() => import('./pages/Privacidad').then(m => ({ default: m.Privacidad })));
const Terminos       = lazy(() => import('./pages/Terminos').then(m => ({ default: m.Terminos })));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-orange border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/"                  element={<Suspense fallback={<PageLoader />}><Home /></Suspense>} />
          <Route path="/soluciones"        element={<Suspense fallback={<PageLoader />}><Soluciones /></Suspense>} />
          <Route path="/academia"          element={<Suspense fallback={<PageLoader />}><Academia /></Suspense>} />
          <Route path="/laboratorio"       element={<Suspense fallback={<PageLoader />}><Laboratorio /></Suspense>} />
          <Route path="/nosotros"          element={<Suspense fallback={<PageLoader />}><Nosotros /></Suspense>} />
          <Route path="/contacto"          element={<Suspense fallback={<PageLoader />}><Contacto /></Suspense>} />
          <Route path="/reporte-ia-2025"   element={<Suspense fallback={<PageLoader />}><StrategicReport /></Suspense>} />
          <Route path="/privacidad"        element={<Suspense fallback={<PageLoader />}><Privacidad /></Suspense>} />
          <Route path="/terminos"          element={<Suspense fallback={<PageLoader />}><Terminos /></Suspense>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
