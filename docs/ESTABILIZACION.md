# Revisión de la web pública

Base: `main`, commit `a4e9bf12c55d4ada03439e50713d21e51328ed95`. Rama de trabajo: `estabilizacion`. El código original del Hub está preservado en `hub-archive`.

## Cambios

1. Hub retirado del árbol de trabajo y de los destinos de publicación de esta web; funciones HTTP legadas sin exports; variables de proveedores eliminadas del cliente. Functions usa únicamente `firebase-admin` y `firebase-functions` como dependencias de ejecución. Los builds limpian salidas antiguas.
2. Contacto independiente del Hub: validación, límites, honeypot, exclusión de envíos simultáneos, reintento con datos conservados y folio solo tras confirmación de Firestore. Trigger con estado verificable y configuración de correo pendiente. Propuesta de reglas y pruebas aisladas; integración compartida pendiente.
3. Contenido sin precisión o porcentajes no respaldados que seguían en el laboratorio, datos confirmados desde una sola fuente, logo WebP de 13,124 bytes, imagen social real de 1200 × 630, páginas de error React y HTTP, SEO legal y navegación móvil ajustada. Se retiró la instrumentación de desarrollo del bundle público.

El Reporte IA revisado es idéntico al de la base. Los otros productos conservan sus fuentes y su destino de Hosting. No se ejecutó ningún despliegue, envío real ni modificación de secretos. Quitar los exports del código no retira automáticamente funciones que ya existan en Firebase.

## Validación

- Compilaciones de la web y Functions: correctas.
- Cuatro pruebas de interfaz y navegación: correctas.
- Cinco pruebas de notificación con emisor simulado: correctas.
- Cinco pruebas contra Firestore Emulator: correctas. Incluyen creación mediante el servicio del formulario, restricciones de acceso, campos y tamaños inválidos y ejecución del handler con snapshots reales.
- El emulador completo de Functions encuentra su definición, pero su worker falla por una restricción de socket Unix del entorno (`EPERM`). La entrega automática de eventos queda pendiente de comprobar con `npm run test:emulator:full` en un entorno compatible. La prueba alternativa del handler no sustituye esa verificación.
- El navegador remoto no puede acceder al servidor Vite local (`ERR_CONNECTION_REFUSED`). La interfaz se validó mediante DOM de pruebas; no se afirma una revisión visual completa en móvil.
- La búsqueda en los archivos versionados no encuentra endpoints retirados ni variables de frontend con claves/tokens de proveedores.
- `npm run check:release` bloquea la publicación mientras falten las reglas compartidas. Este bloqueo es esperado.

## Pendientes que bloquean la publicación

1. Recibir las reglas activas completas de Firestore y Storage. Conservar las colecciones ajenas a leads, integrar la política propuesta y referenciar ambos archivos en `firebase.json`. Revisar reglas recursivas y agregar pruebas de preservación de iAprende.
2. Elegir el proveedor y un remitente verificado. Se dejó un adaptador opcional para Resend; no se seleccionó ni configuró un proveedor real. Un proveedor distinto requerirá adaptar y probar su transporte.
3. Verificar entrega automática de eventos en un entorno que permita el worker de Functions.

## Secuencia de publicación para el propietario

Ejecutar solamente después de resolver los tres pendientes y revisar/aceptar el PR. Requisitos: Node compatible con Firebase CLI, Java 21 y acceso propio al proyecto compartido `studio-427958662-bd38c`.

1. Retirar las tres funciones legadas del Hub, verificando previamente sus nombres y regiones con `firebase functions:list --project studio-427958662-bd38c`. El comando con los nombres exactos se detalla en el PR. No ejecutar una eliminación global de funciones.
2. Preparar dependencias y la configuración pública de Firebase de la web. `.env.local` usa `VITE_FIREBASE_CONFIG` con el objeto público del SDK, sin claves de proveedores.

```bash
npm ci
npm --prefix functions ci
npm run check:release
npm test
npm --prefix functions test
npm run test:emulator
npm run test:emulator:full
npm run build
npm --prefix functions run build
```

3. Configurar el correo únicamente después de elegir proveedor. Si se elige Resend, colocar `CONTACT_EMAIL_PROVIDER=resend` y `CONTACT_EMAIL_FROM=<remitente verificado>` en el archivo de parámetros local del proyecto dentro de `functions/`. El destinatario se toma del archivo de contacto compartido. El propietario crea el secreto mediante la entrada interactiva, sin pegarlo en un chat ni en el código:

```bash
firebase functions:secrets:set CONTACT_EMAIL_API_KEY --project studio-427958662-bd38c
```

4. Publicar de forma acotada. El codebase `web-publica` evita mezclar este trigger con funciones de otros productos. No usar un despliegue global.

```bash
firebase deploy --only firestore:rules --project studio-427958662-bd38c
firebase deploy --only functions:web-publica --project studio-427958662-bd38c
firebase deploy --only hosting:app --project studio-427958662-bd38c
```

Storage debe conservar exactamente sus reglas activas. Si la integración no cambia permisos, no es necesario volver a publicar ese archivo. Cualquier cambio autorizado requiere revisión específica antes de su publicación.

## Qué verificar después

- Inicio, servicios, Academia, Laboratorio, Reporte, contacto y páginas legales abren directamente y mediante navegación interna.
- Una URL inexistente devuelve 404, y las rutas del Hub no exponen sus pantallas.
- Logo y vista previa social cargan como imágenes, sin recorte de marca.
- Con una solicitud real de prueba expresamente autorizada por el propietario, el folio coincide con el documento Firestore; los datos y el timestamp son correctos.
- La notificación tiene estado e ID de aceptación del proveedor; comprobar también la recepción en el buzón de Osiel. Nunca registrar `true` como sustituto de la verificación del buzón.
- Si la notificación falla, la solicitud permanece registrada con `notificado: false`; revisar y reprocesar de manera controlada. Los documentos previos no generan de nuevo un evento de creación.
- Un anónimo no puede leer, editar ni eliminar leads. iAprende conserva sus accesos habituales.
- Confirmar que las funciones legadas retiradas ya no están disponibles y que solo se publicó el destino de Hosting de la web pública.
