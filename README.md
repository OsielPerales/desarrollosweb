# Desarrollos Web

Portal web principal de Desarrollos Elaborados. Incluye las páginas públicas de la organización, formularios de contacto conectados con Firebase y acceso a las experiencias web configuradas en Hosting.

## Tecnología

- React 19, TypeScript y Vite
- Tailwind CSS y componentes Radix UI
- Firebase Authentication, Firestore y Functions

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

Vite genera el sitio principal en `dist/`. Los directorios `dist-iaprende/` y `dist-hub/` corresponden a otros destinos de Hosting y también se mantienen fuera de Git. La configuración de Firebase Hosting está en `firebase.json`; revisa el proyecto seleccionado antes de desplegar.

## Estructura

- `src/pages/`: páginas públicas del portal
- `src/hub/`: interfaz y servicios del Hub
- `src/components/`: componentes reutilizables
- `functions/`: Firebase Cloud Functions
- `public/`: recursos estáticos
- `firebase.json`: destinos y rutas de Hosting