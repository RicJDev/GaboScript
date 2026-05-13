import * as vscode from 'vscode';
import { generateDOCX } from './generateDOCX';
import { WordsProvider } from './WordsProvider';
import { SyntaxProvider } from './SyntaxProvider';
import { GaboScriptFormatter } from './GaboScriptFormatter';
import { createDiagnostics } from './GaboScriptDiagnostics';

let diagnosticCollection: vscode.DiagnosticCollection | undefined;

export function activate(context: vscode.ExtensionContext) {
    const exportDocxDisposable = vscode.commands.registerCommand(
        'gaboscript.exportarADOCX',
        generateDOCX,
    );

    const words = vscode.languages.registerCompletionItemProvider(
        'gaboscript',
        new WordsProvider(),
    );

    const syntax = vscode.languages.registerCompletionItemProvider(
        'gaboscript',
        new SyntaxProvider(),
    );

    const formatter = vscode.languages.registerDocumentFormattingEditProvider(
        'gaboscript',
        new GaboScriptFormatter(),
    );

    diagnosticCollection =
        vscode.languages.createDiagnosticCollection('gaboscript');
    context.subscriptions.push(diagnosticCollection);

    const diagnosticRefresh = (document: vscode.TextDocument) => {
        if (document.languageId === 'gaboscript' && diagnosticCollection) {
            createDiagnostics(document, diagnosticCollection);
        }
    };

    context.subscriptions.push(
        vscode.workspace.onDidOpenTextDocument(diagnosticRefresh),
        vscode.workspace.onDidChangeTextDocument((e) =>
            diagnosticRefresh(e.document),
        ),
    );

    if (vscode.window.activeTextEditor) {
        diagnosticRefresh(vscode.window.activeTextEditor.document);
    }

    context.subscriptions.push(exportDocxDisposable, words, syntax, formatter);
}

export function deactivate() {
    diagnosticCollection?.dispose();
}
