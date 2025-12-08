import * as vscode from 'vscode';
import { keywords } from './keywords/keywords.js';
import { dataTypes } from './keywords/dataTypes.js';
import { operators } from "./keywords/operators.js";
import { parameters } from "./keywords/parameters.js";

/**@implements {vscode.CompletionItemProvider} */
export class BasicProvider {
    /**
     *
     * @param {vscode.TextDocument} document
     * @param {vscode.Position} position
     * @param {vscode.CancellationToken} _token
     * @param {vscode.CompletionContext} context
     * @returns {vscode.CompletionList}
     */
    async provideCompletionItems(document, position, _token, context) {
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

        const defaultCompletions = await vscode.commands.executeCommand(
            'vscode.executeCompletionItemProvider',
            document.uri,
            position,
            context.triggerCharacter,
        );

        return [
            ...keywordsCommands,
            ...dataTypesCommands,
            ...parametersCommands,
            ...operatorsCommand,
            ...(defaultCompletions?.items || []),
        ];
    }
}
