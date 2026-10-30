import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, ArrowRight, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export function HubLogin() {
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPass, setShowPass]   = useState(false);
  const [error, setError]         = useState('');
  const [loading, setLoading]     = useState(false);
  const navigate                  = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/hub');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Credenciales incorrectas. Verifica email y contraseña.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Demasiados intentos fallidos. Intenta más tarde.');
      } else {
        setError('Hubo un error al iniciar sesión. Verifica tu conexión.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-cream">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-5/12 bg-graphite relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-16 left-8 w-64 h-64 bg-orange rounded-full blur-3xl" />
          <div className="absolute bottom-16 right-8 w-80 h-80 bg-mint rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-orange rounded-xl flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif text-xl text-white">HUB Cognitivo</span>
          </div>
          <h2 className="font-serif text-4xl text-white leading-tight mb-6">
            Sistema nervioso central de <span className="text-orange">ventas y prospección.</span>
          </h2>
          <p className="text-white/50 leading-relaxed">
            Pipeline CRM · Agentes IA · Cotizaciones automáticas · Campañas · Bandeja unificada.
          </p>
        </div>
        <p className="relative z-10 text-white/30 text-sm font-mono">
          Desarrollos Elaborados · Monclova, Coahuila
        </p>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-10 h-10 bg-orange rounded-xl flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif text-xl text-graphite">HUB Cognitivo</span>
          </div>

          <h1 className="font-serif text-3xl text-graphite mb-1">Acceso interno</h1>
          <p className="text-sm text-graphite/50 mb-8 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" /> Autenticación segura vía Google Firebase
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-graphite mb-1.5">Correo electrónico</label>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-graphite/10 text-sm focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
                placeholder="usuario@desarrolloselaborados.com" required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-graphite mb-1.5">Contraseña</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-10 rounded-xl bg-white border border-graphite/10 text-sm focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
                  placeholder="••••••••" required
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-graphite/30 hover:text-graphite/60 transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">{error}</div>}

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-orange text-white font-semibold rounded-full hover:bg-orange/90 transition-all disabled:opacity-70">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><ArrowRight className="w-5 h-5" /> Ingresar al HUB</>}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-graphite/40">
            ¿No tienes acceso? Solicítalo al administrador de TI.
          </div>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-graphite/40 hover:text-orange transition-colors">← Volver al sitio principal</a>
          </div>
        </div>
      </div>
    </div>
  );
}
