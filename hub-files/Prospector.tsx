import { useState } from 'react';
import { 
  Radar, MapPin, Briefcase, Search, Sparkles, CheckCircle, 
  Map, Building2, Globe, TrendingUp, Filter, Loader2, Bot
} from 'lucide-react';
import { doc, setDoc, serverTimestamp, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface ProspectoTemp {
  id: string;
  nombre: string;
  empresa: string;
  industria: string;
  ubicacion: string;
  matchScore: number;
  motivoMatch: string;
  seleccionado: boolean;
  agregado: boolean;
}

export function Prospector() {
  const [mercado, setMercado] = useState('');
  const [zona, setZona] = useState('');
  const [tamano, setTamano] = useState('pyme');
  const [keywords, setKeywords] = useState('');
  
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<ProspectoTemp[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mercado || !zona) return;
    
    setIsSearching(true);
    setResults([]);

    // Simulación del motor OSINT / Agente de Búsqueda
    setTimeout(() => {
      setResults([
        {
          id: 'p1',
          nombre: 'Ing. Carlos Mendoza (Director de Planta)',
          empresa: 'Aceros Flexibles del Norte',
          industria: mercado,
          ubicacion: zona,
          matchScore: 92,
          motivoMatch: 'Alta probabilidad de necesitar soluciones CNC y automatización basado en su giro.',
          seleccionado: true,
          agregado: false
        },
        {
          id: 'p2',
          nombre: 'Contacto General / Compras',
          empresa: 'Maquinados Industriales Rápidos S.A.',
          industria: mercado,
          ubicacion: zona,
          matchScore: 85,
          motivoMatch: 'Empresa pyme en expansión; perfil ideal para modernización de software.',
          seleccionado: false,
          agregado: false
        },
        {
          id: 'p3',
          nombre: 'Lic. Mariana Soto (Innovación)',
          empresa: 'Logística Transfronteriza TX',
          industria: 'Logística',
          ubicacion: zona,
          matchScore: 78,
          motivoMatch: 'Mencionan "Transformación Digital" en sus reportes recientes.',
          seleccionado: false,
          agregado: false
        }
      ]);
      setIsSearching(false);
    }, 3000);
  };

  const toggleSelection = (id: string) => {
    setResults(results.map(r => r.id === id ? { ...r, seleccionado: !r.seleccionado } : r));
  };

  const handleCapturar = async () => {
    const seleccionados = results.filter(r => r.seleccionado && !r.agregado);
    if (seleccionados.length === 0) return;

    for (const p of seleccionados) {
      try {
        const docRef = doc(collection(db, 'leads'));
        await setDoc(docRef, {
          nombre: p.nombre,
          empresa: p.empresa,
          intereses: [p.industria, 'Prospección en Frío'],
          status: 'nuevo',
          source: 'manual', // Descubierto por Agente
          score: p.matchScore,
          scoreSummary: p.motivoMatch,
          etiquetas: ['Outbound', 'Agente Prospector'],
          autoPilot: false,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        console.error('Error agregando prospecto', err);
      }
    }

    // Actualizar UI
    setResults(results.map(r => r.seleccionado ? { ...r, agregado: true, seleccionado: false } : r));
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="font-serif text-2xl text-graphite flex items-center gap-2">
          <Radar className="w-6 h-6 text-blue-600" /> Agente PROSPECTOR
        </h1>
        <p className="text-sm text-graphite/50 mt-1">
          Inteligencia de Mercado Web. Define tu target y deja que el Agente AI escanee la red buscando empresas y contactos B2B altamente calificados para inyectar a tu Pipeline.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* ── LEFT: SEARCH PARAMETERS ── */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-graphite/8 p-5 shadow-soft">
            <h2 className="font-medium text-graphite mb-1 flex items-center gap-2">
              <Filter className="w-4 h-4 text-graphite/40" /> Estrategia de Caza
            </h2>
            <p className="text-xs text-graphite/50 mb-5">Afina los sensores del radar para encontrar tu cliente ideal.</p>
            
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-graphite flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-orange" /> Mercado / Industria Objetivo
                </label>
                <input 
                  required
                  value={mercado} onChange={(e) => setMercado(e.target.value)}
                  placeholder="Ej. Metalmecánica, Logística, Bienes Raíces" 
                  className="w-full px-4 py-2 bg-cream text-sm text-graphite rounded-xl border border-graphite/10 focus:outline-none focus:border-orange transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-graphite flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-green-600" /> Zona Geográfica Radius
                </label>
                <input 
                  required
                  value={zona} onChange={(e) => setZona(e.target.value)}
                  placeholder="Ej. Monterrey, Texas, LATAM" 
                  className="w-full px-4 py-2 bg-cream text-sm text-graphite rounded-xl border border-graphite/10 focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-graphite flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-500" /> Tamaño de la Empresa
                </label>
                <select 
                  value={tamano} onChange={(e) => setTamano(e.target.value)}
                  className="w-full px-4 py-2 bg-cream text-sm text-graphite rounded-xl border border-graphite/10 focus:outline-none focus:border-blue-400 transition-colors"
                >
                  <option value="micro">Micro (1-10 empleados)</option>
                  <option value="pyme">Pequeña y Mediana (11-200)</option>
                  <option value="corporate">Corporativo (+200)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-graphite flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-purple-500" /> Palabras clave / Señales
                </label>
                <input 
                  value={keywords} onChange={(e) => setKeywords(e.target.value)}
                  placeholder="Ej. Buscando automatizar, ISO 9001" 
                  className="w-full px-4 py-2 bg-cream text-sm text-graphite rounded-xl border border-graphite/10 focus:outline-none focus:border-purple-400 transition-colors"
                />
              </div>

              <button 
                type="submit"
                disabled={isSearching || !mercado || !zona}
                className="w-full mt-4 py-3 bg-graphite text-white rounded-xl text-sm font-medium hover:bg-graphite/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSearching ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Mapeando la red...</>
                ) : (
                  <><Search className="w-4 h-4" /> Ejecutar Raster OSINT</>
                )}
              </button>
            </form>
          </div>
          
          <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-4 text-xs text-blue-900 leading-relaxed">
            <p><strong className="flex items-center gap-1 mb-1"><Bot className="w-4 h-4" /> Tip del Agente:</strong> Intenta cruzar mercados muy específicos (como 'Proveedores de Tier 2 Automotriz') con zonas emergentes para obtener prospectos menos competidos.</p>
          </div>
        </div>

        {/* ── RIGHT: RADAR RESULTS ── */}
        <div className="lg:col-span-8 flex flex-col h-[calc(100vh-14rem)]">
          <div className="bg-white rounded-2xl border border-graphite/8 shadow-soft flex-1 flex flex-col overflow-hidden">
            
            <div className="p-4 border-b border-graphite/8 flex items-center justify-between bg-cream/30">
              <h2 className="font-medium text-graphite flex items-center gap-2">
                <Map className="w-4 h-4 text-graphite/60" /> Inteligencia Recolectada
              </h2>
              {results.length > 0 && (
                <div className="text-xs bg-white border border-graphite/10 px-3 py-1 rounded-full text-graphite/60 font-medium">
                  {results.length} coincidencias encontradas
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50">
              {isSearching ? (
                <div className="h-full flex flex-col items-center justify-center text-graphite/40 space-y-6">
                  <div className="relative">
                    <Radar className="w-16 h-16 animate-ping opacity-20 absolute" />
                    <Radar className="w-16 h-16 text-blue-500 relative z-10" />
                  </div>
                  <div className="space-y-1 text-center">
                    <p className="text-sm font-medium text-graphite">Escaneando directorios y APIs sociales...</p>
                    <p className="text-xs">Aplicando filtros cognitivos de Gemini Flash.</p>
                  </div>
                </div>
              ) : results.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-graphite/30">
                  <Search className="w-12 h-12 mb-3 opacity-20" />
                  <p className="text-sm">El radar está inactivo. Define tu estrategia a la izquierda.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {results.map((prospecto) => (
                    <div 
                      key={prospecto.id}
                      onClick={() => !prospecto.agregado && toggleSelection(prospecto.id)}
                      className={`p-4 bg-white rounded-xl border transition-all cursor-pointer ${
                        prospecto.agregado ? 'opacity-50 grayscale border-graphite/10' : 
                        prospecto.seleccionado ? 'border-orange ring-1 ring-orange/20 shadow-sm' : 'border-graphite/10 hover:border-graphite/30'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="pt-1">
                          <input 
                            type="checkbox" 
                            checked={prospecto.seleccionado || prospecto.agregado} 
                            disabled={prospecto.agregado}
                            readOnly
                            className="w-4 h-4 text-orange border-graphite/20 rounded focus:ring-orange" 
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-graphite flex items-center gap-2">
                                {prospecto.empresa}
                                {prospecto.agregado && <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded uppercase font-bold tracking-wider">En Pipeline</span>}
                              </h3>
                              <p className="text-xs text-graphite/50 mt-0.5">{prospecto.nombre}</p>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-[10px] uppercase font-mono tracking-wider text-graphite/40 mb-1">AI Match</span>
                              <div className={`text-lg font-bold font-mono ${prospecto.matchScore >= 90 ? 'text-green-600' : 'text-orange'}`}>
                                {prospecto.matchScore}%
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex flex-wrap gap-2 text-[10px] text-graphite/50 mb-3 border-b border-graphite/5 pb-3">
                            <span className="flex items-center gap-1 bg-cream px-2 py-1 rounded"><MapPin className="w-3 h-3" /> {prospecto.ubicacion}</span>
                            <span className="flex items-center gap-1 bg-cream px-2 py-1 rounded"><Briefcase className="w-3 h-3" /> {prospecto.industria}</span>
                          </div>

                          <div className="flex items-start gap-2 bg-orange/5 p-2 rounded-lg text-xs">
                            <Sparkles className="w-4 h-4 text-orange flex-shrink-0 mt-0.5" />
                            <p className="text-graphite/80 leading-relaxed text-[11px]">{prospecto.motivoMatch}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Acciones de Lote */}
            {results.some(r => r.seleccionado && !r.agregado) && (
              <div className="p-4 bg-white border-t border-graphite/8 flex items-center justify-between animate-in slide-in-from-bottom-4">
                <div className="flex items-center gap-2 text-sm text-graphite/70">
                  <CheckCircle className="w-4 h-4 text-orange" />
                  <strong>{results.filter(r => r.seleccionado && !r.agregado).length}</strong> prospectos listos para cazar.
                </div>
                <button 
                  onClick={handleCapturar}
                  className="px-5 py-2.5 bg-orange text-white rounded-xl text-sm font-medium hover:bg-orange/90 transition-colors shadow-lg shadow-orange/20 flex items-center gap-2"
                >
                  <TrendingUp className="w-4 h-4" /> Inyectar al Pipeline
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
