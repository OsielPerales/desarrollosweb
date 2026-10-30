# Contacto público: configuración y límites

Los contactos públicos confirmados por Osiel son los de `src/lib/contact.ts`. Functions compila ese mismo archivo: no existe una segunda copia del destinatario.

## Reglas compartidas pendientes

El propietario indicó que compartirá las reglas activas completas de Firestore y Storage. Hasta recibirlas no se crean archivos de reglas de producción ni se agregan sus referencias a `firebase.json`: reemplazarlas sin conocerlas podría interrumpir iAprende.

`rules/leads.rules.fragment` contiene exclusivamente la propuesta para `/leads/{id}`. Sus pruebas generan una política aislada en `tests/generated/`, utilizada solo por `firebase.emulators.json` y el proyecto ficticio `demo-desarrollosweb`. No desplegar esa política de pruebas.

Cuando se reciban las reglas activas:

1. Conservar las reglas de todas las demás colecciones y el archivo Storage sin cambios de permisos.
2. Integrar el bloque de leads y revisar cualquier permiso recursivo que también lo alcance: las reglas `allow` se combinan mediante OR.
3. Guardar `firestore.rules` y `storage.rules` completos; referenciarlos en `firebase.json`.
4. Añadir casos de regresión representativos de iAprende y ejecutar las pruebas con las reglas fusionadas, además de las aisladas.

Este punto bloquea la publicación y el cierre de la revisión. Las pruebas aisladas no acreditan que los permisos compartidos estén integrados.

## Formulario

La confirmación aparece únicamente después de que `addDoc` resuelve y muestra el ID del documento. Un fallo conserva los datos y permite reintentar. Correo y WhatsApp son enlaces alternativos, nunca pruebas de registro. El formulario bloquea envíos simultáneos, valida tamaños y formatos, y verifica un campo señuelo vacío.

Las escrituras públicas contienen únicamente los campos de la lista blanca, `estado: nuevo`, `source: web_contacto` y `createdAt: serverTimestamp()`. Los metadatos de notificación son exclusivos del servidor. El honeypot reduce envíos de bots básicos; no constituye una cuota ni evita por sí solo todos los abusos automatizados.

## Notificación

La única función exportada es `notificarSolicitud`, un trigger de creación en `leads/{id}`. El proveedor sigue pendiente de definición por el propietario.

- `CONTACT_EMAIL_PROVIDER`: `pendiente` por defecto. Existe un adaptador opcional `resend`, sin activarlo.
- `CONTACT_EMAIL_FROM`: remitente autorizado por el proveedor elegido; vacío por defecto.
- `CONTACT_EMAIL_API_KEY`: declaración de secreto de Secret Manager. No se creó, leyó ni modificó ningún secreto real.
- Destinatario: se importa de `src/lib/contact.ts`.

Con configuración incompleta se registra `notificado: false` y `notificacionEstado: pendiente_configuracion`. Una falla conserva `false`, registra un código de error sin datos privados y permite reintentos de Eventarc. Con respuesta válida del proveedor se escribe `true`, su nombre, ID y fecha de aceptación. `true` significa aceptación por el proveedor; no garantiza lectura, ni llegada a la bandeja principal.

Se usa bloqueo transaccional y una clave idempotente por folio. La garantía de idempotencia del proveedor tiene una ventana limitada; un envío aceptado seguido de una falla prolongada al actualizar Firestore requiere reconciliación mediante el ID o los registros del proveedor antes de reenviar manualmente.

Los leads que queden pendientes por falta de configuración deberán reprocesarse de forma controlada cuando se configure el correo: crear el trigger no vuelve a generar eventos de creación de documentos antiguos.

## Pruebas sin mensajes reales

```bash
npm ci
npm --prefix functions ci
npm test
npm --prefix functions test
npm run test:emulator
```

El emulador requiere Java 21 y Node compatible con Firebase CLI. Se usa un proyecto `demo-`, sin acceso a producción. El proveedor `emulator` solo funciona si ambas variables de runtime del emulador están presentes. No utiliza una clave ni realiza una llamada de correo externa. El script genera parámetros no secretos en un archivo ignorado exclusivo del proyecto de demostración. El trigger emulado no vincula secretos.


En este entorno el worker de Functions no puede abrir su socket Unix (`EPERM`). `test:emulator` ejecuta el handler exportado con snapshots reales y escrituras contra Firestore Emulator; comprueba también la repetición del evento. Esto valida el handler y la persistencia, pero no la entrega automática de Eventarc. En un entorno que admita el worker, `npm run test:emulator:full` comprueba la entrega automática de creación → trigger → estado sin invocar el callback desde la prueba.
