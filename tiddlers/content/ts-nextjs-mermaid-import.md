The CommonJS module require always treats the files it references as CommonJS.
CommonJS 模块 require 始终将其引用的文件视为 CommonJS。

Using require to load an ES module is not supported because ES modules have asynchronous execution. Instead, use import() to load an ES module from a CommonJS module.
不支持使用 require 加载ES模块，因为ES模块是异步执行的。相反，使用 import() 从 CommonJS 模块加载 ES 模块。

> ts 中的import 不是和require 等价吗？ 但为什么可以直接使用 mermaid, 自动转换了 ？？ `await import('xxx')` 还是借助 es 加载了 