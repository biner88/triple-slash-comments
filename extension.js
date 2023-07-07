/*
 * @Date: 2023-07-07 17:04:40
 * @LastEditors: teenagex
 * @LastEditTime: 2023-07-07 18:36:02
 */
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "tsc" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerTextEditorCommand('tsc.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from tsc!');
	});

	let disposable2 = vscode.commands.registerTextEditorCommand('tsc.getSelectedText', () => {
		const editor = vscode.window.activeTextEditor;
		vscode.window.showInformationMessage('heheehehhe');
		console.log("editor", editor);
		if (editor) {
			const { document, selection } = editor;

			editor.edit((editBuilder) => {
				for (let lineNumber = selection.start.line; lineNumber <= selection.end.line; lineNumber++) {
					const line = document.lineAt(lineNumber);
					const position = new vscode.Position(lineNumber, line.firstNonWhitespaceCharacterIndex);
					const textToReplace = line.text.trim();
					const newText = `/// ${textToReplace}`;

					editBuilder.replace(line.range, newText);
				}
			});
		}
	});

	context.subscriptions.push(disposable2);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
