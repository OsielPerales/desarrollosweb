import { ArrowRight, BookOpen, GraduationCap, Monitor, Target, Users } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';

const reasons = [
  {
    icon: Monitor,
    title: 'Sin criterio por rol, la adopción se atora',
    description: 'No basta con abrir herramientas. El equipo necesita una forma compartida de usarlas.',
  },
  {
    icon: Users,
    title: 'La formación correcta baja la resistencia',
    description: 'Cuando cada rol entiende su parte, la tecnología deja de sentirse impuesta.',
  },
  {
    icon: BookOpen,
    title: 'La teoría sola no cambia la operación',
    description: 'Bajamos el aprendizaje a escenarios reales para que entre al trabajo.',
  },
];

const tracks = [
  {
    title: 'Operarios',
    focus: 'Uso práctico y criterio básico para el día a día.',
    outcomes: ['Más confianza', 'Mejor uso de asistentes'],
  },
  {
    title: 'Supervisores',
    focus: 'Uso de IA para seguimiento, documentación y análisis.',
    outcomes: ['Mejor seguimiento', 'Más claridad para decidir'],
  },
  {
    title: 'Dirección',
    focus: 'Criterio para priorizar inversiones y liderar la adopción.',
    outcomes: ['Ruta más clara', 'Mejor liderazgo del cambio'],
  },
  {
    title: 'Líderes de implementación',
    focus: 'Diseño de casos de uso y acompañamiento del cambio.',
    outcomes: ['Casos mejor definidos', 'Cambio mejor sostenido'],
  },
];

const methodology = ['Aprender', 'Practicar', 'Aplicar', 'Medir'];

const results = [
  'Lenguaje y criterios compartidos.',
  'Mejores casos de uso antes de comprar mas.',
  'Decisiones con menos improvisacion.',
];

export function Academia() {
  useSEO({
    title: 'Academia iAprende | Adopción de IA para equipos industriales',
    description:
      'iAprende prepara a operarios, supervisores y dirección para adoptar IA con criterio, menos caos y mejor capacidad de implementación.',
    canonicalPath: '/academia',
  });

  return (
    <main className="min-h-screen pt-20">
      <section className="section-cream py-24 md:py-32">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-24 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-lavender/50 text-cobalt text-sm font-medium font-mono mb-6">
                Plataforma iAprende
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-graphite mb-6">
                Formación para que la IA
                <span className="text-orange"> no se convierta en caos.</span>
              </h1>
              <p className="text-lg md:text-xl text-graphite/70 leading-relaxed mb-8 max-w-2xl">
                Preparamos a cada rol para usar IA con más criterio, menos resistencia y mejor adopción.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contacto" className="btn-primary gap-2">
                  Diseñar plan de formación
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="#trayectos" className="btn-secondary gap-2 inline-flex">
                  Ver trayectos por rol
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="relative max-w-[34rem] ml-auto w-full">
              <div className="bg-white rounded-3xl shadow-soft-lg p-9 space-y-5">
                <div className="rounded-2xl bg-cream p-5">
                  <p className="text-xs uppercase tracking-wider font-mono text-graphite/50 mb-2">Lo que evitamos</p>
                  <p className="text-graphite/70 leading-relaxed">
                    Herramientas sin criterio y adopción sostenida por entusiasmo pasajero.
                  </p>
                </div>
                <div className="rounded-2xl bg-lavender/30 p-5">
                  <p className="text-xs uppercase tracking-wider font-mono text-cobalt mb-2">Lo que construimos</p>
                  <p className="text-graphite/75 leading-relaxed">
                    Criterio por rol y una base más sólida para automatizar después.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-mint/30 p-5 text-center">
                    <div className="font-mono text-3xl text-cobalt mb-2">4</div>
                    <div className="text-sm text-graphite/60">Trayectos por perfil</div>
                  </div>
                  <div className="rounded-2xl bg-cream p-5 text-center">
                    <div className="font-mono text-3xl text-orange mb-2">1</div>
                    <div className="text-sm text-graphite/60">Lenguaje compartido</div>
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 w-full h-full rounded-3xl top-4 left-4 bg-lavender/20" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-graphite mb-4">
              La pregunta ya no es si usar IA.
            </h2>
            <p className="text-graphite/70">La pregunta es cómo formar al equipo para usarla con criterio.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reasons.map((item) => (
              <div key={item.title} className="text-center px-4">
                <div className="w-16 h-16 bg-cream rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-orange" />
                </div>
                <h3 className="font-serif text-xl text-graphite mb-3">{item.title}</h3>
                <p className="text-graphite/70 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="trayectos" className="py-24 md:py-32 section-cream">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-white text-cobalt text-sm font-medium font-mono mb-5">
              Trayectos por perfil
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-graphite mb-4">
              Formación según el rol, no contenido igual para todos
            </h2>
            <p className="text-graphite/70">Cada persona aprende según su responsabilidad real.</p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {tracks.map((track) => (
              <div key={track.title} className="bg-white rounded-3xl p-8 shadow-soft">
                <h3 className="font-serif text-2xl text-graphite mb-3">{track.title}</h3>
                <p className="text-base text-graphite/70 leading-relaxed mb-5">{track.focus}</p>
                <div className="space-y-3 pt-4 border-t border-graphite/10">
                  {track.outcomes.map((outcome) => (
                    <div key={outcome} className="flex items-start gap-2 text-sm text-graphite/70">
                      <Target className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                      {outcome}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-14 items-start">
            <div className="bg-lavender/20 rounded-3xl p-9">
              <div className="flex items-center gap-3 mb-5">
                <GraduationCap className="w-5 h-5 text-cobalt" />
                <h3 className="font-serif text-2xl text-graphite">Metodología de adopción</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {methodology.map((step, index) => (
                  <div key={step} className="bg-white rounded-2xl p-4">
                    <div className="font-mono text-sm text-orange mb-2">0{index + 1}</div>
                    <p className="text-sm text-graphite/75 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-cream rounded-3xl p-9">
              <div className="flex items-center gap-3 mb-5">
                <BookOpen className="w-5 h-5 text-orange" />
                <h3 className="font-serif text-2xl text-graphite">Qué cambia después de formarse</h3>
              </div>
              <ul className="space-y-4 mb-8">
                {results.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Target className="w-4 h-4 text-cobalt mt-1 shrink-0" />
                    <span className="text-graphite/75 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-graphite/65 leading-relaxed">
                iAprende funciona como una base para adoptar mejor. Cada trayecto puede cerrarse con un caso de uso priorizado y un criterio de éxito observable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 section-cream">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="bg-white rounded-3xl p-10 md:p-16 text-center shadow-soft-lg">
            <GraduationCap className="w-12 h-12 text-cobalt mx-auto mb-6" />
            <h2 className="font-serif text-2xl md:text-3xl text-graphite mb-4">
              La mejor automatización empieza por preparar a las personas correctas.
            </h2>
            <p className="text-graphite/70 max-w-2xl mx-auto mb-8">
              Si quieres que la IA se vuelva capacidad real, empecemos por tu equipo.
            </p>
            <Link to="/contacto" className="btn-primary gap-2 inline-flex">
              Evaluar la madurez del equipo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
