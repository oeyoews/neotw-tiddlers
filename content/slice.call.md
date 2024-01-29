`Array.prototype.slice.call` 是一种常见的 JavaScript 代码模式，通常用于将类似数组的对象（array-like objects）转换为真正的数组。这种模式的作用是复制一个数组的一部分或全部元素到一个新的数组中。

让我解释一下各部分的含义：

1. `Array.prototype.slice`：这是数组对象的一个方法，用于从数组中创建一个新的数组，包含从起始索引到结束索引（不包括结束索引）的元素。

2. `.call`：这是 JavaScript 函数的方法，它允许你调用一个函数并指定函数内部的 `this` 值。在这种情况下，我们将 `Array.prototype.slice` 函数作为 `call` 方法的参数传递，这意味着我们将要调用 `slice` 函数，并将它的 `this` 值设置为后面的对象。

3. `Array.prototype.slice.call`：这是将 `slice` 函数与 `call` 方法一起使用的常见模式，它允许你在非数组对象上调用 `slice` 函数。因为 `slice` 是一个数组方法，如果你尝试直接在非数组对象上使用它，通常会导致错误。通过使用 `call`，你可以绕过这个问题，将非数组对象作为参数传递给 `slice` 函数。

总之，`Array.prototype.slice.call` 的作用是将非数组对象转换为数组，并复制其中的元素。在你的代码中，它被用于将 `process.argv`（一个类似数组的对象）的元素转换为数组，并且去掉前两个元素（`process.argv[0]` 和 `process.argv[1]` 通常是 Node.js 进程的路径和脚本文件的路径）。

:::tip
`slice(0, -1)` 表示从索引 0 开始，直到倒数第一个元素（不包括最后一个元素），进行切片操作。
:::