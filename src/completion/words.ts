import {
  CancellationToken,
  CompletionContext,
  CompletionItem,
  CompletionItemKind,
  CompletionItemProvider,
  CompletionList,
  Position,
  ProviderResult,
  TextDocument,
} from 'vscode';
import { syntaxKeywords } from './keywords';

export class WordsProvider implements CompletionItemProvider<CompletionItem> {
  provideCompletionItems(
    document: TextDocument,
    _position: Position,
    _token: CancellationToken,
    _context: CompletionContext,
  ): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>> {
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
      return new CompletionItem(word, CompletionItemKind.Text);
    });
  }
}
