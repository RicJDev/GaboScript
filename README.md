<p align="center">
  <img src="./assets/brand/GS.png" alt="GaboScript Logo" width="128">
</p>

<h1 align="center">GaboScript para VS Code</h1>

<p align="center">
  <a href="https://github.com/RicJDev/GaboScript/releases">
    <img src="https://img.shields.io/github/v/release/RicJDev/GaboScript?label=Release&logo=github" alt="GitHub Release">
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue" alt="License">
  </a>
  <a href="https://github.com/RicJDev/GaboScript">
    <img src="https://img.shields.io/badge/VS%20Code-%5E1.105.0-007ACC?logo=visualstudiocode" alt="VS Code">
  </a>
</p>

<p align="center">
  Soporte completo para el lenguaje de programación <strong>GaboScript</strong> en VS Code.<br>
  Diseñado para la materia de <strong>Algoritmos</strong> de la universidad, con una sintaxis pensada para el aprendizaje.
</p>

## Características

### Resaltado de sintaxis

Colores específicos para cada elemento del lenguaje:

- **Palabras clave de control:** `Si`, `Mientras`, `Para`, `Entonces`, `Sino`, `Repetir`
- **Estructuras:** `Algoritmo`, `Inicio`, `Fin`, `Procedimiento`, `Funcion`, `Registro`
- **Tipos de datos:** `entero`, `cadena`, `booleano`, `real`
- **Operadores:** colores distintos para `+`, `-`, `=`, `<<`, `>>`, paréntesis y comas
- **Literales:** números y cadenas entre comillas

### Autocompletado (snippets)

Plantillas para todas las estructuras principales. Escribe el prefijo y presiona `Enter`:

`Algoritmo`, `Si-entonces`, `Si-Sino`, `Para-hacer`, `Mientras-hacer`, `Repetir-hasta`, `En_Caso-sea`, `Procedimiento`, `Funcion`, `Registro`, `Variable`, y más.

### Diagnósticos en tiempo real

La extensión valiva la estructura de tu código mientras escribes:

- **Bloques sin cerrar:** detecta `Si`, `Mientras`, `Para`, etc. que no tienen su `Fin_*` correspondiente
- **Cierre incorrecto:** avisa si cerraste un bloque con el `Fin_*` equivocado
- **Cierre sin apertura:** detecta `Fin_*` que no tienen bloque correspondiente

### Formateo automático

Aplica formato a todo el documento con un solo comando (`Format Document`):

- Indenta automáticamente el contenido dentro de bloques
- Reconoce `Algoritmo`, `Si`, `Mientras`, `Para`, `Funcion`, `Procedimiento`, `Registro` y más
- Respeta la configuración de indentación de VS Code (espacios vs. tabs)

### Exportar a DOCX

Comparte tu código en formato documento exportando la carpeta de trabajo o archivos seleccionados:

- **Exportar carpeta actual** desde la paleta de comandos (`GaboScript: Exportar a DOCX`)
- **Exportar archivos seleccionados** desde el menú contextual del explorador
- **Exportar archivo activo** desde el menú del editor

## Requisitos

- VS Code ^1.105.0
- No requiere dependencias externas ni runtime

## Cómo usar

### Instalación

1. Descarga el archivo `.vsix` de la [última release](https://github.com/RicJDev/GaboScript/releases)
2. En VS Code, abre la paleta de comandos (`Ctrl+Shift+P`) y ejecuta **Extensions: Install from VSIX**
3. Selecciona el archivo descargado

### Uso

1. Crea un archivo con extensión `.gabo`
2. El resaltado, autocompletado y diagnósticos funcionan automáticamente
3. Para formatear: `Ctrl+Shift+I` (Windows/Linux) o `Cmd+Shift+I` (Mac)
4. Para exportar a DOCX desde el menú contextual del explorador o editor

## Roadmap

Consulta el [Roadmap](docs/ROADMAP.md) para conocer las próximas versiones y funcionalidades planificadas.

## Contribuir

Las contribuciones son bienvenidas. Revisa la [guía de contribución](docs/CONTRIBUTING.md) y el [código de conducta](docs/CODE_OF_CONDUCT.md) antes de participar.

## Licencia

[MIT](LICENSE)
