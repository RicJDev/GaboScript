import { CompletionItemKind } from 'vscode';

export interface KeywordEntry {
  text: string;
  kind: CompletionItemKind;
}
