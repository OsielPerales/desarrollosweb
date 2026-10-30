# Analisis Central de Contenido y Estructura

## 1. Proposito del documento

Este documento funciona como el sistema nervioso central del sitio publico de Desarrollos Elaborados. La idea no es solo "opinar sobre la web", sino entender:

- que intenta vender cada pagina;
- que sensacion transmite;
- que informacion falta para convertir;
- como reestructurarla para que sea mas util para la empresa y mas clara para el cliente.

La lectura esta basada en el codigo fuente actual del proyecto, no en una version idealizada del sitio.

Rutas base del sitio:

- [App.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/App.tsx:1>)

## 2. Metodo de lectura

El analisis se hizo leyendo:

- arquitectura publica y rutas;
- navbar y footer;
- copy visible de cada pagina;
- CTA, jerarquia de titulos y bloques;
- sistema visual base;
- puntos donde el sitio promete autoridad, evidencia o conversion.

Archivos principales revisados:

- [Navbar.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/components/layout/Navbar.tsx:14>)
- [Footer.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/components/layout/Footer.tsx:19>)
- [Home.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Home.tsx:94>)
- [Soluciones.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Soluciones.tsx:62>)
- [Academia.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Academia.tsx:62>)
- [Laboratorio.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Laboratorio.tsx:51>)
- [Nosotros.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Nosotros.tsx:43>)
- [Contacto.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Contacto.tsx:40>)
- [StrategicReport.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/StrategicReport.tsx:61>)
- [Privacidad.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Privacidad.tsx:4>)
- [Terminos.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Terminos.tsx:4>)
- [index.css](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/index.css:1>)

## 3. Lectura ejecutiva

### Lo que ya esta muy bien

- La marca tiene una tesis real y diferenciada.
- La triada `formacion + implementacion + validacion` esta muy clara.
- El tono no se siente generico ni "consultoria de PowerPoint".
- El laboratorio/manufactura da un angulo dificil de copiar.
- El contacto ya no es solo un formulario: empieza a funcionar como discovery.

### Lo que hoy le quita fuerza

- Varias paginas hablan de la reescritura del sitio en vez de hablar solo del cliente.
- Hay mas filosofia y narrativa que evidencia dura.
- Faltan casos, pruebas visuales, fotos, antes/despues y resultados.
- Los CTA ya son mejores, pero todavia no forman un embudo completo por tipo de visitante.
- El reporte estrategico aporta autoridad, pero necesita fuentes visibles antes de empujarse fuerte.

### Diagnostico central

El sitio ya sabe quien quiere ser, pero todavia no termina de demostrar por que conviene comprarle hoy.

La empresa ya gano identidad. Ahora necesita ganar decision.

## 4. Tesis madre del sitio

La promesa general que el sitio intenta transmitir es:

`Ayudamos a PyMEs industriales a adoptar IA con criterio, formando personas, implementando soluciones utiles y validando en una operacion real.`

Eso aparece de forma consistente en:

- Home: IA util para equipos reales.
- Soluciones: tecnologia que resiste la realidad.
- Academia: formacion para que la IA no se convierta en caos.
- Laboratorio: validacion tangible.
- Nosotros: puente operativo.
- Contacto: ordenar el siguiente movimiento.

La tesis es fuerte porque junta cuatro territorios que rara vez aparecen bien integrados:

- IA;
- manufactura;
- formacion;
- criterio humano.

## 5. Arquitectura actual del sitio

### Rutas publicas

- `/`
- `/soluciones`
- `/academia`
- `/laboratorio`
- `/nosotros`
- `/contacto`
- `/reporte-ia-2025`
- `/privacidad`
- `/terminos`

Referencia:

- [App.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/App.tsx:37>)

### Navegacion principal

El menu superior prioriza:

- Inicio
- Soluciones
- Academia
- Laboratorio
- Reporte IA
- Nosotros

Y deja `Contacto` como CTA principal:

- `Ordenar mi siguiente paso`
- `Acceder a iAprende`

Referencias:

- [Navbar.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/components/layout/Navbar.tsx:5>)
- [Navbar.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/components/layout/Navbar.tsx:72>)
- [Footer.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/components/layout/Footer.tsx:4>)

Lectura estrategica:

- `Contacto` como CTA y no como item normal esta bien.
- `Reporte IA` en navegacion principal eleva autoridad, pero compite con rutas mas transaccionales.
- La empresa se presenta como sistema, no como catalogo plano. Eso es bueno.

## 6. Hallazgo mas importante: fuga de copy interno

El problema de contenido mas serio no es visual. Es editorial.

Hoy varias paginas filtran lenguaje de taller interno, de workshop o de proceso de reescritura. Ejemplos:

- `Lo que cambia en esta pagina` en [Soluciones.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Soluciones.tsx:94>)
- `La nueva narrativa de Academia...` en [Academia.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Academia.tsx:165>)
- `Esta pagina deja de decir...` en [Laboratorio.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Laboratorio.tsx:72>)
- `Reescribimos esta pagina...` en [Nosotros.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Nosotros.tsx:131>)
- `La narrativa nueva del sitio...` en [Home.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Home.tsx:277>)
- notas editoriales futuras dentro del reporte en [StrategicReport.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/StrategicReport.tsx:114>) y [StrategicReport.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/StrategicReport.tsx:348>)

### Por que esto importa

- Rompe inmersion comercial.
- Baja autoridad.
- Hace sentir que el sitio aun esta "en taller" frente al cliente.
- Mueve el foco del problema del usuario al proceso interno del equipo.

### Regla editorial recomendada

Todo texto visible debe responder al cliente, no al proceso de diseño del sitio.

En otras palabras:

- quitar lenguaje tipo `reescribimos`, `cambio narrativo`, `esta pagina deja de`;
- hablar siempre desde beneficio, contexto, proceso o prueba;
- dejar la meta-narrativa solo para documentos internos, nunca para la capa publica.

## 7. Hallazgos transversales

### 7.1 Identidad de marca

Fortalezas:

- voz propia;
- tono sobrio y humano;
- evita humo y promesas grandilocuentes;
- bien anclada a industria.

Riesgo:

- cuando el tono se vuelve muy conceptual, la pagina inspira mas de lo que ayuda a decidir.

### 7.2 Conversion

Fortalezas:

- hay CTA en todas las rutas;
- contacto ya recoge objetivo, etapa, urgencia e intereses;
- WhatsApp reduce friccion.

Debilidades:

- faltan CTAs intermedios de menor compromiso;
- falta una ruta clara de "prueba social -> confianza -> contacto";
- faltan salidas especificas por perfil de visitante.

### 7.3 Evidencia

Hallazgo duro:

- no detecte imagenes de casos, procesos o manufactura en paginas comerciales;
- solo aparecen imagenes del logo en navbar y footer.

Referencias:

- [Navbar.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/components/layout/Navbar.tsx:45>)
- [Footer.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/components/layout/Footer.tsx:26>)

Esto significa que hoy la web depende casi totalmente de:

- copy;
- iconos;
- tarjetas;
- ritmo visual.

Eso alcanza para posicionar una idea, pero no para sostener confianza premium por mucho tiempo.

### 7.4 Prueba comercial

No se observan bloques dedicados a:

- logos de clientes;
- testimonios;
- casos detallados;
- cifras propias;
- FAQ comercial;
- paquetes u ofertas de entrada.

Conclusiones:

- el sitio vende criterio, pero aun no vende certidumbre;
- hay narrativa, pero falta prueba;
- hay sistema, pero aun faltan artefactos de confianza.

### 7.5 Reporte estrategico

El reporte es valioso como activo de autoridad, pero hoy declara por si mismo que necesita fuentes visibles antes de escalarse como pieza editorial.

Referencias:

- [StrategicReport.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/StrategicReport.tsx:114>)
- [StrategicReport.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/StrategicReport.tsx:348>)

La recomendacion aqui no es quitarlo. Es robustecerlo.

## 8. Analisis por pagina

## 8.1 Home `/`

Referencia:

- [Home.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Home.tsx:94>)

### Mision actual

Actuar como puerta de entrada y ordenar al visitante por necesidad.

### Titulos y CTA actuales

- Badge: `Ingenieria humanista para PyMEs industriales`
- H1: `IA util para equipos reales, no humo para presentaciones.`
- CTA 1: `Quiero un diagnostico comercial`
- CTA 2: `Explorar por servicio`
- CTA cierre: `Agendar diagnostico`

### Lo que hace bien

- El H1 ya es mucho mas comercial que filosofico.
- El hero aterriza industria, IA y utilidad real.
- La triada de entrada esta bien traducida a decisiones:
  - capacitar;
  - automatizar;
  - validar.
- La seccion de dolores mejora mucho la relevancia.

### Lo que todavia le falta

- no hay prueba de que esto ya funciono para alguien;
- no clasifica por tipo de decisor;
- el bloque `Asi cambia la historia` aun suena a escenario ilustrativo, no a evidencia real;
- el cierre repite CTA, pero podria incorporar una salida distinta para quien aun no esta listo para contacto.

### Contenido que conviene agregar

- `Ideal para`: dueno, gerencia, operaciones, supervision;
- `No es para`: empresas que solo quieren una demo sin implementacion;
- 1 mini caso real por cada camino;
- 1 bloque corto de `Que te llevas en la primera conversacion`.

### Opinion del agente de estrategia

Home ya ordena mejor el trafico, pero todavia necesita demostrar mas autoridad operativa en los primeros 2 scrolls.

### Opinion del agente emocional

Transmite:

- cercania;
- claridad;
- baja tolerancia al humo.

Falta transmitir:

- seguridad;
- experiencia acumulada;
- "ya pasamos por esto antes".

### Reescritura sugerida del primer subtitulo

Ejemplo ilustrativo:

`Ayudamos a PyMEs industriales a detectar donde conviene usar IA, preparar al equipo correcto e implementar un primer flujo sin improvisar ni comprar herramientas de mas.`

## 8.2 Soluciones `/soluciones`

Referencia:

- [Soluciones.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Soluciones.tsx:62>)

### Mision actual

Explicar tres lineas de oferta y orientar la compra por problema.

### Titulos y CTA actuales

- Badge: `Soluciones para madurez real, no para demo`
- H1: `Tecnologia que resiste la realidad`
- CTA por tarjeta:
  - `Quiero automatizar un flujo`
  - `Quiero disenar un copiloto`
  - `Quiero un roadmap de transformacion`
- CTA cierre: `Agendar llamada de descubrimiento`

### Lo que hace bien

- La pagina ya responde mejor:
  - para quien aplica;
  - que resuelve;
  - entregables;
  - resultados;
  - senales de entrada.
- El contenido esta mucho mas comprable que antes.
- La metodologia al final ayuda a generar confianza.

### Lo que debilita

- La frase `Lo que cambia en esta pagina` debe salir.
- Aun falta:
  - tiempo estimado;
  - formato de arranque;
  - ejemplo real por servicio;
  - objeciones comunes.
- `Orquestacion de Agentes` sigue siendo la oferta con mas riesgo de sonar abstracta.

### Temas que conviene reforzar por bloque

- Desarrollo de Software:
  - ejemplos concretos de tablero, trazabilidad, captura, seguimiento;
  - integraciones reales;
  - que se reemplaza o se deja de hacer.
- Orquestacion de Agentes:
  - casos por rol;
  - limites y validaciones;
  - donde no conviene usar agentes.
- Consultoria Industrial:
  - entregable final;
  - duracion;
  - formato de sesiones;
  - quick wins.

### Opinion del agente UX

La pagina ya esta cerca de una decision page. Le falta un comparador rapido al inicio:

- cuando elegir cada ruta;
- cuanto tarda;
- que entrega;
- que tipo de empresa encaja.

### Microcopy sugerido para reemplazar el bloque meta

En vez de:

- `Lo que cambia en esta pagina`

Usar:

- `Como elegir el siguiente paso correcto`

## 8.3 Academia `/academia`

Referencia:

- [Academia.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Academia.tsx:62>)

### Mision actual

Presentar iAprende como base de adopcion responsable.

### Titulos y CTA actuales

- Badge: `Plataforma iAprende`
- H1: `Formacion para que la IA no se convierta en caos.`
- CTA 1: `Disenar plan de formacion`
- CTA 2: `Ver trayectos por rol`
- CTA cierre: `Evaluar madurez del equipo`

### Lo que hace bien

- La tesis esta muy clara y bien enfocada.
- Ya no vende "cursos" sino preparacion organizacional.
- Los trayectos por rol aportan una estructura util.
- La metodologia esta mejor enfocada a adopcion real.

### Lo que le falta

- evidencia de plataforma, clases o experiencia real;
- modalidad y formato;
- profundidad de cada trayecto;
- ejemplo de programa de 30-60-90 dias;
- prueba de por que iAprende es mejor que comprar capacitaciones externas genricas.

### Hallazgo puntual

Hay una linea que aun habla desde el taller interno:

- [Academia.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Academia.tsx:165>)

Debe hablar del cliente, no del cambio narrativo.

### Opinion del agente pedagogico

Es una pagina con una promesa correcta. Ahora necesita bajar a:

- formato;
- esfuerzo;
- acompanamiento;
- evidencia de aprendizaje aplicado.

### Contenido que conviene agregar

- `Como se ve un trayecto`;
- `Que recibe el equipo`;
- `Como medimos adopcion`;
- `Que cambia en 30 dias`;
- 1 demo visual de la plataforma.

### Ejemplo de bloque nuevo

`Trayecto piloto de 4 semanas`

- Semana 1: fundamentos y uso responsable
- Semana 2: casos por rol
- Semana 3: practica con flujos internos
- Semana 4: validacion, dudas y siguiente paso

## 8.4 Laboratorio `/laboratorio`

Referencia:

- [Laboratorio.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Laboratorio.tsx:51>)

### Mision actual

Convertir el laboratorio en prueba de criterio y no solo en "tambien fabricamos".

### Titulos y CTA actuales

- Badge: `Corte y Diseno CNC`
- H1: `Validacion tangible`
- CTA 1: `Quiero validar una solucion`
- CTA 2: `Quiero una cotizacion de manufactura`

### Lo que hace muy bien

- Es la pagina con mayor poder diferenciador de toda la web.
- Ya comunica que el laboratorio reduce riesgo.
- Separa mejor validacion de manufactura.
- El manifiesto operativo es fuerte.

### Lo que sigue faltando

- fotos reales;
- piezas reales;
- flujo de validacion;
- timeline de prueba;
- ejemplos concretos de aprendizaje obtenido;
- evidencia de capacidades materiales.

### Hallazgo puntual

Tambien contiene copy meta:

- [Laboratorio.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Laboratorio.tsx:72>)
- [Laboratorio.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Laboratorio.tsx:206>)

Eso debe convertirse en prueba para el usuario.

### Opinion del agente de marca

Aqui vive la diferencia premium de la empresa. Si esta pagina gana evidencia visual real, puede cargar mucha mas confianza que cualquier manifiesto.

### Recomendacion de estructura futura

- Hero con foto o render del entorno;
- Proceso de validacion paso a paso;
- Tipos de pruebas o escenarios;
- Casos de aprendizaje;
- Capacidad de manufactura separada;
- CTA segmentado: validar / cotizar / visitar / conversar.

## 8.5 Nosotros `/nosotros`

Referencia:

- [Nosotros.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Nosotros.tsx:43>)

### Mision actual

Explicar la filosofia, mision, vision y principios operativos de la marca.

### Titulos y CTA actuales

- Badge: `Quienes somos en la operacion`
- H1: `Somos el puente operativo`
- CTA cierre: `Explorar si somos el socio correcto`

### Lo que hace bien

- Mantiene identidad fuerte.
- Baja valores a consecuencias practicas para el cliente.
- La triada ya no esta solo declarada; se intenta explicar como sistema de trabajo.

### Lo que aun le sobra

- sigue habiendo frases de reescritura interna;
- todavia hay un poco de "hablar de nosotros para nosotros";
- faltan hechos, origen, experiencia, equipo, instalaciones o hitos concretos.

Referencias de copy meta:

- [Nosotros.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Nosotros.tsx:119>)
- [Nosotros.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Nosotros.tsx:131>)
- [Nosotros.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Nosotros.tsx:170>)

### Opinion del agente de narrativa

La pagina ya tiene alma. Ahora necesita suelo.

Eso significa agregar:

- origen de la empresa;
- por que existe el laboratorio;
- que experiencia combina el equipo;
- a quien acompanan mejor;
- como deciden no vender de mas.

## 8.6 Contacto `/contacto`

Referencia:

- [Contacto.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Contacto.tsx:40>)

### Mision actual

Capturar leads con mejor contexto de compra.

### Titulos y CTA actuales

- Badge: `Discovery guiado`
- H1: `Ordenemos tu siguiente movimiento`
- CTA formulario: `Enviar solicitud`
- CTA alterno: `Prefiero WhatsApp`
- Estado de exito: `Continuar por WhatsApp`

### Lo que hace bien

- Es una de las paginas mas funcionales del sitio.
- Ya pregunta:
  - objetivo;
  - etapa;
  - urgencia;
  - intereses.
- Explica que pasa despues.
- WhatsApp esta bien integrado.

### Lo que puede mejorar

- aun no pregunta presupuesto orientativo;
- no pregunta tamano de equipo o area impactada;
- no captura principal problema operativo con suficiente estructura;
- el SLA de respuesta es ambiguo;
- no hay `elige una salida` segun servicio.

### Opinion del agente de conversion

La pagina ya esta cerca de un discovery comercial serio. El siguiente salto es calificar mejor sin hacer el formulario pesado.

### Preguntas nuevas recomendadas

- `Que area quieres impactar primero?`
- `Cuantas personas usarian esta solucion o formacion?`
- `Ya existe una herramienta actual o proceso manual a reemplazar?`
- `Hay presupuesto definido, exploratorio o aun no?`

### Mejora funcional sugerida

Si `objetivo = Fabricar o prototipar`, mostrar preguntas de:

- material;
- tolerancia;
- cantidad;
- fecha objetivo.

Si `objetivo = Capacitar a mi equipo`, mostrar:

- numero de personas;
- roles;
- formato deseado;
- nivel actual.

## 8.7 Reporte IA `/reporte-ia-2025`

Referencia:

- [StrategicReport.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/StrategicReport.tsx:61>)

### Mision actual

Elevar la conversacion y justificar la metodologia de la empresa.

### Titulos y CTA actuales

- Badge: `Informe estrategico 2025-2026`
- H1: `La IA ya esta cambiando tu industria. La diferencia esta en como entras.`
- CTA intermedio: `Descubrir en que grupo estas`
- CTA final:
  - `Quiero mi diagnostico`
  - `Ver programa de formacion`

### Lo que hace bien

- Da autoridad.
- Enmarca urgencia.
- Conecta contexto macro con propuesta comercial.
- Ya incorpora puente hacia diagnostico, academia y contacto.

### Lo que exige cuidado

- usa cifras fuertes;
- reconoce que falta citar fuentes al pie;
- incluye notas editoriales internas visibles;
- algunas cifras pueden ser utiles como disparador, pero necesitan formalidad si se usaran en campanas o prospeccion.

### Opinion del agente de autoridad

Es una pieza con potencial de imán inbound. Pero solo despues de volverse editorialmente impecable.

### Acciones necesarias

- agregar fuentes visibles al pie;
- fechar revision editorial;
- indicar metodologia de seleccion de datos;
- decidir si la pagina es:
  - reporte largo;
  - landing de insight;
  - pieza descargable.

## 8.8 Legales `/privacidad` y `/terminos`

Referencias:

- [Privacidad.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Privacidad.tsx:4>)
- [Terminos.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Terminos.tsx:4>)

### Lectura actual

- Tono coherente con el sitio.
- Claridad general suficiente.
- Ayudan a confianza basica.

### Oportunidades

- agregar SEO tambien a paginas legales;
- revisar si falta razon social completa;
- validar telefono, correo, domicilio y jurisdiccion final;
- revisar si conviene mencionar tratamiento de leads, CRM y WhatsApp con mayor precision.

## 9. Perspectivas de agentes especializados

## 9.1 Agente de estrategia de negocio

El posicionamiento es fuerte, pero la oferta aun no termina de empaquetarse como productos de entrada claros.

La empresa deberia cristalizar 4 ofertas iniciales:

- diagnostico de madurez IA;
- programa de formacion por rol;
- implementacion de primer flujo;
- validacion/prototipado/manufactura.

## 9.2 Agente de contenido

La formula ganadora para cada bloque del sitio deberia ser:

- problema;
- lectura correcta del problema;
- solucion propuesta;
- prueba;
- siguiente paso.

Hoy el sitio cumple bien:

- lectura correcta del problema;
- solucion propuesta.

Todavia le falta consolidar:

- prueba;
- siguiente paso diferenciado.

## 9.3 Agente de UX/UI

Lo mejor del sistema visual:

- paleta sobria;
- buen contraste editorial-industrial;
- tarjetas limpias;
- consistencia general.

Lo que falta:

- prueba visual real;
- variedad de densidad informativa;
- comparadores;
- diagramas de proceso;
- fotos o renders reales;
- bloques de evidencia.

## 9.4 Agente de transmision de sentimientos

Sentimientos que hoy si transmite la web:

- criterio;
- calma;
- cercania;
- inteligencia;
- sobriedad.

Sentimientos que aun deberia intensificar:

- confianza de ejecucion;
- alivio ante el caos tecnologico;
- seguridad comercial;
- sensacion de "esta gente ya piso la planta".

## 9.5 Agente de conversion

Los CTA son mejores que una web institucional promedio, pero todavia pueden ordenarse mejor por madurez:

- visitante frio: `Quiero entender por donde empezar`
- visitante tibio: `Quiero ver si mi caso encaja`
- visitante caliente: `Quiero un diagnostico`
- visitante tecnico: `Quiero validar una solucion`

## 9.6 Agente de reputacion y autoridad

El reporte, la academia y el laboratorio deberian formar un triangulo de confianza:

- el reporte educa;
- la academia prepara;
- el laboratorio demuestra.

Hoy esa logica ya existe, pero no esta explicitada como sistema.

## 10. Propuesta de nueva estructura narrativa

## 10.1 Secuencia mental recomendada

1. Entendemos tu realidad industrial.
2. La IA sin criterio genera ruido, no retorno.
3. Te ayudamos a entrar por el punto correcto: formar, implementar o validar.
4. Esto es lo que cambia en tu operacion.
5. Asi trabajamos.
6. Aqui esta la evidencia.
7. Este es tu siguiente paso.

## 10.2 Reestructura sugerida del Home

- Hero con promesa concreta.
- Problemas tipicos de PyMEs industriales.
- Tres rutas de entrada.
- Como trabajamos.
- Evidencia real o mini casos.
- CTA segmentado.

## 10.3 Reestructura sugerida de Soluciones

- Selector rapido por problema.
- Comparador de servicios.
- Tarjetas detalladas.
- Caso corto por servicio.
- Metodo.
- CTA por servicio.

## 10.4 Reestructura sugerida de Academia

- Problema de adopcion.
- Que es iAprende y para quien.
- Trayectos por rol.
- Muestra de formato/metodologia.
- Ejemplo de plan piloto.
- CTA para plan de formacion.

## 10.5 Reestructura sugerida de Laboratorio

- Hero visual.
- Por que valida.
- Proceso.
- Escenarios reales.
- Capacidades de manufactura.
- Evidencia visual.
- CTA por objetivo.

## 11. Propuestas concretas de mejora de contenido

## 11.1 Lo que conviene eliminar

- copy que explique la reescritura de la pagina;
- notas editoriales internas visibles;
- frases que hablen del sitio mas que del cliente.

## 11.2 Lo que conviene agregar

- casos breves;
- ejemplos de resultados;
- fotos reales;
- diagrama de proceso;
- FAQ comercial;
- `para quien es / para quien no es`;
- formato de trabajo y tiempos orientativos.

## 11.3 Lo que conviene profundizar

- tipos de cliente ideales;
- problemas resueltos;
- entregables;
- riesgo reducido;
- metodo de validacion;
- aprendizaje por rol.

## 12. Propuestas esteticas y visuales

## 12.1 Conservar

- paleta actual en [index.css](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/index.css:5>);
- tono editorial;
- serif en titulares;
- combinacion de crema, grafito, naranja, cobalto, menta y lavanda.

## 12.2 Evolucionar

- pasar de interfaz basada casi solo en tarjetas a mezcla de:
  - cards;
  - timeline;
  - comparadores;
  - bloques de evidencia;
  - galerias de proceso.
- sumar fotografias de planta, piezas, pantallas reales y equipos;
- usar diagramas simples de flujo para explicacion operacional;
- diferenciar mas visualmente paginas de:
  - autoridad;
  - decision;
  - conversion.

## 12.3 Direccion visual recomendada

- Home: promesa + orden + confianza.
- Soluciones: claridad modular y comprable.
- Academia: pedagogia aplicada y acompanamiento.
- Laboratorio: textura industrial, evidencia, precision.
- Nosotros: editorial y legitimidad.
- Contacto: conversacion guiada y baja friccion.

## 13. Plan de mejora por prioridad

## 13.1 Prioridad 0 - antes de cualquier campana

- eliminar copy autorreferencial y editorial interno;
- corregir el reporte para que no muestre notas de produccion;
- definir fuentes visibles del reporte;
- revisar que todas las claims fuertes sean defendibles.

Impacto esperado:

- aumento de credibilidad inmediata;
- menor sensacion de sitio en construccion;
- mejor autoridad comercial.

## 13.2 Prioridad 1 - conversion

- reforzar Home con prueba y perfil de cliente ideal;
- añadir comparador de servicios en Soluciones;
- mejorar Contacto con preguntas condicionales por objetivo;
- definir `que pasa despues` con SLA mas claro.

Impacto esperado:

- leads mejor calificados;
- menos friccion para decidir;
- mas contacto con contexto util.

## 13.3 Prioridad 2 - evidencia

- agregar fotos reales del laboratorio;
- crear 3 mini casos;
- insertar bloques de prueba por pagina;
- conectar reporte -> soluciones -> contacto con evidencia real.

Impacto esperado:

- confianza premium;
- mejor retencion en pagina;
- mejor conversion de visitantes tibios.

## 13.4 Prioridad 3 - sofisticacion editorial

- crear biblioteca de insights;
- derivar checklist descargable del reporte;
- sumar FAQ por servicio;
- afinar microcopy de CTA por perfil.

## 14. Metricas sugeridas para medir si la reestructura funciona

Nota: como no hay baseline visible en el repositorio, estas son metas sugeridas, no resultados actuales.

### Metricas de atraccion y lectura

- CTR del CTA principal del hero: objetivo sugerido `3% a 5%`
- scroll hasta el segundo bloque clave en Home: `>60%`
- tiempo medio en Soluciones: `>1:30`
- salida desde Reporte hacia Contacto o Academia: `>8%`

### Metricas de conversion

- tasa de envio del formulario de contacto: `>25%` de quienes lo inician
- porcentaje de leads con `objetivo`, `etapa` y `urgencia` completos: `>80%`
- tasa de clic a WhatsApp desde Contacto: `10% a 20%` como via alternativa
- lead calificado comercialmente: `>50%` del total entrante

### Metricas de autoridad

- al menos `1 prueba visual real` por pagina comercial principal
- al menos `1 caso breve` por servicio principal
- `100%` de cifras del reporte con fuente visible antes de usarlo en campanas

### Metricas de experiencia

- rebote de Home por debajo de `45%`
- tiempo de respuesta comercial: `<4 horas habiles` si el modelo operativo lo permite
- porcentaje de usuarios que eligen un CTA segmentado en lugar de salir: `>20%`

## 15. Ejemplos reales de formato que conviene construir

Estos ejemplos son plantillas, no claims reales.

### Ejemplo de mini caso para Soluciones

`Antes`

- Seguimiento de ordenes y avances en WhatsApp y Excel.

`Intervencion`

- tablero interno + flujo asistido + responsables visibles.

`Despues`

- menos mensajes perdidos, estado centralizado y decision mas rapida.

### Ejemplo de mini caso para Academia

`Situacion`

- supervisores usando IA de forma dispar.

`Accion`

- trayecto de 4 semanas por rol.

`Resultado`

- mejor criterio para pedir, validar y documentar.

### Ejemplo de prueba para Laboratorio

`Validamos`

- tolerancia;
- secuencia;
- tiempo de ejecucion;
- error recurrente;
- punto donde la idea falla en condiciones reales.

## 16. Rutas directas para modificar el sitio

### Arquitectura y rutas

- [App.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/App.tsx:37>)

### Navegacion y CTA globales

- [Navbar.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/components/layout/Navbar.tsx:5>)
- [Footer.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/components/layout/Footer.tsx:4>)

### Paginas publicas

- [Home.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Home.tsx:94>)
- [Soluciones.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Soluciones.tsx:62>)
- [Academia.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Academia.tsx:62>)
- [Laboratorio.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Laboratorio.tsx:51>)
- [Nosotros.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Nosotros.tsx:43>)
- [Contacto.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Contacto.tsx:40>)
- [StrategicReport.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/StrategicReport.tsx:61>)

### Legales

- [Privacidad.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Privacidad.tsx:4>)
- [Terminos.tsx](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/pages/Terminos.tsx:4>)

### Sistema visual

- [index.css](</C:/Users/Osiel/Documents/Kimi_Agent_Diseño Humanista UI/app/src/index.css:1>)

## 17. Cuestionario maestro para vaciar informacion facil

Usar este bloque como brief interno antes de reescribir cada pagina.

### Empresa y mercado

- Que vende exactamente la empresa hoy?
- Que servicios dejan mas margen?
- Que servicios quieren empujar mas este ano?
- Que industrias quieren priorizar?
- En que ciudades o region quieren concentrarse?

### Cliente ideal

- Quien compra normalmente?
- Quien influye?
- Quien usa despues la solucion?
- Que tamano de empresa encaja mejor?
- Que tipo de empresa no conviene atraer?

### Problema y urgencia

- Cual es el dolor mas frecuente?
- Que problema vale dinero cada mes?
- Que problema da mas ansiedad al cliente?
- Que problema se puede resolver rapido para mostrar valor?

### Oferta

- Cual es la oferta de entrada ideal?
- Que entregable minimo debe recibir el cliente?
- Cuanto tarda?
- Que necesita el cliente para empezar?
- Que resultado realista puede esperar en 30 dias?

### Evidencia

- Que casos reales ya existen?
- Que datos podemos publicar sin riesgo?
- Que fotos, piezas, capturas o diagramas tenemos?
- Que testimonios podriamos pedir hoy?
- Que errores o aprendizajes valiosos podemos contar?

### Academia

- Cuantos trayectos reales existen?
- Que formato tienen?
- Cuanto duran?
- Como se mide adopcion?
- Que cambia en un operario, supervisor y director despues del trayecto?

### Laboratorio

- Que procesos pueden mostrarse?
- Que capacidades tecnicas conviene publicar?
- Que tolerancias o materiales se pueden afirmar?
- Que escenarios de validacion ya vivieron?
- Que contenido visual real se puede producir este mes?

### Comercial

- Que pasa despues del formulario?
- Quien responde?
- En cuanto tiempo?
- Que filtro usa el equipo para calificar leads?
- Que objeciones aparecen mas seguido?

### Marca y tono

- Que parte del tono actual debemos conservar si o si?
- Que palabras ya no queremos usar?
- Que palabras si representan la marca?
- Queremos sonar mas premium, mas tecnico, mas cercano o mas ejecutivo?

## 18. Conclusion

La web ya no tiene un problema de identidad. Tiene un problema de madurez comercial.

Eso es buena noticia.

Significa que no hay que inventar una marca nueva. Hay que hacer tres cosas con mucha disciplina:

- quitar el lenguaje interno que se filtro a la capa publica;
- convertir narrativa en evidencia;
- empaquetar el valor en rutas de decision mas claras.

La base actual ya contiene algo muy valioso: una posicion creible y dificil de copiar. Si el siguiente paso ordena prueba, oferta y conversion, el sitio puede pasar de ser una declaracion inteligente a una herramienta comercial de alto nivel.

## 19. Siguiente entrega recomendada

Con este documento como base, la siguiente fase ideal seria:

1. arquitectura final por pagina;
2. reescritura completa de copy;
3. plan de bloques visuales y evidencia;
4. implementacion priorizada en `Home`, `Soluciones`, `Laboratorio` y `Contacto`.
