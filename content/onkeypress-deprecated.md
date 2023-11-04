这是因为 onKeyPress 事件只会在用户敲击可打印字符（例如字母、数字和标点符号）时触发。如果用户按下 "Enter" 键，它不会被认为是可打印字符，因此默认行为将执行并插入回车符。

相反，onKeyDown 事件在用户按下任何键时都会触发，包括 "Enter" 键。因此，如果您希望在用户按下键盘上的 "Enter" 键时触发某些事件，最好使用 onKeyDown 事件来处理它。

`onKeyPress` 已被废弃，不建议使用。在React中，推荐使用 `onKeyDown` 处理键盘事件。

在 `onKeyDown` 事件处理函数中，您可以通过检查 `event.key` 属性来获得用户按下的键盘键。与 `onKeyPress` 不同，即使用户按下非打印字符（如 "Shift"、"Ctrl"、"Alt" 和 "Enter"），`onKeyDown` 也会触发。

以下是在 React 中使用 `onKeyDown` 进行事件处理的示例代码：

```
function handleKeyDown(event) {
  if (event.ctrlKey && event.key === "Enter") {
    // 在这里处理回车按键事件
  }
}

return (
  <textarea onKeyDown={handleKeyDown} />
);
```

在这个示例中，我们定义了一个名为 `handleKeyDown` 的函数，并将其作为 `onKeyDown` 赋值给文本区域。当用户按下 "Ctrl" 和 "Enter" 键时，该函数将被调用，从而允许在函数中处理回车按键事件。