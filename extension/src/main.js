import * as vscode from 'vscode';
import { generateDOCX } from './docx/generateDOCX.js';
import { BasicProvider } from './providers/BasicProvider.js';

/**
 * @param {vscode.ExtensionContext} context */
export async function activate(context) {
    const exportDocxDisposable = vscode.commands.registerCommand(
        'gaboscript.exportarADOCX',
        generateDOCX,
    );

    const basicProvider = vscode.languages.registerCompletionItemProvider(
        'gaboscript',
        new BasicProvider(),
    );

    const defaultProvider = vscode.languages.registerCompletionItemProvider(
        'gaboscript',
        {
            async provideCompletionItems(document, position, _, context) {
                return await vscode.commands.executeCommand(
                    'vscode.executeCompletionItemProvider',
                    document.uri,
                    position,
                    context.triggerCharacter,
                );
            },
        },
    );

    context.subscriptions.push(exportDocxDisposable);
    context.subscriptions.push(basicProvider, defaultProvider);
}

export function deactivate() {}
