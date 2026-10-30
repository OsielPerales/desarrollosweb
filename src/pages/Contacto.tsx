import { useState } from 'react';
import { createLead } from '../hub/leadsService';
import { AlertCircle, ArrowRight, Check, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, WHATSAPP_URL } from '../lib/contact';

const tiposEmpresa = [
  'PyME metalmecánica',
  'Taller de manufactura',
  'Empresa industrial',
  'Consultora',
  'Otro',
];

const intereses = [
  { id: 'software', label: 'Desarrollo de Software' },
  { id: 'ia', label: 'Orquestación de Agentes' },
  { id: 'consultoria', label: 'Consultoría Industrial' },
  { id: 'academia', label: 'Plataforma iAprende' },
  { id: 'cnc', label: 'Servicios CNC' },
];

const objectives = [
  'Capacitar a mi equipo',
  'Automatizar un proceso',
  'Diagnosticar adopción de IA',
  'Fabricar o prototipar',
  'Explorar colaboracion',
];

const maturityStages = [
  'Apenas explorando',
  'Ya probamos herramientas',
  'Queremos implementar pronto',
];

const urgencyOptions = ['Este mes', 'Este trimestre', 'Sin urgencia inmediata'];

export function Contacto() {
  useSEO({
    title: 'Diagnóstico IA | Contacto | Desarrollos Elaborados',
    description:
      'Cuéntanos en qué etapa está tu empresa. Te ayudamos a ordenar el siguiente movimiento: formación, implementación, diagnóstico o validación.',
    canonicalPath: '/contacto',
  });

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    tipoEmpresa: '',
    intereses: [] as string[],
    objetivo: '',
    etapa: '',
    urgencia: '',
    mensaje: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ nombre?: boolean; email?: boolean }>({});

  const validate = () => {
    const newErrors: { nombre?: boolean; email?: boolean } = {};
    if (!formData.nombre.trim()) newErrors.nombre = true;
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const interesesLabels = formData.intereses
    .map((id) => intereses.find((i) => i.id === id)?.label)
    .filter(Boolean)
    .join(', ');

  const enrichedMessage = [
    formData.objetivo ? `Objetivo principal: ${formData.objetivo}` : '',
    formData.etapa ? `Etapa actual: ${formData.etapa}` : '',
    formData.urgencia ? `Urgencia: ${formData.urgencia}` : '',
    interesesLabels ? `Intereses: ${interesesLabels}` : '',
    formData.mensaje ? `Mensaje:\n${formData.mensaje}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const buildMailtoBody = () =>
    [
      `Nombre: ${formData.nombre}`,
      `Correo: ${formData.email}`,
      formData.telefono ? `Teléfono: ${formData.telefono}` : '',
      formData.empresa ? `Empresa: ${formData.empresa}` : '',
      formData.tipoEmpresa ? `Tipo de empresa: ${formData.tipoEmpresa}` : '',
      enrichedMessage,
    ]
      .filter(Boolean)
      .join('\n');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await createLead({
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        empresa: formData.empresa,
        tipoEmpresa: formData.tipoEmpresa,
        intereses: formData.intereses,
        mensaje: enrichedMessage,
        source: 'web_contacto',
      });
      setIsSubmitted(true);
    } catch (err) {
      console.warn('[HUB] Error guardando lead en Firestore:', err);
      const subject = encodeURIComponent(`Diagnóstico DE - ${formData.nombre}${formData.empresa ? ` (${formData.empresa})` : ''}`);
      const body = encodeURIComponent(buildMailtoBody());
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      setIsSubmitted(true);
    }
  };

  const handleWhatsApp = () => {
    const msg = [
      'Hola, me interesa ordenar el siguiente paso de mi empresa.',
      formData.nombre ? `Soy ${formData.nombre}` : '',
      formData.empresa ? `de ${formData.empresa}` : '',
      formData.objetivo ? `Objetivo: ${formData.objetivo}` : '',
      formData.etapa ? `Etapa: ${formData.etapa}` : '',
      formData.urgencia ? `Urgencia: ${formData.urgencia}` : '',
      interesesLabels ? `Intereses: ${interesesLabels}` : '',
      formData.mensaje ? `Contexto: ${formData.mensaje}` : '',
    ]
      .filter(Boolean)
      .join(' | ');

    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const toggleInteres = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      intereses: prev.intereses.includes(id)
        ? prev.intereses.filter((i) => i !== id)
        : [...prev.intereses, id],
    }));
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen pt-20">
        <section className="section-cream min-h-[80vh] flex items-center">
          <div className="max-w-2xl mx-auto px-6 md:px-12 lg:px-16 text-center">
            <div className="w-20 h-20 bg-mint rounded-full flex items-center justify-center mx-auto mb-8">
              <Check className="w-10 h-10 text-graphite" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-graphite mb-4">Tu solicitud ya quedó registrada</h1>
            <p className="text-graphite/70 mb-4">
              Ahora llegaremos a la conversación con mejor contexto sobre tu etapa y prioridades.
            </p>
            <p className="text-graphite/60 text-sm mb-8">
              Si necesitas acelerar la conversación, puedes continuar por WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleWhatsApp}
                className="btn-primary gap-2 inline-flex items-center justify-center bg-green-600 hover:bg-green-700 border-green-600"
              >
                <MessageCircle className="w-4 h-4" />
                Continuar por WhatsApp
              </button>
              <a href="/" className="btn-secondary gap-2 inline-flex items-center justify-center">
                Volver al inicio
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const inputClass = (hasError?: boolean) =>
    `w-full px-4 py-3 rounded-xl border ${
      hasError ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:border-orange focus:ring-orange/20'
    } focus:ring-2 outline-none transition-all`;

  return (
    <main className="min-h-screen pt-20">
      <section className="section-cream py-20 md:py-28">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 rounded-full bg-orange/10 text-orange text-sm font-medium font-mono mb-6">
              Discovery guiado
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-graphite mb-6">
              Ordenemos tu <span className="text-orange">siguiente movimiento</span>
            </h1>
            <p className="text-lg md:text-xl text-graphite/70 leading-relaxed">
              Cuéntanos tu momento y te ayudamos a decidir si conviene formar, automatizar, diagnosticar o validar.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-20 items-start">
            <div className="order-2 lg:order-1">
              <form onSubmit={handleSubmit} noValidate className="space-y-8">
                <div className="space-y-6">
                  <h2 className="font-serif text-xl text-graphite">Información de contacto</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium text-graphite mb-2">
                        Nombre completo <span className="text-orange">*</span>
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        autoComplete="name"
                        required
                        aria-invalid={errors.nombre || undefined}
                        value={formData.nombre}
                        onChange={(e) => {
                          setFormData({ ...formData, nombre: e.target.value });
                          if (errors.nombre) setErrors({ ...errors, nombre: false });
                        }}
                        className={inputClass(errors.nombre)}
                        placeholder="Tu nombre"
                      />
                      {errors.nombre && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Este campo es obligatorio
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-graphite mb-2">
                        Correo electrónico <span className="text-orange">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        required
                        aria-invalid={errors.email || undefined}
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: false });
                        }}
                        className={inputClass(errors.email)}
                        placeholder="tu@empresa.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Correo electrónico inválido
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="telefono" className="block text-sm font-medium text-graphite mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        autoComplete="tel"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        className={inputClass()}
                        placeholder={CONTACT_PHONE_DISPLAY}
                      />
                    </div>

                    <div>
                      <label htmlFor="empresa" className="block text-sm font-medium text-graphite mb-2">
                        Nombre de la empresa
                      </label>
                      <input
                        type="text"
                        id="empresa"
                        name="empresa"
                        autoComplete="organization"
                        value={formData.empresa}
                        onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                        className={inputClass()}
                        placeholder="Tu empresa"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-xl text-graphite">Tipo de empresa</h2>
                  <div className="flex flex-wrap gap-3">
                    {tiposEmpresa.map((tipo) => (
                      <button
                        key={tipo}
                        type="button"
                        onClick={() => setFormData({ ...formData, tipoEmpresa: tipo })}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          formData.tipoEmpresa === tipo ? 'bg-orange text-white' : 'bg-cream text-graphite hover:bg-orange/10'
                        }`}
                      >
                        {tipo}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-xl text-graphite">Objetivo principal</h2>
                  <div className="flex flex-wrap gap-3">
                    {objectives.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setFormData({ ...formData, objetivo: item })}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          formData.objetivo === item ? 'bg-cobalt text-white' : 'bg-cream text-graphite hover:bg-cobalt/10'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h2 className="font-serif text-xl text-graphite">Etapa actual</h2>
                    <div className="flex flex-wrap gap-3">
                      {maturityStages.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setFormData({ ...formData, etapa: item })}
                          className={`px-4 py-2 rounded-full text-sm transition-all ${
                            formData.etapa === item ? 'bg-orange text-white' : 'bg-cream text-graphite hover:bg-orange/10'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="font-serif text-xl text-graphite">Urgencia</h2>
                    <div className="flex flex-wrap gap-3">
                      {urgencyOptions.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setFormData({ ...formData, urgencia: item })}
                          className={`px-4 py-2 rounded-full text-sm transition-all ${
                            formData.urgencia === item ? 'bg-orange text-white' : 'bg-cream text-graphite hover:bg-orange/10'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-xl text-graphite">Intereses</h2>
                  <p className="text-sm text-graphite/60">Selecciona una o más opciones.</p>
                  <div className="flex flex-wrap gap-3">
                    {intereses.map((interes) => (
                      <button
                        key={interes.id}
                        type="button"
                        onClick={() => toggleInteres(interes.id)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          formData.intereses.includes(interes.id)
                            ? 'bg-cobalt text-white'
                            : 'bg-cream text-graphite hover:bg-cobalt/10'
                        }`}
                      >
                        {formData.intereses.includes(interes.id) && <Check className="w-3 h-3 inline mr-1" />}
                        {interes.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-graphite mb-2">
                    Cuéntanos el contexto
                  </label>
                  <textarea
                    id="mensaje"
                    rows={5}
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    className={inputClass()}
                    placeholder="Qué problema buscas resolver o qué te gustaría validar primero."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button type="submit" className="btn-primary gap-2 flex items-center justify-center">
                    Enviar solicitud
                    <Send className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-green-500 text-green-700 font-semibold hover:bg-green-50 transition-colors text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Prefiero WhatsApp
                  </button>
                </div>
                <p className="text-xs text-graphite/40">
                  Al enviar, autorizas el tratamiento de tus datos conforme a nuestra{' '}
                  <a href="/privacidad" className="underline hover:text-orange">
                    Política de Privacidad
                  </a>
                  .
                </p>
              </form>
            </div>

            <div className="order-1 lg:order-2">
              <div className="bg-cream rounded-3xl p-8 space-y-8 lg:sticky lg:top-28">
                <div>
                  <h3 className="font-serif text-xl text-graphite mb-4">Qué pasa después de enviar</h3>
                  <div className="space-y-3">
                    <div className="bg-white rounded-2xl p-4">
                      <div className="font-mono text-xs text-orange mb-2">01</div>
                      <p className="text-sm text-graphite/75">Revisamos tu objetivo, etapa y urgencia.</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4">
                      <div className="font-mono text-xs text-orange mb-2">02</div>
                      <p className="text-sm text-graphite/75">Definimos si conviene diagnóstico, formación, implementación o validación.</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4">
                      <div className="font-mono text-xs text-orange mb-2">03</div>
                      <p className="text-sm text-graphite/75">Te proponemos un siguiente paso claro.</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-cobalt/5 border border-cobalt/10 p-5">
                  <div className="font-medium text-graphite text-sm mb-2">Tiempo de respuesta esperado</div>
                  <p className="text-sm text-graphite/70 leading-relaxed">
                    Respondemos dentro del horario laboral. Si es urgente, WhatsApp suele ser la vía más rápida.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-xs">
                      <Mail className="w-5 h-5 text-orange" />
                    </div>
                    <div>
                      <div className="font-medium text-graphite text-sm">Correo electrónico</div>
                      <a href={`mailto:${CONTACT_EMAIL}`} className="text-graphite/70 hover:text-orange transition-colors text-sm">
                        {CONTACT_EMAIL}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-xs">
                      <Phone className="w-5 h-5 text-orange" />
                    </div>
                    <div>
                      <div className="font-medium text-graphite text-sm">Teléfono / WhatsApp</div>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-graphite/70 hover:text-orange transition-colors text-sm"
                      >
                        {CONTACT_PHONE_DISPLAY}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-xs">
                      <MapPin className="w-5 h-5 text-orange" />
                    </div>
                    <div>
                      <div className="font-medium text-graphite text-sm">Ubicación</div>
                      <span className="text-graphite/70 text-sm">Monclova, Coahuila, México</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-graphite/10">
                  <div className="font-medium text-graphite text-sm mb-2">Horario de atencion</div>
                  <div className="text-graphite/70 text-sm">
                    Lunes a Viernes: 8:00 - 18:00
                    <br />
                    Sábado: 9:00 - 13:00
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
