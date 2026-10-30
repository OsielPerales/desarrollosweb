# Desarrollos Web

Portal web principal de Desarrollos Elaborados. Incluye las páginas públicas de la organización, formularios de contacto conectados con Firebase y acceso a las experiencias web configuradas en Hosting.

## Tecnología

- React 19, TypeScript y Vite
- Tailwind CSS y componentes Radix UI
- Firestore y Functions para el contacto público

## Desarrollo local

Requisitos: Node.js y npm.

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Completa `.env.local` con la configuración de Firebase para desarrollo. No publiques archivos de entorno con valores reales.

## Compilación

```powershell
npm run build
npm run preview
```

Vite genera el sitio principal en `dist/`. El destino iAprende pertenece a otro producto y no se publica desde este flujo. La configuración de Firebase Hosting está en `firebase.json`; revisa el proyecto seleccionado antes de desplegar.

## Estructura

- `src/pages/`: páginas públicas del portal
- `src/lib/`: configuración pública y servicios de contacto
- `src/components/`: componentes reutilizables
- `functions/`: Firebase Cloud Functions
- `public/`: recursos estáticos
- `firebase.json`: destinos y rutas de Hosting

## Hub pausado

El código original se conserva sin cambios en la rama `hub-archive`, en el commit de origen `a4e9bf12c55d4ada03439e50713d21e51328ed95`. Sus pantallas, copias y funciones HTTP no forman parte de esta rama. La web usa un codebase de Functions independiente: `web-publica`.

Retirar código del repositorio no desactiva funciones ya desplegadas. La retirada de las tres funciones legadas en Firebase requiere una acción separada del propietario antes de poner en servicio la web. Los comandos finales se entregan en la revisión; no se ha ejecutado ningún despliegue ni envío.
