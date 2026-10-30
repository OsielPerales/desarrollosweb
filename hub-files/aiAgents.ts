/**
 * aiAgents.ts — Agentes IA del HUB Cognitivo
 * Usa la AI library de la app (Google AI SDK) para invocar Gemini.
 */

const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`;

async function askGemini(prompt: string): Promise<string> {
    if (!GEMINI_KEY) {
        // Fallback simulado cuando no hay API key
        return `[Simulado] Análisis generado localmente para: ${prompt.slice(0, 80)}...`;
    }
    const res = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
        }),
    });
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Sin respuesta del agente.';
}

// ── AGENTE SCOUT — Calificador de prospectos ─────────────────────────────────
export interface ScoutResult {
    score: number;          // 0-100
    scoreSummary: string;   // Justificación en 1-2 oraciones
    etiquetas: string[];    // ej: ["Alta prioridad", "CNC", "Manufactura"]
}

export async function runScout(lead: {
    nombre: string; empresa?: string; tipoEmpresa?: string;
    intereses: string[]; mensaje?: string;
}): Promise<ScoutResult> {
    const prompt = `
Eres el Agente SCOUT de Desarrollos Elaborados, una empresa de ingeniería industrial en Monclova, México.
Evalúa este prospecto y devuelve SOLO un JSON válido con este formato exacto:
{"score": <número 0-100>, "scoreSummary": "<1-2 oraciones>", "etiquetas": ["<etiqueta1>","<etiqueta2>"]}

PROSPECTO:
- Nombre: ${lead.nombre}
- Empresa: ${lead.empresa ?? 'No especificada'}
- Tipo de empresa: ${lead.tipoEmpresa ?? 'No especificado'}
- Intereses: ${lead.intereses.join(', ') || 'No especificados'}
- Mensaje: "${lead.mensaje ?? ''}"

Score 80-100 = cliente ideal con alta intención y presupuesto probable.
Score 50-79 = potencial moderado, requiere seguimiento.
Score 0-49 = poco probable en corto plazo.
Responde SOLO con el JSON, sin markdown ni texto adicional.
`;
    try {
        const raw = await askGemini(prompt);
        // Extraer JSON del texto
        const match = raw.match(/\{[\s\S]*\}/);
        if (!match) throw new Error('No JSON found');
        const parsed = JSON.parse(match[0]);
        return {
            score: Math.min(100, Math.max(0, Number(parsed.score) || 50)),
            scoreSummary: parsed.scoreSummary || 'Análisis completado.',
            etiquetas: Array.isArray(parsed.etiquetas) ? parsed.etiquetas : [],
        };
    } catch {
        // Fallback con score heurístico
        const score = lead.mensaje && lead.mensaje.length > 30 ? 65 : 40;
        return { score, scoreSummary: 'Calificación heurística (sin API key).', etiquetas: lead.intereses.slice(0, 2) };
    }
}

// ── AGENTE REDACTOR — Generador de cotizaciones ───────────────────────────────
export interface RedactorInput {
    cliente: string;
    empresa?: string;
    servicio: string;
    descripcion: string;
    monto?: number;
    plazo?: string;
}

export async function runRedactor(input: RedactorInput): Promise<string> {
    const prompt = `
Eres el Agente REDACTOR de Desarrollos Elaborados, empresa de ingeniería industrial en Monclova, Coahuila.
Redacta una propuesta de cotización profesional y persuasiva en español, con:

1. Saludo personalizado para ${input.cliente}${input.empresa ? ` de ${input.empresa}` : ''}
2. Resumen ejecutivo del servicio: "${input.servicio}" — "${input.descripcion}"
3. Alcance del proyecto (3-5 puntos clave)
4. Propuesta de inversión${input.monto ? `: $${input.monto.toLocaleString('es-MX')} MXN` : ' (por confirmar)'}
5. Plazo de entrega estimado: ${input.plazo ?? 'por definir'}
6. Siguiente paso claro (llamada de descubrimiento)
7. Firma: Equipo Desarrollos Elaborados · hola@desarrolloselaborados.com · +52 (866) 123-4567

Usa un tono profesional pero humano. Máximo 350 palabras. Usa formato Markdown con negritas y listas.
`;
    return await askGemini(prompt);
}
