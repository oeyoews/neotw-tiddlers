<!---->

<!---->

<!---->

<!---->

最近在写一个脚手架工具时，决定采用 Node.js 的 ES 模块（ESM）开发。当我习惯性地用 `__dirname` 获取当前模块的目录路径时，却直接报错了：

```
ReferenceError: __dirname is not defined in ES module scope
```

我尝试了 `__filename`，结果也是同样的错误。这就离谱了！要知道，`__dirname` 和 `__filename` 可是 Node.js 中获取当前文件和目录路径的经典工具，怎么突然说没就没了？

于是我去翻了 Node.js 的官方文档，官方文档说明如下（[nodejs.org/docs/latest…](https://link.juejin.cn/?target=https%3A%2F%2Fnodejs.org%2Fdocs%2Flatest-v18.x%2Fapi%2Fesm.html%23no-__filename-or-__dirname%25EF%25BC%2589 "https://nodejs.org/docs/latest-v18.x/api/esm.html#no-__filename-or-__dirname%EF%BC%89")

![image.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/b240b59158b14cdaa5ac00e27524403b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgZnNkd2Vu:q75.awebp?rk3s=f64ab15b\&x-expires=1736243523\&x-signature=fsJv5ZTxiXVwKiVY8mKvYg8nMRQ%3D)

在 CommonJS 模块中，`__dirname` 和 `__filename` 是默认可用的全局变量，随时可以拿来用。而到了 ES 模块里，这俩东西就消失了。取而代之的，是一个叫 `import.meta.url` 的新玩意儿。

这个 `import.meta.url` 是当前模块的 URL，格式看起来像这样：

```
file:///path/to/your/module.js
```

简单来说，ES 模块觉得你应该用这种更标准的方式获取模块路径。但问题是，这玩意儿直接用的话不太方便，得转换成普通的文件路径才行。

既然官方文档已经给了方向，那就试着把问题解决掉：

```
// 引入 Node.js 自带的模块
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 转换成 __filename 和 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 输出结果
console.log('当前文件路径:', __filename);
console.log('当前目录路径:', __dirname);
```

* **`import.meta.url`**：这是 ES 模块提供的上下文变量，代表当前模块的 URL。
* **`fileURLToPath`**：Node.js 内置的一个小工具，可以把文件的 URL 转成常见的文件路径。
* **`path.dirname`**：从文件路径中提取出所在目录的路径。

通过这段代码，你就可以在 ES 模块里重新拥有类似 `__dirname` 和 `__filename` 的功能了。

后来又查看了其他版本的，发现从 nodejs 20.11.1 版本开始可以直接使用 `import.meta.filename`和`import.meta.dirname`了，不用像上面那么麻烦了

![image.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/259d412e02024fe28fae8307f6b2d568~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgZnNkd2Vu:q75.awebp?rk3s=f64ab15b\&x-expires=1736243523\&x-signature=iUlNP07SeitaPn%2FTM%2BPYpUeECYo%3D)

<!---->
