# Change Log

Todas las versiones notables de la extensión GaboScript.

## [0.1.0] — 2026-05-12

### Agregado

- Migración del proyecto de JavaScript a TypeScript
- Reestructuración de archivos: `src/` para código fuente, `assets/` para activos estáticos
- **Formateo automático**: indentación inteligente basada en palabras clave

### Corregido

- Snippet `Matriz` mal formado (llave `description` fuera del objeto)
- Rutas del icon theme corregidas (`./gabo-icon.png` → `./icons/gabo-icon.png`)

### Cambiado

- `package.json`: punto de entrada `./out/extension.js`, scripts de build/watch/typecheck
- `.vscodeignore`: excluye `src/`, `tsconfig.json`, `esbuild.config.mjs` del VSIX

### Eliminado

- **Diagnósticos en tiempo real**: deshabilitados temporalmente por no estar listos para esta versión.
- Directorios `extension/` e `img/` (contenido migrado a `src/` y `assets/`)
- Archivos `.js` originales (reemplazados por sus equivalentes `.ts`)

## [0.0.1] — 2025

### Agregado

- Lanzamiento inicial
- Resaltado de sintaxis
- Snippets de código
- Exportación a DOCX
- Tema de íconos
