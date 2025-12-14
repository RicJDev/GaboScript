import * as vscode from 'vscode';
import { generateDOCX } from './docx/generateDOCX.js';
import { WordsProvider } from './providers/WordsProvider.js';
import { SyntaxProvider } from './providers/SyntaxProvider.js';
import { initDiagnostics, disposeDiagnostics, toggleSemisSetting } from './providers/DiagnosticsProvider.js';

export async function activate(context) {
    
    initDiagnostics(context);

    const exportDocxDisposable = vscode.commands.registerCommand(
        'gaboscript.exportarADOCX',
        generateDOCX,
    );

    const toggleSemisDisposable = vscode.commands.registerCommand(
        'gaboscript.toggleSemis',
        () => toggleSemisSetting(context), 
    );

    const words = vscode.languages.registerCompletionItemProvider(
        'gaboscript',
        new WordsProvider(),
    );

    const syntax = vscode.languages.registerCompletionItemProvider(
        'gaboscript',
        new SyntaxProvider(),
    );

    context.subscriptions.push(exportDocxDisposable, toggleSemisDisposable, words, syntax);
}

export function deactivate() {
    disposeDiagnostics();
}