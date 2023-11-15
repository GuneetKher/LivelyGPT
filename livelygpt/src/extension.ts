import { commands, ExtensionContext, window } from "vscode";
import { LivelyPanel } from "./panels/LivelyPanel";

export function activate(context: ExtensionContext) {
  // Create the show hello world command
  const launchCommand = commands.registerCommand("livelygpt.launch", () => {
    LivelyPanel.render(context.extensionUri);
  });

  const selectTextCommand = commands.registerCommand('livelygpt.getSelectedText', () => {
    // Get the active text editor
    const editor = window.activeTextEditor;

    if (editor) {
        // Get the selected text
        const selectedText = editor.document.getText(editor.selection);

        // Pass the selected text to your extension logic (replace this with your actual logic)
        sendSelectedText(selectedText);
    } else {
        window.showInformationMessage('No text selected. Please select some text in the editor.');
    }
    });

  // Add command to the extension context
  context.subscriptions.push(launchCommand);
}

function sendSelectedText(selectedText: string) {
    console.log('Selected Text:', selectedText);
    LivelyPanel.pushMessage('explain', selectedText);
}