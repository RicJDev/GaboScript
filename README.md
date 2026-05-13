<p align="center">
  <img src="./assets/brand/GS.png" alt="GaboScript Logo" width="128">
</p>

<h1 align="center">GaboScript para VS Code</h1>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=Las-Nuevas-Victimas-De-Elecentro.gaboscript">
    <img src="https://img.shields.io/visual-studio-marketplace/v/Las-Nuevas-Victimas-De-Elecentro.gaboscript?label=VS%20Marketplace&logo=visualstudiocode" alt="VS Marketplace">
  </a>
  <a href="https://open-vsx.org/extension/Las-Nuevas-Victimas-De-Elecentro/gaboscript">
    <img src="https://img.shields.io/open-vsx/v/Las-Nuevas-Victimas-De-Elecentro/gaboscript?label=OpenVSX&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTEuNjEgMjEuNTlhMS45OCAxLjk4IDAgMCAwIDIuNzggMGw3LjQ0LTcuNDNhMiAyIDAgMCAwIDAtMi44MkwxNC4zOSAzLjkxYTIgMiAwIDAgMC0yLjc4IDBsLTcuNDQgNy40M2EyIDIgMCAwIDAgMCAyLjgzeiIgZmlsbD0iIzI4NTVGRiIvPjwvc3ZnPg==" alt="OpenVSX">
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/license-MPL--2.0-blue" alt="License">
  </a>
  <a href="https://github.com/RicJDev/GaboScript">
    <img src="https://img.shields.io/badge/VS%20Code-%5E1.105.0-007ACC?logo=visualstudiocode" alt="VS Code">
  </a>
</p>

<p align="center">
  Soporte completo para el lenguaje de programación <strong>GaboScript</strong> en VS Code.<br>
  Diseñado para la materia de <strong>Algoritmos</strong> de la universidad, con una sintaxis pensada para el aprendizaje.
</p>

---

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

---

## Requisitos

- VS Code ^1.105.0
- No requiere dependencias externas ni runtime

---

## Cómo usar

1. Instala la extensión desde el [Marketplace](https://marketplace.visualstudio.com/items?itemName=Las-Nuevas-Victimas-De-Elecentro.gaboscript) o [OpenVSX](https://open-vsx.org/extension/Las-Nuevas-Victimas-De-Elecentro/gaboscript)
2. Crea un archivo con extensión `.gabo`
3. El resaltado, autocompletado y diagnósticos funcionan automáticamente
4. Para formatear: `Ctrl+Shift+I` (Windows/Linux) o `Cmd+Shift+I` (Mac)
5. Para exportar a DOCX: haz clic derecho en un archivo `.gabo` o carpeta

---

## Roadmap

Consulta el [Roadmap](docs/ROADMAP.md) para conocer las próximas versiones y funcionalidades planificadas.

## Contribuir

Las contribuciones son bienvenidas. Revisa la [guía de contribución](docs/CONTRIBUTING.md) y el [código de conducta](docs/CODE_OF_CONDUCT.md) antes de participar.

## Licencia

[Mozilla Public License 2.0](LICENSE)
