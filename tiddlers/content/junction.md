`Junction` 是 Windows 操作系统中的一种特殊类型的 **符号链接**，主要用于文件夹（目录）。它类似于 **符号链接（Symbolic Link）**，但有一些关键区别。

### **Junction 的特点：**
1. **只适用于文件夹**：Junction 只能用于文件夹，而不是单个文件。这与符号链接不同，符号链接既可以用于文件也可以用于文件夹。
   
2. **无需管理员权限**：与符号链接相比，Junction 不需要管理员权限即可创建，避免了开发者模式或管理员权限的要求。

3. **透明性**：Junction 对操作系统和应用程序来说是透明的，程序访问 Junction 文件夹时，操作系统会自动将其重定向到目标文件夹。

4. **创建方法**：在 Windows 中，你可以使用命令行工具如 `mklink` 来创建 Junction。例如：
   ```bash
   mklink /J <Link> <Target>
   ```
   其中 `<Link>` 是你希望创建的软链接文件夹路径，`<Target>` 是目标文件夹路径。

5. **性能**：Junction 链接与符号链接类似，性能上没有明显差异，但由于它是 Windows 专有的，因此它在跨平台环境下不可用。

### **如何使用 fs-extra 创建 Junction？**
如果使用 `fs-extra` 来创建软链接时，指定第三个参数为 `'junction'`，就会创建一个 Junction：
```ts
await fs.ensureSymlink(targetPath, symlinkPath, 'junction');
```

这种方法在 Windows 上比标准的符号链接更具兼容性，因为它不要求管理员权限或开发者模式。

### **Junction vs Symbolic Link**
- **Junction**：仅用于文件夹、无需管理员权限。
- **Symbolic Link**：既可以是文件也可以是文件夹，需要管理员权限。

### **总结**
- 如果你只是在 Windows 上需要为文件夹创建链接并且避免管理员权限问题，可以考虑使用 Junction。
- 如果是跨平台开发，建议使用标准的符号链接，因为它可以在 Linux 和 macOS 上也工作。