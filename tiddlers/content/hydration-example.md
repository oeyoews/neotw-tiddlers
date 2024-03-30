```tsx
'use client';

import { useEffect } from 'react';

export const Random = () => {
  const num = Math.random();
  useEffect(() => console.log(num), [num]);
  return <div>{num}</div>;
};
```

当这个 Random 组件放在 server 组件上时，就会出现 Hydration 错误，因为 client 组件，也会在 server, 执行一遍，然后再 client 执行一遍，解决办法就是使用 pure components. 或者使用 useeffect.

```tsx
'use client';

import { useEffect } from 'react';

export const Random = ({ num }: { num: number }) => {
  useEffect(() => console.log(num), [num]);
  return <div>{num}</div>;
};
```

数据使用 props 传递，直接在 server 渲染时指定固定的随机值。