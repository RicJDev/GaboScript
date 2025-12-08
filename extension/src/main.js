import * as vscode from 'vscode';
import { generateDOCX } from './docx/generateDOCX.js';
import { BasicProvider } from './providers/BasicProvider.js';

/**
 * @param {vscode.ExtensionContext} context */
export function activate(context) {
    const exportDocxDisposable = vscode.commands.registerCommand(
        'gaboscript.exportarADOCX',
        generateDOCX,
    );

    const completionProvider = vscode.languages.registerCompletionItemProvider(
        'gaboscript',
        new BasicProvider(),
    );

    context.subscriptions.push(exportDocxDisposable);
    context.subscriptions.push(completionProvider);
}

export function deactivate() {}
