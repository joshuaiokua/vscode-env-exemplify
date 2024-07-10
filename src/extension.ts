import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "env-exemplify" is now active!');

	// Register a command that runs a test 
	// Note: The command is defined in package.json
	const testHelloWorld = vscode.commands.registerCommand('env-exemplify.testHelloWorld', () => {
		vscode.window.showInformationMessage('Hello World from env-exemplify!');
	});

	context.subscriptions.push(testHelloWorld);
}

export function deactivate() {}
