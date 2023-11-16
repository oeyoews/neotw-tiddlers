```tsx
'use client';

import { useEffect } from 'react';

export const Random = () => {
  const num = Math.random();
  useEffect(() => console.log(num), [num]);
  return <div>{num}</div>;
};
```

当这个Random 组件放在server 组件上时, 就会出现Hydration 错误, 因为client 组件, 也会在server, 执行一遍, 然后再client 执行一遍, 解决办法就是使用pure components. 或者使用useeffect.

```tsx
'use client';

import { useEffect } from 'react';

export const Random = ({ num }: { num: number }) => {
  useEffect(() => console.log(num), [num]);
  return <div>{num}</div>;
};
```

数据使用props传递, 直接在server渲染时指定固定的随机值.