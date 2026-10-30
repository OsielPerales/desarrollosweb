import { useState, useEffect } from 'react';
import {
    Search, Mail, Phone, Building2, Tag, Sparkles,
    Trash2, ArrowUpDown, Filter,
} from 'lucide-react';
import { subscribeToLeads, deleteLead, updateLeadStatus } from './leadsStore';
import { runScout } from './aiAgents';
import { updateLead } from './leadsStore';
import { KANBAN_COLUMNS } from './types';
import type { Lead, LeadStatus } from './types';

type SortKey = 'nombre' | 'empresa' | 'score' | 'createdAt' | 'status';

function fmtDate(d: string | Date | object) {
    try { return new Date(typeof d === 'string' ? d : (d as Date).toString()).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: '2-digit' }); }
    catch { return '—'; }
}

function ScorePill({ score }: { score?: number | null }) {
    if (score == null) return <span className="text-xs text-graphite/30 font-mono">—</span>;
    const c = score >= 70 ? 'bg-green-100 text-green-700' : score >= 40 ? 'bg-orange/10 text-orange' : 'bg-red-100 text-red-600';
    return <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded-full ${c}`}>{score}</span>;
}

export function Contactos() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<LeadStatus | 'todos'>('todos');
    const [sortKey, setSortKey] = useState<SortKey>('createdAt');
    const [sortAsc, setSortAsc] = useState(false);
    const [scouting, setScouting] = useState<string | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = subscribeToLeads((data) => {
            setLeads(data);
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const handleSort = (key: SortKey) => {
        if (sortKey === key) setSortAsc(!sortAsc);
        else { setSortKey(key); setSortAsc(true); }
    };

    const handleScout = async (lead: Lead) => {
        setScouting(lead.id);
        try {
            const result = await runScout({
                nombre: lead.nombre, empresa: lead.empresa,
                tipoEmpresa: lead.tipoEmpresa, intereses: lead.intereses, mensaje: lead.mensaje,
            });
            updateLead(lead.id, { score: result.score, scoreSummary: result.scoreSummary, etiquetas: result.etiquetas });
        } finally { setScouting(null); }
    };

    const filtered = leads
        .filter((l) => statusFilter === 'todos' || l.status === statusFilter)
        .filter((l) => !search || [l.nombre, l.empresa, l.email, ...l.intereses].join(' ').toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            let va: string | number = '';
            let vb: string | number = '';
            if (sortKey === 'score') { va = a.score ?? -1; vb = b.score ?? -1; }
            else if (sortKey === 'createdAt') { va = String(a.createdAt); vb = String(b.createdAt); }
            else { va = String(a[sortKey as keyof Lead] ?? ''); vb = String(b[sortKey as keyof Lead] ?? ''); }
            return sortAsc ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
        });

    const SortBtn = ({ k, label }: { k: SortKey; label: string }) => (
        <button onClick={() => handleSort(k)} className={`flex items-center gap-1 text-xs font-medium uppercase tracking-wider hover:text-orange transition-colors ${sortKey === k ? 'text-orange' : 'text-graphite/40'}`}>
            {label} <ArrowUpDown className="w-3 h-3" />
        </button>
    );

    return (
        <div className="space-y-5">
            {/* Header */}
            <div>
                <h1 className="font-serif text-2xl text-graphite">Contactos</h1>
                <p className="text-sm text-graphite/50 mt-0.5">{filtered.length} de {leads.length} leads</p>
            </div>

            {/* Filters bar */}
            <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[180px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite/30" />
                    <input value={search} onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar..." className="w-full pl-9 pr-4 py-2 text-sm rounded-xl bg-white border border-graphite/10 focus:outline-none focus:ring-2 focus:ring-orange/30" />
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                    <Filter className="w-3.5 h-3.5 text-graphite/40" />
                    {(['todos', ...KANBAN_COLUMNS.map(c => c.id)] as (LeadStatus | 'todos')[]).map((s) => (
                        <button key={s} onClick={() => setStatusFilter(s)}
                            className={`text-xs px-3 py-1.5 rounded-full transition-all capitalize border ${statusFilter === s ? 'bg-orange text-white border-orange' : 'bg-white text-graphite/60 border-graphite/10 hover:border-orange/30'}`}>
                            {s === 'todos' ? 'Todos' : KANBAN_COLUMNS.find(c => c.id === s)?.label ?? s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
                {/* Table header */}
                <div className="grid grid-cols-[1.5fr_1fr_1fr_auto_auto_80px_100px] items-center gap-3 px-4 py-3 border-b border-graphite/8 bg-cream/50">
                    <SortBtn k="nombre" label="Contacto" />
                    <SortBtn k="empresa" label="Empresa" />
                    <span className="text-xs font-medium uppercase tracking-wider text-graphite/40">Intereses</span>
                    <SortBtn k="status" label="Estado" />
                    <SortBtn k="score" label="Score" />
                    <SortBtn k="createdAt" label="Fecha" />
                    <span />
                </div>

                {loading ? (
                    <div className="py-16 text-center">
                        <div className="w-8 h-8 border-2 border-orange border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <p className="text-sm text-graphite/40">Cargando contactos...</p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="py-16 text-center">
                        <p className="text-sm text-graphite/30">No hay contactos que coincidan con los filtros.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-graphite/5">
                        {filtered.map((lead) => (
                            <div key={lead.id} className="grid grid-cols-[1.5fr_1fr_1fr_auto_auto_80px_100px] items-center gap-3 px-4 py-3 hover:bg-cream/40 transition-colors group">
                                {/* Contacto */}
                                <div>
                                    <p className="text-sm font-medium text-graphite">{lead.nombre}</p>
                                    <a href={`mailto:${lead.email}`} className="text-xs text-graphite/50 hover:text-orange transition-colors flex items-center gap-1">
                                        <Mail className="w-3 h-3" /> {lead.email}
                                    </a>
                                    {lead.telefono && (
                                        <p className="text-xs text-graphite/40 flex items-center gap-1">
                                            <Phone className="w-3 h-3" /> {lead.telefono}
                                        </p>
                                    )}
                                </div>

                                {/* Empresa */}
                                <div className="text-sm text-graphite/70 flex items-center gap-1">
                                    {lead.empresa ? <><Building2 className="w-3.5 h-3.5 text-graphite/30" />{lead.empresa}</> : <span className="text-graphite/20">—</span>}
                                </div>

                                {/* Intereses */}
                                <div className="flex flex-wrap gap-1">
                                    {lead.intereses.slice(0, 2).map((i) => (
                                        <span key={i} className="text-[10px] px-1.5 py-0.5 bg-cream rounded-full text-graphite/60 flex items-center gap-0.5">
                                            <Tag className="w-2.5 h-2.5" />{i}
                                        </span>
                                    ))}
                                </div>

                                {/* Status */}
                                <div>
                                    <select
                                        value={lead.status}
                                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                                        className={`text-[10px] font-medium px-2 py-1 rounded-full border cursor-pointer focus:outline-none ${KANBAN_COLUMNS.find(c => c.id === lead.status)?.color ?? 'bg-graphite/5 text-graphite'}`}
                                    >
                                        {KANBAN_COLUMNS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                                    </select>
                                </div>

                                {/* Score */}
                                <div><ScorePill score={lead.score} /></div>

                                {/* Fecha */}
                                <div className="text-xs text-graphite/40 font-mono">{fmtDate(lead.createdAt)}</div>

                                {/* Actions */}
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleScout(lead)} disabled={scouting === lead.id}
                                        title="Ejecutar Agente SCOUT"
                                        className="p-1.5 rounded-lg hover:bg-orange/10 text-graphic/30 hover:text-orange transition-colors disabled:opacity-40">
                                        {scouting === lead.id
                                            ? <span className="w-3.5 h-3.5 border border-orange border-t-transparent rounded-full animate-spin inline-block" />
                                            : <Sparkles className="w-3.5 h-3.5" />}
                                    </button>
                                    <button onClick={() => deleteLead(lead.id)}
                                        title="Eliminar lead"
                                        className="p-1.5 rounded-lg hover:bg-red-50 text-graphite/30 hover:text-red-500 transition-colors">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
