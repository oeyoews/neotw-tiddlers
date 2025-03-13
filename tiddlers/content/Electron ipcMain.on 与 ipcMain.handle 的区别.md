![](https://csdnimg.cn/release/blogv2/dist/pc/img/original.png)

[嗓子疼谁心疼](https://blog.csdn.net/qq_29069649 "嗓子疼谁心疼") ![](https://csdnimg.cn/release/blogv2/dist/pc/img/newUpTime2.png) 已于 2024-03-06 09:42:48 修改

于 2024-03-06 09:42:11 首次发布

版权声明：本文为博主原创文章，遵循[ CC 4.0 BY-SA ](http://creativecommons.org/licenses/by-sa/4.0/)版权协议，转载请附上原文出处链接和本声明。

在 Electron 中的通信中，我们经常会用到 ipcRender.invoke 和 ipvRender.send

接下来简要说明下这两个方法的区别

1. **ipcMain.on(channel, listener)**

   * 这是 Electron 的主进程（main process）监听来自渲染进程（renderer process）的消息的方式。
   * 当渲染进程通过 `ipcRenderer.send` 或 `ipcRenderer.sendSync` 发送消息时，主进程可以使用 `ipcMain.on` 来监听并处理这些消息。
   * `listener` 是一个回调函数，当收到匹配 `channel` 的消息时，这个函数会被调用。
   * 这种方式是异步的，主进程不会等待渲染进程的响应。

2. **ipcMain.handle(channel, listener)**

   * `ipcMain.handle` 是 Electron 5.0.0 之后引入的新特性。
   * 它允许主进程注册一个处理函数来响应来自渲染进程的同步消息请求。
   * 当渲染进程使用 `ipcRenderer.invoke` 发送一个同步消息请求时，主进程可以使用 `ipcMain.handle` 来处理这个请求，并返回一个响应。
   * `listener` 是一个处理函数，当收到匹配 `channel` 的同步消息请求时，这个函数会被调用。
   * 与 `ipcMain.on` 不同，`ipcMain.handle` 是同步的，主进程会等待渲染进程的响应。

**总结**：

* `ipcMain.on` 主要用于处理渲染进程发送的异步消息。
* `ipcMain.handle` 主要用于处理渲染进程发送的同步消息请求，并返回响应。
