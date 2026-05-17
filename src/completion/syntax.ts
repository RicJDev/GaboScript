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
import { syntaxKeywords } from './keywords';

export class GaboScriptSyntaxProvider implements CompletionItemProvider<CompletionItem> {
  provideCompletionItems(
    _document: TextDocument,
    _position: Position,
    _token: CancellationToken,
    _context: CompletionContext,
  ): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>> {
    return syntaxKeywords.map(({ text, kind }) => {
      return new CompletionItem(text, kind);
    });
  }
}
