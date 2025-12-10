import * as vscode from 'vscode';
import { syntaxKeywords } from './syntaxKeywords.js';

/**@implements {vscode.CompletionItemProvider} */
export class SyntaxProvider {
    provideCompletionItems(_document, _position, _token, _context) {
        return syntaxKeywords.map(({ text, kind }) => {
            return new vscode.CompletionItem(text, kind);
        });
    }
}
