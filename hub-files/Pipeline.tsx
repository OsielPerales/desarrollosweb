import { useState, useEffect } from 'react';
import {
    User, Mail, Phone, Building2, Tag, Sparkles,
    Clock, X, ChevronRight, Cpu, Trash2, Search,
} from 'lucide-react';
import { subscribeToLeads, updateLeadStatus, updateLead, deleteLead, seedIfEmpty } from './leadsStore';
import { runScout } from './aiAgents';
import { KANBAN_COLUMNS } from './types';
import type { Lead } from './types';

// ── Utilities ────────────────────────────────────────────────────────────────
function fmtDate(d: string | Date | object) {
    try { return new Date(typeof d === 'string' ? d : (d as Date).toString()).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }); }
    catch { return '—'; }
}

function ScoreBadge({ score }: { score?: number | null }) {
    if (score == null) return <span className="text-[10px] text-graphite/30 font-mono">—</span>;
    const c = score >= 70 ? 'text-green-700 bg-green-100' : score >= 40 ? 'text-orange bg-orange/10' : 'text-red-600 bg-red-100';
    return <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded-full flex items-center gap-0.5 ${c}`}><Sparkles className="w-2.5 h-2.5" />{score}</span>;
}

// ── Lead Detail Panel ────────────────────────────────────────────────────────
function LeadPanel({ lead, onClose }: {
    lead: Lead; onClose: () => void;
}) {
    const [running, setRunning] = useState(false);

    const handleScout = async () => {
        setRunning(true);
        try {
            const result = await runScout({
                nombre: lead.nombre, empresa: lead.empresa,
                tipoEmpresa: lead.tipoEmpresa, intereses: lead.intereses, mensaje: lead.mensaje,
            });
            await updateLead(lead.id, { score: result.score, scoreSummary: result.scoreSummary, etiquetas: result.etiquetas });
        } finally { setRunning(false); }
    };

    return (
        <div className="fixed inset-0 z-50 flex">
            <div className="flex-1 bg-black/20" onClick={onClose} />
            <div className="w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl flex flex-col">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-graphite/8 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-lavender/30 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-cobalt" />
                        </div>
                        <div>
                            <p className="font-medium text-graphite text-sm">{lead.nombre}</p>
                            {lead.empresa && <p className="text-xs text-graphite/50">{lead.empresa}</p>}
                        </div>
                    </div>
                    <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-graphite/5 transition-colors"><X className="w-4 h-4 text-graphite/50" /></button>
                </div>

                <div className="flex-1 p-6 space-y-6">
                    {/* Contact info */}
                    <div className="space-y-2">
                        <p className="text-xs font-mono uppercase text-graphite/40 tracking-wider">Contacto</p>
                        <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-sm text-graphite/70 hover:text-orange transition-colors"><Mail className="w-3.5 h-3.5" />{lead.email}</a>
                        {lead.telefono && <p className="flex items-center gap-2 text-sm text-graphite/70"><Phone className="w-3.5 h-3.5" />{lead.telefono}</p>}
                        {lead.tipoEmpresa && <p className="flex items-center gap-2 text-sm text-graphite/70"><Building2 className="w-3.5 h-3.5" />{lead.tipoEmpresa}</p>}
                    </div>

                    {/* Intereses */}
                    {lead.intereses.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-xs font-mono uppercase text-graphite/40 tracking-wider">Intereses</p>
                            <div className="flex flex-wrap gap-1.5">
                                {lead.intereses.map((i) => (
                                    <span key={i} className="text-xs px-2 py-1 bg-cream rounded-full text-graphite/70 flex items-center gap-1">
                                        <Tag className="w-3 h-3" /> {i}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Mensaje */}
                    {lead.mensaje && (
                        <div className="space-y-2">
                            <p className="text-xs font-mono uppercase text-graphite/40 tracking-wider">Mensaje</p>
                            <p className="text-sm text-graphite/70 bg-cream rounded-xl p-3 italic">"{lead.mensaje}"</p>
                        </div>
                    )}

                    {/* Scout IA */}
                    <div className="space-y-3">
                        <p className="text-xs font-mono uppercase text-graphite/40 tracking-wider flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5" /> Agente SCOUT</p>
                        {lead.scoreSummary ? (
                            <div className="bg-orange/5 border border-orange/15 rounded-xl p-3 space-y-2">
                                <div className="flex items-center gap-2">
                                    <ScoreBadge score={lead.score} />
                                    <span className="text-xs font-mono text-graphite/50">/100</span>
                                </div>
                                <p className="text-sm text-graphite/80">{lead.scoreSummary}</p>
                                {lead.etiquetas && lead.etiquetas.length > 0 && (
                                    <div className="flex flex-wrap gap-1">
                                        {lead.etiquetas.map((e, i) => <span key={i} className="text-[10px] px-1.5 py-0.5 bg-orange/10 text-orange rounded-full">{e}</span>)}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-graphite/40 italic">Sin calificación aún.</p>
                        )}
                        <button
                            onClick={handleScout} disabled={running}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-orange/10 text-orange text-sm font-medium hover:bg-orange/20 transition-all disabled:opacity-50"
                        >
                            {running ? <><span className="w-3 h-3 border border-orange border-t-transparent rounded-full animate-spin" /> Calificando...</> : <><Sparkles className="w-4 h-4" /> Ejecutar Agente SCOUT</>}
                        </button>
                    </div>

                    {/* Move status */}
                    <div className="space-y-2">
                        <p className="text-xs font-mono uppercase text-graphite/40 tracking-wider">Mover a columna</p>
                        <div className="flex flex-wrap gap-1.5">
                            {KANBAN_COLUMNS.filter((c) => c.id !== lead.status).map((col) => (
                                <button key={col.id} onClick={async () => { await updateLeadStatus(lead.id, col.id); onClose(); }}
                                    className={`text-xs px-3 py-1.5 rounded-full border transition-all hover:opacity-80 ${col.color}`}>
                                    {col.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Meta */}
                    <div className="text-xs text-graphite/30 font-mono border-t border-graphite/8 pt-4 space-y-1">
                        <p>Creado: {fmtDate(lead.createdAt)}</p>
                        <p>Fuente: {lead.source ?? 'manual'}</p>
                        <p>ID: {lead.id}</p>
                    </div>
                </div>

                {/* Delete */}
                <div className="p-4 border-t border-graphite/8">
                    <button onClick={async () => { await deleteLead(lead.id); onClose(); }}
                        className="w-full flex items-center justify-center gap-2 text-sm text-red-500/60 hover:text-red-600 hover:bg-red-50 rounded-xl py-2.5 transition-all">
                        <Trash2 className="w-4 h-4" /> Eliminar lead
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Kanban Card ──────────────────────────────────────────────────────────────
function LeadCard({ lead, onClick }: { lead: Lead; onClick: () => void }) {
    return (
        <div onClick={onClick}
            className="bg-white rounded-xl p-3 shadow-soft hover:shadow-soft-lg transition-all cursor-pointer border border-graphite/5 group">
            <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                    <p className="text-sm font-medium text-graphite leading-none">{lead.nombre}</p>
                    {lead.empresa && <p className="text-[11px] text-graphite/50 mt-0.5">{lead.empresa}</p>}
                </div>
                <ScoreBadge score={lead.score} />
            </div>
            {lead.intereses.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                    {lead.intereses.slice(0, 2).map((i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 bg-cream rounded-full text-graphite/60">{i}</span>
                    ))}
                </div>
            )}
            <div className="flex items-center justify-between">
                <span className="text-[10px] text-graphite/30 flex items-center gap-1"><Clock className="w-2.5 h-2.5" />{fmtDate(lead.createdAt)}</span>
                <ChevronRight className="w-3.5 h-3.5 text-graphite/20 group-hover:text-orange transition-colors" />
            </div>
        </div>
    );
}

// ── Kanban Column ────────────────────────────────────────────────────────────
function KanbanColumn({ label, color, leads, onCardClick }: {
    label: string; color: string; leads: Lead[]; onCardClick: (l: Lead) => void;
}) {
    return (
        <div className="flex flex-col min-w-[220px] w-56 flex-shrink-0">
            <div className="flex items-center gap-2 mb-3 px-1">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${color}`}>{label}</span>
                <span className="text-xs text-graphite/40 font-mono">{leads.length}</span>
            </div>
            <div className="flex flex-col gap-2 min-h-[160px]">
                {leads.map((l) => <LeadCard key={l.id} lead={l} onClick={() => onCardClick(l)} />)}
                {leads.length === 0 && (
                    <div className="border-2 border-dashed border-graphite/8 rounded-xl h-20 flex items-center justify-center">
                        <p className="text-[11px] text-graphite/20 font-mono">vacío</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// ── Pipeline Main ─────────────────────────────────────────────────────────────
export function Pipeline() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [selected, setSelected] = useState<Lead | null>(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        seedIfEmpty();
        const unsub = subscribeToLeads((data) => {
            setLeads(data);
            // Actualizar vista detalle si el lead seleccionado cambió
            setSelected((prev) => prev ? data.find(l => l.id === prev.id) || null : null);
        });
        return () => unsub();
    }, []);

    const filtered = leads.filter((l) =>
        !search || [l.nombre, l.empresa, l.email, ...l.intereses].join(' ').toLowerCase().includes(search.toLowerCase())
    );

    const activos = leads.filter((l) => l.status !== 'perdido').length;
    const ganados = leads.filter((l) => l.status === 'ganado').length;
    const avgScore = (() => { const sc = leads.filter((l) => l.score != null); return sc.length ? sc.reduce((s, l) => s + (l.score ?? 0), 0) / sc.length : 0; })();

    return (
        <>
            {selected && <LeadPanel lead={selected} onClose={() => setSelected(null)} />}

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="font-serif text-2xl text-graphite">Pipeline CRM</h1>
                        <p className="text-sm text-graphite/50 mt-0.5">Prospectos en tiempo real</p>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite/30" />
                        <input value={search} onChange={(e) => setSearch(e.target.value)}
                            placeholder="Buscar lead..." className="pl-9 pr-4 py-2 text-sm rounded-xl bg-white border border-graphite/10 focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all w-56" />
                    </div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { label: 'Leads activos', value: activos, color: 'text-orange' },
                        { label: 'Ganados', value: ganados, color: 'text-green-600' },
                        { label: 'Score IA prom.', value: avgScore > 0 ? avgScore.toFixed(0) : '—', color: 'text-cobalt' },
                    ].map((k) => (
                        <div key={k.label} className="bg-white rounded-2xl p-4 shadow-soft">
                            <div className={`font-mono text-2xl font-medium ${k.color}`}>{k.value}</div>
                            <div className="text-xs text-graphite/50 mt-1">{k.label}</div>
                        </div>
                    ))}
                </div>

                {/* Board */}
                <div className="overflow-x-auto pb-4">
                    <div className="flex gap-3 min-w-max">
                        {KANBAN_COLUMNS.map((col) => (
                            <KanbanColumn key={col.id} label={col.label} color={col.color}
                                leads={filtered.filter((l) => l.status === col.id)}
                                onCardClick={(l) => setSelected(l)} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
