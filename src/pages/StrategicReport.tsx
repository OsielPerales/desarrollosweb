import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  DollarSign,
  GraduationCap,
  Headphones,
  Lightbulb,
  ShieldAlert,
  Target,
  Terminal,
  TrendingUp,
  Users,
  XCircle,
} from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

const alerts = [
  'Tu equipo usa IA de forma informal, sin reglas ni entrenamiento.',
  'Compraste o probaste herramientas, pero ningún flujo llegó a producción.',
  'Sientes que la IA es importante, pero aún no sabes por dónde empezar.',
  'Hay datos y trabajo manual, pero no una ruta clara de adopción.',
];

const winners = [
  'Definen una política básica de uso antes de escalar herramientas.',
  'Capacitan a operación y dirección, no solo al área técnica.',
  'Empiezan por un caso de uso concreto y medible.',
  'Miden adopción y retorno en vez de perseguir novedad.',
];

const program = [
  {
    icon: Lightbulb,
    title: 'Diagnóstico de madurez',
    desc: 'Ubicamos el punto de partida y detectamos dónde conviene actuar primero.',
    tag: '15 minutos',
  },
  {
    icon: Users,
    title: 'Formación por rol',
    desc: 'Operarios, supervisores y dirección aprenden qué pedir, qué validar y qué no delegar.',
    tag: 'iAprende',
  },
  {
    icon: Target,
    title: 'Implementación en un flujo real',
    desc: 'Bajamos la conversacion a un caso concreto con alcance y responsables definidos.',
    tag: 'Con método',
  },
  {
    icon: ShieldAlert,
    title: 'Gobernanza basica',
    desc: 'Aterrizamos reglas de uso, datos, validación y cumplimiento para reducir riesgo.',
    tag: 'Contexto MX',
  },
];

export const StrategicReport = () => {
  useSEO({
    title: 'Reporte IA 2025 | Desarrollos Elaborados',
    description:
      'Un reporte para entender por qué tantas empresas fallan al adoptar IA y cómo preparar mejor a equipos industriales para implementarla con criterio.',
    canonicalPath: '/reporte-ia-2025',
  });

  return (
    <div className="min-h-screen">
      <section className="section-cream pt-28 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block px-3 py-1 mb-6 bg-orange/10 rounded-full text-orange text-sm font-medium font-mono">
            Informe estratégico 2025-2026
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl text-graphite leading-tight mb-6">
                La IA ya está cambiando tu industria.
                <span className="text-orange"> La diferencia está en cómo entras.</span>
              </h1>
              <p className="text-lg text-graphite/70 leading-relaxed mb-8">
                Este reporte resume por qué tantas empresas fallan al adoptar IA y por qué conviene entrar con más criterio.
              </p>
              <a href="#donde-estas" className="inline-flex items-center gap-2 text-orange font-medium hover:gap-3 transition-all text-sm">
                Descubrir en qué grupo estás
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-soft border border-graphite/5">
                <div className="font-mono text-3xl font-bold text-cobalt mb-1">$15.7T</div>
                <p className="text-graphite/60 text-sm">Estimación de impacto económico global de la IA hacia 2030, según PwC.</p>
              </div>
            <div className="bg-white rounded-2xl p-6 shadow-soft border border-graphite/5">
                <div className="font-mono text-3xl text-orange font-bold mb-1">7%</div>
                <p className="text-graphite/60 text-sm">Estimación de incremento del PIB global por IA generativa, según Goldman Sachs.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-soft border border-graphite/5">
                <div className="font-mono text-3xl text-cobalt font-bold mb-1">56%</div>
                <p className="text-graphite/60 text-sm">Prima salarial promedio asociada a habilidades de IA, según PwC.</p>
              </div>
              <div className="bg-orange/10 rounded-2xl p-6 border border-orange/20">
                <div className="font-mono text-3xl text-orange font-bold mb-1">64%</div>
                <p className="text-graphite/60 text-sm">Prima salarial observada en manufactura para puestos con habilidades de IA.</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-graphite/45 mt-6 max-w-4xl">
            Las cifras son estimaciones de estudios globales y no representan resultados garantizados para una empresa específica. Consulta las fuentes al final de esta página.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-cobalt font-mono text-sm uppercase tracking-wider">El panorama real</span>
            <h2 className="font-serif text-3xl text-graphite mt-2 flex items-center justify-center gap-3">
              <TrendingUp className="w-7 h-7 text-orange" />
              La carrera ya empezó, con o sin ti
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-cream rounded-2xl p-8 space-y-6">
              <h3 className="text-lg font-bold text-graphite">Qué señalan las referencias globales</h3>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-cobalt text-sm">Escenarios alcistas</span>
                  <span className="font-bold text-green-600 text-sm">$15.7T</span>
                </div>
                <div className="w-full bg-graphite/10 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '90%' }} />
                </div>
                <p className="text-xs text-graphite/50 mt-1">Estimación de PwC sobre el impacto económico global acumulado de la IA hacia 2030.</p>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-cobalt text-sm">Escenarios conservadores</span>
                  <span className="font-bold text-orange text-sm">+7%</span>
                </div>
                <div className="w-full bg-graphite/10 rounded-full h-2.5">
                  <div className="bg-orange h-2.5 rounded-full" style={{ width: '15%' }} />
                </div>
                <p className="text-xs text-graphite/50 mt-1">Estimación de Goldman Sachs sobre el incremento potencial del PIB global por IA generativa.</p>
              </div>
              <div className="p-4 bg-cobalt/5 rounded-xl border-l-4 border-cobalt text-sm text-cobalt font-medium">
                Las cifras describen potencial de mercado; el retorno de cada empresa depende de su contexto, ejecución y adopción.
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-graphite">La brecha no es solo tecnológica</h3>
              <p className="text-graphite/70 leading-relaxed">
                El problema no es solo el acceso a tecnología. Muchas PyMEs necesitan una primera victoria concreta, reglas de uso y acompañamiento para sostener la adopción.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-green-50 border border-green-200 rounded-2xl text-center">
                  <div className="font-mono text-2xl font-bold text-green-700">Capacidad</div>
                  <div className="text-xs text-green-600 mt-1">Convertir herramientas en procesos sostenibles</div>
                </div>
                <div className="p-5 bg-orange/5 border border-orange/20 rounded-2xl text-center">
                  <div className="font-mono text-2xl font-bold text-orange">Ruta</div>
                  <div className="text-xs text-orange mt-1">Priorizar un caso de uso adecuado al contexto</div>
                </div>
              </div>
              <div className="p-4 bg-orange/10 rounded-xl border-l-4 border-orange">
                <p className="text-sm text-graphite/80 font-medium">
                  Por eso conectamos este reporte con Academia, Soluciones y Contacto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="donde-estas" className="section-cream py-16 px-4 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-orange font-mono text-sm uppercase tracking-wider">Autoevaluación</span>
            <h2 className="font-serif text-3xl text-graphite mt-2 flex items-center justify-center gap-3">
              <Users className="w-7 h-7 text-orange" />
              ¿En qué lado de la brecha estás hoy?
            </h2>
              <p className="text-graphite/60 mt-3 max-w-2xl mx-auto">Un bloque simple para ubicar tu momento.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="p-8 bg-white rounded-2xl border border-red-100 shadow-soft">
              <div className="flex items-center gap-3 mb-6">
                <XCircle className="w-6 h-6 text-red-400" />
                <h3 className="text-lg font-bold text-graphite">Señales de alerta</h3>
              </div>
              <ul className="space-y-4">
                {alerts.map((item, i) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-graphite/70">
                    <span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-red-500">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 bg-white rounded-2xl border border-green-100 shadow-soft">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                <h3 className="text-lg font-bold text-graphite">El grupo que sí escala</h3>
              </div>
              <ul className="space-y-4">
                {winners.map((item, i) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-graphite/70">
                    <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-green-600">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft border border-graphite/5 overflow-hidden">
            <div className="p-6 border-b border-graphite/5 flex items-center gap-3">
              <Target className="w-5 h-5 text-orange" />
              <h3 className="font-bold text-graphite">Qué mejora cuando se hace bien</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-cream text-graphite/50 uppercase text-xs font-semibold tracking-wider">
                    <th className="p-4 border-b border-graphite/5">Área</th>
                    <th className="p-4 border-b border-graphite/5">Mejora</th>
                    <th className="p-4 border-b border-graphite/5">Lectura util</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-graphite/5 text-sm">
                  <tr className="hover:bg-cream/50 transition-colors">
                    <td className="p-4 font-medium text-cobalt flex items-center gap-2">
                      <Terminal className="w-4 h-4" /> Programación
                    </td>
                    <td className="p-4 font-bold text-green-600">Más velocidad</td>
                    <td className="p-4 text-graphite/60">La IA acelera más cuando el equipo entiende cómo pedir y revisar.</td>
                  </tr>
                  <tr className="hover:bg-cream/50 transition-colors">
                    <td className="p-4 font-medium text-cobalt flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> Documentación
                    </td>
                    <td className="p-4 font-bold text-green-600">Menos retrabajo</td>
                    <td className="p-4 text-graphite/60">Mejor resultado cuando existe criterio de calidad y contexto.</td>
                  </tr>
                  <tr className="hover:bg-cream/50 transition-colors">
                    <td className="p-4 font-medium text-cobalt flex items-center gap-2">
                      <DollarSign className="w-4 h-4" /> Ventas
                    </td>
                    <td className="p-4 font-bold text-green-600">Más capacidad</td>
                    <td className="p-4 text-graphite/60">La productividad mejora cuando la IA se integra a un flujo real.</td>
                  </tr>
                  <tr className="hover:bg-cream/50 transition-colors">
                    <td className="p-4 font-medium text-cobalt flex items-center gap-2">
                      <Headphones className="w-4 h-4" /> Soporte
                    </td>
                    <td className="p-4 font-bold text-green-600">Mejor respuesta</td>
                    <td className="p-4 text-graphite/60">La curva de adopción baja más rápido cuando el equipo está mejor formado.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-cobalt font-mono text-sm uppercase tracking-wider">Nuestro programa</span>
            <h2 className="font-serif text-3xl text-graphite mt-2 flex items-center justify-center gap-3">
              <GraduationCap className="w-7 h-7 text-orange" />
              Así convertimos el contexto en ruta de acción
            </h2>
            <p className="text-graphite/60 mt-3 max-w-xl mx-auto">
              Formación, implementación y diagnóstico en una sola ruta.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {program.map((item) => (
              <div key={item.title} className="rounded-2xl p-6 border bg-cream flex gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-white">
                  <item.icon className="w-5 h-5 text-orange" />
                </div>
                <div>
                  <div className="flex items-start gap-2 mb-2 flex-wrap">
                    <h3 className="font-bold text-graphite">{item.title}</h3>
                    <span className="text-xs px-2 py-0.5 bg-white rounded-full text-graphite/50 font-mono whitespace-nowrap border border-graphite/10">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-graphite/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white border-t border-graphite/5">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-8">
            <span className="text-cobalt font-mono text-sm uppercase tracking-wider">Fuentes y alcance</span>
            <h2 className="font-serif text-2xl md:text-3xl text-graphite mt-2 mb-3">Cómo leer estas referencias</h2>
            <p className="text-sm text-graphite/65 leading-relaxed">
              Las cifras son estimaciones globales y no sustituyen un diagnóstico de tu operación. Se presentan como contexto, no como promesa de resultados.
            </p>
          </div>
          <ul className="grid md:grid-cols-3 gap-4 text-sm">
            <li className="rounded-2xl bg-cream p-5">
              <a className="font-medium text-cobalt hover:text-orange transition-colors" href="https://www.pwc.com/gx/en/issues/analytics/assets/pwc-ai-analysis-sizing-the-prize-report.pdf" target="_blank" rel="noreferrer">
                PwC — Sizing the Prize
              </a>
              <p className="text-graphite/60 mt-2 leading-relaxed">Estimación de hasta 15.7 billones de dólares de impacto global hacia 2030.</p>
            </li>
            <li className="rounded-2xl bg-cream p-5">
              <a className="font-medium text-cobalt hover:text-orange transition-colors" href="https://www.goldmansachs.com/insights/articles/generative-ai-could-raise-global-gdp-by-7-percent" target="_blank" rel="noreferrer">
                Goldman Sachs Research
              </a>
              <p className="text-graphite/60 mt-2 leading-relaxed">Estimación de un incremento potencial del PIB global del 7% por IA generativa.</p>
            </li>
            <li className="rounded-2xl bg-cream p-5">
              <a className="font-medium text-cobalt hover:text-orange transition-colors" href="https://www.pwc.com/gx/en/news-room/press-releases/2025/ai-linked-to-a-fourfold-increase-in-productivity-growth.html" target="_blank" rel="noreferrer">
                PwC — AI Jobs Barometer 2025
              </a>
              <p className="text-graphite/60 mt-2 leading-relaxed">Prima salarial global promedio del 56% para puestos que requieren habilidades de IA.</p>
            </li>
          </ul>
          <p className="text-xs text-graphite/45 mt-5">Consulta las publicaciones originales para metodología, periodo de análisis y limitaciones de cada estimación.</p>
        </div>
      </section>

      <section className="section-cream py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-cobalt/5 border border-cobalt/10 rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-mint/20 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 mb-6 bg-orange/10 border border-orange/20 rounded-full text-orange text-sm font-mono">
                Próximo paso
              </span>
              <h3 className="font-serif text-3xl md:text-4xl text-graphite mb-4">
                Si este reporte te describió,
                <span className="text-orange"> el siguiente paso ya no es seguir leyendo.</span>
              </h3>
              <p className="text-graphite/60 max-w-xl mx-auto mb-3 leading-relaxed">
                Es definir si conviene formar al equipo, implementar un flujo real o hacer un diagnóstico.
              </p>
              <p className="text-graphite/40 text-sm mb-8">
                Tiempo orientativo: 15 minutos para ubicar prioridades y salida recomendada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contacto" className="btn-primary gap-2 flex items-center justify-center">
                  Quiero mi diagnóstico
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/academia" className="btn-secondary gap-2 flex items-center justify-center">
                  Ver programa de formación
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center text-graphite/45 text-sm flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" />
            Siguiente paso recomendado: revisar las fuentes y adaptar las referencias al contexto de tu empresa.
          </div>
        </div>
      </section>
    </div>
  );
};
