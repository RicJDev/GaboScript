import * as vscode from 'vscode';
import { join } from 'node:path';
import { createWriteStream, globSync } from 'node:fs';
import { readFile, unlink } from 'node:fs/promises';
import { createDoc } from './createDoc.js';
import { tmpdir } from 'node:os'

/**
 * @param {vscode.Uri|undefined} uri
 * @param {vscode.Uri[]|undefined} selectedUris
 */
export async function generateDOCX(uri, selectedUris) {
    const folders = vscode.workspace.workspaceFolders;
    const currentDir = folders[0].uri.fsPath;
    const tempFile = join(tmpdir(), 'temp.gabo');
    const writeStream = createWriteStream(tempFile, { flags: 'w' });

    if (!folders || folders.length === 0) {
        vscode.window.showErrorMessage('No hay una carpeta de trabajo abierta');
        return;
    }

    if (selectedUris || uri) {
        const targets = selectedUris || [uri];

        for (const target of targets) {
            const stat = await vscode.workspace.fs.stat(target);

            if (stat.type == vscode.FileType.File) {
                const buffer = await vscode.workspace.fs.readFile(target);
                const content = await vscode.workspace.decode(buffer);
                writeStream.write(content);
                writeStream.write('\n');
            } else if (stat.type == vscode.FileType.Directory) {
                const files = globSync(`${target.fsPath}/**/*.gabo`);
                for (const file of files) {
                    const content = await readFile(file, 'utf-8');
                    writeStream.write(content);
                    writeStream.write('\n');
                }
            }
        }
    } else {
        const files = globSync(`${currentDir}/**/*.gabo`);
        for (const file of files) {
            const content = await readFile(file, 'utf-8');
            writeStream.write(content);
            writeStream.write('\n');
        }
    }

    writeStream.close();

    const newFile = 'algoritmo.docx';
    const newFilePath = join(currentDir, newFile);
    const fileContent = await readFile(tempFile, 'utf-8');

    createDoc(fileContent, newFilePath);
    await unlink(tempFile);
}
