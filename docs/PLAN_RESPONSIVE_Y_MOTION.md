# Plan de mejoras responsive y transiciones

**Fecha:** 3 de noviembre de 2026  
**Base de trabajo:** `estabilizacion`  
**Rama de implementación:** `mejora-responsive-motion`  
**Alcance:** sitio público de Desarrollos Elaborados.

## Objetivo

Corregir la composición móvil sin degradar escritorio y establecer un comportamiento de movimiento coherente, breve, accesible y predecible en las páginas públicas.

## Diagnóstico que origina el trabajo

1. El footer declaraba `gridTemplateColumns` en línea; esa regla impedía que las clases responsive cambiaran realmente las columnas.
2. El menú móvil dependía de un `max-height` fijo de 28rem. El contenido podía crecer más que ese límite y quedar recortado.
3. La página de inicio ocultaba las descripciones de las tres capacidades hasta `:hover`, interacción que no existe de forma fiable en dispositivos táctiles.
4. El logo del encabezado y footer usaba dimensiones rígidas, poco adaptables a anchos estrechos.
5. Las páginas tenían escalas de sección, títulos y tarjetas heredadas de escritorio, sin una pauta transversal para teléfonos.
6. La navegación entre rutas no tenía transición de entrada; el estado de carga utilizaba una altura mínima fija.

## Cambios implementados

### P0 — Estructura y proporciones móviles

- Eliminar la definición inline de columnas del footer y permitir una columna en móvil, dos en tablet y cuatro en escritorio.
- Establecer gutters laterales adaptativos y reducir el padding vertical de secciones en móvil.
- Ajustar tamaños de H1/H2, padding de tarjetas y separación entre bloques.
- Evitar desbordamiento horizontal y permitir que los botones envuelvan su texto.
- Mantener inputs a 16px para evitar zoom involuntario en navegadores móviles.
- Hacer que el logo use ancho fluido, proporción natural y `object-fit: contain`.

### P0 — Navegación móvil accesible

- Sustituir el límite fijo de altura por una transición de filas CSS que se adapta a la altura real del contenido.
- Exponer estado mediante `aria-expanded` y `aria-hidden`.
- Retirar el panel cerrado del orden de navegación mediante `inert`.
- Cerrar el menú al cambiar de ruta.
- Mantener el menú móvil disponible hasta el breakpoint XL, en coherencia con la navegación de escritorio.

### P1 — Contenido usable en pantallas táctiles

- Mostrar desde el inicio las descripciones de capacidades en móvil.
- Conservar la revelación por hover en escritorio para no alterar su patrón actual.

### P1 — Movimiento y carga

- Añadir una entrada de página breve (opacidad y desplazamiento máximo de 8px).
- Dar una altura adaptable al estado de carga de rutas.
- Respetar globalmente `prefers-reduced-motion`, incluyendo transiciones y scroll suave.

## Criterios de aceptación

- En 320–430px: no debe existir scroll horizontal; el H1 no debe desbordarse; los botones deben ser utilizables y legibles.
- En 320–430px: el footer debe apilar sus columnas y no comprimirlas en cuatro.
- En 768–1023px: el footer debe organizarse en dos columnas.
- En 1024px en adelante: el footer puede usar cuatro columnas si el ancho disponible lo permite.
- El menú móvil debe abrirse completo, no recortar opciones, anunciar su estado y dejar de ser enfocable cuando está cerrado.
- Al seleccionar una ruta, el menú debe cerrarse.
- Las descripciones de capacidades deben estar disponibles sin hover en dispositivos táctiles.
- Al cambiar de ruta, la página debe entrar con movimiento discreto; con movimiento reducido, las animaciones deben quedar prácticamente desactivadas.
- Las páginas, rutas, contenido, formularios, integraciones y destinos de Hosting deben conservarse.

## Matriz de validación

| Viewport | Qué revisar |
|---|---|
| 320 × 640 | gutters, H1, CTAs, menú y grid de tarjetas |
| 360 × 800 | hero, tarjetas de capacidades y footer |
| 375 × 812 | formularios, chips, botones y navegación |
| 390 × 844 | ritmo vertical de todas las rutas |
| 430 × 932 | ancho de tarjetas y footer |
| 768 × 1024 | grids y footer de dos columnas |
| 1024 × 768 | transición tablet/escritorio |
| 1280 × 800 | navegación y composición de escritorio |

## Verificaciones técnicas

- Ejecutar `npm test`, `npm run lint` y `npm run build`.
- Añadir pruebas de interacción para apertura/cierre del menú, cierre al navegar y estructura responsive del footer.
- Completar revisión visual en navegador real o emulación de dispositivos antes de integrar y desplegar.

## Límites de esta entrega

Los cambios de código se preparan en una rama separada. No se despliega a Firebase Hosting ni se altera la rama `main`. Una compilación o prueba automatizada no sustituye la verificación visual en dispositivos reales.
