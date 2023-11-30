#### 语法

`const id = useId();`

#### 简介

useId是新增的用于生成**唯一ID值**的hook钩子，主要用于**客户端和服务器端**使用，同时避免 dehydrate 过程中数据不匹配的问题。

在服务端，我们会将 React 组件渲染成为一个字符串，这个过程叫做**脱水**「dehydrate」。字符串以 html 的形式传送给客户端，作为首屏直出的内容。到了客户端之后，React 还需要对该组件重新激活，用于参与新的渲染更新等过程中，这个过程叫做**注水**「hydrate」。

![image.png](https://segmentfault.com/img/bVc1aVB "image.png")

它主要用于与需要唯一 ID 的可访问性 API 集成的组件库。这解决了 React 17 及更低版本中已经存在的问题，但在 React 18 中更为重要，因为新的流式服务器渲染器如何无序交付 HTML。

但是，不建议用于List中作为key使用，列表中的唯一key应该使用List中的数据。

#### 问题

React渲染有客户端渲染（CSR）和服务端渲染（SSR）。

假设有如下代码片段：

```
const id = Math.random();

export default function App() {
  return <div id={id}>Hello</div>
}
```

如果应用是CSR（客户端渲染），id是稳定的，App组件没有问题。

但如果应用是SSR（服务端渲染），那么App.tsx会分为以下几步：

1. React在服务端渲染，生成随机id（假设为0.1234），这一步叫dehydrate（脱水）；
2. \<div id="0.12345">Hello\</div>作为HTML传递给客户端，作为首屏内容；
3. React在客户端渲染，生成随机id（假设为0.6789），这一步叫hydrate（注水）。

**客户端、服务端生成的id不匹配！**

**原始解决方式：**

```
let globalIdIndex = 0;


export default function App() {
  const id = useState(() => globalIdIndex++);
  return <div id={id}>Hello</div>
}
```

只要React在服务端、客户端的运行流程一致，那么双端产生的id就是对应的。

但是，随着React Fizz（React新的服务端流式渲染器）的到来，渲染顺序不再一定。

比如，有个特性叫 Selective Hydration，可以根据用户交互改变hydrate的顺序。

当下图左侧部分在hydrate时，用户点击了右下角部分：\
![image.png](https://segmentfault.com/img/bVc08Cf "image.png")\
此时React会优先对右下角部分hydrate：\
![image.png](https://segmentfault.com/img/bVc08Cn "image.png")

**因此，自增的全局计数变量作为id，不再准确！！**

那么，有没有什么是服务端、客户端都稳定的标记呢？

答案是：**组件的层次结构。**

#### useId的原理

假设应用的组件树如下图：\
![image.png](https://segmentfault.com/img/bVc08CI "image.png")\
不管B和C谁先hydrate，他们的层级结构是不变的，所以「层级」本身就能作为服务端、客户端之间不变的标识。

比如B可以使用2-1作为id，C使用2-2作为id：

```
function B() {
  // id为"2-1"
  const id = useId();
  return <div id={id}>B</div>;
}
```

如何在一个组件中使用多个useId()?

react推荐使用相同的id+后缀：

```
function NameFields() {
  const id = useId();
  return (
    <div>
      <label htmlFor={id + '-firstName'}>First Name</label>
      <div>
        <input id={id + '-firstName'} type="text" />
      </div>
      <label htmlFor={id + '-lastName'}>Last Name</label>
      <div>
        <input id={id + '-lastName'} type="text" />
      </div>
    </div>
  );
}
```
