import * as vscode from 'vscode';
import { generateDOCX } from './docx/generateDOCX.js';

/**
 * @param {vscode.ExtensionContext} context */
export function activate(context) {
    const exportDocxDisposable = vscode.commands.registerCommand(
        'gaboscript.exportarADOCX',
        generateDOCX,
    );

    context.subscriptions.push(exportDocxDisposable);
}

export function deactivate() {}
