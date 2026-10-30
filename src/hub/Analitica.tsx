import { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend,
} from 'recharts';
import { Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { subscribeToLeads, subscribeToCotizaciones } from './leadsStore';
import { KANBAN_COLUMNS } from './types';
import type { Lead, Cotizacion } from './types';

// ── Agente ANALISTA inline ───────────────────────────────────────────────────
async function runAnalista(leads: Lead[]): Promise<string> {
    const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
    const stats = {
        total: leads.length,
        porEstado: KANBAN_COLUMNS.map(c => ({ estado: c.label, n: leads.filter(l => l.status === c.id).length })),
        avgScore: leads.filter(l => l.score != null).reduce((s, l, _, arr) => s + (l.score ?? 0) / arr.length, 0),
        ganados: leads.filter(l => l.status === 'ganado').length,
        perdidos: leads.filter(l => l.status === 'perdido').length,
        sinCalificar: leads.filter(l => l.score == null).length,
        fuentes: ['web_contacto', 'whatsapp', 'email', 'facebook', 'manual'].map(f => ({
            fuente: f, n: leads.filter(l => l.source === f).length,
        })),
    };

    if (!GEMINI_KEY) {
        // Resumen heurístico sin API
        const tasa = stats.total > 0 ? ((stats.ganados / stats.total) * 100).toFixed(0) : 0;
        return `**Resumen Ejecutivo del Pipeline — HUB Cognitivo**\n\n📊 **Estado del pipeline**: ${stats.total} leads totales. Tasa de cierre: ${tasa}%.\n\n🔥 **Alertas**: ${stats.sinCalificar} leads sin calificar por el Agente SCOUT. ${stats.perdidos} leads marcados como perdidos.\n\n✅ **Score promedio de IA**: ${stats.avgScore.toFixed(0)}/100.\n\n💡 **Recomendación**: Ejecutar el Agente SCOUT en los leads sin calificar para priorizar el seguimiento. Foco en los leads en etapa "Contactado" y "Calificado".\n\n_Generado con análisis heurístico (sin API key de Gemini)._`;
    }

    const prompt = `
Eres el Agente ANALISTA de Desarrollos Elaborados, empresa de ingeniería industrial en Monclova, México.
Genera un resumen ejecutivo del pipeline de ventas con base en estos datos JSON:

${JSON.stringify(stats, null, 2)}

Formato del resumen (en Markdown, máximo 250 palabras):
1. **Estado del pipeline** — observación principal
2. **Alertas** — deals en riesgo, leads fríos, cuellos de botella
3. **Oportunidades calientes** — qué priorizar esta semana
4. **Recomendación de acción** — 2-3 acciones concretas
5. **Score de salud del pipeline** — califica de 1-10 con justificación breve

Sé directo, sin adornos. Usa emojis como indicadores visuales. Escribe en español de negocios.
`;

    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.5, maxOutputTokens: 600 } }),
        });
        const data = await res.json();
        return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Sin respuesta del agente.';
    } catch {
        return 'Error al conectar con el Agente ANALISTA.';
    }
}

// ── Colors ───────────────────────────────────────────────────────────────────
const COLORS = ['#3b82f6', '#eab308', '#a855f7', '#f97316', '#ec4899', '#22c55e', '#ef4444'];

// ── Markdown simple renderer ─────────────────────────────────────────────────
function MdText({ text }: { text: string }) {
    const lines = text.split('\n');
    return (
        <div className="text-sm text-graphite/80 leading-relaxed space-y-2">
            {lines.map((line, i) => {
                if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-semibold text-graphite">{line.replace(/\*\*/g, '')}</p>;
                const parts = line.split(/(\*\*[^*]+\*\*)/g);
                return (
                    <p key={i}>
                        {parts.map((p, j) =>
                            p.startsWith('**') ? <strong key={j}>{p.replace(/\*\*/g, '')}</strong> : p
                        )}
                    </p>
                );
            })}
        </div>
    );
}

// ── Analytics Page ────────────────────────────────────────────────────────────
export function Analitica() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([]);
    const [analisisText, setAnalisis] = useState<string>('');
    const [runningAnalista, setRunning] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let leadsLoaded = false;
        let cotsLoaded = false;

        const unsubL = subscribeToLeads((data) => {
            setLeads(data);
            leadsLoaded = true;
            if (cotsLoaded) setLoading(false);
        });

        const unsubC = subscribeToCotizaciones((data) => {
            setCotizaciones(data);
            cotsLoaded = true;
            if (leadsLoaded) setLoading(false);
        });

        return () => { unsubL(); unsubC(); }
    }, []);

    const byStatus = KANBAN_COLUMNS.map(c => ({
        name: c.label.replace('✓ ', '').replace('✗ ', ''),
        value: leads.filter(l => l.status === c.id).length,
    })).filter(d => d.value > 0);

    const bySource = ['web_contacto', 'whatsapp', 'email', 'facebook', 'manual'].map(s => ({
        name: s, value: leads.filter(l => l.source === s).length,
    })).filter(d => d.value > 0);

    const scoreRanges = [
        { name: 'Alto (70-100)', value: leads.filter(l => (l.score ?? 0) >= 70).length },
        { name: 'Medio (40-69)', value: leads.filter(l => (l.score ?? 0) >= 40 && (l.score ?? 0) < 70).length },
        { name: 'Bajo (0-39)', value: leads.filter(l => l.score != null && (l.score ?? 0) < 40).length },
        { name: 'Sin score', value: leads.filter(l => l.score == null).length },
    ].filter(d => d.value > 0);

    const tasaCierre = leads.length > 0 ? ((leads.filter(l => l.status === 'ganado').length / leads.length) * 100).toFixed(1) : '0';
    const avgScore = leads.filter(l => l.score != null);
    const avgScoreVal = avgScore.length > 0 ? (avgScore.reduce((s, l) => s + (l.score ?? 0), 0) / avgScore.length).toFixed(0) : '—';

    const handleAnalista = async () => {
        setRunning(true);
        const txt = await runAnalista(leads);
        setAnalisis(txt);
        setRunning(false);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-serif text-2xl text-graphite">Analítica</h1>
                    <p className="text-sm text-graphite/50 mt-0.5">Métricas del pipeline · {leads.length} leads</p>
                </div>
                <button
                    className="flex items-center gap-2 text-sm text-graphite/50 hover:text-graphite transition-colors">
                    <RefreshCw className="w-4 h-4" /> Actualizar
                </button>
            </div>

            {loading ? (
                <div className="py-16 text-center">
                    <Loader2 className="w-8 h-8 text-orange animate-spin mx-auto mb-3" />
                    <p className="text-sm text-graphite/40">Sincronizando con métricas de la nube...</p>
                </div>
            ) : (
                <>
                    {/* KPI strip */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {[
                            { label: 'Total leads', value: leads.length, color: 'text-cobalt' },
                            { label: 'Tasa de cierre', value: `${tasaCierre}%`, color: 'text-green-600' },
                            { label: 'Score IA prom.', value: avgScoreVal, color: 'text-orange' },
                            { label: 'Cotizaciones', value: cotizaciones.length, color: 'text-purple-600' },
                        ].map((k) => (
                            <div key={k.label} className="bg-white rounded-2xl p-5 shadow-soft">
                                <div className={`font-mono text-3xl font-medium ${k.color}`}>{k.value}</div>
                                <div className="text-xs text-graphite/50 mt-1">{k.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Charts row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* By Status bar */}
                        <div className="bg-white rounded-2xl p-5 shadow-soft">
                            <p className="text-sm font-medium text-graphite mb-4">Leads por etapa</p>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={byStatus} margin={{ left: -20 }}>
                                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                                    <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                                    <Bar dataKey="value" fill="#f97316" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Pie by source */}
                        <div className="bg-white rounded-2xl p-5 shadow-soft">
                            <p className="text-sm font-medium text-graphite mb-4">Fuentes de leads</p>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie data={bySource} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                                        {bySource.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                    </Pie>
                                    <Legend wrapperStyle={{ fontSize: 11 }} />
                                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Score distribution */}
                        <div className="bg-white rounded-2xl p-5 shadow-soft">
                            <p className="text-sm font-medium text-graphite mb-4">Distribución de Score IA</p>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={scoreRanges} margin={{ left: -20 }}>
                                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                                    <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                        {scoreRanges.map((_, i) => <Cell key={i} fill={['#22c55e', '#f97316', '#ef4444', '#d1d5db'][i]} />)}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Cotizaciones por estado */}
                        <div className="bg-white rounded-2xl p-5 shadow-soft">
                            <p className="text-sm font-medium text-graphite mb-4">Cotizaciones por estado</p>
                            <div className="space-y-2 pt-2">
                                {(['borrador', 'enviada', 'aceptada', 'rechazada'] as const).map((s) => {
                                    const count = cotizaciones.filter(c => c.status === s).length;
                                    const pct = cotizaciones.length > 0 ? (count / cotizaciones.length) * 100 : 0;
                                    const colors = { borrador: 'bg-graphite/20', enviada: 'bg-blue-400', aceptada: 'bg-green-400', rechazada: 'bg-red-400' };
                                    return (
                                        <div key={s} className="flex items-center gap-3">
                                            <span className="text-xs text-graphite/60 w-20 capitalize">{s}</span>
                                            <div className="flex-1 bg-graphite/5 rounded-full h-2">
                                                <div className={`h-2 rounded-full transition-all ${colors[s]}`} style={{ width: `${pct}%` }} />
                                            </div>
                                            <span className="text-xs font-mono text-graphite/50 w-5 text-right">{count}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Agente ANALISTA */}
                    <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
                        <div className="p-5 border-b border-graphite/8 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-cobalt/10 rounded-xl flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-cobalt" />
                                </div>
                                <div>
                                    <p className="font-medium text-graphite">Agente ANALISTA</p>
                                    <p className="text-xs text-graphite/50">Resumen ejecutivo del pipeline generado por Gemini AI</p>
                                </div>
                            </div>
                            <button
                                onClick={handleAnalista}
                                disabled={runningAnalista}
                                className="flex items-center gap-2 px-4 py-2 bg-cobalt/10 text-cobalt text-sm font-medium rounded-xl hover:bg-cobalt/20 disabled:opacity-50 transition-all"
                            >
                                {runningAnalista ? <><Loader2 className="w-4 h-4 animate-spin" /> Analizando...</> : <><Sparkles className="w-4 h-4" /> Generar análisis</>}
                            </button>
                        </div>

                        {analisisText ? (
                            <div className="p-5">
                                <MdText text={analisisText} />
                            </div>
                        ) : (
                            <div className="p-8 text-center text-graphite/30 text-sm">
                                Haz clic en "Generar análisis" para que el Agente ANALISTA evalúe el pipeline en tiempo real.
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
