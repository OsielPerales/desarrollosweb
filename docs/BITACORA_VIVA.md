# Bitácora viva — Desarrollos Elaborados

Este archivo es el registro cronológico de cambios relevantes en la web pública. Se conserva como historial acumulativo: **las entradas anteriores no se reescriben**; cada intervención agrega fecha, rama, alcance, validaciones y pendientes.

## 2026-11-03 — Corrección responsive y sistema de transiciones

**Estado:** implementación versionada en rama de trabajo. Pendiente de ejecución de pruebas, validación visual y revisión antes de integrar.  
**Repositorio:** `OsielPerales/desarrollosweb`  
**Rama base:** `estabilizacion`  
**Rama de trabajo:** `mejora-responsive-motion`  
**Último commit de implementación registrado:** `8e5c8e968241c4b2650935c87a81435fbf191c3c`

### Motivo

La revisión detectó que el sitio heredaba proporciones de escritorio en varios componentes móviles. El caso más claro era el footer: una declaración inline de `gridTemplateColumns` anulaba las clases de breakpoint. También se observó un menú móvil limitado a 28rem, contenidos de la portada dependientes de hover y ausencia de una transición al cambiar de ruta.

### Cambios realizados

1. **Sistema responsive en `src/index.css`**
   - Gutters laterales fluidos y escala vertical más compacta hasta 767px.
   - Ajuste fluido de H1/H2 y reducción de padding/gaps en tarjetas.
   - Botones con altura mínima de 48px y texto envolvente.
   - Campos de formulario a 16px para reducir el zoom automático de navegadores móviles.
   - Contención del desbordamiento horizontal y anchos de logo adaptables.
   - Breakpoint adicional para teléfonos estrechos de hasta 380px.
2. **Menú en `src/components/layout/Navbar.tsx`**
   - Eliminado el límite fijo de altura.
   - Transición por filas CSS para adaptarse al contenido real.
   - Estado anunciado con `aria-expanded` y `aria-hidden`; panel inerte cuando está cerrado.
   - Cierre automático al cambiar de ruta.
   - Logo fluido con proporción conservada.
3. **Footer en `src/components/layout/Footer.tsx`**
   - Retirada la definición inline de columnas.
   - Una columna en móvil, dos en tablet y cuatro en escritorio.
   - Logo con el mismo tratamiento responsive.
4. **Portada en `src/pages/Home.tsx`**
   - Las descripciones de capacidades ya no dependen de hover en pantallas táctiles.
   - Escritorio conserva el comportamiento de revelación al pasar el cursor.
5. **Rutas en `src/App.tsx`**
   - Entrada discreta al cambiar de ruta (opacidad y desplazamiento vertical de 8px).
   - Altura del cargador más adaptable.
6. **Movimiento reducido**
   - La hoja de estilos respeta `prefers-reduced-motion` para animaciones, transiciones y scroll.
7. **Regresión**
   - Añadidas tres pruebas en `tests/responsive-navigation.test.tsx`: apertura/cierre accesible, cierre al navegar y ausencia de override inline del grid del footer.

### Documentación relacionada

- Plan, alcance y criterios de aceptación: [PLAN_RESPONSIVE_Y_MOTION.md](./PLAN_RESPONSIVE_Y_MOTION.md).
- Esta bitácora: historial acumulativo de implementación y validación.

### Validación realizada en esta intervención

- Lectura de regreso de los seis archivos modificados y del nuevo archivo de pruebas.
- Comparación GitHub entre `estabilizacion` y `mejora-responsive-motion`: 9 commits por delante y 7 archivos cambiados antes de crear esta entrada; sin divergencia respecto a la rama base.
- Se comprobó en el código que el footer ya no tiene `gridTemplateColumns` inline, que el panel móvil usa `inert`/atributos ARIA, que Home tiene el disclosure táctil y que existe la regla de movimiento reducido.

**Validación todavía no ejecutada:** `npm test`, `npm run lint`, `npm run build` y revisión visual real en los viewports de la matriz. Se intentó obtener una copia local para ejecutar esas comprobaciones, pero la sesión de herramientas no pudo resolver `github.com` (error DNS); no fue posible instalar dependencias ni ejecutar el proyecto. No se registra ninguna de esas comprobaciones como aprobada.

### Pendientes para cerrar la intervención

- Ejecutar `npm ci`, `npm test`, `npm run lint` y `npm run build` en un entorno con acceso al repositorio.
- Revisar visualmente 320, 360, 375, 390, 430, 768, 1024 y 1280px.
- Comprobar en dispositivo táctil que las tarjetas muestran sus descripciones sin hover y que el menú no recorta opciones.
- Corregir cualquier regresión encontrada; actualizar esta bitácora con resultados concretos.
- Revisar e integrar la rama mediante PR. No se modificó `main` ni se desplegó Firebase Hosting.

---

## Formato para próximas entradas

Agregar una nueva sección al inicio del historial con:

- fecha y zona horaria;
- rama y commit;
- motivo y alcance;
- archivos/sistemas afectados;
- pruebas ejecutadas y resultados verificables;
- pendientes, riesgos y estado de publicación.

No marcar como validado algo que solo haya sido inspeccionado en el código. No registrar un despliegue si únicamente se creó o fusionó un PR.


### Seguimiento — revisión abierta

- PR de revisión: [#2 — Mejorar proporciones móviles y transiciones](https://github.com/OsielPerales/desarrollosweb/pull/2), en borrador y dirigido a `estabilizacion`; no está fusionado.
- Al abrir el PR, la comparación acumulada reportó 11 commits, 9 archivos, 424 adiciones y 36 eliminaciones respecto de la rama base.
- GitHub reportó el PR como integrable (`mergeable: true`) al consultar sus metadatos.
- El estado de Vercel para el commit del PR seguía en `pending` en la última consulta; no se interpreta como build aprobado.
- Firebase Hosting no se publicó. La rama `main` permanece intacta.


### Seguimiento — build de preview completado

- Commit validado: `832129f421886daea07441e063f2935713c55f64`.
- Check de GitHub `Vercel`: `success`.
- Deployment preview: [abrir versión de revisión](https://desarrollos-web-review-njkd2du7z-desarrollos-elaborados.vercel.app/). Estado `READY`.
- Los logs confirman `npm run build` → `tsc -b && vite build`; TypeScript y compilación Vite finalizaron correctamente. Vite transformó 1,745 módulos y reportó `built in 4.54s`; Vercel reportó `Deployment completed`.
- Advertencias no bloqueantes observadas: la base de datos de Browserslist está desactualizada y `superstatic` declara Node 20/22/24 mientras el build se ejecutó en Node 26.13.0. El build terminó correctamente pese a esas advertencias.
- `npm test` y `npm run lint` siguen sin estar ejecutados: el comando de build de Vercel no los incluye.
- La inspección visual manual en los viewports de la matriz sigue pendiente. El preview está disponible para esa revisión.
