import { ArrowRight, Eye, Heart, ShieldCheck, Sparkles, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

const values = [
  {
    icon: Heart,
    title: 'Ingeniería con propósito humano',
    belief: 'La tecnología debe elevar la capacidad del equipo.',
    benefit: 'Más adopción sana y mejor criterio operativo.',
  },
  {
    icon: Target,
    title: 'Validación tangible',
    belief: 'No confiamos en recomendaciones sin fricción real.',
    benefit: 'Menos riesgo y propuestas con mejor fundamento.',
  },
  {
    icon: Eye,
    title: 'Transparencia cognitiva',
    belief: 'La IA no debe operar como caja negra intocable.',
    benefit: 'Decisiones más claras y menos dependencia innecesaria.',
  },
  {
    icon: Sparkles,
    title: 'Claridad funcional',
    belief: 'La experiencia también importa en contextos industriales.',
    benefit: 'Procesos y herramientas más fáciles de entender.',
  },
];

const operatingModel = ['Formación', 'Software y agentes', 'Validación', 'Acompañamiento'];

export function Nosotros() {
  useSEO({
    title: 'Nosotros | Desarrollos Elaborados',
    description:
      'Somos un puente operativo entre formación, software y manufactura. Trabajamos con IA aplicada, criterio industrial y validación real.',
    canonicalPath: '/nosotros',
  });

  return (
    <main className="min-h-screen pt-20">
      <section className="section-cream py-24 md:py-32">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-lavender/50 text-cobalt text-sm font-medium font-mono mb-6">
              Quiénes somos en la operación
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-graphite mb-6">
              Somos el <span className="text-orange">puente operativo</span>
            </h1>
            <p className="text-lg md:text-xl text-graphite/70 leading-relaxed">
              Unimos formación, software y manufactura para que la IA entre con menos humo y más utilidad real.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
            <div className="bg-cream rounded-3xl p-9 md:p-12">
              <div className="w-14 h-14 bg-orange/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-orange" />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-graphite mb-4">Nuestra misión</h2>
              <p className="text-graphite/80 leading-relaxed">
                Democratizar la adopción de tecnología industrial de alto impacto con inteligencia humana, IA aplicada y validación real.
              </p>
            </div>

            <div className="bg-lavender/20 rounded-3xl p-9 md:p-12">
              <div className="w-14 h-14 bg-cobalt/10 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-cobalt" />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-graphite mb-4">Nuestra visión</h2>
              <p className="text-graphite/80 leading-relaxed">
                Construir una forma más clara y humana de transformar operaciones industriales.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 section-cream">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-14 items-start">
            <div className="bg-white rounded-3xl p-9 shadow-soft-lg">
              <div className="flex items-center gap-3 mb-5">
                <ShieldCheck className="w-5 h-5 text-orange" />
                <h2 className="font-serif text-2xl text-graphite">Modelo operativo</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {operatingModel.map((item, index) => (
                  <div key={item} className="rounded-2xl bg-cream p-4">
                    <div className="font-mono text-sm text-orange mb-2">0{index + 1}</div>
                    <p className="text-sm text-graphite/75 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-graphite mb-4">
                La tríada ya no es solo identidad.
                <span className="text-orange"> También explica cómo trabajamos.</span>
              </h2>
              <p className="text-graphite/70 leading-relaxed max-w-2xl">
                Educación, ingeniería y manufactura funcionan como un sistema visible de confianza, implementación y validación.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-graphite mb-4">Nuestros valores en acción</h2>
            <p className="text-graphite/70">Cuatro ideas que sostienen nuestra forma de trabajar.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-cream rounded-3xl p-9">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-xs">
                  <value.icon className="w-7 h-7 text-orange" />
                </div>
                <h3 className="font-serif text-2xl text-graphite mb-5">{value.title}</h3>
                <div className="space-y-4 text-sm leading-relaxed">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-cobalt mb-2">Idea central</p>
                    <p className="text-graphite/75">{value.belief}</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-cobalt mb-2">Impacto</p>
                    <p className="text-graphite/75">{value.benefit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 section-cream">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="bg-white rounded-3xl p-10 md:p-16 text-center shadow-soft-lg">
            <Heart className="w-12 h-12 text-orange mx-auto mb-6" />
            <h2 className="font-serif text-2xl md:text-3xl text-graphite mb-4">
              Si buscas un socio que combine criterio, implementación y validación, podemos conversar.
            </h2>
            <p className="text-graphite/70 max-w-2xl mx-auto mb-8">
              Nuestros principios no se quedan en discurso. Cambian cómo trabajamos contigo.
            </p>
            <Link to="/contacto" className="btn-primary gap-2 inline-flex">
              Explorar si somos el socio correcto
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
