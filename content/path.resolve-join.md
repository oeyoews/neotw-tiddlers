`path.join` 是 Node.js 中的一个函数，用于将多个路径片段连接在一起，然后返回一个新的路径字符串。不同于 `path.resolve`，它不会返回绝对路径，而是返回连接后的相对路径。

例如，如果你有以下代码：

```javascript
const path = require('path');

const joinedPath = path.join('/usr', 'local', 'bin');
console.log(joinedPath);
```

这将输出：

```
/usr/local/bin
```

与 `path.resolve` 不同，`path.join` 不会解析绝对路径，而只是简单地将所有传入的路径片段连接在一起，无论它们是否是绝对路径。这在构建路径时非常有用，特别是在不同操作系统上工作时，因为它会自动处理路径分隔符的差异（例如，在Windows上使用反斜杠 `\`，在Unix/Linux上使用正斜杠 `/`）。