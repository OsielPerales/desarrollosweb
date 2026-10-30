import { useState } from 'react';
import { Settings, Key, Code, MessageCircle, Database, CheckCircle, Copy, AlertCircle } from 'lucide-react';

export function Configuracion() {
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  const ConfigCard = ({ title, icon: Icon, description, children, status = 'pending' }: any) => (
    <div className="bg-white rounded-2xl border border-graphite/8 shadow-soft overflow-hidden">
      <div className="p-5 border-b border-graphite/8 flex items-center justify-between bg-cream/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-graphite/5 flex items-center justify-center">
            <Icon className="w-5 h-5 text-graphite/60" />
          </div>
          <div>
            <h3 className="font-medium text-graphite">{title}</h3>
            <p className="text-xs text-graphite/50">{description}</p>
          </div>
        </div>
        {status === 'active' ? (
          <span className="text-xs font-medium px-2.5 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Conectado
          </span>
        ) : (
          <span className="text-xs font-medium px-2.5 py-1 bg-orange/10 text-orange rounded-full flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Falta configurar
          </span>
        )}
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-serif text-2xl text-graphite flex items-center gap-2">
          <Settings className="w-6 h-6 text-graphite/40" /> Configuración del Hub
        </h1>
        <p className="text-sm text-graphite/50 mt-1">
          Gestiona las integraciones y claves API que le dan vida a los agentes de Inteligencia Artificial y la bandeja multicanal.
        </p>
      </div>

      <div className="grid gap-6">
        {/* ── Firebase / Base de Datos ── */}
        <ConfigCard 
          title="Firebase (Base de Datos & Auth)" 
          icon={Database} 
          description="Almacenamiento en tiempo real y seguridad"
          status="active" // Esto lo asumimos activo porque pudimos entrar
        >
          <div className="space-y-4">
            <p className="text-sm text-graphite/70">
              Actualmente el sistema está conectado al entorno de <strong>Firebase Cloud Firestore</strong>. 
              Todas tus credenciales están operando desde el archivo <code className="bg-graphite/5 px-1 py-0.5 rounded text-orange">.env.local</code>.
            </p>
            <div className="bg-graphite/5 rounded-xl p-4 font-mono text-xs text-graphite/60 flex flex-col gap-2">
              <div className="flex justify-between"><span>VITE_FIREBASE_PROJECT_ID:</span> <strong>studio-427958662-bd38c</strong></div>
              <div className="flex justify-between"><span>VITE_FIREBASE_AUTH_DOMAIN:</span> <strong>studio-427958662-bd38c.firebaseapp.com</strong></div>
            </div>
          </div>
        </ConfigCard>

        {/* ── Gemini AI Agentes ── */}
        <ConfigCard 
          title="Google Gemini (Agentes IA)" 
          icon={Code} 
          description="Motor cognitivo para el SCOUT, REDACTOR y ANALISTA"
          status="pending" 
        >
          <div className="space-y-4">
            <p className="text-sm text-graphite/70">
              Necesitas una API Key de <strong>Google AI Studio</strong> para que los agentes puedan procesar lenguaje natural, sugerir respuestas y calificar prospectos.
            </p>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-graphite">API Key de Gemini</label>
              <div className="flex gap-2">
                <input 
                  type="password" 
                  value="AIzaSy...gemini_key_secreta" 
                  readOnly
                  className="flex-1 px-4 py-2.5 rounded-xl bg-cream border border-graphite/10 text-sm focus:outline-none" 
                />
                <button className="px-4 py-2 bg-graphite text-white rounded-xl text-sm font-medium hover:bg-graphite/90 transition-colors">
                  Actualizar
                </button>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <strong>¿Dónde conseguirla?</strong>
                <p className="mt-1 opacity-80">Entra a <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="underline font-medium hover:opacity-100">Google AI Studio</a> con tu cuenta de Google y genera una nueva clave.</p>
              </div>
            </div>
          </div>
        </ConfigCard>

        {/* ── Meta / WhatsApp Webhooks ── */}
        <ConfigCard 
          title="Meta Developers (WhatsApp / Inbox)" 
          icon={MessageCircle} 
          description="Recepción y envío de mensajes"
          status="pending"
        >
          <div className="space-y-6">
            <p className="text-sm text-graphite/70">
              Para habilitar la "Bandeja Unificada" (Inbox), debes enlazar este HUB cognitivo con la plataforma para desarrolladores de Facebook/Meta. Esto permite que WhatsApp redireccione los mensajes hacia este sistema.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-graphite">URL del Webhook (Firebase Function)</label>
                <div className="flex bg-cream border border-graphite/10 rounded-xl overflow-hidden">
                  <div className="px-3 py-2 text-xs font-mono text-graphite/60 flex-1 truncate">
                    https://us-central1-studio-427958662-bd38c.cloudfunctions.net/whatsappWebhook
                  </div>
                  <button 
                    onClick={() => copyToClipboard('https://us-central1-studio-427958662-bd38c.cloudfunctions.net/whatsappWebhook', 'webhook')}
                    className="px-3 py-2 bg-graphite/5 hover:bg-graphite/10 transition-colors border-l border-graphite/10 flex items-center justify-center text-graphite/60"
                  >
                    {copied === 'webhook' ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-graphite/40">Copia esta URL y pégala en la sección de Webhooks en tu App de Meta.</p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-graphite">Token de Verificación (Verify Token)</label>
                <div className="flex bg-cream border border-graphite/10 rounded-xl overflow-hidden">
                  <div className="px-3 py-2 text-xs font-mono text-graphite/60 flex-1 truncate">
                    desarrollos_elaborados_token_secreto_2026
                  </div>
                  <button 
                    onClick={() => copyToClipboard('desarrollos_elaborados_token_secreto_2026', 'token')}
                    className="px-3 py-2 bg-graphite/5 hover:bg-graphite/10 transition-colors border-l border-graphite/10 flex items-center justify-center text-graphite/60"
                  >
                    {copied === 'token' ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-graphite/40">Se requiere durante la configuración inicial en Meta.</p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-graphite/5">
              <label className="text-xs font-medium text-graphite">Token de Acceso Permanente (WhatsApp System User)</label>
              <div className="flex gap-2">
                <input 
                  type="password" 
                  placeholder="EAAIzaSy...pega_tu_token_aqui" 
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-graphite/20 text-sm focus:outline-none focus:border-orange" 
                />
                <button className="px-4 py-2 bg-orange text-white rounded-xl text-sm font-medium hover:bg-orange/90 transition-colors flex items-center gap-2">
                  <Key className="w-4 h-4" /> Guardar
                </button>
              </div>
            </div>

            <div className="bg-orange/5 border border-orange/20 rounded-xl p-4 text-sm text-graphite/80 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-orange" />
              <div>
                <strong>Paso a paso para conectar WhatsApp:</strong>
                <ol className="list-decimal pl-4 mt-2 space-y-1 text-xs opacity-80">
                  <li>Inicia sesión en <a href="https://developers.facebook.com/" target="_blank" rel="noreferrer" className="text-orange underline">Meta for Developers</a>.</li>
                  <li>Crea una aplicación de tipo "Negocios" y añade "API de WhatsApp Cloud".</li>
                  <li>Ve a la pestaña "Configuración de webhook".</li>
                  <li>Pega la <strong>URL del Webhook</strong> y el <strong>Token de Verificación</strong> de arriba.</li>
                  <li>Suscríbete al campo `messages`.</li>
                  <li>Genera un Token de Acceso Permanente y guárdalo en la caja de arriba.</li>
                </ol>
              </div>
            </div>

          </div>
        </ConfigCard>

      </div>
    </div>
  );
}
