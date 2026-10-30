import { existsSync, readFileSync } from 'node:fs';
const config = JSON.parse(readFileSync('firebase.json', 'utf8'));
const ready = config.firestore?.rules === 'firestore.rules'
  && config.storage?.rules === 'storage.rules'
  && existsSync('firestore.rules') && existsSync('storage.rules');
if (!ready) {
  console.error('PUBLICACIÓN BLOQUEADA: faltan las reglas activas compartidas, su integración y sus referencias en firebase.json.');
  process.exit(1);
}
console.log('Archivos de reglas presentes. Confirma la revisión de permisos de iAprende y las pruebas con las reglas fusionadas antes de desplegar.');
