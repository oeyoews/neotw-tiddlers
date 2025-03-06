<!---->

<!---->

<!---->

<!---->

**引言** 在上一章中，我们介绍了 Electron 应用程序的搭建和项目结构。在本篇文章中，我们将深入探讨 Electron 应用程序的三个核心部分：主进程、预加载脚本和渲染进程。我们将通过大白话来讲解这块内容。想象一下你正在经营一家餐厅，这家餐厅就是你的 Electron 应用程序。在这家餐厅里，主进程就像是一位总经理，负责整个餐厅的运营和管理；预加载脚本则是餐厅的保安，确保只有合适的客人才能进入餐厅的特定区域；而渲染进程就像是服务员，直接与顾客互动，提供美味的菜肴。在本篇文章中，我们将通过这个通俗易懂的比喻，来了解 Electron 应用程序的三个核心部分：主进程、预加载脚本和渲染进程。

**1. 主进程（Main Process）** 主进程是 Electron 应用程序的心脏，它就像餐厅的总经理，负责统筹全局，管理餐厅的日常运营。在 electron-vite 项目中，主进程的入口文件通常位于`src/main/index.js`。 主进程的主要工作包括：

* **创建和管理窗口**：就像总经理决定餐厅的布局和桌椅摆放，主进程负责创建和管理应用程序的窗口。
* **设置菜单**：就像总经理制定菜单一样，主进程可以设置应用程序的菜单和快捷键。
* **处理系统事件**：总经理需要处理各种突发情况，比如主进程要处理应用程序启动、窗口关闭等系统事件。
* **与操作系统交互**：总经理需要与外部供应商打交道，主进程则需要与操作系统交互，比如访问文件系统、剪贴板等。

**2. 预加载脚本（Preload Scripts）**

预加载脚本就像是餐厅的保安，它确保只有经过适当检查的客人才能进入特定的区域。在 electron-vite 项目中，预加载脚本的代码位于`src/preload`目录下。 预加载脚本的主要任务包括：

* **初始化集成**：保安要确保餐厅的安全系统运行正常，预加载脚本则初始化 Node.js 集成，让渲染进程可以使用 Node.js 的功能。
* **消息传递**：保安需要用对讲机与厨房和服务员沟通，预加载脚本则负责在主进程和渲染进程之间传递消息。
* **定义安全 API**：保安决定哪些客人可以进入哪个区域，预加载脚本则定义哪些 Node.js 功能可以在渲染进程中安全使用。

**3. 渲染进程（Renderer Process）** 渲染进程就像是餐厅的服务员，他们直接与顾客互动，提供优质的服务。在 electron-vite 项目中，渲染进程的代码位于`src/renderer`目录下。 渲染进程的主要职责包括：

* **加载和渲染页面**：服务员要确保餐桌整洁，渲染进程则加载和渲染 HTML 页面。
* **处理用户交互**：服务员要响应顾客的点单和需求，渲染进程则处理用户的点击、输入等交互。
* **实现应用程序逻辑**：服务员要协调厨房和顾客，渲染进程则通过 JavaScript 实现应用程序的逻辑。
* **与主进程通信**：服务员需要向总经理报告特殊情况或请求帮助，渲染进程则通过与主进程通信来请求系统级别的操作或访问硬件设备。

**4. 进程间通信（Inter-Process Communication, IPC）** 为了确保餐厅顺利运营，服务员需要与总经理保持良好的沟通。在 Electron 中，主进程和渲染进程之间的通信是通过 IPC 模块实现的。例如，服务员（渲染进程）可以通过以下方式向总经理（主进程）发送消息：

预加载脚本作为中间人提供对应的方法：

```
// preload.js
const { contextBridge, ipcRenderer } = require('electron');
// 暴露一个可以在渲染进程中调用的方法
const api = {
  sendMessage: (title) => ipcRenderer.send('message', title),
};
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.api = api;
}
```

渲染进程调用预加载脚本的方法发送给主进程：

```
// 渲染进程中的代码
const { ipcRenderer } = require('electron');
window.api.sendMessage('Hello from renderer process!');
```

主进程可以监听这个消息并做出响应：

```
// 主进程中的代码
const { ipcMain } = require('electron');
ipcMain.on('message', (event, message) => {
  console.log('收到来自服务员的消息:', message);
  // 为顾客提供所需的服务
});
```

**结语** 通过这个餐厅的比喻，我们现在应该对 Electron 应用程序的三个核心部分有了更加通俗易懂的理解。主进程是后台的管理者，预加载脚本确保安全性和功能扩展，而渲染进程则是前台的交互界面。在下一篇文章中，我们将探讨 Electron 中的数据缓存机制，以及如何在不同进程中管理应用程序的状态和数据。

![cover](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95414745836549ce9143753e2a30facd~tplv-k3u1fbpfcp-jj:120:90:0:0:q75.avis)

<!---->

上一篇

Electron 入门实践（1）：项目搭建与基本结构

下一篇

Electron 入门实践（3）：进程间通讯

![avatar](https://p3-passport.byteacctimg.com/img/mosaic-legacy/3797/2889309425~50x50.awebp)

<!---->
