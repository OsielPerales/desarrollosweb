import { useState, useEffect, useRef } from 'react';
import {
  MessageCircle, Mail, Instagram, Send, Sparkles,
  CheckCircle, Loader2, Bot, Search, Briefcase, User, Building2, Zap, Plus
} from 'lucide-react';
import { getLeads, updateLead } from './leadsStore';
import type { Lead, Mensaje, CanalOrigen } from './types';

// Placeholder store/functions para mensajes (hasta que conectemos Firestore en la Fase 4.3)
let MOCK_MESSAGES: Mensaje[] = [
  { id: '1', leadId: 'lead-1', canal: 'whatsapp', texto: '¡Hola! Escribo interesada en el módulo de inventario con IA.', remitente: 'cliente', createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: '2', leadId: 'lead-1', canal: 'whatsapp', texto: 'Hola Laura. ¡Claro! El módulo de inventario predictivo es uno de los más robustos de nuestros copilotos profesionales. ¿En qué tipo de base de datos llevan el inventario actual?', remitente: 'vendedor', status: 'enviado', createdAt: new Date(Date.now() - 3500000).toISOString() },
  { id: '3', leadId: 'lead-1', canal: 'whatsapp', texto: 'Ahorita todo en Excel. Es un caos.', remitente: 'cliente', createdAt: new Date(Date.now() - 1000000).toISOString() },
  { id: '4', leadId: 'lead-1', canal: 'whatsapp', texto: 'Perfecto. Nuestros copilotos pueden ingerir Excel e incluso crear una automatización para que ni siquiera tengan que abrirlo. Se conectan por Whatsapp. ¿Te gustaría agendar una demo virtual de 15 minutos para que veas el prototipo en acción?', remitente: 'agente_ia', status: 'borrador', createdAt: new Date().toISOString() },
];

const CANAL_ICONS: Record<CanalOrigen, React.ReactNode> = {
  whatsapp: <MessageCircle className="w-4 h-4 text-green-500" />,
  instagram: <Instagram className="w-4 h-4 text-pink-500" />,
  facebook: <MessageCircle className="w-4 h-4 text-blue-600" />,
  email: <Mail className="w-4 h-4 text-graphite/40" />,
  web: <Briefcase className="w-4 h-4 text-orange" />
};

export function Inbox() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [loadingIA, setLoadingIA] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inicializar leads reales desde Firebase
    getLeads().then((data) => {
      setLeads(data);
      if (data.length > 0) setSelectedLead(data[0]);
    });
  }, []);

  useEffect(() => {
    if (selectedLead) {
      // Por ahora asignamos el Mock a cualquier lead para probar la UI
      setMensajes(MOCK_MESSAGES.map(m => ({ ...m, leadId: selectedLead.id })));
    } else {
      setMensajes([]);
    }
  }, [selectedLead]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes]);

  const filteredLeads = leads.filter(l => 
    !search || l.nombre.toLowerCase().includes(search.toLowerCase()) || l.empresa?.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleAutoPilot = async () => {
    if (!selectedLead) return;
    const newValue = !selectedLead.autoPilot;
    // Optimistic UI update
    setSelectedLead({ ...selectedLead, autoPilot: newValue });
    setLeads(leads.map(l => l.id === selectedLead.id ? { ...l, autoPilot: newValue } : l));
    // Real Firebase Update (if Lead is real)
    try {
      if (!selectedLead.id.startsWith('lead-')) {
        await updateLead(selectedLead.id, { autoPilot: newValue });
      }
    } catch(e) { console.error(e) }
  };

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || !selectedLead) return;
    const newMsg: Mensaje = {
      id: Date.now().toString(),
      leadId: selectedLead.id,
      canal: 'whatsapp',
      texto: input,
      remitente: 'vendedor',
      status: 'enviado',
      createdAt: new Date().toISOString()
    };
    setMensajes([...mensajes, newMsg]);
    setInput('');
  };

  const handleSuggestIA = () => {
    // Simula Gemini proponiendo respuesta
    setLoadingIA(true);
    setTimeout(() => {
      const suggest: Mensaje = {
        id: Date.now().toString(),
        leadId: selectedLead?.id || '',
        canal: 'whatsapp',
        texto: 'Esa es una excelente solicitud. Puedo prepararte una propuesta formal que incluya la integración de esa función. ¿Para cuándo la tendrías en tu línea de producción idealmente?',
        remitente: 'agente_ia',
        status: 'borrador',
        createdAt: new Date().toISOString()
      };
      setMensajes([...mensajes, suggest]);
      setLoadingIA(false);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex bg-white rounded-2xl border border-graphite/8 shadow-soft overflow-hidden">
      
      {/* ── LEFT: CHAT LIST ── */}
      <div className="w-80 border-r border-graphite/8 flex flex-col bg-cream/30">
        <div className="p-4 border-b border-graphite/8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-serif text-xl text-graphite mb-1">Bandeja</h2>
            <button className="p-2 bg-graphite text-white rounded-lg hover:bg-graphite/90 transition-colors" title="Iniciar Nuevo Chat Outbound">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-graphite/50 mb-4">{leads.length} leads con actividad</p>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite/30" />
            <input 
              value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar en Inbox..." 
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl bg-white border border-graphite/10 focus:outline-none focus:border-orange transition-all" 
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredLeads.map((lead) => (
            <button
              key={lead.id}
              onClick={() => setSelectedLead(lead)}
              className={`w-full text-left p-4 border-b border-graphite/5 transition-colors flex items-start gap-3 ${
                selectedLead?.id === lead.id ? 'bg-orange/5 border-l-4 border-l-orange' : 'hover:bg-graphite/5 border-l-4 border-transparent'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-graphite/10 flex items-center justify-center flex-shrink-0 relative">
                <User className="w-5 h-5 text-graphite/50" />
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                  {CANAL_ICONS[lead.source === 'whatsapp' ? 'whatsapp' : 'email']}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="font-medium text-sm text-graphite truncate">{lead.nombre}</span>
                  <span className="text-[10px] text-graphite/40 whitespace-nowrap">1m</span>
                </div>
                <p className="text-xs text-graphite/50 truncate">
                  {lead.empresa || 'Prospecto sin empresa'}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── MIDDLE: MAIN CHAT AREA ── */}
      <div className="flex-1 flex flex-col bg-slate-50 relative">
        {selectedLead ? (
          <>
            {/* Chat header */}
            <div className="h-16 flex items-center px-6 border-b border-graphite/8 bg-white shrink-0 justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-orange" />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-graphite">{selectedLead.nombre}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-graphite/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    En línea ({CANAL_ICONS[selectedLead.source === 'whatsapp' ? 'whatsapp' : 'email']})
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                
                {/* ── Auto Pilot Toggle ── */}
                <button
                  onClick={handleToggleAutoPilot}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                    selectedLead.autoPilot 
                      ? 'bg-orange/10 border-orange/20 text-orange' 
                      : 'bg-graphite/5 border-graphite/10 text-graphite/50 hover:bg-graphite/10'
                  }`}
                  title={selectedLead.autoPilot ? "Piloto Automático Activado" : "Activar Piloto Automático"}
                >
                  <Zap className={`w-3.5 h-3.5 ${selectedLead.autoPilot ? 'fill-orange' : ''}`} />
                  {selectedLead.autoPilot ? 'Auto-IA: ON' : 'Auto-IA: OFF'}
                </button>
                <div className="w-px h-6 bg-graphite/10 mx-1"></div>

                {selectedLead.telefono && (
                  <a href={`https://wa.me/${selectedLead.telefono.replace(/\+/g, '')}`} target="_blank" rel="noreferrer" 
                     className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors" title="Abrir en WhatsApp Web">
                    <MessageCircle className="w-4 h-4" />
                  </a>
                )}
                {selectedLead.email && (
                  <a href={`mailto:${selectedLead.email}`} 
                     className="p-2 rounded-lg bg-graphite/5 text-graphite/60 hover:bg-graphite/10 transition-colors" title="Enviar correo">
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {mensajes.map((msg) => {
                const isIA = msg.remitente === 'agente_ia';
                const isClient = msg.remitente === 'cliente';

                return (
                  <div key={msg.id} className={`flex ${isClient ? 'justify-start' : 'justify-end'}`}>
                    {/* IA Suggestion Bubble */}
                    {isIA && (
                      <div className="max-w-[80%] space-y-2">
                        <div className="flex flex-col relative w-full items-end">
                            <div className="bg-orange/10 border border-orange/20 text-graphite/80 rounded-2xl rounded-tr-none px-4 py-3 text-sm relative">
                              <Sparkles className="absolute -left-2 -top-2 w-5 h-5 text-orange fill-orange animate-pulse" />
                              <div className="flex items-center gap-2 mb-1.5 text-orange font-medium text-xs">
                                <Bot className="w-3.5 h-3.5" /> Agente CONVERSACIONAL (Borrador sugerido)
                              </div>
                              <p className="whitespace-pre-wrap">{msg.texto}</p>
                            </div>
                            <div className="flex gap-2 mt-2">
                              <button onClick={() => setInput(msg.texto)} className="text-xs px-3 py-1.5 border border-graphite/10 text-graphite/60 bg-white rounded-lg hover:bg-graphite/5">
                                Editar
                              </button>
                              <button onClick={() => {}} className="text-xs px-3 py-1.5 bg-orange text-white rounded-lg flex items-center gap-1 hover:bg-orange/90">
                                Aprobar y Enviar <Send className="w-3 h-3" />
                              </button>
                            </div>
                        </div>
                      </div>
                    )}

                    {/* Standard Message Bubble */}
                    {!isIA && (
                      <div className={`max-w-[70%] ${isClient ? 'bg-white border border-graphite/10 text-graphite rounded-2xl rounded-tl-none' : 'bg-cobalt text-white rounded-2xl rounded-tr-none'} px-4 py-2.5 shadow-sm`}>
                        <p className="text-sm whitespace-pre-wrap">{msg.texto}</p>
                        <div className={`text-[10px] mt-1 flex items-center justify-end gap-1 ${isClient ? 'text-graphite/40' : 'text-white/60'}`}>
                          {new Date(msg.createdAt as string).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
                          {!isClient && <CheckCircle className={`w-3 h-3 ${msg.status === 'leido' ? 'text-blue-300' : ''}`} />}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white border-t border-graphite/8">
              <div className="flex items-center gap-2 mb-2 px-1">
                <button 
                  onClick={handleSuggestIA} 
                  disabled={loadingIA || mensajes[mensajes.length - 1]?.remitente === 'agente_ia'}
                  className="text-xs font-medium text-orange flex items-center gap-1.5 hover:opacity-80 transition-opacity disabled:opacity-40"
                >
                  {loadingIA ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />} 
                  Sugerir respuesta (IA)
                </button>
              </div>
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 px-4 py-3 rounded-xl border border-graphite/10 focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange bg-cream focus:bg-white transition-all text-sm"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-cobalt text-white hover:bg-cobalt/90 transition-colors disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-graphite/40">
            <MessageCircle className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-sm">Selecciona un chat para comenzar</p>
          </div>
        )}
      </div>

      {/* ── RIGHT: CONTEXT / SCORE PANEL ── */}
      <div className="w-64 border-l border-graphite/8 bg-white hidden lg:flex flex-col">
        {selectedLead ? (
          <div className="p-5 flex-1 overflow-y-auto">
            <h3 className="text-xs font-mono uppercase text-graphite/40 tracking-wider mb-4">Contexto de Inteligencia</h3>
            
            {/* Score */}
            <div className="mb-6 bg-graphite/5 rounded-xl p-4 text-center border border-graphite/5">
              <p className="text-xs text-graphite/60 font-medium mb-2">Score Agente SCOUT</p>
              {selectedLead.score != null ? (
                <>
                  <div className={`text-4xl font-mono font-bold mb-1 ${selectedLead.score >= 70 ? 'text-green-600' : selectedLead.score >= 40 ? 'text-orange' : 'text-red-500'}`}>
                    {selectedLead.score}
                  </div>
                  <p className="text-[10px] text-graphite/70 leading-relaxed max-w-[160px] mx-auto">
                    {selectedLead.scoreSummary || 'Calificado por IA'}
                  </p>
                </>
              ) : (
                <div className="text-sm text-graphite/40 italic">Sin calificar</div>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-1 text-sm border-b border-graphite/5 pb-4">
                <p className="text-xs text-graphite/40 mb-1">Empresa</p>
                <div className="flex items-center gap-2 text-graphite"><Building2 className="w-3.5 h-3.5 text-graphite/40" /> {selectedLead.empresa || 'N/A'}</div>
              </div>

              <div className="space-y-1 text-sm border-b border-graphite/5 pb-4">
                <p className="text-xs text-graphite/40 mb-1">Intereses</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedLead.intereses?.map(i => (
                    <span key={i} className="text-[10px] px-2 py-0.5 bg-cream rounded-full text-graphite/70">
                      {i}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <p className="text-xs text-graphite/40 mb-1">Estado en Pipeline</p>
                <span className="text-xs font-medium px-2 py-1 bg-graphite/5 rounded-full inline-block capitalize">
                  {selectedLead.status}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-6 text-center text-xs text-graphite/30 uppercase tracking-widest leading-loose font-mono">
            Esperando contexto
          </div>
        )}
      </div>

    </div>
  );
}
