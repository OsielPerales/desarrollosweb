import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';

export function Terminos() {
  return (
    <main className="min-h-screen pt-20">
      <section className="section-cream py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Link to="/" className="inline-flex items-center gap-2 text-graphite/60 hover:text-orange transition-colors mb-8 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-orange/10 rounded-xl flex items-center justify-center">
              <FileText className="w-7 h-7 text-orange" />
            </div>
            <div>
              <span className="text-sm font-mono text-orange">Legal</span>
              <h1 className="font-serif text-3xl md:text-4xl text-graphite">Términos de Servicio</h1>
            </div>
          </div>
          <p className="text-graphite/60 text-sm">Última actualización: abril de 2026 · Vigentes en la República Mexicana</p>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="space-y-10 text-graphite/80 leading-relaxed">
            <div className="bg-orange/5 border border-orange/20 rounded-2xl p-6">
              <p className="text-graphite/80">
                Al utilizar los servicios de <strong>Desarrollos Elaborados</strong> aceptas estos Términos de Servicio. Los servicios pueden incluir software, consultoría, formación, diagnósticos, manufactura o acompañamiento relacionado con adopción tecnológica e IA aplicada.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-graphite mb-4">1. Descripción general</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Desarrollo de software industrial y herramientas internas</li>
                <li>Orquestación de agentes y asistentes para procesos</li>
                <li>Consultoría de madurez digital y transformación</li>
                <li>Programas de formación y alfabetización digital</li>
                <li>Servicios de manufactura y validación cuando aplique</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-graphite mb-4">2. Propuestas y diagnósticos</h2>
              <p>
                Los diagnósticos iniciales y las llamadas de descubrimiento no implican por sí mismos una obligación de contratar. Las propuestas económicas tendrán la vigencia que se indique por escrito.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-graphite mb-4">3. Propiedad intelectual</h2>
              <p>
                Salvo acuerdo contractual específico, las metodologías, materiales educativos, marcos de trabajo y componentes base desarrollados por DE permanecen como propiedad intelectual de la empresa. El cliente recibirá los derechos o licencias que se pacten en cada proyecto.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-graphite mb-4">4. Confidencialidad y uso responsable</h2>
              <p>
                Ambas partes se comprometen a tratar con confidencialidad la información compartida durante el proceso comercial y operativo, conforme a lo que se pacte por contrato o por prácticas razonables de negocio.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-graphite mb-4">5. Limitacion de responsabilidad</h2>
              <p>
                Toda recomendación técnica o de implementación debe evaluarse dentro del contexto operativo del cliente. DE recomienda realizar validaciones y pruebas antes de pasar a entornos productivos cuando el proyecto lo requiera.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-graphite mb-4">6. Jurisdiccion</h2>
              <p>
                Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier controversia se someterá a los tribunales competentes de Monclova, Coahuila, México, salvo pacto distinto por escrito.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 section-cream">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <p className="text-graphite/60 mb-4 text-sm">Si tienes dudas sobre el alcance de nuestros servicios, podemos revisarlas contigo.</p>
          <Link to="/contacto" className="btn-primary gap-2 inline-flex">
            Hablar con el equipo
          </Link>
        </div>
      </section>
    </main>
  );
}
