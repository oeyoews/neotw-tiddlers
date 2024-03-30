在 React 中，一个事件处理函数（handler）是一个由程序员编写的函数，用于响应 React 组件中发生的事件，例如按钮点击、输入框变化等。

当用户与组件进行交互时，React 会调用相应事件的处理函数，让应用程序可以根据用户的操作来更新组件状态、页面布局等。

在 React 应用程序中，事件处理函数通常被作为组件的方法定义，然后在组件中通过绑定事件监听器的方式来关联到相应的 DOM 元素。例如，在 React 中定义一个处理按钮点击事件的函数如下：

```jsx
class MyComponent extends React.Component {
  handleClick() {
    // 处理点击事件的代码
  }

  render() {
    return (
      <button onClick={this.handleClick}>点击我</button>
    );
  }
}
```

在这个例子中，`handleClick` 方法定义了处理按钮点击事件的代码，然后在 `render` 方法中通过 `onClick` 属性将它绑定到按钮上。

当用户点击按钮时，React 将自动调用 `handleClick` 方法，使应用程序能够响应相应的事件并执行相应的操作。

总之，在 React 中，事件处理函数是一种由程序员编写的函数，用于响应组件中发生的事件，并通过绑定事件监听器的方式将它们关联到相应的 DOM 元素上。