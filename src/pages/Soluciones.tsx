import { ArrowRight, Brain, Check, Code2, Settings, Target, Users2, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

const soluciones = [
  {
    id: 'software',
    icon: Code2,
    title: 'Desarrollo de Software',
    subtitle: 'Para procesos que ya no deben depender de memoria o seguimiento manual',
    forWho: 'Equipos que necesitan visibilidad, control y trazabilidad.',
    resolves: 'Convierte pasos dispersos en flujos claros y fáciles de operar.',
    deliverables: ['Apps internas y paneles', 'Seguimiento y trazabilidad'],
    outcomes: ['Menos reproceso', 'Decisiones más rápidas'],
    signs: ['Tu operación vive en mensajes', 'Nadie ve el estado real en un solo lugar'],
    cta: 'Quiero automatizar un flujo',
    color: 'mint',
  },
  {
    id: 'ia',
    icon: Brain,
    title: 'Orquestación de Agentes',
    subtitle: 'Para equipos que quieren bajar la IA a trabajo útil',
    forWho: 'Líderes que buscan asistentes con criterio, no prompts sueltos.',
    resolves: 'Ordena tareas, contexto y validación para que la IA apoye de verdad.',
    deliverables: ['Copilotos por rol', 'Reglas de uso y validación'],
    outcomes: ['Más velocidad con criterio', 'Menos improvisación'],
    signs: ['Tu equipo usa IA sin política compartida', 'Necesitas bajar IA a casos reales'],
    cta: 'Quiero diseñar un copiloto',
    color: 'lavender',
  },
  {
    id: 'consultoria',
    icon: Settings,
    title: 'Consultoría Industrial',
    subtitle: 'Para empresas que necesitan una ruta clara antes de invertir más',
    forWho: 'Dirección y gerencia que necesitan decidir por dónde empezar.',
    resolves: 'Aterriza prioridades, quick wins y una ruta acorde con tu madurez.',
    deliverables: ['Diagnóstico de madurez', 'Roadmap con prioridades'],
    outcomes: ['Menos riesgo', 'Siguiente paso claro'],
    signs: ['Sabes que debes moverte, pero no por dónde', 'Necesitas criterio antes de ejecutar'],
    cta: 'Quiero un roadmap de transformación',
    color: 'cream',
  },
];

const decisionGuide = [
  ['Formar criterio antes de implementar', 'Academia'],
  ['Resolver un proceso manual', 'Software'],
  ['Crear asistentes con reglas y contexto', 'Agentes'],
  ['Definir por dónde empezar', 'Consultoría'],
];

const methodology = ['Diagnóstico', 'Diseño', 'Implementación', 'Validación', 'Adopción'];

export function Soluciones() {
  useSEO({
    title: 'Soluciones IA a medida | Desarrollos Elaborados',
    description:
      'Software industrial, agentes con criterio y consultoría para PyMEs industriales. Implementamos con método, validación y foco en adopción real.',
    canonicalPath: '/soluciones',
  });

  return (
    <main className="min-h-screen pt-20">
      <section className="section-cream py-24 md:py-32">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-2 rounded-full bg-mint/50 text-cobalt text-sm font-medium font-mono mb-6">
              Soluciones para madurez real
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-graphite mb-6">
              Tecnología que <span className="text-orange">resiste la realidad</span>
            </h1>
            <p className="text-lg md:text-xl text-graphite/70 leading-relaxed max-w-3xl">
              Formar, automatizar o priorizar. Aquí elegimos el siguiente paso con más claridad y menos ruido.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-28 bg-white">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-start">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-graphite mb-4">
                Elige por necesidad,
                <span className="text-orange"> no por moda.</span>
              </h2>
              <p className="text-graphite/70 leading-relaxed max-w-2xl">
                Cada ruta responde una pregunta simple: qué problema resuelve y cuándo conviene entrar por ahí.
              </p>
            </div>

            <div className="bg-cream rounded-3xl p-9">
              <div className="flex items-center gap-3 mb-5">
                <Target className="w-5 h-5 text-orange" />
                <h3 className="font-serif text-2xl text-graphite">Empieza por aquí</h3>
              </div>
              <div className="space-y-4">
                {decisionGuide.map(([need, route]) => (
                  <div key={need} className="bg-white rounded-2xl p-4 flex items-start justify-between gap-4">
                    <p className="text-sm text-graphite/75 leading-relaxed">{need}</p>
                    <span className="px-3 py-1 rounded-full bg-orange/10 text-orange text-xs font-mono whitespace-nowrap">
                      {route}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-white border-t border-graphite/5">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="space-y-24">
            {soluciones.map((solucion, index) => (
              <div
                key={solucion.id}
                id={solucion.id}
                className={`grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-20 items-start scroll-mt-24 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                      solucion.color === 'mint'
                        ? 'bg-mint'
                        : solucion.color === 'lavender'
                          ? 'bg-lavender'
                          : 'bg-cream border border-gray-200'
                    }`}
                  >
                    <solucion.icon className="w-8 h-8 text-graphite" />
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl md:text-3xl text-graphite mb-2">{solucion.title}</h2>
                    <p className="text-cobalt font-mono text-sm leading-relaxed">{solucion.subtitle}</p>
                  </div>

                  <div className="space-y-5 max-w-xl">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-graphite/45 mb-2">Para quién aplica</p>
                      <p className="text-graphite/75 leading-relaxed">{solucion.forWho}</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-graphite/45 mb-2">Qué resuelve</p>
                      <p className="text-graphite/75 leading-relaxed">{solucion.resolves}</p>
                    </div>
                  </div>

                  <Link to="/contacto" className="inline-flex items-center gap-2 text-orange font-medium hover:gap-3 transition-all">
                    {solucion.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="rounded-3xl p-8 bg-cream">
                    <div className="flex items-center gap-3 mb-4">
                      <Wrench className="w-5 h-5 text-orange" />
                      <h3 className="font-medium text-graphite">Entregables</h3>
                    </div>
                    <ul className="space-y-3">
                      {solucion.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-3 bg-white/80 rounded-2xl px-4 py-3">
                          <Check className="w-4 h-4 text-orange mt-0.5 shrink-0" />
                          <span className="text-sm text-graphite/75">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="rounded-3xl p-7 bg-white border border-graphite/10 shadow-soft">
                      <div className="flex items-center gap-3 mb-4">
                        <Users2 className="w-5 h-5 text-cobalt" />
                        <h3 className="font-medium text-graphite">Resultados</h3>
                      </div>
                      <ul className="space-y-3">
                        {solucion.outcomes.map((item) => (
                          <li key={item} className="text-sm text-graphite/70 leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-3xl p-7 bg-white border border-graphite/10 shadow-soft">
                      <div className="flex items-center gap-3 mb-4">
                        <Target className="w-5 h-5 text-orange" />
                        <h3 className="font-medium text-graphite">Senales</h3>
                      </div>
                      <ul className="space-y-3">
                        {solucion.signs.map((item) => (
                          <li key={item} className="text-sm text-graphite/70 leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 section-cream">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="bg-white rounded-3xl p-10 md:p-14 shadow-soft-lg">
            <div className="max-w-3xl mb-8">
              <span className="inline-block px-4 py-2 rounded-full bg-cobalt/5 text-cobalt text-sm font-medium font-mono mb-5">
                Método de trabajo
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-graphite mb-4">
                Diagnóstico, diseño, implementación, validación y adopción
              </h2>
              <p className="text-graphite/70 leading-relaxed">La diferencia no es solo la herramienta. Es el método.</p>
            </div>

            <div className="grid md:grid-cols-5 gap-4">
              {methodology.map((step, index) => (
                <div key={step} className="rounded-2xl bg-cream p-5">
                  <div className="font-mono text-orange text-sm mb-3">0{index + 1}</div>
                  <p className="text-sm text-graphite/75 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="bg-cream rounded-3xl p-10 md:p-16 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-graphite mb-4">
                No necesitas elegir la herramienta más ruidosa.
            </h2>
            <p className="text-graphite/70 max-w-2xl mx-auto mb-8">
                Necesitas elegir el siguiente paso correcto para tu equipo y tu operación.
            </p>
            <Link to="/contacto" className="btn-primary gap-2 inline-flex">
              Agendar llamada de descubrimiento
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
