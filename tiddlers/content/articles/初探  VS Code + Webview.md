**介绍**

​VSCode 是一个非常强大的代码编辑器，而它的插件也非常丰富。在开发中，我们经常需要自己编写一些插件来提高开发效率。本文将介绍如何开发一个 VSCode 插件，并在其中使用 Webview 技术。首先介绍一下什么是 Webview。

### **什么是 Webview？**

Webview 是一种可以在 VS Code 中嵌入 Web 内容的技术。通过 Webview，开发者可以将自己的 Web 应用程序嵌入到 VS Code 中，以便在工具中执行各种任务。Webview 提供了一个 Web 浏览器的环境，可以在其中加载 HTML、CSS 和 JavaScript，从而实现各种功能。Webview 还提供了一个 API，使得开发者可以从 Web 应用程序中与 VS Code 进行交互。webview API 为开发者提供了完全自定义视图的能力，Webview 也能用于构建比 VS Code 原生 API 支持构建的更加复杂的用户交互界面。可以把 webview 看成是 VS Code 中的 iframe，它可以渲染几乎全部的 HTML 内容，它通过消息机制和插件通信。这样的自由度令我们的 webview 非常强劲并将插件的潜力提升到了新的高度。接下来我们一起来学习。

**1. 创建一个空的 VSCode 插件**

首先，我们借助脚手架 yomen 和 generator-code 来快速生成项目框架：安装依赖

```
npm install -g yo generator-code
```

初始化一个 VS Code 插件项目

```
yo code
  ? What type of extension do you want to create? New Extension (TypeScript)
  ? What's the name of your extension? HelloWorld
  ? What's the identifier of your extension? helloworld
  ? What's the description of your extension? HelloWorld
  ? Initialize a git repository? No
  ? Which package manager to use? npm
  等待安装依赖完成
  code ./helloworld
```

以下为初始化的项目结构

![](https://pic2.zhimg.com/v2-fd3aeae5009a5b841e5b7ef125fa47a5_b.jpg)

**2. 在插件中创建一个 Webview**

在插件中创建一个 Webview，需要使用 vscode 模块中的 window\.createWebviewPanel 方法。该方法需要传入一个唯一标识符、标题、视图类型和展示位置等参数。例如：

```
import * as vscode from'vscode';
exportfunction activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('Hello-World.helloWorld', () => {
		let panel = vscode.window.createWebviewPanel(
			'myWebview', // 标识符，需要唯一
			'My Webview', // 标题
			vscode.ViewColumn.One, // 第一列
			{}
		);
    // 设置HTML内容
    panel.webview.html = getWebviewContent();
	});
	context.subscriptions.push(disposable);
}
```

**3. 在 Webview 中加载 HTML 页面**

在插件中创建 Webview 后，需要使用 webview\.html 属性加载一个 HTML 页面。例如：

```
function getWebviewContent() { 
  return`
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Hello Webview</title>
  </head>
  <body>
      <h1>Hello Webview!</h1>
  </body>
  </html>
  `;
}
```

完成后进入 VS Code，按下 F5，你会立即看到一个插件打开主机窗口，其中就运行着插件。在命令面板 (Ctrl+Shift+P) 中输入 Hello World 命令，可以看到如下效果。

![动图封面](https://pic1.zhimg.com/v2-e6e59c715030de30387d028985bedad8_b.jpg)

[![](https://pic1.zhimg.com/v2-e6e59c715030de30387d028985bedad8_b.jpg)](https://vdn6.vzuu.com/SD/9ae28242-e331-11ed-bb57-163cf92a89df-v1_f4_t2_JefUK51B.mp4?pkey=AAVGtfQvsYCDTuBgJYhTmjdrkDoZ-d1d_EOxGPCXFGehcqwd9wT20uu0b0XXxrM40nJkiqds_k96L7RJXddaDhiy\&c=avc.1.1\&f=mp4\&pu=078babd7\&bu=078babd7\&expiration=1712427603\&v=ks6)

**4. 给 webview 动态传值更新 webview 的内容**

这里引用官方的例子

```
   /**
      * 4 webview
      * 可以给webview传值，动态改变内容的webview
   */
   const cats = {
      'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
      'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif'
      };
		let disposable = vscode.commands.registerCommand('Hello-World.helloWorld', () => {
		  const panel = vscode.window.createWebviewPanel(
        'myWebview', // 标识符，需要唯一
        'My Webvie', // 标题
        vscode.ViewColumn.One, //  第一列
        {} // webview其他的选项
		  );
		  let iteration = 0;
		  const updateWebview = () => {
        const cat = iteration++ % 2 ? 'Compiling Cat' : 'Coding Cat';
        panel.title = cat;
        panel.webview.html = getWebviewContent(cat);
		  };
		   // 设置初始化内容
		  updateWebview();
       // 每秒更新内容
      setInterval(updateWebview, 1000);
    context.subscriptions.push(disposable);

function getWebviewContent(cat: keyof typeof cats) {
  return
    `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cat Coding</title>
        </head>
        <body>
            <img src="${cats[cat]}" width="300" />
        </body>
        </html>
  `;
}
```

### **那么如何与 VS Code 进行交互？**

Webview 与 VS Code 之间的交互是通过 Webview 的 API 进行的。通过 API，开发者可以从 Webview 中向 VS Code 发送消息，并从 VS Code 中接收消息。

在 Webview 中，可以使用 vscode.postMessage 方法向 VS Code 发送消息：

**1. 在 Webview 中调用插件 API**

为了让 Webview 能够与插件交互，需要在 Webview 中使用 acquireVsCodeApi 方法获取一个 vscode 对象，并将其传递给 JavaScript，以便在 JavaScript 中调用插件 API。例如

```
const vscode = acquireVsCodeApi();
  vscode.postMessage({
      command: 'showMessage',
      text: 'Hello from Webview!'
  });
```

**2. 在插件中监听 Webview 的消息**

在 VS Code 中，可以通过监听 WebviewPanel.onDidReceiveMessage 事件来接收来自 Webview 的消息。例如：

```
webview.onDidReceiveMessage(message => {
    switch (message.command) {
        case'showMessage':
            vscode.window.showInformationMessage(message.text);
            break;
    }
  });
```

下面我们来实现一个具体的 demo，来看下 webview 与 vscode 之间的交互:

```
import * as vscode from'vscode';
  exportfunction activate(context: vscode.ExtensionContext) {
    // 创建 Webview 面板
    const panel = vscode.window.createWebviewPanel(
      'myWebview', // 面板 ID
      'My Webview', // 面板标题
      vscode.ViewColumn.One, // 显示位置
      { enableScripts: true } // 启用 JavaScript
    );
    // 在 Webview 中加载 HTML 页面
    panel.webview.html = getWebviewContent();;
    // 监听 Webview 发送的消息
    panel.webview.onDidReceiveMessage(message => {
      if (message.type === 'buttonClick') {
        // 在 VS Code 中显示提示框
        vscode.window.showInformationMessage('Button clicked in Webview!');
      }
    });
    // 在 VS Code 中注册命令
    let disposable = vscode.commands.registerCommand('Hello-World.helloWorld', () => {
      // 向 Webview 发送消息
      panel.webview.postMessage({ type: 'showButton' });
    });
    context.subscriptions.push(disposable);
  }
  function getWebviewContent() {
    return`
      <html>
        <body>
          <button id="myButton">Click me</button>
          <script>
            const vscode = acquireVsCodeApi();
            const myButton = document.getElementById('myButton');
            myButton.addEventListener('click', () => {
              vscode.postMessage({ type: 'buttonClick' });
            });
          </script>
        </body>
      </html>
    `;
  }
```

下图为 点击 按钮之后的效果。

![](https://pic2.zhimg.com/v2-a47beb29b409978e25ee7f6cf1e44591_b.jpg)

在这个示例中，我们创建了一个 Webview 面板，并在其中加载了一个简单的 HTML 页面，其中包含一个按钮。当用户点击该按钮时，我们向 VS Code 发送了一个消息，并在 VS Code 中显示了一个提示框。在 VS Code 中，我们还注册了一个命令 Hello-World.helloWorld，当用户执行该命令时，我们向 Webview 发送了一个消息，以便在 Webview 中显示按钮。

通过 Webview，我们可以在 VS Code 和 Web 应用程序之间进行双向通信，从而实现各种功能。

### **结论**

通过以上步骤，我们可以创建一个带有 Webview 的 VSCode 插件，并在其中使用 Webview 技术。Webview 可以让我们在插件中嵌入交互式的 HTML 页面，从而提高开发效率和用户体验。而且通过 Webview，开发者可以将自己的 Web 技能应用于 VS Code 插件开发中，并实现各种功能。

**参考来源**

[https://code.visualstudio.com/docs](https://link.zhihu.com/?target=https%3A//code.visualstudio.com/docs)

[https://code.visualstudio.com/api/get-started/your-first-extension](https://link.zhihu.com/?target=https%3A//code.visualstudio.com/api/get-started/your-first-extension)

[https://code.visualstudio.com/api/references/vscode-api#window.createWebviewPanel](https://link.zhihu.com/?target=https%3A//code.visualstudio.com/api/references/vscode-api%23window.createWebviewPanel)
