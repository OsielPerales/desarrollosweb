import { ArrowRight, Check, Cog, Factory, Ruler, Shield, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

const capacidades = [
  {
    icon: Cog,
    title: 'Validación de procesos',
    description: 'Probamos flujos y decisiones en una realidad donde el tiempo y el error importan.',
    specs: ['Entorno con fricción real', 'Aprendizaje antes de vender'],
  },
  {
    icon: Ruler,
    title: 'Manufactura de precisión',
    description: 'Fabricamos prototipos y pequeñas series cuando el proyecto pide materializar y validar.',
    specs: ['Tolerancias a confirmar por proyecto', 'Prototipado y series cortas'],
  },
  {
    icon: Shield,
    title: 'Control y criterio',
    description: 'El laboratorio existe para reducir riesgo antes de proponer.',
    specs: ['Menos promesa vacía', 'Más criterio operacional'],
  },
];

const philosophy = [
  'Primero probamos y luego recomendamos.',
  'Documentamos fricciones y ajustes antes de vender.',
  'La manufactura nos obliga a hablar con precisión.',
  'Cada validación reduce incertidumbre.',
];

const evidence = [
  {
    title: 'Automatización',
    description: 'Una idea pasa por evaluación de riesgo antes de convertirse en propuesta.',
  },
  {
    title: 'Software',
    description: 'Una mejora se observa contra tiempos y secuencia reales antes de escalar.',
  },
  {
    title: 'Manufactura',
    description: 'Una necesidad se convierte en aprendizaje sobre tolerancias y limites reales.',
  },
];

export function Laboratorio() {
  useSEO({
    title: 'Laboratorio de validación | Desarrollos Elaborados',
    description:
      'Validamos tecnología, procesos y manufactura en un entorno real para reducir riesgo antes de proponer soluciones a nuestros clientes.',
    canonicalPath: '/laboratorio',
  });

  return (
    <main className="min-h-screen pt-20">
      <section className="section-cream py-24 md:py-32">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-[0.88fr_1.12fr] gap-14 lg:gap-24 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-mint/50 text-cobalt text-sm font-medium font-mono mb-6">
                Corte y Diseño CNC
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-graphite mb-6">
                Validación <span className="text-orange">tangible</span>
              </h1>
              <p className="text-lg md:text-xl text-graphite/70 leading-relaxed mb-8 max-w-2xl">
                Validamos ideas, herramientas y decisiones en una operación industrial que ya conoce la fricción real.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contacto" className="btn-primary gap-2">
                  Quiero validar una solución
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/contacto" className="btn-secondary gap-2">
                  Quiero una cotización de manufactura
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative max-w-[34rem] ml-auto w-full">
              <div className="bg-white rounded-3xl shadow-soft-lg p-8 space-y-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-graphite/50 uppercase tracking-wider">Lo que gana el cliente</span>
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-mint/20 rounded-2xl p-5 text-center">
                    <div className="font-mono text-2xl text-cobalt font-bold">Menos</div>
                    <div className="text-xs text-graphite/60 mt-1">riesgo de compra</div>
                  </div>
                  <div className="bg-lavender/20 rounded-2xl p-5 text-center">
                    <div className="font-mono text-2xl text-cobalt font-bold">Mas</div>
                    <div className="text-xs text-graphite/60 mt-1">criterio operativo</div>
                  </div>
                  <div className="bg-cream rounded-2xl p-5 text-center">
                    <div className="font-mono text-2xl text-orange font-bold">1</div>
                    <div className="text-xs text-graphite/60 mt-1">entorno real de prueba</div>
                  </div>
                  <div className="bg-mint/20 rounded-2xl p-5 text-center">
                    <div className="font-mono text-2xl text-graphite font-bold">Caso a caso</div>
                    <div className="text-xs text-graphite/60 mt-1">validación del alcance</div>
                  </div>
                </div>

                <div className="rounded-2xl bg-orange text-white p-5">
                  <div className="font-mono text-sm text-white/80 mb-2">En pocas palabras</div>
                  <p className="text-sm leading-relaxed">
                    No te vendemos hipótesis. Reducimos riesgo porque ya vivimos tiempos, errores y presión operativa.
                  </p>
                </div>
              </div>
              <div className="absolute -z-10 w-full h-full rounded-3xl top-4 left-4 bg-mint/10" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-cream rounded-3xl p-8 md:p-12">
                <Factory className="w-16 h-16 text-orange mb-6" />
                <blockquote className="font-serif text-2xl md:text-3xl text-graphite leading-relaxed mb-6">
                  "Primero probamos. Luego ajustamos. Después recomendamos."
                </blockquote>
                <p className="text-graphite/70 leading-relaxed">Ese es el centro de nuestro método.</p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="font-serif text-3xl md:text-4xl text-graphite mb-6">
                Nuestro método de validación
              </h2>
              <p className="text-graphite/70 leading-relaxed mb-8">
                El laboratorio es una de las razones por las que nuestras recomendaciones tienen más fundamento.
              </p>

              <ul className="space-y-4">
                {philosophy.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-orange" />
                    </div>
                    <span className="text-graphite/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 section-cream">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-graphite mb-4">
              Separar validación y manufactura da más claridad
            </h2>
            <p className="text-graphite/70">
              El laboratorio explica por qué confiar. La manufactura explica lo que también podemos fabricar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {capacidades.map((cap) => (
              <div key={cap.title} className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300">
                <div className="w-14 h-14 bg-mint/30 rounded-xl flex items-center justify-center mb-6">
                  <cap.icon className="w-7 h-7 text-graphite" />
                </div>

                <h3 className="font-serif text-xl text-graphite mb-3">{cap.title}</h3>
                <p className="text-graphite/70 text-sm leading-relaxed mb-6">{cap.description}</p>

                <div className="space-y-2">
                  {cap.specs.map((spec) => (
                    <div key={spec} className="flex items-center gap-2 text-sm text-graphite/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange" />
                      {spec}
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
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-orange/10 text-orange text-sm font-medium font-mono mb-5">
              Evidencia viva
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-graphite mb-4">
              De la credencial a la prueba
            </h2>
            <p className="text-graphite/70">
              Escenarios donde el laboratorio deja de ser discurso y se vuelve criterio real.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {evidence.map((item) => (
              <div key={item.title} className="rounded-3xl bg-cream p-7">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-5">
                  <Target className="w-5 h-5 text-orange" />
                </div>
                <h3 className="font-serif text-2xl text-graphite mb-3">{item.title}</h3>
                <p className="text-sm text-graphite/70 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
