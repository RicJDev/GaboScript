import * as vscode from 'vscode';
import { join } from 'node:path';
import { createWriteStream, globSync, writeFileSync } from 'node:fs';
import { readFile, unlink } from 'node:fs/promises';
import { Document, Packer, Paragraph, TextRun, LineRuleType } from 'docx';

/**
 * @param {vscode.Uri} uri
 * @param {vscode.Uri[]} selectedUris
 */
export async function generateDOCX(uri, selectedUris) {
    const targets = selectedUris || [uri];
    const folder = vscode.workspace.getWorkspaceFolder(targets[0]);
    const currentDir = folder.uri.fsPath;
    const tempFile = join(currentDir, 'temp.gabo');
    const writeStream = createWriteStream(tempFile, { flags: 'w' });

    for (const target of targets) {
        const stat = await vscode.workspace.fs.stat(target);

        if (stat.type == vscode.FileType.File) {
            const buffer = await vscode.workspace.fs.readFile(target);
            const content = await vscode.workspace.decode(buffer);
            writeStream.write(content);
            writeStream.write('\n');
        } else if (stat.type == vscode.FileType.Directory) {
            // Recorrer todas las carpetas para obtener los archivos

            const files = globSync(`${target.fsPath}/**/*.gabo`);
            for (const file of files) {
                const content = await readFile(file, 'utf-8');
                writeStream.write(content);
                writeStream.write('\n');
            }
        }
    }

    writeStream.close();

    const newFile = 'algoritmo.docx';
    const newFilePath = join(currentDir, newFile);
    const fileContent = await readFile(tempFile, 'utf-8');

    try {
        const doc = new Document({
            sections: [
                {
                    children: [
                        ...fileContent.split('\n').map(
                            (line) =>
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: line,
                                            font: 'Arial',
                                            size: 22,
                                        }),
                                    ],
                                    spacing: {
                                        line: 360,
                                        lineRule: LineRuleType.AUTO,
                                    },
                                }),
                        ),
                    ],
                },
            ],
        });

        const buffer = await Packer.toBuffer(doc);
        writeFileSync(newFilePath, buffer);

        vscode.window.showInformationMessage(
            `¡Código GaboScript exportado con éxito a DOCX: ${newFilePath}`,
        );

        await unlink(tempFile);
    } catch (error) {
        vscode.window.showErrorMessage(
            `Error al generar el archivo DOCX: ${error.message}`,
        );
    }
}
