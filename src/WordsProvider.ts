import * as vscode from 'vscode';
import { syntaxKeywords } from './keywords';

export class WordsProvider implements vscode.CompletionItemProvider<vscode.CompletionItem> {
  provideCompletionItems(
    document: vscode.TextDocument,
    _position: vscode.Position,
    _token: vscode.CancellationToken,
    _context: vscode.CompletionContext,
  ): vscode.ProviderResult<
    vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>
  > {
    const regex = /\b[a-zA-Z_][a-zA-Z0-9_]*\b/gi;
    const text = document.getText();
    const matches = text.match(regex) ?? [];
    const words = [...new Set(matches)].filter((word) => {
      for (const { text } of syntaxKeywords) {
        if (word?.toLowerCase() === text.toLowerCase()) return false;
      }
      return true;
    });

    return words.map((word) => {
      return new vscode.CompletionItem(word, vscode.CompletionItemKind.Text);
    });
  }
}
