虽然 defaultProps 是 React 中一种设置默认 props 值的方式，但是在 React 官方文档中并不推荐使用它。使用 defaultProps 可能会导致代码难以理解和维护，因为您必须跳到组件定义的另一个位置才能了解它的默认值。

相反，React 官方文档建议使用 ES6 中的解构赋值来指定默认值，这样更直接、明确。以下是一个带有默认值的示例：

```jsx
import React from 'react';

function Button({ color = 'blue', label = 'Submit' }) {
  return (
    <button style={{ backgroundColor: color }}>
      {label}
    </button>
  );
}
```

export default Button;
在这个例子中，我们将 Button 组件的 props 对象进行了解构，并为 color 和 label 这两个属性定义了默认值。这样，当父组件调用 Button 组件时未提供相应属性值时会使用默认值。这种方法使得默认值更直接、明确，也更容易阅读和维护。

总而言之，虽然 defaultProps 是一种设置默认 props 值的方式，但是并不是最佳实践，因为在某些情况下，它可能会使组件更难以理解和维护。React 建议使用 ES6 的解构赋值来指定默认值。