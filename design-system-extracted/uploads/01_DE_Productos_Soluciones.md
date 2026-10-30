---
título: Productos y Soluciones — Desarrollos Elaborados
tipo: catálogo
estado: activo
actualizado: 2026-04-03
tags: [DE, productos, soluciones, iAprende, VigilIA, HUB, manufactura-cognitiva, CNC-Master]
---

# Productos y Soluciones — Desarrollos Elaborados

*Relacionado: [[00_DE_Constitucion_Manifiesto]] · [[03_DE_Planes_Proyectos]]*

---

## DIVISIÓN III — iAprende (Formación IA)

### Propuesta de valor
Formación práctica en IA generativa para industria, gobierno y educación en el norte de México. Certificación oficial bajo norma **EC0301 CONOCER**.

### Catálogo de cursos

| Nivel | Nombre | Duración | Formato | Precio |
|---|---|---|---|---|
| Intro (gratuito) | Crea tu primer Artefacto con Claude | ~60 min | Presencial / online | $0 |
| Nivel 1 | IA Estratégica y Diseño de Instrucciones Proactivas | 2.5 hrs | Presencial | $9,000–$14,000 MXN/grupo |
| Nivel 2 | IA Aplicada a Procesos de Negocio | 8–12 hrs | In-company | $22,000–$38,000 MXN/grupo |
| Nivel 3 | Automatización con API / Custom | A medida | Proyecto | Cotización |

**Precio unitario referencia:** $1,400 MXN/persona · Grupo en sede DE: $21,000 MXN · Grupo en cliente: desde $12,600 MXN

### Segmentos objetivo
Gobierno · Educación · PyME · Corporativo · Metalmecánica

### Margen estimado
**75–82%**

### Material generado (activo)
- 23 archivos pack de marketing
- 15 flyers segmentados
- Script de ventas WhatsApp (6 etapas)
- Plantilla propuesta formal
- Calendario 4 semanas (IG, LinkedIn, Twitter/X, WhatsApp broadcast)
- Guía de Auditoría EC0301
- Manual del Participante
- Manual del Instructor

### Expansión regional planeada
Monclova → Saltillo → Piedras Negras

---

## DIVISIÓN I — Manufactura Cognitiva SaaS

### Propuesta de valor
Pipeline cognitivo completo para talleres de fabricación: desde foto del cliente hasta manual de ensamble generado por IA, pasando por diseño paramétrico, cotización automática y corte CNC.

### Pipeline (12 fases)
```
Foto cliente → IA diseño → cotización paramétrica → vectorización
→ paneles FreeCAD → DXF por capa → nesting → svg-to-gcode
→ corte CNC → flat-pack → manual ensamble IA → validación visual
```

**Costo estimado por job:** ~$0.25 USD

### Componentes de IA
| Modelo | Uso | Costo |
|---|---|---|
| gemini-2.5-flash-image | Clasificación batch imágenes | $0.039/req |
| gemini-3.1-flash-image-preview | Iterativo | $0.045/req |
| gemini-3.1-pro-preview | Manuales completos (hasta 14 refs) | $0.039–$0.24/req |
| Imagen 4 Fast | Volumen | $0.02/req |

> ⚠️ DEPRECATED: gemini-3-pro-preview (apagado 9 mar 2026) → migrar a gemini-3.1-pro-preview

### Creator Economy (modelo licencias)
- **Inventores / Marcas Personales / Client-Creators** registran IP bajo licencia compartida
- Taller posee archivo de fabricación · Creator posee estética/marca
- **Royalties:** 6–15% por tier de volumen (ledger inmutable)

### SaaS Target
50+ talleres · $250,000 MXN/mes recurrente

---

## DIVISIÓN I — CNC Master App

### Descripción
App interna de operaciones para Corte y Diseño CNC (y futura réplica SaaS para otros talleres). Stack: Firebase/Firestore + Next.js.

### Módulos activos
- ✅ Pedidos / Producción
- ✅ Clientes
- ✅ Calendario
- ✅ Catálogo de productos (con clasificación IA batch)
- 🔴 **Cotizaciones** — SIGUIENTE PRIORIDAD (campos, lógica de precios, generación PDF)
- 🔴 WhatsApp webhook (bloqueado por restricción Meta — resolver con SIM prepago limpia)

### Flujo objetivo
```
Cliente envía medidas WhatsApp → Firestore → cotización automática
→ aprobación en app → orden de producción un tap
```

### Repositorio
GitHub: `OsielPerales/studio` (rama master, migrado desde Firebase Studio)

### Tiers de margen (motor de cotización)
| Tipo | Margen |
|---|---|
| Retail | 65% |
| Recurrente | 45% |
| Distribuidor | 30% |
| Interno | 15% |

---

## DIVISIÓN II — HUB Cognitivo

### URL de producción
**hub-desarrollos.web.app**

### Stack
React 19 + TypeScript + Vite + Firebase (Auth + Firestore + Hosting) + Gemini API (REST directo via `VITE_GEMINI_API_KEY`)

### Módulos (9)
Pipeline CRM · SCOUT · PROSPECTOR · NEXO · REDACTOR · Bandeja · Cotizaciones · Analítica · Campañas

### Stack de búsqueda recomendado (agente AIP)
| Herramienta | Rol |
|---|---|
| Exa Company Search | Primario |
| Tavily Extract | Enriquecimiento |
| Serper Maps | Negocios locales |
| Gemini Google Search Grounding | Fallback |

### Tiers de servicio
| Nivel | Setup | Recurrente | Tiempo entrega |
|---|---|---|---|
| Level 1 | $25K–$45K MXN | $4,500/mes | 5 días |
| Level 2 | $60K–$90K MXN | — | 4–6 semanas |
| Level 3 | $150K+ MXN | — | A definir |

**Bottleneck actual:** documentación de onboarding para delegar Level 1 a perfiles junior.

---

## DIVISIÓN II — VigilIA

### Descripción
Sistema de seguridad para talleres: cámara + IA + SaaS. Prototipo piloto: Corte y Diseño CNC.

### Modelo comercial
Hardware (cámara + cómputo local) + suscripción SaaS mensual

### Estado
🟡 Concepto empaquetado para presentación comercial · piloto pendiente de implementación

---

## Prospectos comerciales prioritarios

| Empresa | Tipo | Producto entrada |
|---|---|---|
| Maxion Wheels | Industrial Monclova | iAprende / Automatización |
| Trinity Rail | Industrial Monclova | iAprende / Automatización |
| FEMSA / OXXO | Corporativo | iAprende |
| Doosung Tech | Planta nueva Monclova (H1 2026) | iAprende + Automatización |

---

*Documento vivo — actualizar con cada lanzamiento o pivote.*
*Relacionados: [[00_DE_Constitucion_Manifiesto]] · [[02_DE_Stack_Visual_Dev]] · [[03_DE_Planes_Proyectos]]*
