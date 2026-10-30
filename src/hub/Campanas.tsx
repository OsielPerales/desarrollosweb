import { useState, useRef } from 'react';
import { 
  Megaphone, Image as ImageIcon, Send, CheckCircle, 
  UploadCloud, Loader2, Bot, Users, MessageCircle,
  Linkedin, Facebook, AlertTriangle, X, Sparkles
} from 'lucide-react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from '../lib/firebase';

const CAMPANA_FN_URL = import.meta.env.VITE_CAMPANA_FN_URL as string;
const REDACTOR_FN_URL = import.meta.env.VITE_REDACTOR_FN_URL as string;
const storage = getStorage(app);

interface Resultado {
  whatsapp?: { ok: boolean; sent?: number; failed?: number; total?: number; error?: string };
  linkedin?:  { ok: boolean; postId?: string; error?: string };
  facebook?:  { ok: boolean; postId?: string; error?: string };
}

export function Campanas() {
  const [mensaje,   setMensaje]   = useState('');
  const [flyerFile, setFlyerFile] = useState<File | null>(null);
  const [flyerPreview, setFlyerPreview] = useState<string | null>(null);
  const [flyerStorageUrl, setFlyerStorageUrl] = useState<string | null>(null);
  const [uploadingFlyer, setUploadingFlyer] = useState(false);

  const [canales, setCanales] = useState({
    whatsapp: true,
    linkedin: false,
    facebook: false,
  });

  const [loadingIA,  setLoadingIA]  = useState(false);
  const [isSending,  setIsSending]  = useState(false);
  const [resultado,  setResultado]  = useState<Resultado | null>(null);
  const [error,      setError]      = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // ── Subida de Flyer a Firebase Storage ──────────────────────────────────────
  const handleFlyerSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Tipo de archivo no permitido. Usa JPG, PNG, WEBP o GIF.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen excede 5MB. Por favor reduce su tamaño.');
      return;
    }
    setFlyerFile(file);
    setFlyerPreview(URL.createObjectURL(file));
    setFlyerStorageUrl(null);

    setUploadingFlyer(true);
    try {
      const storageRef = ref(storage, `campanas/flyers/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setFlyerStorageUrl(url);
    } catch (err) {
      setError('Error al subir imagen. Verifica los permisos de Firebase Storage.');
      console.error(err);
    } finally {
      setUploadingFlyer(false);
    }
  };

  const removeFlyer = () => {
    setFlyerFile(null);
    setFlyerPreview(null);
    setFlyerStorageUrl(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  // ── Agente Redactor vía proxy IA ────────────────────────────────────────────
  const handleSuggestCopy = async () => {
    setLoadingIA(true);
    try {
      const res = await fetch(REDACTOR_FN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'Eres el Agente Redactor de Desarrollos Elaborados, expertos en Ingeniería Industrial, CNC y Software en Monclova, México. Redacta mensajes de marketing persuasivos, profesionales y concisos.' },
            { role: 'user', content: 'Escribe un mensaje de campaña para WhatsApp y redes sociales anunciando nuestras soluciones tecnológicas. Máximo 3 oraciones cortas con emojis profesionales.' },
          ],
          max_tokens: 200,
        }),
      });
      const data = await res.json();
      const texto = data?.choices?.[0]?.message?.content?.trim();
      if (texto) setMensaje(texto);
    } catch {
      // Fallback a texto preescrito si no hay API configurada
      setMensaje('🚀 Transforma tu operación con nuestras soluciones de software CNC de precisión industrial.\n\n✅ Monitoreo en tiempo real · ✅ Reducción de mermas · ✅ Integración estándar\n\n¿Agendamos una demo de 15 min? 👇');
    } finally {
      setLoadingIA(false);
    }
  };

  // ── Ejecutar Campaña ─────────────────────────────────────────────────────────
  const handleEnviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mensaje && !flyerStorageUrl) return;
    if (uploadingFlyer) { setError('Espera a que termine de subir la imagen.'); return; }

    setIsSending(true);
    setResultado(null);
    setError(null);

    try {
      const res = await fetch(CAMPANA_FN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mensaje,
          flyerUrl: flyerStorageUrl ?? undefined,
          canales,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Error al ejecutar la campaña.');
      } else {
        setResultado(data.resultados as Resultado);
        setMensaje('');
        removeFlyer();
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor. Verifica tu conexión.');
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  const toggleCanal = (canal: keyof typeof canales) =>
    setCanales(prev => ({ ...prev, [canal]: !prev[canal] }));

  const ningunoSeleccionado = !canales.whatsapp && !canales.linkedin && !canales.facebook;
  const sinContenido = !mensaje && !flyerFile;

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-serif text-2xl text-graphite flex items-center gap-2">
          <Megaphone className="w-6 h-6 text-orange" /> Campañas y Redes Sociales
        </h1>
        <p className="text-sm text-graphite/50 mt-1">
          Difusión proactiva: sube flyers, genera copy con IA y ejecuta campañas masivas en WhatsApp y redes corporativas.
        </p>
      </div>

      <form onSubmit={handleEnviar}>
        <div className="grid lg:grid-cols-5 gap-6">
          
          {/* ── LEFT: COMPOSER ── */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Flyer */}
            <div className="bg-white rounded-2xl border border-graphite/8 p-5 shadow-soft">
              <h2 className="font-medium text-graphite mb-4 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-graphite/50" /> 1. Contenido Visual (Flyer)
              </h2>
              
              {!flyerPreview ? (
                <label className="border-2 border-dashed border-graphite/10 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-graphite/5 transition-colors">
                  <UploadCloud className="w-8 h-8 text-graphite/40 mb-3" />
                  <span className="text-sm font-medium text-graphite mb-1">Haz clic para subir un Flyer</span>
                  <span className="text-xs text-graphite/40">PNG, JPG o GIF (Máx. 5MB)</span>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFlyerSelect} />
                </label>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-graphite/10 group bg-graphite/5 flex justify-center h-64">
                  <img src={flyerPreview} alt="Flyer Preview" className="h-full object-contain" />
                  {uploadingFlyer && (
                    <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center gap-2">
                      <Loader2 className="w-6 h-6 text-orange animate-spin" />
                      <span className="text-sm text-graphite/60">Subiendo a la nube...</span>
                    </div>
                  )}
                  {flyerStorageUrl && !uploadingFlyer && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Guardado
                    </div>
                  )}
                  <button 
                    type="button" 
                    onClick={removeFlyer}
                    className="absolute top-2 left-2 bg-white/90 p-1 rounded-full shadow hover:bg-white transition-colors"
                  >
                    <X className="w-4 h-4 text-graphite/60" />
                  </button>
                </div>
              )}
            </div>

            {/* Copywriting */}
            <div className="bg-white rounded-2xl border border-graphite/8 flex flex-col shadow-soft overflow-hidden">
              <div className="p-4 border-b border-graphite/8 flex items-center justify-between bg-cream/30">
                <h2 className="font-medium text-graphite flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange" /> 2. Mensaje y Copywriting
                </h2>
                <button 
                  type="button"
                  onClick={handleSuggestCopy} 
                  disabled={loadingIA}
                  className="text-xs font-medium px-3 py-1.5 bg-orange/10 text-orange rounded-lg hover:bg-orange/20 transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  {loadingIA ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Bot className="w-3.5 h-3.5" />}
                  Agente Redactor
                </button>
              </div>
              <textarea
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Escribe el mensaje o pídele al Agente Redactor que lo genere..."
                className="w-full h-40 p-4 resize-none bg-white focus:outline-none text-graphite text-sm leading-relaxed"
              />
            </div>
          </div>

          {/* ── RIGHT: SETTINGS & PUBLISH ── */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Audiencia */}
            <div className="bg-white rounded-2xl border border-graphite/8 p-5 shadow-soft">
              <h2 className="font-medium text-graphite mb-4">3. Audiencia Objetivo</h2>
              <div className="bg-graphite/5 rounded-xl p-4 flex items-center gap-3 border border-graphite/5">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <Users className="w-5 h-5 text-graphite/60" />
                </div>
                <div>
                  <p className="text-xs font-medium text-graphite/50 uppercase tracking-widest mb-0.5">Leads Activos</p>
                  <p className="font-serif text-xl text-graphite">Todos los contactados</p>
                  <p className="text-[10px] text-graphite/40 mt-0.5">Estado: "Contactado", "Calificado" o "Propuesta"</p>
                </div>
              </div>
            </div>

            {/* Canales */}
            <div className="bg-white rounded-2xl border border-graphite/8 p-5 shadow-soft">
              <h2 className="font-medium text-graphite mb-4">4. Canales de Distribución</h2>
              <div className="space-y-2">
                {[
                  { key: 'whatsapp', label: 'Envío Directo (WhatsApp)', Icon: MessageCircle, activeColor: 'bg-green-50 border-green-200', iconColor: 'text-green-600', textColor: 'text-green-800', dot: 'bg-green-500 border-green-600' },
                  { key: 'linkedin', label: 'Feed Público (LinkedIn)',  Icon: Linkedin,        activeColor: 'bg-blue-50 border-blue-200',  iconColor: 'text-blue-700',  textColor: 'text-blue-900',  dot: 'bg-blue-600 border-blue-700' },
                  { key: 'facebook', label: 'Página Negocio (Facebook)', Icon: Facebook,       activeColor: 'bg-blue-50 border-blue-200',  iconColor: 'text-blue-600',  textColor: 'text-blue-900',  dot: 'bg-blue-600 border-blue-700' },
                ].map(({ key, label, Icon, activeColor, iconColor, textColor, dot }) => {
                  const active = canales[key as keyof typeof canales];
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggleCanal(key as keyof typeof canales)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${active ? activeColor : 'bg-white border-graphite/10 hover:bg-graphite/5'}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-5 h-5 ${active ? iconColor : 'text-graphite/40'}`} />
                        <span className={`text-sm font-medium ${active ? textColor : 'text-graphite/60'}`}>{label}</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${active ? dot : 'border-graphite/30'}`}>
                        {active && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-graphite/10 space-y-3">
                {/* Errores */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    {error}
                  </div>
                )}

                {/* Resultado */}
                {resultado && (
                  <div className="p-4 bg-green-50 border border-green-100 rounded-xl space-y-2">
                    <p className="font-medium text-green-800 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Campaña Ejecutada
                    </p>
                    {resultado.whatsapp && (
                      <p className="text-xs text-green-700">
                        WhatsApp: {resultado.whatsapp.ok 
                          ? `${resultado.whatsapp.sent} enviados / ${resultado.whatsapp.failed} fallidos de ${resultado.whatsapp.total}` 
                          : resultado.whatsapp.error}
                      </p>
                    )}
                    {resultado.linkedin && (
                      <p className="text-xs text-green-700">
                        LinkedIn: {resultado.linkedin.ok ? `✅ Publicado (${resultado.linkedin.postId})` : resultado.linkedin.error}
                      </p>
                    )}
                    {resultado.facebook && (
                      <p className="text-xs text-green-700">
                        Facebook: {resultado.facebook.ok ? `✅ Publicado (${resultado.facebook.postId})` : resultado.facebook.error}
                      </p>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSending || sinContenido || ningunoSeleccionado || uploadingFlyer}
                  className="w-full py-3 bg-orange text-white rounded-xl font-medium hover:bg-orange/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-orange/20"
                >
                  {isSending ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Ejecutando campaña...</>
                  ) : (
                    <><Send className="w-5 h-5" /> Ejecutar Campaña Ahora</>
                  )}
                </button>

                {ningunoSeleccionado && (
                  <p className="text-xs text-center text-orange/80">Selecciona al menos un canal de distribución.</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}
