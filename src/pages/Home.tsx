import { Link } from 'react-router-dom';
import { ArrowRight, BrainCircuit, Factory, GraduationCap } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export function Home() {
  useSEO({
    title: 'Desarrollos Elaborados | Consultoría IA & Capacitación a Medida',
    description: 'Consultoría especializada en soluciones de IA y capacitación a medida para empresas industriales en México. Automatización inteligente, Orquestación de Agentes y plataforma educativa iAprende.',
    canonicalPath: '/',
  });

  return (
    <main className="min-h-screen">
      <section className="section-cream min-h-screen flex items-center pt-20 pb-12 lg:pb-0">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full"><div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8 animate-fade-in"><div className="space-y-4">
            <span className="inline-block px-4 py-2 rounded-full bg-mint/50 text-cobalt text-sm font-medium font-mono">Ingeniería Humanista</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-graphite leading-tight">Habilidades humanas, <span className="text-orange">potenciadas con IA.</span></h1>
            <p className="text-lg md:text-xl text-graphite/70 max-w-xl leading-relaxed">&quot;Todo gran proyecto comienza con el conocimiento correcto. La capacitación es el primer paso para dominar la Inteligencia Artificial&quot;</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4"><Link to="/contacto" className="btn-primary gap-2">Iniciar Diagnóstico<ArrowRight className="w-4 h-4" /></Link><Link to="/soluciones" className="btn-secondary gap-2">Explorar Soluciones<ArrowRight className="w-4 h-4" /></Link></div>
          <div className="flex flex-wrap gap-8 pt-8 border-t border-graphite/10"><Stat label="Aprende" text="Plataforma Educativa" color="text-cobalt" /><Stat label="Aplica" text="Desarrollo de Soluciones" color="text-graphite" /><Stat label="Escala" text="Resultados Reales" color="text-orange" /></div></div>
          <div className="relative mt-10 lg:mt-0"><div className="relative z-10 bg-white rounded-2xl shadow-soft-lg p-8 space-y-6"><div className="absolute -top-4 -right-4 w-24 h-24 bg-mint rounded-full opacity-60 blur-2xl" /><div className="absolute -bottom-4 -left-4 w-32 h-32 bg-lavender rounded-full opacity-60 blur-2xl" /><div className="space-y-4">
            <Capability icon={<GraduationCap className="w-6 h-6 text-cobalt" />} title="Plataforma iAprende" subtitle="Capacitación y Prompt Engineering." description="El primer paso. Domina las herramientas de IA para entender su potencial en tu sector." color="bg-cobalt/10" />
            <Capability icon={<BrainCircuit className="w-6 h-6 text-orange" />} title="Desarrollo de Software y Agentes" subtitle="Soluciones a la medida (Agentes, Apps)." description="Creamos sistemas multiagente y aplicaciones impulsadas por IA que resuelven tus problemas específicos." color="bg-orange/10" />
            <Capability icon={<Factory className="w-6 h-6 text-graphite" />} title="Laboratorio de Validación" subtitle="Ingeniería probada en el mundo real." description="Probamos nuestras tecnologías en nuestro propio ecosistema de manufactura (Corte y Diseño CNC) para evaluar su eficacia." color="bg-mint" />
          </div></div></div>
        </div></div>
      </section>
      <section className="py-20 md:py-28 bg-white"><div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16"><div className="text-center max-w-2xl mx-auto mb-16"><h2 className="font-serif text-3xl md:text-4xl text-graphite mb-4">Nuestra Tríada de Valor</h2><p className="text-graphite/70">Tres pilares indivisibles que conforman nuestro enfoque integral de transformación industrial.</p></div><div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        <ValueCard to="/academia" className="card-lavender" icon={<GraduationCap className="w-7 h-7 text-cobalt" />} title="Academia" text="Plataforma 'iAprende' y cursos de alfabetización digital para empoderar a tu equipo operativo y directivo." action="Descubrir" />
        <ValueCard to="/soluciones" className="card-mint" icon={<BrainCircuit className="w-7 h-7 text-graphite" />} title="Soluciones" text="Desarrollo de software a medida, Orquestación de Agentes mediante copilotos profesionales y consultoría industrial especializada." action="Explorar" />
        <ValueCard to="/laboratorio" className="card-cream" icon={<Factory className="w-7 h-7 text-graphite" />} title="Laboratorio" text="Conexión directa con 'Corte y Diseño CNC'. Validamos cada innovación en manufactura física real." action="Conocer" />
      </div></div></section>
      <section className="py-20 md:py-28 section-cream"><div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 text-center"><span className="inline-block px-4 py-2 rounded-full bg-lavender/50 text-cobalt text-sm font-medium font-mono mb-8">Nuestro Manifiesto</span><blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-graphite leading-relaxed mb-8">&quot;Democratizar la manufactura de alta precisión mediante la orquestación simbiótica entre la inteligencia humana y artificial, cerrando la brecha entre la educación digital y la ejecución industrial.&quot;</blockquote><div className="flex items-center justify-center gap-4"><div className="w-12 h-px bg-graphite/20" /><span className="text-graphite/60 text-sm">Nuestra Misión</span><div className="w-12 h-px bg-graphite/20" /></div></div></section>
      <section className="py-20 md:py-28 bg-white"><div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16"><div className="bg-cream rounded-3xl p-8 md:p-16 text-center relative overflow-hidden"><div className="absolute top-0 right-0 w-64 h-64 bg-orange/5 rounded-full -translate-y-1/2 translate-x-1/2" /><div className="absolute bottom-0 left-0 w-48 h-48 bg-mint/50 rounded-full translate-y-1/2 -translate-x-1/2" /><div className="relative z-10 max-w-2xl mx-auto"><h2 className="font-serif text-3xl md:text-4xl text-graphite mb-4">¿Listo para transformar tu industria?</h2><p className="text-graphite/70 mb-8">Agenda un diagnóstico gratuito y descubre cómo nuestra tríada de valor puede impulsar tu transformación digital.</p><Link to="/contacto" className="btn-primary gap-2 inline-flex">Iniciar Diagnóstico Gratuito<ArrowRight className="w-4 h-4" /></Link></div></div></div></section>
    </main>
  );
}

function Stat({ label, text, color }: { label: string; text: string; color: string }) { return <div><div className={`font-mono text-2xl md:text-3xl ${color} font-medium`}>{label}</div><div className="text-sm text-graphite/60 mt-1">{text}</div></div>; }

function Capability({ icon, title, subtitle, description, color }: { icon: React.ReactNode; title: string; subtitle: string; description: string; color: string }) { return <div className="group flex flex-col p-4 bg-cream transition-all duration-300 rounded-xl hover:bg-white border border-transparent hover:border-graphite/10 shadow-sm cursor-default overflow-hidden"><div className="flex items-center gap-4"><div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105`}>{icon}</div><div><div className="font-medium text-graphite">{title}</div><div className="text-sm text-graphite/60 font-mono">{subtitle}</div></div></div><div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-all duration-300"><div className="min-h-0"><p className="pt-3 text-sm text-graphite/70 leading-relaxed border-t border-graphite/5 mt-3">{description}</p></div></div></div>; }

function ValueCard({ to, className, icon, title, text, action }: { to: string; className: string; icon: React.ReactNode; title: string; text: string; action: string }) { return <Link to={to} className={`group ${className} hover:shadow-soft-lg transition-all duration-300`}><div className="w-14 h-14 bg-white/60 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">{icon}</div><h3 className="font-serif text-xl text-graphite mb-3">{title}</h3><p className="text-graphite/70 text-sm leading-relaxed mb-6">{text}</p><div className="flex items-center gap-2 text-graphite font-medium text-sm group-hover:text-orange transition-colors">{action}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div></Link>; }
