import {
  CancellationToken,
  CompletionContext,
  CompletionItem,
  CompletionItemProvider,
  CompletionList,
  Position,
  ProviderResult,
  TextDocument,
} from 'vscode';
import { keywords } from './keywords';

export class SyntaxProvider implements CompletionItemProvider<CompletionItem> {
  provideCompletionItems(
    _document: TextDocument,
    _position: Position,
    _token: CancellationToken,
    _context: CompletionContext,
  ): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>> {
    return keywords.map(({ text, kind }) => {
      return new CompletionItem(text, kind);
    });
  }
}
