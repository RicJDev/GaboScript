# Change Log

Todas las versiones notables de la extensión GaboScript.

## [0.1.0] — 2026-05-12

### Agregado

- Migración del proyecto de JavaScript a TypeScript
- Reestructuración de archivos: `src/` para código fuente, `assets/` para activos estáticos
- **Diagnósticos en tiempo real**: validación de apertura y cierre de bloques (`Algoritmo/Fin`, `Si/Fin_Si`, etc.)
- **Formateo automático**: indentación inteligente basada en palabras clave
- Providers de autocompletado tipados con TypeScript
- Archivo de tipos compartidos (`src/types.ts`)
- Utilidades de archivo extraídas a `src/fileUtils.ts`
- Especificación del lenguaje con `tsconfig.json`
- Build con esbuild

### Corregido

- Snippet `Matriz` mal formado (llave `description` fuera del objeto)
- Icono `docx-export.svg` faltante (se creó)
- Rutas del icon theme corregidas (`./gabo-icon.png` → `./icons/gabo-icon.png`)
- Evento de activación duplicado `onLanguage:gabo` eliminado

### Cambiado

- `package.json`: punto de entrada `./out/extension.js`, scripts de build/watch/typecheck
- `.vscodeignore`: excluye `src/`, `tsconfig.json`, `esbuild.config.mjs` del VSIX

### Eliminado

- Directorios `extension/` e `img/` (contenido migrado a `src/` y `assets/`)
- Archivos `.js` originales (reemplazados por sus equivalentes `.ts`)

## [0.0.1] — 2025

### Agregado

- Lanzamiento inicial
- Resaltado de sintaxis
- Snippets de código
- Exportación a DOCX
- Tema de íconos
