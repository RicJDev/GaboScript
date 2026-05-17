import {
  DocumentFormattingEditProvider,
  FormattingOptions,
  Range,
  TextDocument,
  TextEdit,
} from 'vscode';

const INDENT_KEYWORDS = [
  // 'Algoritmo',
  'Inicio',
  'Si',
  'Sino',
  'En_Caso',
  'Caso',
  'Funcion',
  'Procedimiento',
  'Mientras',
  'Para',
  'Repetir',
  'Registro',
  'Hacer',
  'Entonces',
];

const DEDENT_KEYWORDS = [
  'Fin',
  'Fin_Si',
  'Fin_Caso',
  'Fin_Funcion',
  'Fin_Procedimiento',
  'Fin_Mientras',
  'Fin_Para',
  'Fin_Repetir',
  'Fin_Registro',
  'Sino',
];

export class GaboScriptFormatter implements DocumentFormattingEditProvider {
  provideDocumentFormattingEdits(
    document: TextDocument,
    options: FormattingOptions,
  ): TextEdit[] {
    const edits: TextEdit[] = [];
    const tabSize = options.tabSize || 4;
    const indentChar = options.insertSpaces ? ' '.repeat(tabSize) : '\t';
    const lines = document.getText().split('\n');
    const result: string[] = [];
    let indentLevel = 0;

    for (const rawLine of lines) {
      const trimmed = rawLine.trim();
      const firstWord = trimmed.split(/\s+/)[0];

      if (DEDENT_KEYWORDS.includes(firstWord) && indentLevel > 0) {
        indentLevel--;
      }

      const indented = indentChar.repeat(indentLevel) + trimmed;
      result.push(indented);

      if (INDENT_KEYWORDS.includes(firstWord)) {
        indentLevel++;
      }
    }

    const formatted = result.join('\n');
    if (formatted !== document.getText()) {
      const fullRange = new Range(0, 0, document.lineCount, 0);
      edits.push(new TextEdit(fullRange, formatted));
    }

    return edits;
  }
}
