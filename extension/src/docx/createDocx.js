import * as vscode from 'vscode';
import { writeFileSync } from 'node:fs';
import { basename } from 'node:path'
import { Document, Packer, Paragraph, TextRun, LineRuleType } from 'docx';

export async function createDoc(fileContent, path) {
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
        writeFileSync(path, buffer);

        vscode.window.showInformationMessage(
            `¡Código GaboScript exportado con éxito a DOCX: ${basename(path)}`,
        );
    } catch (error) {
        vscode.window.showErrorMessage(
            `Error al generar el archivo DOCX: ${error.message}`,
        );
    }
}