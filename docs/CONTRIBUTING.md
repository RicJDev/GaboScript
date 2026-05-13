# Contribuyendo a GaboScript

¡Gracias por tu interés en contribuir! Este proyecto es open source y toda contribución es bienvenida.

## Código de conducta

Este proyecto sigue un [Código de Conducta](CODE_OF_CONDUCT.md). Al participar, se espera que mantengas un ambiente respetuoso e inclusivo.

## ¿Cómo puedo contribuir?

### Reportar bugs

Si encuentras un error, abre un [issue](https://github.com/RicJDev/GaboScript/issues) e incluye:

- Descripción clara del problema
- Pasos para reproducirlo
- Comportamiento esperado vs. real
- Versión de VS Code y del sistema operativo
- Captura de pantalla o video (si aplica)

### Sugerir features

Las ideas son bienvenidas. Abre un [issue](https://github.com/RicJDev/GaboScript/issues) con:

- Descripción de la funcionalidad deseada
- Caso de uso
- Cómo beneficiaría a los usuarios

### Enviar código (Pull Requests)

1. **Fork** el repositorio
2. Crea una rama descriptiva: `git checkout -b feature/mi-feature`
3. Haz tus cambios siguiendo las [guías de estilo](#guías-de-estilo)
4. Asegúrate de que los tests pasen
5. Crea el Pull Request contra `main`

## Guías de estilo

### Código

- El proyecto está escrito en **TypeScript**
- Sigue el estilo existente en el código (mira archivos similares como referencia)
- Usa nombres descriptivos en camelCase para variables y funciones
- Usa PascalCase para clases, tipos e interfaces
- No agregues comentarios superfluos — el código debe ser autoexplicativo
- Usa `import * as vscode from 'vscode'` para la API de VS Code

### Commits

- Usa mensajes descriptivos en español o inglés
- Prefiero el formato: `tipo: descripción breve`
    - `feat:` — nueva funcionalidad
    - `fix:` — corrección de bug
    - `refactor:` — cambio que no agrega funcionalidad ni corrige bugs
    - `docs:` — cambios en documentación
    - `test:` — agregar o modificar tests
    - `chore:` — tareas de infraestructura
- Ejemplo: `feat: agregar autocompletado de campos de registros`

## Desarrollo local

### Requisitos

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) (recomendado) o npm
- [VS Code](https://code.visualstudio.com/)

### Setup

```bash
git clone https://github.com/RicJDev/GaboScript.git
cd GaboScript
pnpm install
```

### Comandos disponibles

| Comando              | Descripción                                    |
| -------------------- | ---------------------------------------------- |
| `pnpm run build`     | Compila TypeScript → JavaScript (esbuild)      |
| `pnpm run watch`     | Compila y recompila al detectar cambios        |
| `pnpm run typecheck` | Verifica tipos con TypeScript (`tsc --noEmit`) |
| `pnpm run format`    | Formatea el texto utilizando el .pretierrc     |

### Probar la extensión localmente

1. Abre el proyecto en VS Code
2. Presiona `F5` — se abrirá una nueva ventana con la extensión cargada
3. Abre o crea un archivo `.gabo` para probar

### Probar cambios específicos

- **Snippets**: modifica `assets/snippets/gaboscript.json` y recarga la ventana
- **Gramática**: modifica `assets/syntax/gaboscript.tmLanguage.json` y recarga
- **Providers y extension.ts**: edita los archivos en `src/` y ejecuta `pnpm run build`

## Estructura del proyecto

```
├── src/                    # Código fuente TypeScript
│   ├── extension.ts        # Punto de entrada
│   ├── types.ts            # Tipos compartidos
│   ├── keywords.ts         # Lista de keywords del lenguaje
│   ├── SyntaxProvider.ts   # Autocompletado de keywords
│   ├── WordsProvider.ts    # Autocompletado de palabras del documento
│   ├── GaboScriptDiagnostics.ts  # Validación de bloques
│   ├── GaboScriptFormatter.ts    # Formateo automático
│   ├── generateDOCX.ts     # Exportación a DOCX
│   ├── createDocx.ts       # Generación del documento DOCX
│   └── fileUtils.ts        # Utilidades de archivos
├── assets/                 # Activos estáticos
│   ├── icons/              # Íconos de la extensión
│   ├── snippets/           # Snippets de código
│   ├── syntax/             # Gramática TextMate
│   ├── brand/              # Logos y marca
│   ├── file-icon-theme.json
│   └── language-configuration.json
├── docs/                   # Documentación
├── esbuild.config.mjs      # Configuración de build
├── tsconfig.json           # Configuración de TypeScript
└── package.json
```

## Dependencias

- **docx** — generación de documentos DOCX
- **esbuild** — bundler
- **TypeScript** — lenguaje y type-checking
- **@types/vscode** — tipos para la API de VS Code

## ¿Dudas?

Abre un [issue](https://github.com/RicJDev/GaboScript/issues) o discútelo en el repositorio. ¡Toda pregunta es bienvenida!
