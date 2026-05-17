# Roadmap

> Línea de tiempo del desarrollo de la extensión GaboScript para VS Code.

La presente Roadmap es conceptual y está sujeta a cambios.

## v0.1.0 — Migración y sentando bases

> **Estado:** ✅ Completado

- [x] Migración del proyecto a TypeScript
- [x] Reestructuración de directorios (`src/`, `assets/`)
- [x] Formateo automático: indentación basada en keywords
- [x] Exportación a DOCX funcional

## v0.2.0 — Autocompletado y productividad

> **Estado:** 🚧 En progreso — _Estimado: próximo mes_

### Autocompletado inteligente

- [ ] Diagnósticos básicos: validación de apertura/cierre de bloques
- [ ] Completado de palabras del documento (variables, identificadores)
- [ ] Completado de campos de registros al escribir `.` después de una variable de tipo registro
- [ ] Snippets pulidos con mejor contexto y tabulación

### Exportación DOCX

- [ ] Refinar interfaz de usuario (selector de archivos, progreso)
- [ ] Manejo de errores más robusto
- [ ] Soporte para selección múltiple en el explorador

### Calidad

- [ ] Pruebas unitarias para los providers
- [ ] Pruebas de integración para diagnósticos y formateo

## v0.3.0 — Diagnósticos y editor

> **Estado:** 📋 Planificado — _Estimado: próximo trimestre_

### Linter

- [ ] Detectar variables no declaradas
- [ ] Validar tipos en asignaciones
- [ ] Advertencias por estilo (convenciones de nombres)

### Code Actions

- [ ] Acción "Cerrar bloque faltante" (agrega `Fin_*` automáticamente)
- [ ] Acción "Eliminar bloque vacío"

### Navegación y edición

- [ ] Folding de regiones (plegar `Algoritmo…Fin`, `Si…Fin_Si`, etc.)
- [ ] Bracket matching mejorado (resaltar pares)
- [ ] Breadcrumbs (migaja de pan) con estructura del programa

### Infraestructura

- [ ] GitHub Actions: build + test automático
- [ ] Publicación automática a Marketplace + OpenVSX

## v0.4.0 — Exportación experimental

> **Estado:** 📋 Planificado — _Estimado: próximo semestre_

### Nuevos formatos de exportación

- [ ] Exportar proyecto a **Markdown** (experimental)
- [ ] Exportar proyecto a **LaTeX** (experimental)
- [ ] Vista previa del documento antes de exportar

### Mejoras en el editor

- [ ] Hover documentation: tooltips informativos al pasar el mouse sobre keywords
- [ ] CodeLens: mostrar cantidad de líneas por bloque
- [ ] Mejoras de performance en archivos grandes

## v1.0.0 — Producción

> **Estado:** 📋 Planificado — _Sin fecha estimada_

- [ ] Especificación formal del lenguaje GaboScript publicada
- [ ] Diagnósticos sólidos: sin falsos positivos, cobertura completa
- [ ] Autocompletado inteligente: context-aware, sugerencias precisas
- [ ] Interfaz de exportación refinada y probada
- [ ] Cobertura de pruebas > 80 %
- [ ] Documentación completa para usuarios y contribuidores
- [ ] README con GIFs demostrativos y screenshots
- [ ] Publicación estable en Marketplace + OpenVSX

## Futuro (post-v1.0)

> Ideas sin fecha definida, abiertas a discusión.

- [ ] Intérprete/ejecutor de GaboScript dentro de VS Code
- [ ] Depurador (breakpoints, paso a paso, variables)
- [ ] Página web o documentación online
- [ ] Tema de íconos personalizado más completo
- [ ] VS Code for the Web compatibilidad
- [ ] Soporte multilenguaje (en, pt-br)
