你正在提到"tsc"和"ts-node"，它们是与 TypeScript 相关的工具。下面是它们的简要说明：

1. **tsc**：这是 TypeScript 编译器的命令行工具。你可以使用它来将 TypeScript 代码编译成 JavaScript 代码。例如，你可以运行以下命令来编译一个 TypeScript 文件：

   ```plain
   tsc myfile.ts
   ```

   这将生成一个名为`myfile.js`的 JavaScript 文件。

2. **ts-node**：这是一个 Node.js 运行时 (TypeScript) 的工具。它允许你直接运行 TypeScript 文件，而不需要事先编译成 JavaScript。你可以使用以下命令运行 TypeScript 文件：

   ```plain
   ts-node myfile.ts
   ```

   这将在 Node.js 环境中执行`myfile.ts`文件，而不需要手动编译成 JavaScript。

这两个工具都对 TypeScript 开发者非常有用，tsc 用于编译项目，而 ts-node 用于快速运行 TypeScript 代码而不需要中间步骤。