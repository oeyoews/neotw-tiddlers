你正在提到"tsc"和"ts-node"，它们是与TypeScript相关的工具。下面是它们的简要说明：

1. **tsc**：这是TypeScript编译器的命令行工具。你可以使用它来将TypeScript代码编译成JavaScript代码。例如，你可以运行以下命令来编译一个TypeScript文件：

   ```
   tsc myfile.ts
   ```

   这将生成一个名为`myfile.js`的JavaScript文件。

2. **ts-node**：这是一个Node.js运行时(TypeScript)的工具。它允许你直接运行TypeScript文件，而不需要事先编译成JavaScript。你可以使用以下命令运行TypeScript文件：

   ```
   ts-node myfile.ts
   ```

   这将在Node.js环境中执行`myfile.ts`文件，而不需要手动编译成JavaScript。

这两个工具都对TypeScript开发者非常有用，tsc用于编译项目，而ts-node用于快速运行TypeScript代码而不需要中间步骤。