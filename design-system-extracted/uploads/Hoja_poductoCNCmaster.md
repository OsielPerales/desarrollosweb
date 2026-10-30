# Hoja de Producto - CNC Master App

## Propósito de este documento

Este archivo concentra el contexto funcional, técnico y estratégico de CNC Master App para que cualquier agente de programación, colaborador técnico o sesión futura pueda entender rápidamente:

- qué producto estamos construyendo,
- qué problema resuelve,
- cómo está compuesto hoy,
- qué módulos ya existen,
- cómo está organizada la arquitectura,
- cuáles son las capacidades diferenciales,
- qué deuda técnica y riesgos existen,
- y cuáles son los siguientes pasos recomendados.

La intención es que este documento funcione como una base viva de contexto para desarrollo, roadmap técnico, decisiones de producto y trabajo con agentes.

---

## 1. Resumen ejecutivo del producto

CNC Master App es una plataforma SaaS vertical para talleres de fabricación CNC y negocios de producción bajo pedido. Su objetivo es unificar en una sola aplicación la operación comercial, productiva y administrativa del taller.

Hoy el producto ya cubre el núcleo operativo:

- clientes,
- productos,
- cotizaciones,
- pedidos,
- producción,
- rentas,
- inventario,
- inventario local,
- calendario,
- reportes iniciales,
- configuración de roles/permisos,
- WhatsApp operativo,
- asistentes IA,
- y herramientas de orquestación externa.

La dirección estratégica del producto no es solo ser un sistema administrativo, sino convertirse en el sistema operativo del taller, con IA embebida en procesos reales y con capacidad de ser operado por agentes.

### Definición corta

> CNC Master App es un ERP operativo ligero especializado en talleres CNC, con capa de IA aplicada a captura, seguimiento, producción, comunicación y automatización.

---

## 2. Problema que resuelve

Los talleres CNC suelen operar con una mezcla desordenada de:

- WhatsApp,
- memoria operativa,
- notas informales,
- hojas sueltas,
- cotizaciones manuales,
- seguimiento verbal de producción,
- y poco control estructurado del inventario y la entrega.

Eso genera:

- pérdida de información,
- retrasos,
- baja trazabilidad,
- errores de seguimiento,
- duplicidad de trabajo,
- y dependencia excesiva de una o dos personas clave.

### Problema central

El negocio necesita una herramienta que conecte:

1. la entrada comercial,
2. la operación del taller,
3. la administración de pedidos,
4. la planeación,
5. el control de materiales,
6. y la atención al cliente.

---

## 3. Propuesta de valor

### Qué ofrece CNC Master App

- Centraliza la operación comercial y productiva.
- Traduce solicitudes del cliente en procesos ejecutables.
- Da visibilidad del estado del negocio en tiempo real.
- Reduce fricción para equipos que trabajan de forma informal.
- Introduce IA útil en el flujo real del taller.
- Abre la puerta a automatizaciones y agentes externos.

### Diferenciadores clave

| Diferenciador | Valor |
|---|---|
| IA aplicada al dominio | La IA no solo conversa: consulta, clasifica, propone y ejecuta acciones |
| Asistente de Taller | Convierte reportes libres en tareas estructuradas |
| Bandeja WhatsApp | Hace de WhatsApp una entrada formal al sistema |
| Inventario local + caja | Acerca el producto a la operación diaria real |
| MCP Server + orquestador | Permite que agentes externos operen sobre la plataforma |
| Permisos granulares | Hace viable desplegar el producto por rol y madurez del equipo |

---

## 4. Tipo de usuario y roles actuales

El producto ya contempla control de acceso por rol.

### Roles detectados en el sistema

- `ADMIN`
- `MANAGER`
- `SPECIAL_OPERATOR`
- `OPERATOR`
- `VIEW_ONLY`

### Permisos clave detectados

- `canViewPrices`
- `canEditPrices`
- `canViewReports`
- `canManageRolesAndPermissions`
- `canAccessAI`
- `canEditSystemSettings`
- `canAccessWhatsApp`

### Lectura funcional de roles

| Perfil operativo | Necesidades |
|---|---|
| Dirección / dueño | Visibilidad, control, reportes, configuración |
| Ventas / administración | Clientes, cotizaciones, pedidos, calendario, cobros |
| Supervisor | Producción, inventario, bitácora, validación de tareas |
| Operario | Reportar avances, incidencias y materiales |
| Atención / recepción | WhatsApp, seguimiento, registro de solicitudes |

---

## 5. Mapa actual del producto

```text
CNC Master App
├── Dashboard
├── Clientes
├── Productos
├── Cotizaciones
│   ├── Flujo manual
│   ├── Ingesta con IA
│   └── Revisión IA
├── Pedidos
│   ├── Alta manual
│   ├── Ingesta con IA
│   ├── Pagos
│   ├── Archivos
│   └── Bitácora
├── Rentas
│   ├── Alta manual
│   ├── Ingesta con IA
│   └── Seguimiento de devolución
├── Producción
│   ├── Tablero general
│   ├── Diseño
│   ├── Corte
│   ├── Ensamble
│   └── Pintura
├── Asistente de Taller
│   ├── Captura de reporte libre
│   ├── Parser IA
│   ├── Sesiones
│   └── Tareas aprobables
├── Inventario
│   ├── Materiales
│   ├── Ajustes
│   ├── Ingreso IA por imagen
│   ├── Demanda potencial
│   └── Lista de compras
├── Inventario Local
│   ├── Producto terminado
│   ├── Movimientos
│   ├── Caja local
│   └── Cobro de pedidos
├── Calendario
│   ├── Eventos
│   ├── Pedidos
│   ├── Rentas
│   └── Agenda con IA
├── Reportes
├── WhatsApp
│   ├── Conversaciones
│   ├── Sugerencias IA
│   ├── Modo manual / semi / auto
│   └── Callbacks de entrega
├── Asistente Interno
│   ├── Consulta
│   ├── Acción
│   ├── Multimodal
│   └── Audit logs
├── Configuración
│   ├── Roles
│   ├── Permisos
│   ├── Prompt IA
│   ├── Perfil de empresa
│   └── Ajustes del sistema
└── Plataforma
    ├── Cloud Functions
    ├── MCP Server
    ├── Embeddings/Search
    └── Firebase
```

---

## 6. Módulos principales y su función

| Módulo | Función principal | Estado general |
|---|---|---|
| Dashboard | Vista rápida de KPIs y alertas | Funcional |
| Clientes | Base comercial del negocio | Funcional |
| Productos | Catálogo técnico y comercial | Funcional |
| Cotizaciones | Propuesta económica y pre-venta | Funcional |
| Pedidos | Ejecución principal del trabajo | Funcional |
| Producción | Seguimiento visual por etapas | Funcional |
| Rentas | Gestión de equipo rentado | Funcional |
| Inventario | Materiales y stock | Funcional |
| Inventario local | Producto terminado y caja | Funcional |
| Calendario | Planeación de eventos y entregas | Funcional |
| Reportes | Analítica inicial | Parcial |
| WhatsApp | Canal de entrada y seguimiento | Funcional |
| Asistente Interno | Interfaz por lenguaje natural | Funcional |
| Asistente de Taller | Captura flexible de producción | Funcional |
| Configuración | Gobierno del sistema | Funcional |

---

## 7. Flujos principales del negocio

### 7.1 Flujo comercial base

```text
Solicitud del cliente
  ->
Cliente registrado o identificado
  ->
Cotización
  ->
Revisión / ajuste
  ->
Confirmación
  ->
Pedido
  ->
Producción
  ->
Entrega
  ->
Cobro / cierre
```

### 7.2 Flujo de producción

```text
Pedido nuevo
  ->
Diseño
  ->
Corte
  ->
Ensamble
  ->
Pintura
  ->
Entregado / completado
```

### 7.3 Flujo de taller asistido por IA

```text
Operario escribe reporte libre
  ->
Parser IA analiza
  ->
Genera tareas
  ->
Supervisor aprueba / rechaza / corrige
  ->
Sistema ejecuta
  ->
Pedido / inventario / bitácora actualizados
```

### 7.4 Flujo de WhatsApp

```text
Mensaje entrante
  ->
Registro en Firestore
  ->
Clasificación de intención
  ->
Extracción de datos
  ->
Sugerencia IA
  ->
Manual / semi / auto
  ->
Respuesta o ruteo interno
```

### 7.5 Flujo del asistente interno

```text
Usuario consulta o solicita acción
  ->
Orquestador interpreta
  ->
Selecciona herramienta
  ->
Consulta / modifica datos
  ->
Responde en lenguaje natural
  ->
Registra auditoría
```

---

## 8. Superpoderes del producto

### 8.1 Asistente Interno multimodal

Capaz de:

- responder consultas,
- usar herramientas reales,
- operar sobre clientes, productos, cotizaciones, pedidos e inventario,
- aceptar texto, imagen y audio,
- dejar rastro en auditoría.

Esto lo convierte en una capa de interacción operacional, no solo en un chat.

### 8.2 Ingesta IA especializada

El sistema ya tiene flujos IA para:

- cotizaciones,
- pedidos,
- rentas,
- inventario,
- calendario,
- y análisis de entradas del taller.

Esto reduce fricción de captura y acelera el uso real del producto.

### 8.3 Asistente de Taller

Una de las piezas más valiosas del sistema.

Permite que el taller trabaje con lenguaje natural:

- avances,
- incidencias,
- entrega,
- materiales usados,
- problemas detectados.

La IA traduce eso a acciones operativas revisables.

### 8.4 WhatsApp conectado al dominio

La bandeja de WhatsApp no solo gestiona conversación. También:

- clasifica intención,
- propone respuestas,
- puede responder automáticamente en casos seguros,
- y canaliza mensajes de producción al Asistente de Taller.

### 8.5 Inventario local con caja

Muy útil para operación real:

- stock terminado,
- venta directa,
- movimientos locales,
- caja operativa,
- cobro de pedidos.

### 8.6 MCP Server y orquestador

Esto abre el producto a:

- trabajo con agentes,
- automatización externa,
- control remoto asistido,
- búsqueda y consulta estructurada,
- y potencial integración con otros sistemas o asistentes.

---

## 9. Arquitectura técnica actual

### Stack principal

| Capa | Tecnología |
|---|---|
| App web | Next.js 14 App Router |
| Lenguaje | TypeScript |
| UI | React + ShadCN UI + Tailwind CSS |
| Backend operativo | Next.js Server Actions |
| Persistencia | Cloud Firestore |
| Archivos | Cloud Storage |
| Auth | Firebase Authentication |
| IA | Genkit + Google AI |
| Backend desacoplado | Firebase Cloud Functions |
| Integración con agentes | MCP SDK |

### Decisiones positivas

- uso de `src/data/types.ts` como centro del dominio,
- Server Actions para acelerar desarrollo,
- Firebase Admin separado del cliente,
- permisos granulares,
- IA por flujos especializados y no en una sola capa monolítica,
- integración operativa con WhatsApp,
- evolución clara hacia plataforma.

### Tensiones actuales

- mucha lógica de negocio en actions,
- poca separación formal entre capa de dominio y persistencia,
- cobertura de pruebas baja para la complejidad actual,
- observabilidad todavía parcial,
- algunas funcionalidades analíticas siguen incompletas,
- naming mixto español/inglés.

---

## 10. Estructura relevante del código

```text
studio/
├── src/
│   ├── app/
│   │   ├── actions/
│   │   ├── api/
│   │   └── módulos funcionales
│   ├── ai/
│   │   └── flows/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   └── types/
├── apps/
│   └── cnc-orchestrator/
│       └── functions/
├── mcp-server/
└── docs/
```

### Lectura interna de esa estructura

- `src/app/actions/` es el corazón operativo actual.
- `src/ai/flows/` concentra la capa IA por caso de uso.
- `apps/cnc-orchestrator/functions/` es la capa desacoplada de integración y tooling.
- `mcp-server/` es clave para trabajo con agentes externos.

---

## 11. Integraciones y dependencias clave

| Integración | Rol |
|---|---|
| Firebase Auth | Identidad y sesión |
| Firestore | Modelo principal de datos |
| Storage | Media, imágenes, archivos |
| Google AI / Genkit | IA generativa, tool calling y multimodal |
| WhatsApp Business API | Canal de comunicación y entrada |
| FCM | Notificaciones push |
| Firebase Functions | Servicios desacoplados |
| MCP Server | Exposición de herramientas a agentes |

---

## 12. Variables de entorno importantes

### Frontend

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_VAPID_KEY`
- `NEXT_APP_URL`

### Backend

- `FIREBASE_ADMIN_KEY_BASE64`
- `FIREBASE_STORAGE_BUCKET`
- `GOOGLE_API_KEY`
- `ORCHESTRATOR_URL`
- `ASSISTANT_TOKEN`
- `WHATSAPP_API_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `WEBHOOK_VERIFY_TOKEN`
- `NODE_ENV`

---

## 13. Estado actual del producto

### Componentes ya funcionales

- autenticación,
- dashboard general,
- clientes,
- productos,
- cotizaciones,
- pedidos,
- rentas,
- inventario,
- inventario local,
- calendario,
- producción,
- permisos y roles,
- WhatsApp,
- asistente interno,
- asistente de taller,
- orquestador,
- mcp server.

### Componentes parciales o por madurar

- exportación avanzada de reportes,
- analítica profunda de eficiencia,
- trazabilidad homogénea de acciones IA,
- más pruebas de negocio,
- observabilidad técnica más robusta,
- mejores mecanismos de validación y consistencia entre módulos.

---

## 14. Riesgos y deuda técnica detectada

| Área | Riesgo |
|---|---|
| Actions | Se está acumulando demasiada lógica de negocio en una sola capa |
| Testing | La cobertura actual no corresponde con la complejidad real |
| Consistencia | Hay mezcla de naming, estilos y responsabilidades |
| IA operativa | Hace falta robustecer idempotencia, observabilidad y control de errores |
| Reportes | La capa analítica todavía no refleja todo el valor del producto |
| Escalabilidad | Sin modularización adicional, crecer será más costoso |

### Riesgo de producto

Si seguimos agregando capacidades sin consolidar la base:

- aumentará el costo de mantenimiento,
- crecerán los bugs difíciles de reproducir,
- se volverá más lento trabajar con agentes,
- y bajará la confianza para automatizar más procesos.

---

## 15. Recomendaciones de implementación y mejora

### 15.1 Recomendaciones de arquitectura

#### A. Crear capa de servicios de dominio

Separar la lógica crítica de negocio de las Server Actions.

Propuesta:

```text
UI
  ->
Action
  ->
Servicio de dominio
  ->
Repositorio
  ->
Firestore / Storage / External API
```

Áreas prioritarias:

- pedidos,
- cotizaciones,
- inventario,
- taller,
- WhatsApp.

#### B. Introducir repositorios por bounded context

Evitar acceso disperso a Firestore.

Ejemplo:

- `orders.repository.ts`
- `quotes.repository.ts`
- `inventory.repository.ts`
- `whatsapp.repository.ts`
- `workshop.repository.ts`

#### C. Unificar validación

Definir esquemas Zod o equivalentes compartidos para:

- inputs de actions,
- payloads IA,
- payloads de webhook,
- respuestas de integraciones.

#### D. Estandarizar auditoría

Toda acción importante debería tener:

- actor,
- origen,
- payload resumido,
- resultado,
- timestamp,
- correlation id o trace id.

---

### 15.2 Recomendaciones de calidad

#### Prioridad alta

- Agregar pruebas de regresión para pedidos.
- Agregar pruebas para inventario y caja.
- Probar flujos de cambio de estatus.
- Probar procesos disparados por IA.
- Probar webhook de WhatsApp.

#### Cobertura mínima recomendada

```text
1. Crear cotización
2. Convertir cotización a pedido
3. Crear pedido
4. Cambiar estado de pedido
5. Registrar pago
6. Descontar inventario
7. Procesar mensaje WhatsApp
8. Ejecutar tarea del Asistente de Taller
```

---

### 15.3 Recomendaciones de observabilidad

Implementar o reforzar:

- logging estructurado,
- métricas por flujo,
- trazabilidad por request,
- monitoreo de errores de IA,
- monitoreo de errores de Cloud Functions,
- auditoría de acciones automáticas.

### Eventos valiosos para observar

- creación de cotización,
- conversión a pedido,
- cambio de estatus,
- auto-respuesta WhatsApp,
- tarea ejecutada desde taller,
- error de parsing IA,
- error de persistencia.

---

### 15.4 Recomendaciones de UX de producto

- Hacer más clara la diferencia entre sugerencia IA y acción confirmada.
- Mejorar estados vacíos y estados de carga.
- Dar más visibilidad a incidencias de producción.
- Unificar lenguaje y nomenclatura en toda la app.
- Mejorar experiencia de revisión de tareas del taller.
- Hacer más explícita la capacidad real del asistente interno.

---

### 15.5 Recomendaciones para trabajo con agentes

Para que agentes de programación trabajen mejor sobre este producto:

1. Mantener este documento actualizado.
2. Crear documentos por bounded context:
   - pedidos,
   - cotizaciones,
   - inventario,
   - WhatsApp,
   - taller,
   - IA/orquestador.
3. Marcar claramente flujos críticos y reglas de negocio.
4. Definir invariantes importantes.
5. Registrar deuda técnica conocida y decisiones pendientes.

### Invariantes sugeridos a documentar

- un pedido debe tener cliente válido,
- una cotización convertida no debe duplicarse,
- un cambio de estado debe quedar auditado,
- una tarea de taller no debe ejecutarse dos veces,
- un mensaje de WhatsApp no debe procesarse más de una vez,
- un pago debe reflejarse de forma consistente en pedido y caja.

---

## 16. Pasos a seguir recomendados

### Fase 1 - Consolidación del núcleo

- Extraer servicios de dominio.
- Reducir lógica en actions.
- Añadir pruebas en flujos críticos.
- Unificar validación y errores.
- Fortalecer auditoría.

### Fase 2 - Confiabilidad operativa

- Mejorar observabilidad.
- Endurecer backend para permisos.
- Asegurar idempotencia en IA y webhooks.
- Revisar consistencia de inventario, pagos y estados.

### Fase 3 - Escalabilidad de plataforma

- Formalizar repositorios.
- Modularizar mejor por contexto.
- Consolidar APIs operativas.
- Versionar prompts y reglas IA.
- Reforzar search/embeddings.

### Fase 4 - Evolución de producto

- Reportes y exportación avanzada.
- Analítica de productividad y capacidad.
- Recomendaciones proactivas.
- Automatizaciones seguras.
- Agentes especializados sobre MCP/orquestador.

---

## 17. Prioridades sugeridas para siguientes sesiones

### Prioridad alta

- Consolidar arquitectura de pedidos e inventario.
- Añadir pruebas útiles, no solo cobertura superficial.
- Definir mejor el dominio del Asistente de Taller.
- Mejorar el flujo de WhatsApp y su trazabilidad.

### Prioridad media

- Completar reportes.
- Mejorar onboarding interno.
- Crear documentación por módulo.

### Prioridad estratégica

- Preparar el producto para operación semiautónoma por agentes.
- Formalizar el producto como plataforma operativa CNC.

---

## 18. Resumen práctico para futuros agentes

Si un agente necesita trabajar en CNC Master App, debe asumir lo siguiente:

- Es un sistema de operación real, no un simple dashboard.
- Los módulos más sensibles son: pedidos, inventario, pagos, WhatsApp y taller.
- La IA ya modifica o influye procesos reales, por lo que la seguridad y trazabilidad importan.
- La prioridad no es solo agregar features, sino preservar consistencia.
- La mejor forma de avanzar es fortalecer el núcleo antes de expandir más la superficie funcional.

### Regla guía para futuras implementaciones

> Toda mejora debe evaluarse por su impacto en consistencia operativa, trazabilidad y facilidad de automatización futura.

---

## 19. Comandos útiles

```bash
# App principal
cd C:\Users\Osiel\Documents\CNCMaster\studio
npm run dev
npm run lint
npm run typecheck
npm run build

# Orquestador
cd C:\Users\Osiel\Documents\CNCMaster\studio\apps\cnc-orchestrator\functions
npm run build
npm run test
npm run serve

# MCP Server
cd C:\Users\Osiel\Documents\CNCMaster\studio\mcp-server
npm run build
npm run dev
npm run typecheck
```

---

## 20. Criterio para mantener este archivo vigente

Actualizar este archivo cuando ocurra cualquiera de estos cambios:

- se agregue un módulo nuevo,
- cambie el roadmap,
- se redefina una capacidad IA,
- cambie la arquitectura principal,
- se incorporen integraciones nuevas,
- se descubra deuda técnica importante,
- o se tomen decisiones que afecten a futuros agentes.

---

## Versión del documento

- Documento: `Hoja_poductoCNCmaster.md`
- Tipo: contexto interno de producto + roadmap técnico
- Fecha base: 2026-04-20
- Estado: inicial, consolidado a partir del análisis de la sesión actual
