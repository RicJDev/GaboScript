import { commands, window } from 'vscode';
import { writeFileSync } from 'fs';
import { extname, dirname, basename, join } from 'path';
import docx, { LineRuleType } from 'docx';
const { Document, Packer, Paragraph, TextRun, AlignmentType } = docx;

function activate(context) {
    
    let exportDocxDisposable = commands.registerCommand('gaboscript.exportarADOCX', async function () {
        
        const editor = window.activeTextEditor;
        const document = editor.document;
        const currentFilePath = document.uri.fsPath;
        const fileContent = document.getText();
        const fileExtension = extname(currentFilePath).toLowerCase();
        
        if (!editor || fileExtension !== '.gabo') {
             window.showErrorMessage('No hay un archivo GaboScript abierto.');
             return;
        }
        
        const currentDir = dirname(currentFilePath);
        const baseName = basename(currentFilePath, fileExtension);
        const newFileName = `${baseName}.docx`; 
        const newFilePath = join(currentDir, newFileName);

        try {
            const doc = new Document({
                sections: [{
                    children: [
                        ...fileContent.split('\n').map(line => 
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: line,
                                        font: "Arial", 
                                        size: 22 
                                    }),
                                ],
                                spacing: { line: 360, lineRule: LineRuleType.AUTO } 
                            })
                        ),
                    ],
                }],
            });

            const buffer = await Packer.toBuffer(doc);
            writeFileSync(newFilePath, buffer);
            
            window.showInformationMessage(`¡Código GaboScript exportado con éxito a DOCX: ${newFilePath}`);
            
        } catch (error) {
            window.showErrorMessage(`Error al generar el archivo DOCX: ${error.message}`);
        }
    });

    context.subscriptions.push(exportDocxDisposable);
}

function deactivate() {}

export default {
    activate,
    deactivate
}
