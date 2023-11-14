import * as vscode from 'vscode';
import * as path from 'path';
import { error } from 'console';

export function activate(context: vscode.ExtensionContext) {
    // Command to open the webview
    const disposable = vscode.commands.registerCommand('livelygpt.launch', async () => {
        // Create and show a new webview
        const panel = vscode.window.createWebviewPanel(
            'livelyView', // Identifies the type of the webview. Used internally
            'LivelyGPT', // Title of the panel displayed to the user`
            vscode.ViewColumn.One, // Editor column to show the new webview panel in
            {
                enableScripts: true, // Enable scripts in the webview
            }
        );

        // Get path to index.html relative to the extension path
        const indexPath = vscode.Uri.file(context.asAbsolutePath(path.join('dist','browser', 'index.html')));

        // Set initial content
        panel.webview.html = await getWebviewContent(indexPath);

        // Handle messages from the webview
        panel.webview.onDidReceiveMessage(
            (message) => {
                switch (message.command) {
                    case 'generateCode':
                        // Handle generating code
                        break;
                    case 'displayCodeInfo':
                        // Handle displaying selected code info
                        break;
                    case 'generateTests':
                        // Handle generating tests for selected code
                        break;
                    case 'displayProblems':
                        // Handle displaying potential problems and vulnerabilities
                        break;
                    case 'suggestImprovements':
                        // Handle suggesting improvements to the code
                        break;
                }
            },
            undefined,
            context.subscriptions
        );
    });

    context.subscriptions.push(disposable);
}

function getWebviewContent(indexPath: vscode.Uri): Promise<string> {
    // Read the HTML file from disk
    return new Promise((resolve, reject) => {
        vscode.workspace.fs.readFile(indexPath).then(
            (content: Uint8Array) => {
                resolve(Buffer.from(content).toString('utf-8'));
            },
            (error) => {
                reject(error);
            }
        );
    });
}