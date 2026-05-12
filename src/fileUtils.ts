import * as vscode from 'vscode';
import { basename, extname, join } from 'node:path';
import { globSync } from 'node:fs';
import { readFile } from 'node:fs/promises';

export function deriveOutputName(target: vscode.Uri, targets: vscode.Uri[]): string {
  if (targets.length === 1 && targets[0].scheme !== 'untitled' && targets[0].fsPath) {
    const originalName = basename(targets[0].fsPath);
    const nameWithoutExt = originalName.replace(extname(originalName), '');
    return `${nameWithoutExt}.docx`;
  }
  return 'Algoritmo.docx';
}

export async function collectGaboFiles(
  targets: vscode.Uri[] | undefined,
  currentDir: string,
): Promise<string> {
  const parts: string[] = [];

  if (targets && targets.length > 0) {
    for (const target of targets) {
      const stat = await vscode.workspace.fs.stat(target);
      if (stat.type === vscode.FileType.File) {
        const buffer = await vscode.workspace.fs.readFile(target);
        const content = (await vscode.workspace.decode(buffer)) as string;
        parts.push(content);
      } else if (stat.type === vscode.FileType.Directory) {
        const files = globSync(`${target.fsPath}/**/*.gabo`);
        for (const file of files) {
          const content = await readFile(file, 'utf-8');
          parts.push(content);
        }
      }
      parts.push('\n\n');
    }
  } else {
    const files = globSync(`${currentDir}/**/*.gabo`);
    for (const file of files) {
      const content = await readFile(file, 'utf-8');
      parts.push(content);
      parts.push('\n\n');
    }
  }

  return parts.join('');
}
