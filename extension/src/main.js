import * as vscode from 'vscode';
import { generateDOCX } from './docx/generateDOCX.js';
import { keywords } from './lang/keywords.js';
import { dataTypes } from './lang/dataTypes.js';
import { operators } from './lang/operators.js';
import { parameters } from './lang/parameters.js';

/**
 * @param {vscode.ExtensionContext} context */
export function activate(context) {
    const exportDocxDisposable = vscode.commands.registerCommand(
        'gaboscript.exportarADOCX',
        generateDOCX,
    );

    const completionProvider = vscode.languages.registerCompletionItemProvider(
        'gaboscript',
        {
            provideCompletionItems(_document, _position, _token, _context) {
                const keywordsCommands = keywords.map((keyword) => {
                    return new vscode.CompletionItem(
                        keyword,
                        vscode.CompletionItemKind.Keyword,
                    );
                });

                const dataTypesCommands = dataTypes.map((dataType) => {
                    return new vscode.CompletionItem(
                        dataType,
                        vscode.CompletionItemKind.Class,
                    );
                });

                const parametersCommands = parameters.map((parameter) => {
                    return new vscode.CompletionItem(
                        parameter,
                        vscode.CompletionItemKind.TypeParameter,
                    );
                });

                const operatorsCommand = operators.map((operator) => {
                    return new vscode.CompletionItem(
                        operator,
                        vscode.CompletionItemKind.Operator,
                    );
                });

                return [
                    ...keywordsCommands,
                    ...dataTypesCommands,
                    ...parametersCommands,
                    ...operatorsCommand,
                ];
            },
        },
    );

    context.subscriptions.push(exportDocxDisposable);
    context.subscriptions.push(completionProvider);
}

export function deactivate() {}
