import { useState, useEffect } from 'react';
import { Sparkles, FileText, Copy, CheckCircle, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { subscribeToCotizaciones, createCotizacion, updateCotizacion } from './leadsStore';
import { runRedactor } from './aiAgents';
import { SERVICIOS } from './types';
import type { Cotizacion } from './types';

// ── Cotizacion Card ───────────────────────────────────────────────────────────
function CotizacionCard({ c }: { c: Cotizacion }) {
    const [expanded, setExpanded] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(c.contenidoIA ?? '');
        setCopied(true); setTimeout(() => setCopied(false), 2000);
    };

    const statusColors: Record<Cotizacion['status'], string> = {
        borrador: 'bg-graphite/10 text-graphite/60',
        enviada: 'bg-blue-100 text-blue-700',
        aceptada: 'bg-green-100 text-green-700',
        rechazada: 'bg-red-100 text-red-600',
    };

    return (
        <div className="bg-white rounded-2xl border border-graphite/8 shadow-soft overflow-hidden">
            <div className="p-4 flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm text-graphite truncate">{c.cliente}</span>
                        {c.empresa && <span className="text-xs text-graphite/50">· {c.empresa}</span>}
                    </div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-xs text-graphite/50">{SERVICIOS.find(s => s.id === c.servicio)?.label ?? c.servicio}</span>
                        {c.monto && <span className="text-xs font-mono text-orange">${c.monto.toLocaleString('es-MX')} MXN</span>}
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[c.status]}`}>{c.status}</span>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                    {c.contenidoIA && (
                        <button onClick={handleCopy} className="p-1.5 rounded-lg hover:bg-graphite/5 text-graphite/40 hover:text-graphite transition-colors">
                            {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                    )}
                    {/* Status toggle */}
                    {c.status === 'borrador' && (
                        <button onClick={() => updateCotizacion(c.id, { status: 'enviada' })}
                            className="text-[10px] px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors font-medium">
                            Marcar enviada
                        </button>
                    )}
                    {c.status === 'enviada' && (
                        <button onClick={() => updateCotizacion(c.id, { status: 'aceptada' })}
                            className="text-[10px] px-2.5 py-1 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors font-medium">
                            Aceptada ✓
                        </button>
                    )}
                    <button onClick={() => setExpanded(!expanded)} className="p-1.5 rounded-lg hover:bg-graphite/5 text-graphite/40 transition-colors">
                        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {expanded && c.contenidoIA && (
                <div className="border-t border-graphite/8 px-4 py-3">
                    <p className="text-xs font-mono uppercase text-graphite/30 mb-2 tracking-wider">Propuesta generada por REDACTOR IA</p>
                    <div className="text-sm text-graphite/80 leading-relaxed whitespace-pre-wrap bg-cream rounded-xl p-4 max-h-96 overflow-y-auto font-mono text-xs">
                        {c.contenidoIA}
                    </div>
                </div>
            )}
        </div>
    );
}

// ── Nueva Cotizacion Form ─────────────────────────────────────────────────────
function NuevaCotizacionForm() {
    const [form, setForm] = useState({
        cliente: '', empresa: '', email: '', servicio: 'software' as Cotizacion['servicio'],
        descripcion: '', monto: '', plazo: '',
    });
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const contenidoIA = await runRedactor({
                cliente: form.cliente, empresa: form.empresa,
                servicio: SERVICIOS.find(s => s.id === form.servicio)?.label ?? form.servicio,
                descripcion: form.descripcion,
                monto: form.monto ? Number(form.monto) : undefined,
                plazo: form.plazo || undefined,
            });
            createCotizacion({
                cliente: form.cliente, empresa: form.empresa || undefined,
                email: form.email, servicio: form.servicio,
                descripcion: form.descripcion,
                monto: form.monto ? Number(form.monto) : undefined,
                plazo: form.plazo || undefined,
                contenidoIA,
            });
            setForm({ cliente: '', empresa: '', email: '', servicio: 'software', descripcion: '', monto: '', plazo: '' });
            setOpen(false);
        } finally { setLoading(false); }
    };

    return (
        <div className="bg-white rounded-2xl border border-graphite/8 shadow-soft overflow-hidden">
            <button onClick={() => setOpen(!open)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-cream/50 transition-colors">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange/10 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-orange" />
                    </div>
                    <div>
                        <p className="font-medium text-sm text-graphite">Nueva cotización con Agente REDACTOR</p>
                        <p className="text-xs text-graphite/50">Gemini AI genera la propuesta completa</p>
                    </div>
                </div>
                {open ? <ChevronUp className="w-4 h-4 text-graphite/40" /> : <ChevronDown className="w-4 h-4 text-graphite/40" />}
            </button>

            {open && (
                <form onSubmit={handleSubmit} className="border-t border-graphite/8 p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-medium text-graphite mb-1 block">Cliente *</label>
                            <input required value={form.cliente} onChange={(e) => setForm({ ...form, cliente: e.target.value })}
                                className="w-full px-3 py-2 rounded-xl bg-cream border border-graphite/10 text-sm focus:outline-none focus:ring-2 focus:ring-orange/30" placeholder="Nombre del cliente" />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-graphite mb-1 block">Empresa</label>
                            <input value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                                className="w-full px-3 py-2 rounded-xl bg-cream border border-graphite/10 text-sm focus:outline-none focus:ring-2 focus:ring-orange/30" placeholder="Empresa (opcional)" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-medium text-graphite mb-1 block">Email *</label>
                            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full px-3 py-2 rounded-xl bg-cream border border-graphite/10 text-sm focus:outline-none focus:ring-2 focus:ring-orange/30" placeholder="correo@empresa.com" />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-graphite mb-1 block">Servicio *</label>
                            <select value={form.servicio} onChange={(e) => setForm({ ...form, servicio: e.target.value as Cotizacion['servicio'] })}
                                className="w-full px-3 py-2 rounded-xl bg-cream border border-graphite/10 text-sm focus:outline-none focus:ring-2 focus:ring-orange/30">
                                {SERVICIOS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-medium text-graphite mb-1 block">Descripción del proyecto *</label>
                        <textarea required rows={3} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-cream border border-graphite/10 text-sm focus:outline-none focus:ring-2 focus:ring-orange/30 resize-none"
                            placeholder="¿Qué necesita el cliente? Cuantos más detalles, mejor propuesta generará el Agente REDACTOR." />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-medium text-graphite mb-1 block">Monto estimado (MXN)</label>
                            <input type="number" value={form.monto} onChange={(e) => setForm({ ...form, monto: e.target.value })}
                                className="w-full px-3 py-2 rounded-xl bg-cream border border-graphite/10 text-sm focus:outline-none focus:ring-2 focus:ring-orange/30" placeholder="0" />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-graphite mb-1 block">Plazo estimado</label>
                            <input value={form.plazo} onChange={(e) => setForm({ ...form, plazo: e.target.value })}
                                className="w-full px-3 py-2 rounded-xl bg-cream border border-graphite/10 text-sm focus:outline-none focus:ring-2 focus:ring-orange/30" placeholder="ej: 3 semanas" />
                        </div>
                    </div>
                    <button type="submit" disabled={loading}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange text-white text-sm font-semibold rounded-xl hover:bg-orange/90 disabled:opacity-60 transition-all">
                        {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Agente REDACTOR generando propuesta...</> : <><Sparkles className="w-4 h-4" /> Generar propuesta con IA</>}
                    </button>
                </form>
            )}
        </div>
    );
}

// ── Cotizaciones Page ────────────────────────────────────────────────────────
export function Cotizaciones() {
    const [list, setList] = useState<Cotizacion[]>([]);

    useEffect(() => {
        const unsub = subscribeToCotizaciones((data) => {
            setList(data);
        });
        return () => unsub();
    }, []);

    const aceptadas = list.filter(c => c.status === 'aceptada').length;
    const enviadas = list.filter(c => c.status === 'enviada').length;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-serif text-2xl text-graphite">Cotizaciones</h1>
                <p className="text-sm text-graphite/50 mt-0.5">Agente REDACTOR · Propuestas generadas con IA</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {[
                    { label: 'Total', value: list.length, color: 'text-cobalt' },
                    { label: 'Enviadas', value: enviadas, color: 'text-orange' },
                    { label: 'Aceptadas', value: aceptadas, color: 'text-green-600' },
                ].map((k) => (
                    <div key={k.label} className="bg-white rounded-2xl p-4 shadow-soft">
                        <div className={`font-mono text-2xl font-medium ${k.color}`}>{k.value}</div>
                        <div className="text-xs text-graphite/50 mt-1">{k.label}</div>
                    </div>
                ))}
            </div>

            <NuevaCotizacionForm />

            {list.length === 0 && (
                <div className="text-center py-16">
                    <FileText className="w-10 h-10 text-graphite/10 mx-auto mb-3" />
                    <p className="text-sm text-graphite/40">No hay cotizaciones aún. Genera la primera arriba.</p>
                </div>
            )}

            <div className="space-y-3">
                {list.map((c) => <CotizacionCard key={c.id} c={c} />)}
            </div>
        </div>
    );
}
