React 组件有两种创建方式：函数组件和类组件。

1. 函数组件

函数组件也被称为无状态组件，它是一种简单的组件定义方式，由一个 JavaScript 函数来描述组件。通常情况下，一个函数组件只接收 props 作为输入，并返回一个 React 元素来渲染 UI。下面是一个简单的函数组件的例子：

```jsx
import React from 'react';

function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

export default Welcome;
```

2. 类组件

类组件又被称为有状态组件。它使用 ES6 的 class 关键字来描述组件。类组件具有更多的功能和特性，比如能够使用生命周期方法、状态等。下面是一个简单的类组件的例子：

```jsx
import React from 'react';

class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

export default Welcome;
```

通过这两个例子可以看出，用函数组件来实现一个简单的 React 组件非常简单明了，而类组件则提供了更多高级的功能。选择哪种方式取决于你的需求，如果你只需要一个简单的 UI 节点，那么使用函数组件就足够了；但如果你需要更复杂的逻辑和状态管理，那么类组件会更加适合。