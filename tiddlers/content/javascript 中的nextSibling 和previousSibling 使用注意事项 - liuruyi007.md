:::error whitespace
空格的问题需要注意
:::

JavaScript 中的**nextSibling**和**previousSibling**和作用类似于 jquery 的**next**() 和**prev**()，都是获取下一个 / 上一个同胞元素，如果下一个同级节点不存在，则此属性返回值是 null。但是具体的使用中还是有差异的，如果注意。就会引起错误

html 结构中的各种空格，换行符都可能会把文本节点当做同胞元素处理。这就会导致错误。