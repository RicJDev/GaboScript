import * as vscode from 'vscode';

export interface KeywordEntry {
    text: string;
    kind: vscode.CompletionItemKind;
}
