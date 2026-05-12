import * as vscode from 'vscode';
import { syntaxKeywords } from './keywords';

export class SyntaxProvider implements vscode.CompletionItemProvider<vscode.CompletionItem> {
    provideCompletionItems(
        _document: vscode.TextDocument,
        _position: vscode.Position,
        _token: vscode.CancellationToken,
        _context: vscode.CompletionContext,
    ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>> {
        return syntaxKeywords.map(({ text, kind }) => {
            return new vscode.CompletionItem(text, kind);
        });
    }
}
