import * as vscode from 'vscode';

let diagCol;
const langId = 'gaboscript';
let timer = null;
const delay = 1000; 

const SEMI_STATE_KEY = 'gaboscript.semiCheckStates'; 
let extensionContext; 

function getSemicolonCheckEnabled(doc) {
    if (!extensionContext || !doc) return true;

    const allStates = extensionContext.workspaceState.get(SEMI_STATE_KEY, {});
    const uri = doc.uri.toString();
    
    return allStates.hasOwnProperty(uri) ? allStates[uri] : true; 
}

export function toggleSemisSetting(context) {
    if (!context || !vscode.window.activeTextEditor) return;

    const doc = vscode.window.activeTextEditor.document;
    if (doc.languageId !== langId) return;
    
    const uri = doc.uri.toString();
    let allStates = context.workspaceState.get(SEMI_STATE_KEY, {});
    
    const currentState = allStates.hasOwnProperty(uri) ? allStates[uri] : true;
    const newState = !currentState;
    
    allStates[uri] = newState;

    context.workspaceState.update(SEMI_STATE_KEY, allStates)
        .then(() => {
            vscode.window.showInformationMessage(
                `Verificación de Punto y Coma para ${doc.fileName.split('/').pop()}: ${newState ? 'Activada' : 'Desactivada'}`
            );
            
            checkSemis(doc); 
        });
}

function debounceCheckDiags(doc) {
    if (timer) {
        clearTimeout(timer);
    }
    
    timer = setTimeout(() => {
        checkSemis(doc); 
    }, delay); 
}

export function initDiagnostics(ctx) {
    extensionContext = ctx;
    diagCol = vscode.languages.createDiagnosticCollection(langId);
    
    if (vscode.window.activeTextEditor) {
        checkSemis(vscode.window.activeTextEditor.document);
    }
    
    const diagChange = vscode.workspace.onDidChangeTextDocument(event => {
        debounceCheckDiags(event.document);
    });

    const diagActive = vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor) {
            debounceCheckDiags(editor.document);
        }
    });

    ctx.subscriptions.push(diagChange, diagActive);
}

export function disposeDiagnostics() {
    if (diagCol) {
        diagCol.dispose();
    }
    if (timer) {
        clearTimeout(timer);
    }
    extensionContext = null; 
}

export function checkSemis(doc) {
    if (!doc || doc.languageId !== langId || !diagCol) return;
    
    if (!getSemicolonCheckEnabled(doc)) {
        diagCol.set(doc.uri, []);
        return;
    }

    const diags = [];
    const lines = doc.getText().split('\n');

    const semiKwds = [
        'Var', 'Mostrar', 'Leer', 'Si', 'En_Caso', 'Caso', 'Mientras', 
        'Para', 'Funcion', 'Devolver', 'Procedimiento', 'Registro'
    ].map(kwd => kwd.toLowerCase());
    
    const noSemiKwds = [
        'Algoritmo', 'Inicio', 'Fin', 'Sino', 'Otro_Caso', 'Repetir', 
        'Fin_Si', 'Fin_Caso', 'Fin_Repetir', 'Fin_Mientras', 'Fin_Para', 
        'Fin_Funcion', 'Fin_Procedimiento', 'Fin_Registro'
    ].map(kwd => kwd.toLowerCase());

    let inBlockComment = false;

    for (let i = 0; i < lines.length; i++) {
        const fullLine = lines[i];
        let codePart = fullLine;


        if (!inBlockComment && fullLine.includes('/*')) {
            const startIdx = fullLine.indexOf('/*');
            const endIdx = fullLine.indexOf('*/');

            if (endIdx !== -1 && startIdx < endIdx) {
                codePart = fullLine.substring(0, startIdx) + fullLine.substring(endIdx + 2);
            } else {
                inBlockComment = true;
                codePart = fullLine.substring(0, startIdx);
            }
        }

        if (inBlockComment) {
            const endIdx = fullLine.indexOf('*/');
            if (endIdx !== -1) {
                inBlockComment = false;
                codePart = fullLine.substring(endIdx + 2);
            } else {
                continue;
            }
        }

        if (inBlockComment) {
            continue;
        }

        const commentIndex = codePart.indexOf('//');
        if (commentIndex !== -1) {
            codePart = codePart.substring(0, commentIndex);
        }

        const lineTrimmed = codePart.trim();
        const line = lineTrimmed.toLowerCase();
        
        if (lineTrimmed.length === 0) {
            continue;
        }
        
        const fstKwd = line.split(/[^a-z_]/)[0];
        let needsSemi = false;
        
        if (semiKwds.some(kwd => fstKwd === kwd)) {
            needsSemi = true;
        } else if (!noSemiKwds.some(kwd => fstKwd === kwd)) {
            needsSemi = true;
        }
        
        if (noSemiKwds.some(kwd => fstKwd === kwd)) {
            needsSemi = false; 
        }

        if (needsSemi && !line.endsWith(';')) {
            const char = fullLine.trimEnd().length;
            const range = new vscode.Range(new vscode.Position(i, char), new vscode.Position(i, char));

            const diag = new vscode.Diagnostic(
                range,
                "Falta punto y coma (;) al final de la sentencia.",
                vscode.DiagnosticSeverity.Error
            );
            diag.code = 'missing-semi';
            diags.push(diag);
            
        } else if (!needsSemi && line.endsWith(';')) {
            const semiIdx = codePart.lastIndexOf(';'); 
            const range = new vscode.Range(new vscode.Position(i, semiIdx), new vscode.Position(i, semiIdx + 1));
            
            const diag = new vscode.Diagnostic(
                range,
                "Punto y coma (;) inesperado en estructura de control.",
                vscode.DiagnosticSeverity.Warning
            );
            diag.code = 'unexpected-semi';
            diags.push(diag);
        }
    }

    diagCol.set(doc.uri, diags);
}