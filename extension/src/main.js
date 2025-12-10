import * as vscode from 'vscode';
import { generateDOCX } from './docx/generateDOCX.js';
import { WordsProvider } from './providers/WordsProvider.js';
import { SyntaxProvider } from './providers/SyntaxProvider.js';

/**
 * @param {vscode.ExtensionContext} context */
export async function activate(context) {
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

    context.subscriptions.push(exportDocxDisposable, words, syntax);
}

export function deactivate() {}
