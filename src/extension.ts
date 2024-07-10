import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "env-exemplify" is now active!');

    // Function to update the env.example file
    const updateEnvExample = (filePath: string) => {
        const dir = path.dirname(filePath);
        const envExamplePath = path.join(dir, '.env.example');

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading .env file:', err);
                return;
            }

            const envVars = data
                .split('\n')
                .filter(line => line && !line.startsWith('#'))
                .map(line => line.split('=')[0])
                .join('\n');

            fs.writeFile(envExamplePath, envVars, 'utf8', (err) => {
                if (err) {
                    console.error('Error writing env.example file:', err);
                } else {
                    console.log('env.example file updated successfully');
                }
            });
        });
    };

    // Watch for changes in the .env file
    const watcher = vscode.workspace.createFileSystemWatcher('**/.env');

    watcher.onDidChange(uri => updateEnvExample(uri.fsPath));
    watcher.onDidCreate(uri => updateEnvExample(uri.fsPath));

    context.subscriptions.push(watcher);
}

export function deactivate() {}
