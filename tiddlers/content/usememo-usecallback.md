`useMemo` 和 `useCallback` 都是 React 中用来优化性能的钩子函数。


`useMemo` 用于缓存计算结果，只有在依赖项变化时才重新计算。它接受一个函数和一个依赖数组作为参数，并返回计算结果。例如：

```javascript
import React, { useMemo } from 'react';

const Component = ({ a, b }) => {
  const result = useMemo(() => {
    return a + b;
  }, [a, b]);

  return <div>{result}</div>;
};
```

在这个例子中，只有当 `a` 或 `b` 改变时，才会重新计算 `result` 的值。

`useCallback` 用于缓存回调函数，只有在依赖项变化时才重新创建函数。它接受一个回调函数和一个依赖数组作为参数，并返回缓存的回调函数。例如：

```javascript
import React, { useCallback } from 'react';

const Component = ({ onClick }) => {
  const handleClick = useCallback(() => {
    console.log('Button clicked!');
  }, []);

  return <button onClick={handleClick}>Click me</button>;
};
```

在这个例子中，`handleClick` 函数只会在组件挂载时创建一次，并在整个组件生命周期内被重复使用，因为它的依赖项为空数组。

总的来说，`useMemo` 适用于优化计算密集型的操作，而 `useCallback` 则适用于优化回调函数的创建。