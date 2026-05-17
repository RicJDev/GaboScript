import {
  commands,
  DiagnosticCollection,
  ExtensionContext,
  languages,
  TextDocument,
  window,
  workspace,
} from 'vscode';
import { generateDOCX } from './generateDOCX';
import { WordsProvider } from './WordsProvider';
import { GaboScriptSyntaxProvider } from './GaboScriptSyntaxProvider';
import { GaboScriptFormatter } from './GaboScriptFormatter';
import { createDiagnostics } from './GaboScriptDiagnostics';

let diagnosticCollection: DiagnosticCollection | undefined;

export function activate(context: ExtensionContext) {
  const exportDocxDisposable = commands.registerCommand(
    'gaboscript.exportarADOCX',
    generateDOCX,
  );

  const words = languages.registerCompletionItemProvider(
    'gaboscript',
    new WordsProvider(),
  );

  const syntax = languages.registerCompletionItemProvider(
    'gaboscript',
    new GaboScriptSyntaxProvider(),
  );

  const formatter = languages.registerDocumentFormattingEditProvider(
    'gaboscript',
    new GaboScriptFormatter(),
  );

  diagnosticCollection = languages.createDiagnosticCollection('gaboscript');
  context.subscriptions.push(diagnosticCollection);

  const diagnosticRefresh = (document: TextDocument) => {
    if (document.languageId === 'gaboscript' && diagnosticCollection) {
      createDiagnostics(document, diagnosticCollection);
    }
  };

  context.subscriptions.push(
    workspace.onDidOpenTextDocument(diagnosticRefresh),
    workspace.onDidChangeTextDocument((e) => diagnosticRefresh(e.document)),
  );

  if (window.activeTextEditor) {
    diagnosticRefresh(window.activeTextEditor.document);
  }

  context.subscriptions.push(exportDocxDisposable, words, syntax, formatter);
}

export function deactivate() {
  diagnosticCollection?.dispose();
}
