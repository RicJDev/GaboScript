import * as vscode from 'vscode';
import { join, basename, extname } from 'node:path';
import { createWriteStream, globSync } from 'node:fs';
import { readFile, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { createDoc } from './createDocx.js';

export async function generateDOCX(uri, selectedUris) {
    const folders = vscode.workspace.workspaceFolders;

    if (!folders || folders.length === 0) {
        vscode.window.showErrorMessage('No hay una carpeta de trabajo abierta');
        return;
    }

    const currentDir = folders[0].uri.fsPath;
    const tempFile = join(tmpdir(), 'temp.gabo');
    const writeStream = createWriteStream(tempFile, { flags: 'w' });
    
    let newFile;
    const targets = selectedUris && selectedUris.length > 0 ? selectedUris : [uri];
    
    if (targets.length === 1 && targets[0].scheme !== 'untitled' && targets[0].fsPath) {
        try {
            const stat = await vscode.workspace.fs.stat(targets[0]);
            if (stat.type === vscode.FileType.File) {
                const originalName = basename(targets[0].fsPath);
                const nameWithoutExt = originalName.replace(extname(originalName), '');
                newFile = `${nameWithoutExt}.docx`;
            } else {
                const folderName = basename(targets[0].fsPath);
                newFile = `${folderName}.docx`;
            }
        } catch (e) {
             newFile = 'Algoritmo.docx';
        }
    } else {
        newFile = 'Algoritmo.docx';
    }
    
    if (targets && targets.length > 0) {
        for (const target of targets) {
            const stat = await vscode.workspace.fs.stat(target);

            if (stat.type == vscode.FileType.File) {
                const buffer = await vscode.workspace.fs.readFile(target);
                const content = await vscode.workspace.decode(buffer);
                writeStream.write(content);
                writeStream.write('\n\n'); 
            } else if (stat.type == vscode.FileType.Directory) {
                const files = globSync(`${target.fsPath}/**/*.gabo`);
                
                for (const file of files) {
                    const content = await readFile(file, 'utf-8');
                    writeStream.write(content);
                    writeStream.write('\n\n'); 
                }
            }
        }
    } else {
        const files = globSync(`${currentDir}/**/*.gabo`);
        for (const file of files) {
            const content = await readFile(file, 'utf-8');
            writeStream.write(content);
            writeStream.write('\n\n'); 
        }
    }

    await new Promise((resolve, reject) => {
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
            `Error en el proceso de exportación: ${error.message}`,
        );
        try {
            await unlink(tempFile);
        } catch (e) {
        }
    }
}
