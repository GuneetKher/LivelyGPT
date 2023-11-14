/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = void 0;
const vscode = __importStar(__webpack_require__(1));
const path = __importStar(__webpack_require__(2));
function activate(context) {
    // Command to open the webview
    const disposable = vscode.commands.registerCommand('livelygpt.launch', async () => {
        // Create and show a new webview
        const panel = vscode.window.createWebviewPanel('livelyView', // Identifies the type of the webview. Used internally
        'LivelyGPT', // Title of the panel displayed to the user`
        vscode.ViewColumn.One, // Editor column to show the new webview panel in
        {
            enableScripts: true, // Enable scripts in the webview
        });
        // Get path to index.html relative to the extension path
        const indexPath = vscode.Uri.file(context.asAbsolutePath(path.join('dist', 'browser', 'index.html')));
        // Set initial content
        panel.webview.html = await getWebviewContent(indexPath);
        // Handle messages from the webview
        panel.webview.onDidReceiveMessage((message) => {
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
        }, undefined, context.subscriptions);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function getWebviewContent(indexPath) {
    // Read the HTML file from disk
    return new Promise((resolve, reject) => {
        vscode.workspace.fs.readFile(indexPath).then((content) => {
            resolve(Buffer.from(content).toString('utf-8'));
        }, (error) => {
            reject(error);
        });
    });
}


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("path");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map