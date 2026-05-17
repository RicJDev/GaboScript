import {
  Diagnostic,
  DiagnosticCollection,
  DiagnosticSeverity,
  Range,
  TextDocument,
} from 'vscode';

const BLOCK_KEYWORDS: Record<string, string> = {
  Algoritmo: 'Fin',
  Si: 'Fin_Si',
  En_Caso: 'Fin_Caso',
  Funcion: 'Fin_Funcion',
  Procedimiento: 'Fin_Procedimiento',
  Mientras: 'Fin_Mientras',
  Para: 'Fin_Para',
  Repetir: 'Fin_Repetir',
  Registro: 'Fin_Registro',
};

const BLOCK_STARTERS = Object.keys(BLOCK_KEYWORDS);
const BLOCK_ENDERS = Object.values(BLOCK_KEYWORDS);

export function createDiagnostics(
  doc: TextDocument,
  collection: DiagnosticCollection,
): void {
  const diagnostics: Diagnostic[] = [];
  const lines = doc.getText().split('\n');
  const stack: { keyword: string; line: number }[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    const firstWord = trimmed.split(/\s+/)[0];

    if (BLOCK_STARTERS.includes(firstWord)) {
      stack.push({ keyword: firstWord, line: i });
    }

    if (BLOCK_ENDERS.includes(firstWord)) {
      if (stack.length === 0) {
        diagnostics.push({
          severity: DiagnosticSeverity.Error,
          message: `${firstWord} sin bloque correspondiente`,
          range: new Range(i, 0, i, line.length),
        });
      } else {
        const expected = BLOCK_KEYWORDS[stack[stack.length - 1].keyword];
        if (firstWord !== expected) {
          diagnostics.push({
            severity: DiagnosticSeverity.Error,
            message: `Se esperaba '${expected}' pero se encontró '${firstWord}'`,
            range: new Range(i, 0, i, line.length),
          });
        }
        stack.pop();
      }
    }
  }

  while (stack.length > 0) {
    const unclosed = stack.pop()!;
    diagnostics.push({
      severity: DiagnosticSeverity.Warning,
      message: `Bloque '${unclosed.keyword}' sin cerrar`,
      range: new Range(
        unclosed.line,
        0,
        unclosed.line,
        lines[unclosed.line].length,
      ),
    });
  }

  collection.set(doc.uri, diagnostics);
}
