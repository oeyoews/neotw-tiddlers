在 `ecosystem.config.js` 中，您可以使用 PM2 来管理和运行多个应用程序或进程。您可以在配置文件中定义多个应用程序，并使用 `pm2 start` 命令来启动它们。以下是一个示例 `ecosystem.config.js` 文件，其中定义了多个应用程序：

```javascript
module.exports = {
  apps: [
    {
      name: "app1",
      script: "./app1.js",
      args: "--option1=value1",
      // 其他配置选项
    },
    {
      name: "app2",
      script: "./app2.js",
      args: "--option2=value2",
      // 其他配置选项
    },
    // 可以继续定义更多应用程序...
  ],
};
```

在上述示例中，我们定义了两个应用程序，分别为 "app1" 和 "app2"。每个应用程序都有自己的配置，包括脚本文件、命令行参数等。

要同时运行这些应用程序，您可以使用以下命令：

```bash
pm2 start ecosystem.config.js
```

这将启动配置文件中定义的所有应用程序。PM2 会为每个应用程序创建一个独立的进程，并以它们的名称命名。您可以使用 `pm2 list` 命令来查看正在运行的应用程序列表：

```bash
pm2 list
```

如果您需要停止或管理这些应用程序，可以使用 `pm2 stop`、`pm2 restart`、`pm2 delete` 等命令。

请确保已经全局安装了 PM2，或者将其添加到项目的开发依赖中：

```bash
npm install -g pm2
```

使用 PM2 可以方便地管理多个应用程序，并提供监控、自动重启等功能。