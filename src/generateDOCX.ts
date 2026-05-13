import * as vscode from 'vscode';
import { join } from 'node:path';
import { createWriteStream } from 'node:fs';
import { readFile, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { createDoc } from './createDocx';
import { deriveOutputName, collectGaboFiles } from './fileUtils';

export async function generateDOCX(
    uri?: vscode.Uri,
    selectedUris?: vscode.Uri[],
): Promise<void> {
    const folders = vscode.workspace.workspaceFolders;

    if (!folders || folders.length === 0) {
        vscode.window.showErrorMessage('No hay una carpeta de trabajo abierta');
        return;
    }

    const currentDir = folders[0].uri.fsPath;
    const tempFile = join(tmpdir(), 'temp.gabo');
    const writeStream = createWriteStream(tempFile, { flags: 'w' });

    const targets =
        selectedUris && selectedUris.length > 0
            ? selectedUris
            : uri
              ? [uri]
              : [];
    const newFile = deriveOutputName(uri ?? targets[0], targets);

    try {
        const concatenated = await collectGaboFiles(
            targets.length > 0 ? targets : undefined,
            currentDir,
        );
        writeStream.write(concatenated);
    } catch (e) {
        const filesGlob = targets.length > 0 ? undefined : currentDir;
        const content = await collectGaboFiles(
            filesGlob ? undefined : targets,
            currentDir,
        );
        writeStream.write(content);
    }

    await new Promise<void>((resolve, reject) => {
        writeStream.end();
        writeStream.on('close', resolve);
        writeStream.on('error', reject);
    });

    const newFilePath = join(currentDir, newFile);

    try {
        const fileContent = (await readFile(tempFile, 'utf-8')).trim();
        await createDoc(fileContent, newFilePath);
        await unlink(tempFile);
    } catch (error) {
        vscode.window.showErrorMessage(
            `Error en el proceso de exportación: ${(error as Error).message}`,
        );
        try {
            await unlink(tempFile);
        } catch {
            // ignore cleanup error
        }
    }
}
