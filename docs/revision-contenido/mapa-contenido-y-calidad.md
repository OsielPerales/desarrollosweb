# Mapa de contenido y revisión de calidad

Fecha de revisión: 13 de septiembre de 2026  
Proyecto: Desarrollos Elaborados  
Alcance: aplicación pública en `app/src`

## 1. Resumen ejecutivo

El sitio presenta a Desarrollos Elaborados como un puente entre formación, software, agentes de IA y manufactura. La arquitectura de contenidos sigue una secuencia comercial razonable:

`Inicio → entender la propuesta → elegir una línea de trabajo → conocer el método → solicitar diagnóstico`.

La propuesta es clara en su intención humanista y en su especialización industrial. La mayor oportunidad está en convertir esa narrativa en evidencia más concreta: resultados, casos, entregables, tiempos, perfiles de cliente y siguientes pasos verificables.

Evaluación cualitativa actual:

| Dimensión | Evaluación | Observación |
|---|---:|---|
| Claridad de propuesta | Alta | Se entiende que se combinan formación, implementación y validación. |
| Diferenciación | Media-alta | “Ingeniería Humanista”, validación real y CNC forman una posición propia. |
| Profundidad editorial | Media-alta | Hay contenido suficiente, pero algunas páginas dependen de conceptos abstractos. |
| Prueba y credibilidad | Media-baja | Faltan casos, métricas, ejemplos de entregables y referencias verificables. |
| Conversión | Media-alta | Hay CTAs frecuentes y un formulario de diagnóstico detallado. |
| Consistencia lingüística | Baja | Hay textos sin acentos y señales de codificación dañada en algunos archivos. |
| Accesibilidad semántica | Media | Existe jerarquía visual, pero conviene revisar textos alternativos, foco y etiquetas. |
| SEO editorial | Media | Hay títulos y descripciones por ruta; falta validar consistencia, fuentes y contenido indexable. |

## 2. Arquitectura de la aplicación

### Layout compartido

Archivo principal: `src/App.tsx`.

- `PublicLayout` envuelve todas las páginas públicas.
- `Navbar` ofrece navegación hacia Inicio, Soluciones, Academia, Laboratorio, Reporte IA y Nosotros.
- El botón principal del encabezado lleva a Contacto.
- Existe un acceso externo a iAprende: `https://iaprende-1415d.web.app/login`.
- `Footer` agrupa enlaces de Lectura, Servicios, Empresa y Legal.
- `ScrollToTop` reinicia el desplazamiento al cambiar de ruta.
- Las páginas se cargan de forma diferida con `lazy` y `Suspense`.

### Rutas públicas

| Ruta | Archivo | Función dentro del recorrido |
|---|---|---|
| `/` | `src/pages/Home.tsx` | Presentación, posicionamiento y entrada a las tres líneas de valor. |
| `/soluciones` | `src/pages/Soluciones.tsx` | Explica software, agentes y consultoría industrial. |
| `/academia` | `src/pages/Academia.tsx` | Presenta formación y adopción de IA por rol. |
| `/laboratorio` | `src/pages/Laboratorio.tsx` | Explica validación en procesos, software y manufactura. |
| `/reporte-ia-2025` | `src/pages/StrategicReport.tsx` | Contenido de autoridad sobre madurez y adopción de IA. |
| `/nosotros` | `src/pages/Nosotros.tsx` | Misión, visión, modelo operativo y valores. |
| `/contacto` | `src/pages/Contacto.tsx` | Captura el contexto del prospecto y propone el diagnóstico. |
| `/privacidad` | `src/pages/Privacidad.tsx` | Aviso de privacidad y tratamiento de datos. |
| `/terminos` | `src/pages/Terminos.tsx` | Condiciones de servicio. |

## 3. Mapa editorial por página

### Inicio — `/`

Archivo: `src/pages/Home.tsx`.

**Promesa principal**

- Etiqueta: “Ingeniería Humanista”.
- H1: “Habilidades humanas, potenciadas con IA.”
- Idea de apoyo: la capacitación es el primer paso para dominar la Inteligencia Artificial.

**Contenido y bloques**

1. Hero con dos acciones: “Iniciar Diagnóstico” y “Explorar Soluciones”.
2. Secuencia de valor: “Aprende / Aplica / Escala”.
3. Panel de capacidades: iAprende, Desarrollo de Software y Agentes, Laboratorio de Validación.
4. Tríada de Valor: Academia, Soluciones y Laboratorio.
5. Manifiesto sobre la colaboración entre inteligencia humana y artificial.
6. CTA final: transformar la industria mediante un diagnóstico gratuito.

**Calidad**

- Fortalezas: entrada emocional clara, buena conexión entre las tres líneas y navegación directa.
- Riesgos: “potenciadas con IA” es atractivo pero genérico; faltan sector prioritario, problema concreto y una prueba visible.
- Mejora recomendada: añadir una frase de calificación (“para PyMEs industriales que…”) y un ejemplo breve de resultado antes del primer CTA.

### Soluciones — `/soluciones`

Archivo: `src/pages/Soluciones.tsx`.

**Promesa principal**

- H1: “Desarrollo de Software”.
- Enfoque: software industrial, agentes con criterio y consultoría para PyMEs industriales.

**Contenido**

- Tres entradas: Desarrollo de Software, Orquestación de Agentes y Consultoría Industrial.
- Bloque “Empieza por aquí” para orientar según la necesidad.
- Fichas con “Para quién aplica” y “Qué resuelve”.
- Entregables, resultados y señales.
- Método de implementación.
- CTA de contacto.

**Calidad**

- Fortalezas: es la página más cercana a una decisión de compra; organiza bien necesidad, solución y resultados.
- Riesgos: “agentes”, “copilotos” y “consultoría” pueden interpretarse de muchas maneras.
- Mejora recomendada: especificar 3–5 ejemplos de proyectos, entregables concretos, duración orientativa y qué no se incluye.

### Academia — `/academia`

Archivo: `src/pages/Academia.tsx`.

**Promesa principal**

- H1: “Sin criterio por rol, la adopción se atora”.
- Idea central: no basta con abrir herramientas; el equipo necesita una forma compartida de usarlas.

**Contenido**

- Contraste entre lo que se evita y lo que se construye.
- Formación por rol: Operarios, Supervisores, Dirección y Líderes de implementación.
- Metodología de adopción.
- Cambios esperados después de la formación.
- CTA de diagnóstico.

**Calidad**

- Fortalezas: segmentación por audiencia muy útil; conecta capacitación con adopción, no solo con cursos.
- Riesgos: no se ven formato, duración, modalidad, tamaño de grupo, temario ni evidencia de aprendizaje.
- Mejora recomendada: presentar una ruta de formación con módulos, horas, modalidad y resultado observable por rol.

### Laboratorio — `/laboratorio`

Archivo: `src/pages/Laboratorio.tsx`.

**Promesa principal**

- H1: “Validación de procesos”.
- Enfoque: probar flujos y decisiones en una realidad donde el tiempo y el error importan.

**Contenido**

- Manufactura de precisión.
- Control y criterio.
- Capacidades de validación para Automatización, Software y Manufactura.
- Secuencia de evaluación y aprendizaje.

**Calidad**

- Fortalezas: diferenciación fuerte; “probar antes de proponer” es una idea comercial memorable.
- Riesgos: “validar” no está suficientemente operacionalizado: faltan criterios de éxito, condiciones, métricas y entregable final.
- Mejora recomendada: mostrar el ciclo “hipótesis → prueba → medición → decisión” y un ejemplo de informe de validación.

### Reporte IA — `/reporte-ia-2025`

Archivo: `src/pages/StrategicReport.tsx`.

**Promesa principal**

- H1/SEO: “Diagnóstico de madurez”.
- Función: contenido de autoridad para explicar por qué fallan las adopciones de IA y cómo preparar equipos industriales.

**Contenido**

- Potencial económico de la IA.
- Fricción organizacional y falta de formación.
- Brecha entre grandes empresas y PyMEs.
- Señales de alerta.
- Características de los grupos que sí escalan.
- Mejoras esperadas cuando la adopción se hace bien.
- Recomendaciones sobre formación por rol, implementación y gobernanza básica.

**Calidad**

- Fortalezas: puede funcionar como pieza de descubrimiento y conversación comercial.
- Riesgos: el contenido menciona PwC, Goldman Sachs y análisis de industria; toda cifra o afirmación debe tener fuente visible, fecha y enlace.
- Mejora recomendada: añadir resumen ejecutivo, metodología, fuentes completas y una descarga o formulario asociado al reporte.

### Nosotros — `/nosotros`

Archivo: `src/pages/Nosotros.tsx`.

**Promesa principal**

- H1/SEO: “Ingeniería con propósito humano”.
- Posicionamiento: puente operativo entre formación, software y manufactura.

**Contenido**

- Misión: elevar la capacidad del equipo.
- Visión: adopción sana y mejor criterio operativo.
- Modelo operativo.
- Valores: Validación tangible, Transparencia cognitiva y Claridad funcional, entre otros.
- CTA hacia contacto.

**Calidad**

- Fortalezas: da profundidad ética y explica cómo se trabaja.
- Riesgos: la página habla más de principios que de personas, experiencia y trayectoria.
- Mejora recomendada: incorporar fundadores/equipo, ubicación, experiencia relevante, clientes o proyectos autorizados y una explicación del origen de “Skin in the Game”.

### Contacto — `/contacto`

Archivo: `src/pages/Contacto.tsx`.

**Objetivo**

- Recoger nombre, correo y contexto de la empresa.
- Clasificar tipo de empresa, objetivo principal, etapa, urgencia e intereses.
- Orientar el siguiente paso: diagnóstico, formación, implementación o validación.

**Calidad**

- Fortalezas: formulario consultivo, no genérico; las preguntas ayudan a calificar la oportunidad.
- Riesgos: el volumen de campos puede ser alto para una primera interacción; debe comprobarse que el beneficio de completar el formulario sea evidente.
- Mejora recomendada: separar campos obligatorios y opcionales, mostrar tiempo estimado de respuesta y ofrecer una alternativa de contacto directa.

### Legal — `/privacidad` y `/terminos`

Archivos: `src/pages/Privacidad.tsx` y `src/pages/Terminos.tsx`.

- Privacidad cubre datos recabados, finalidades, CRM/correo/mensajería, derechos ARCO y cambios al aviso.
- Términos cubre descripción general, propuestas y diagnósticos, propiedad intelectual, confidencialidad, responsabilidad y jurisdicción.

**Calidad**

- La estructura es adecuada para un sitio con formulario.
- Requiere revisión legal final con datos reales del responsable, medios de contacto, proveedores, conservación de datos y procedimiento de ejercicio de derechos.
- La fecha de actualización debe mantenerse sincronizada con cada cambio importante.

## 4. Mensaje y embudo de conversión

### Mensaje central

La marca promete ayudar a empresas industriales a adoptar IA con criterio, formando primero y construyendo o validando después. Es una narrativa coherente con el nombre “Desarrollos Elaborados” y con el vínculo a manufactura CNC.

### Recorrido recomendado

1. Inicio introduce el problema y la tríada.
2. Soluciones, Academia o Laboratorio profundizan según necesidad.
3. Reporte IA aporta autoridad y lenguaje para el diagnóstico.
4. Nosotros responde “por qué confiar”.
5. Contacto convierte el interés en contexto comercial.

### Fricciones observadas

- Se usan muchas expresiones abstractas: criterio, adopción, realidad, claridad, propósito.
- Faltan pruebas que aterricen esos conceptos.
- Los CTAs son correctos, pero conviene diferenciar mejor “conocer”, “evaluar” y “contratar”.
- El acceso externo a iAprende debe abrir correctamente y conservar una experiencia de retorno hacia el sitio principal.

## 5. Revisión de calidad textual y técnica

### Problema prioritario: codificación de caracteres

En varios archivos aparecen cadenas como `diagnÃ³stico`, `QuiÃ©nes`, `TÃ©rminos` y `tecnolÃ³gico`. Esto afecta percepción de calidad, accesibilidad y confianza. Debe normalizarse todo el proyecto a UTF-8 y corregirse al menos:

- `src/pages/Home.tsx` en títulos SEO y textos de navegación restaurados.
- `src/components/layout/Navbar.tsx`.
- `src/components/layout/Footer.tsx`.
- Cualquier otra cadena detectada con patrones `Ã`, `Â` o `â`.

### Consistencia editorial

- Usar una sola forma para “IA”, “inteligencia artificial”, “PyMEs” y “pymes”.
- Mantener acentos y mayúsculas en “Diagnóstico”, “Adopción”, “Metodología”, “Qué” y “Aquí”.
- Definir si “iAprende” es marca de producto o plataforma y mantener la misma presentación.
- Evitar alternar “formación”, “capacitación” y “alfabetización” sin explicar la diferencia.
- Revisar que todas las afirmaciones de resultados sean demostrables.

### SEO y accesibilidad

- Verificar que cada ruta tenga un solo H1 y un título SEO único.
- Convertir textos visualmente destacados en encabezados semánticos cuando corresponda.
- Revisar `aria-label`, estados de foco, navegación por teclado y contraste.
- Añadir textos alternativos descriptivos si se incorporan imágenes.
- Validar las URLs canónicas y las meta descripciones contra el dominio real de producción.

## 6. Backlog editorial priorizado

### Prioridad alta

1. Corregir la codificación UTF-8 en toda la interfaz.
2. Añadir evidencia: casos, métricas, ejemplos de entregables y criterios de éxito.
3. Completar fuentes del Reporte IA 2025.
4. Revisar legalmente privacidad, formulario y términos.
5. Definir un mensaje de calificación de cliente ideal en Inicio y Soluciones.

### Prioridad media

1. Publicar rutas de formación con módulos, duración y resultados.
2. Explicar el proceso de validación del Laboratorio con un ejemplo.
3. Añadir información del equipo y trayectoria en Nosotros.
4. Reducir fricción del formulario y comunicar tiempo de respuesta.
5. Diferenciar CTAs según etapa del usuario.

### Prioridad baja

1. Crear un glosario breve de agentes, copilotos, orquestación y gobernanza.
2. Añadir artículos o notas derivadas del Reporte IA.
3. Diseñar una página de casos o biblioteca de proyectos.
4. Medir clics por CTA, abandono del formulario y rutas de navegación.

## 7. Criterio de aceptación para futuras revisiones

Una nueva versión de contenido debería cumplir lo siguiente:

- El visitante entiende en menos de 10 segundos qué se hace, para quién y cuál es el siguiente paso.
- Cada línea de servicio tiene audiencia, problema, método, entregables y resultado esperado.
- Toda cifra o afirmación externa tiene fuente visible.
- La interfaz no presenta caracteres dañados ni inconsistencias ortográficas.
- Cada página tiene una acción principal y una acción secundaria coherentes con su nivel de intención.
- El formulario solicita únicamente datos necesarios y explica qué recibirá la persona después de enviarlo.
