import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { CONTACT_EMAIL } from '../lib/contact';

export function Privacidad() {
  return (
    <main className="min-h-screen pt-20">
      <section className="section-cream py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Link to="/" className="inline-flex items-center gap-2 text-graphite/60 hover:text-orange transition-colors mb-8 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-cobalt/10 rounded-xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-cobalt" />
            </div>
            <div>
              <span className="text-sm font-mono text-cobalt">Legal</span>
              <h1 className="font-serif text-3xl md:text-4xl text-graphite">Política de Privacidad</h1>
            </div>
          </div>
          <p className="text-graphite/60 text-sm">Última actualización: abril de 2026</p>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="space-y-10 text-graphite/80 leading-relaxed">
            <div className="bg-cobalt/5 border border-cobalt/20 rounded-2xl p-6">
              <p className="text-cobalt font-medium">
                <strong>Desarrollos Elaborados</strong>, con domicilio en Monclova, Coahuila, México, es responsable del uso y protección de sus datos personales conforme a la LFPDPPP y su Reglamento.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-graphite mb-4">1. Datos personales que recabamos</h2>
              <p className="mb-3">Podemos recabar los siguientes datos cuando utilizas nuestro formulario o canales de contacto:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nombre completo</li>
                <li>Correo electrónico</li>
                <li>Teléfono, de forma opcional</li>
                <li>Nombre y tipo de empresa</li>
                <li>Objetivo principal, etapa de madurez y urgencia compartidos por ti</li>
                <li>Información sobre tus necesidades, proyectos o retos</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-graphite mb-4">2. Finalidades del tratamiento</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Responder solicitudes de diagnóstico, cotización o información</li>
                <li>Comprender mejor tu contexto para orientar el siguiente paso recomendado</li>
                <li>Contactarte por correo, teléfono o WhatsApp cuando lo solicites o permitas</li>
                <li>Brindar servicios de software, consultoría, manufactura o formación</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-graphite mb-4">3. Uso de CRM, correo y mensajería</h2>
              <p>
                La información que compartas puede almacenarse en nuestras herramientas internas de seguimiento comercial y atención, incluyendo formularios web, correo y canales de mensajería como WhatsApp, con el fin de dar continuidad a tu solicitud.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-graphite mb-4">4. Derechos ARCO</h2>
              <p className="mb-3">
                Puedes ejercer tus derechos de Acceso, Rectificación, Cancelación u Oposición escribiendo a:
              </p>
              <div className="bg-cream rounded-xl p-5 space-y-1">
                <p>
                  <strong>Correo:</strong>{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-orange hover:underline">
                    {CONTACT_EMAIL}
                  </a>
                </p>
                <p>
                  <strong>Asunto:</strong> Solicitud ARCO
                </p>
                <p>
                  <strong>Domicilio:</strong> Monclova, Coahuila, México
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-graphite mb-4">5. Cambios al aviso</h2>
              <p>
                Podemos actualizar esta política para reflejar cambios operativos, legales o del sitio. Cualquier ajuste se publicará en esta misma página.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 section-cream">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <p className="text-graphite/60 mb-4 text-sm">Si tienes dudas sobre privacidad o tratamiento de datos, podemos atenderte.</p>
          <Link to="/contacto" className="btn-primary gap-2 inline-flex">
            Contactanos
          </Link>
        </div>
      </section>
    </main>
  );
}
