const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const docx = require('docx');
const { Document, Packer, Paragraph, TextRun, AlignmentType } = docx;

function activate(context) {
    
    let exportDocxDisposable = vscode.commands.registerCommand('gaboscript.exportarADOCX', async function () {
        
        const editor = vscode.window.activeTextEditor;
        const document = editor.document;
        const currentFilePath = document.uri.fsPath;
        const fileContent = document.getText();
        const fileExtension = path.extname(currentFilePath).toLowerCase();
        
        if (!editor || fileExtension !== '.gabo') {
             vscode.window.showErrorMessage('No hay un archivo GaboScript abierto.');
             return;
        }
        
        const currentDir = path.dirname(currentFilePath);
        const baseName = path.basename(currentFilePath, fileExtension);
        const newFileName = `${baseName}.docx`; 
        const newFilePath = path.join(currentDir, newFileName);

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
                                spacing: { line: 360, lineRule: docx.LineRuleType.AUTO } 
                            })
                        ),
                    ],
                }],
            });

            const buffer = await Packer.toBuffer(doc);
            fs.writeFileSync(newFilePath, buffer);
            
            vscode.window.showInformationMessage(`¡Código GaboScript exportado con éxito a DOCX: ${newFilePath}`);
            
        } catch (error) {
            vscode.window.showErrorMessage(`Error al generar el archivo DOCX: ${error.message}`);
        }
    });

    context.subscriptions.push(exportDocxDisposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}