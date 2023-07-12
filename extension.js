/*
 * @Date: 2023-07-07 17:04:40
 * @LastEditors: teenagex
 * @LastEditTime: 2023-07-12 18:20:08
 */
const vscode = require('vscode');
function activate(context) {
	let disposable = vscode.commands.registerTextEditorCommand('tsc.triplesSlashComments', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const { document, selection } = editor;

			editor.edit((editBuilder) => {
				for (let lineNumber = selection.start.line; lineNumber <= selection.end.line; lineNumber++) {
					const line = document.lineAt(lineNumber);
					// const position = new vscode.Position(lineNumber, line.firstNonWhitespaceCharacterIndex);
					const textToReplace = line.text;
					let newText;
					if (textToReplace.startsWith("/// ")) {
						newText = `${textToReplace.replace("/// ", "")}`;
					} else if (textToReplace.startsWith("///")) {
						newText = `${textToReplace.replace("///", "")}`;
					} else {
						newText = `/// ${textToReplace}`;
					}
					if (textToReplace != "") {
						editBuilder.replace(line.range, newText);
					}
				}
			});
		}
	});
	context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
