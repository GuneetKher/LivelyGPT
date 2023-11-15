import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideVSCodeDesignSystem, vsCodeBadge, vsCodeButton, vsCodeCheckbox, vsCodePanelTab, vsCodePanelView, vsCodePanels, vsCodeTextArea } from "@vscode/webview-ui-toolkit";
import { vscode } from "./utilities/vscode";
import { HttpClientModule } from '@angular/common/http';

import { AskService } from './services/ask.service';

provideVSCodeDesignSystem().register(vsCodeButton());
provideVSCodeDesignSystem().register(vsCodePanels());
provideVSCodeDesignSystem().register(vsCodePanelTab());
provideVSCodeDesignSystem().register(vsCodePanelView());
provideVSCodeDesignSystem().register(vsCodeCheckbox());
provideVSCodeDesignSystem().register(vsCodeTextArea());

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {

  constructor(private askService: AskService){ }

  ngOnInit(): void {
    // Subscribe to messages from the extension
    window.addEventListener('message', (event) => {
      const message = event.data;
      this.handleMessage(message);
    });

  }
  title = 'livelygpt-webview';
  explainOutput: string = "";
  explainSelection: string = "";

  handleHowdyClick() {
    vscode.postMessage({
      command: "hello",
      text: "Hey there partner! 🤠",
    });
  }

  handleAssistantClick() {
    vscode.postMessage({
      command: "assist",
      text: "Assisting! 🤠",
    });
  }

  handleExplainerClick() {
    this.explainOutput = "Explained"
    this.askService.explain(
      {"message":this.explainSelection}
    ).subscribe(response=>{
      this.explainOutput = response
    },error=>{
      vscode.postMessage({
        command: "explain",
        text: "There was an error! 🤠",
      });
    })
  }

  handleGenerateTestsClick() {
    vscode.postMessage({
      command: "generateTests",
      text: "Generating! 🤠",
    });
  }

  handleAnalyzeClick() {
    vscode.postMessage({
      command: "analyze",
      text: "Analyzing! 🤠",
    });
  }

  handleOptimizeClick() {
    vscode.postMessage({
      command: "optimize",
      text: "Optimizing! 🤠",
    });
  }

  private handleMessage(message: any) {
    if (message.command === 'explain') {
        // Handle the received selected text
        const selectedText = message.text;
        this.handleSelectedText(selectedText);
    }
  }

  private handleSelectedText(selectedText: string) {
      // Process the selected text in your Angular app
      console.log('Selected Text in Angular:', selectedText);
      this.explainSelection = selectedText;
      // Add your logic to update the UI or perform any other actions with the selected text
  }

}
