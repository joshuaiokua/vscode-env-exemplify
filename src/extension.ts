import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
	console.log('Extension "vscode-env-exemplify" is now active!');

    let disposable = vscode.workspace.onDidSaveTextDocument((document) => {
        // Check if the saved file is an .env file
        if (document.fileName.endsWith('.env')) {
            const filePath = document.fileName;
            const copyPath = filePath + '.example';

            // Copy the .env file to .env.example
            fs.copyFile(filePath, copyPath, (err) => {
                if (err) {
                    vscode.window.showErrorMessage(`Failed to create a copy of ${filePath}: ${err.message}`);
                } else {
                    vscode.window.showInformationMessage(`Copied ${filePath} to ${copyPath}`);
                }
            });
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
