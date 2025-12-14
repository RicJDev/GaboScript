Esta extensión proporciona soporte completo para el lenguaje de programación **GaboScript**, ideal para fines educativos y algorítmicos.

<div align="center">
  <h1>Características</h1>
</div>

## Resaltado y Autocompletado de Sintaxis

![Resaltado y Autocompletado de Sintaxis](https://i.imgur.com/b0LEPkZ.gif)

* **Resaltado de Sintaxis Avanzado:** Colores específicos para:
    * **Palabras Clave de Control:** `Si`, `Mientras`, `Para`, `Entonces`, `Sino`, `Repetir`.
    * **Estructuras:** `Algoritmo`, `Inicio`, `Fin`, `Procedimiento`, `Funcion`, `Registro`.
    * **Tipos de Datos:** `entero`, `cadena`, `booleano`, `real`.
    * **Operadores y Símbolos:** Colores distintos para `+`, `-`, `=`, `<<`, `>>`, paréntesis, puntos y comas.
    * **Literales:** Resaltado de números y cadenas de texto (entre comillas `""`).

* **Snippets de Código (Autocompletado):** Plantillas de código fáciles de usar para todas las estructuras de control principales. Escribe el prefijo y presiona `Enter` para generar el bloque completo, incluyendo tabulación y marcadores para el cursor.
    * Ejemplos: `Si-Sino`, `Para-hacer`, `Mientras-hacer`, `Procedimiento`, `Algoritmo`.

## Verificación de Punto y Coma

![Diagnóstico de Errores](https://i.imgur.com/gS64Eii.gif)

* **Diagnóstico de Código (Linting):** Detecta y subraya en tiempo real las declaraciones a las que **les falta el punto y coma (`;`)** al final.

![Control de Verificación de Punto y Coma](https://i.imgur.com/HUI3uS6.gif)

* **Control de Verificación de Punto y Coma por Archivo:** Puedes **activar o desactivar individualmente** el diagnóstico de errores de punto y coma (`;`) para cualquier archivo `.gabo` abierto. Esto te permite tener la verificación activa en los archivos que elijas y desactivada en otros, según las necesidades de tu proyecto.

## Compartir y Documentar el Código

![Exportación de Código a DOCX](https://i.imgur.com/yU8ERU0.gif)

* **Exportar los archivos como un documento docx (Ahora Modular):** Comparte tu código con pocos clicks Puedes exportar tu carpeta de trabajo actual o seleccionar **múltiples archivos** y generar un documento docx consolidado, tratándolos como módulos de un proyecto.

## Historial de Versiones

### 2.0.0

* **Exportación Modular a DOCX:** Soporte para exportar múltiples archivos como módulos de un proyecto a un único documento Word.
* **Diagnóstico de Errores:** Información más detallada y precisa sobre el olvido de `;` al final de las declaraciones.
* **Control por Archivo (`;`):** Permite **activar o desactivar individualmente** la verificación de punto y coma (`;`) para cualquier archivo `.gabo` abierto, limitando el diagnóstico solo a los archivos deseados.
* **Icono para carpetas:** Agregado un icono temático para las carpetas que contienen proyectos.

### 1.0.0

* **Lanzamiento inicial de GaboScript** con soporte completo de sintaxis y snippets.
* **Exportación básica a DOCX** de archivos individuales.
* **Tema de iconos para archivos** `.gabo` y `.docx` para una mejor identificación visual.