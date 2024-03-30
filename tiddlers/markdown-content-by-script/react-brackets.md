在 React 中，`{}` 被用于将表达式嵌入到 JSX 中。在 JSX 中，花括号 `{}` 表示 JavaScript 表达式。

使用 `{}`，我们可以在 JSX 中插入变量、函数调用、JavaScript 运算符和条件语句等 JavaScript 表达式。下面是一个简单的例子：

```jsx
import React from 'react';

function Greeting(props) {
  const name = props.name;
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Today is {new Date().toLocaleDateString()}.</p>
    </div>
  );
}

export default Greeting;
```

在这个例子中，我们定义了一个 `Greeting` 组件，接收一个 `name` 属性。在 `h1` 标签内，我们使用花括号将 `name` 变量插入到字符串中。在 `p` 标签中，我们使用花括号将一个表达式作为文本输出。

花括号 `{}` 是一种非常方便的方式来将动态数据插入到 JSX 中，同时也是 React 应用程序的重要组成部分。但需要注意的是，在使用花括号 `{}`时，需要确保插入的内容是安全的，并不会导致 XSS 攻击或其他安全漏洞。