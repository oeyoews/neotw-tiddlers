```
React 不允许组件访问其他组件的 DOM 节点, 当你将 ref 放在像 <input /> 这样输出浏览器元素的内置组件上时，React 会将该 ref 的 current 属性设置为相应的 DOM 节点（例如浏览器中实际的 <input /> ）。

但是，如果你尝试将 ref 放在 你自己的 组件上，例如 <MyInput />，默认情况下你会得到 null。这个示例演示了这种情况。请注意单击按钮 并不会 聚焦输入框, 需要给组件添加第二个参数ref, 使用forwardRef for parent component
```

https://zh-hans.react.dev/learn/manipulating-the-dom-with-refs#accessing-another-components-dom-nodes