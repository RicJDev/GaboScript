import * as vscode from 'vscode';
import { syntaxKeywords } from './syntaxKeywords.js';

/**@implements {vscode.CompletionItemProvider} */
export class WordsProvider {
    /**
     *
     * @param {vscode.TextDocument} document
     */
    provideCompletionItems(document, _position, _token, _context) {
        const regex = /\b[a-zA-Z_][a-zA-Z0-9_]*\b/gi;
        const text = document.getText();
        const matches = text.match(regex) ?? [];
        const words = [...new Set(matches)].filter((word) => {
            for (const { text } of syntaxKeywords) {
                if (word?.toLowerCase() == text.toLowerCase()) return false;
            }

            return true;
        });

        return words.map((word) => {
            return new vscode.CompletionItem(
                word,
                vscode.CompletionItemKind.Text,
            );
        });
    }
}
