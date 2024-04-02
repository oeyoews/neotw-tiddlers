## 前置说明

已发布：

* [Vue 快速转 React 指南 (一）](https://juejin.cn/post/7164421039793897508 "https://juejin.cn/post/7164421039793897508")
* [Vue 快速转 React 指南 (二）](https://juejin.cn/post/7165433317213339655 "https://juejin.cn/post/7165433317213339655")

### 本篇要点

* React 的 Hooks

## 开始

熟悉 Vue 的话，组件的用途和概念大家都知道，这里主要讲 react 的组件和 Vue 的不同。 不知道组件的概念的建议去[Vue 官方文档复习一下](https://link.juejin.cn/?target=https%3A%2F%2Fcn.vuejs.org%2Fguide%2Fessentials%2Fcomponent-basics.html "https://cn.vuejs.org/guide/essentials/component-basics.html")。

### React Hooks

* Vue 组件：单文件组件（SFC）
* react 组件：函数式组件

在[Vue 官方文档 - SFC](https://link.juejin.cn/?target=https%3A%2F%2Fcn.vuejs.org%2Fguide%2Fscaling-up%2Fsfc.html "https://cn.vuejs.org/guide/scaling-up/sfc.html")这一节专门对「单文件组件」进行了很长篇幅的介绍，简单来说就是`.vue`文件，将 JS 代码、template 和 CSS 混合在一起。那么，template 组件需要的数据就可以从当前的 script 里去取。

```
<script setup>
import { ref } from "vue";

defineProps({
  msg: {
    type: String,
    required: true
  }
});
const count = ref(0); // 定义count初始值
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h2>{{ count }}</h2>
  </div>
</template>
```

对于 react 来说，react 的组件就是一个 JS 函数，它返回你声明的 UI 代码：

```
function App (props) {
    return <h1> Hello, {props.name} </h1>
}
export default App
```

函数式组件的编写规范要求是一个**纯净的函数（纯函数 pure fucntion）**，除了纯净的输入输出**没有函数副作用（side effect）**。

> 副作用函数：指的是函数的运行会对**其他地方的变量产生影响的函数**。 比如你的函数修改了全局变量、修改了另一个函数也能修改的变量等行为，都称为副作用函数。

```
function effect(){
    document.body.innerText = 'effect';
}
```

上面的`effect`就是一个副作用函数，因为它会修改到全局都可以获取和修改的变量。

所以，对于 react 的函数式组件来说，要符合纯函数的标准，输入是`props`，函数体内只做数据处理，输出是`return`出去的 HTML 实现的 UI 代码。

但是很多时候，我们都需要在组件内进行一些副作用操作，比如：存储数据、改变应用全局状态等等。这个时候就需要 React 的`Hooks`来解决。

Hook 的中文意思为钩子🪝，叫这个名字的寓意是：**如果需要外部功能和副作用，就用钩子把外部需要的东西 "钩" 进来**。

### 常用的 Hook

在 react 里，hook 的规范是用`use`开头，后面跟上你对这个 hook 作用的描述。

下面讲几个常用的 hook 来加深记忆

* useState
* useEffect
* useMemo
* useContext

#### useState 状态钩子

`useState`是 react 里最常见的一个 hook，用于为函数组件引入状态（state）。纯函数不能有状态，所以把状态放在钩子里面。

```
import { useState } from 'react';

function ButtonText() {
  const [text, setText] = useState('hello World');

  const clickButton = () => setText('click Button');

  return (
    <button onClick={clickButton}>{text}</button>
  );
};

export default ButtonText;
```

在别的组件里可以直接使用：

```
import ButtonText from './feature/ButtonText'
function App() {
    return <ButtonText />
}
```

在 Vue 里我们这样实现：

```
<script setup>
import { ref } from 'vue';

const text = ref('hello world');
const clickButton = () => {
  text.value = 'click Button';
};
</script>

<template>
  <button @click="clickButton">{{text}}</button>
</template>
```

看到 Vue 的实现，有的朋友肯定心里就会想了，为什么 Vue 可以直接修改状态值，而 react 就必须用`useState`导出的方法函数？

把 react 里的代码改成 vue 那种方式之后，会发现点击了之后，点击事件是执行了，但是**界面的 text 没有发生改变**：

```
import { useState } from 'react';

function ButtonText() {
  const [text, setText] = useState('hello World');

  const clickButton = () => {
    console.log('click生效');
    text = 'click Button'; // 直接修改
  };

  return (
    <button onClick={clickButton}>{text}</button>
  );
};

export default ButtonText;
```

这里涉及到原理问题，这篇不打算深入讲。简单来说就是**React 没有 Vue 框架里的响应式系统 (reactive)**，所以你没有用`setText`去修改`text`，react 底层会认为这个`text`并没有改变，数据没有改变自然也不会去更新视图。

Vue 里申明一个响应式变量需要使用`ref`包裹，那么只要`ref`里的数据改变，Vue 框架底层利用`proxy`原理是可以追踪到的，这样就可以做到框架底层在数据变化时重新渲染视图，不需要框架使用者去决定当前组件需不需要更新，所以框架使用者只需要修改数据就好，降低了很多的心智负担。

这里我们可以看出，react 并不 reactive，Vue 也不是只关注 view，怀疑这俩框架是不是名字取反了....

那还是我前面那句老话，react 没有实现 reative 的部分，就需要框架使用者去实现。这个会在后面的文章细讲。

#### useEffect：副作用钩子

`useEffect`的作用就是为了执行一些副作用相关的逻辑。比如：异步请求数据等。

使用说明：`useEffect(effect: React.EffectCallback, deps?: React.DependencyList | undefined): void`

会接收两个参数，第一个是一个必传的副作用的 callback 函数，第二个是可选值，是一个依赖列表。

```
import { useEffect, useState } from 'react';

function Test() {
  const [text, setText] = useState('hello World');
  const clickButton = () => setText('click Button');

  useEffect(() => {
    if (text === 'hello World') {
      // 执行拉取数据
    }
  }, [text]);

  return (
    <button onClick={clickButton}>{text}</button>
  );
};

export default Test;
```

`useEffect`会在第一次组件 DOM 挂载的时候执行一次，之后每一次执行是看传入的依赖列表里的变量，只要里面的变量数据变化就会重新执行一次。

如果不传入依赖的话，`useEffect`只会在第一次 DOM 挂载时执行，之后组件再重新渲染也不会执行。 因为不传入依赖项代表当前的副作用函数**不依赖任何变量**，所以那些变量无论怎么变，副效应函数的执行结果都不会改变，所以运行一次就够了。

```
// 返回值
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    subscription.unsubscribe();
  };
}, [props.source]);
```

`useEffect()`允许返回一个函数，在组件卸载时，执行该函数，清理副效应。如果不需要清理副效应，`useEffect()`就不用返回任何值。

#### useMemo：存储钩子

Memo 是 memory（记忆）的简写，`useMemo`的作用是在再次渲染前存储这一次的渲染结果，为了减少同一个结果渲染很多次带来的性能开销。

```
import { useMemo } from 'react';  

function TodoList({ todos, tab, theme }) {

  // const visibleTodos = filterTodos(todos, tab);
  const memoVisibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);  
  // 在JSX里使用 memoVisibleTodos
  // ...
}
```

`filterTodos`函数的作用就是从传入的`todos`里筛选出需要的结果。`useMemo`缓存了最终筛选出的结果。

useMemo 需要传入两个参数:

* 一个没有参数的计算函数，就像上面的`() =>`，函数返回的是函数计算的结果。
* 一个依赖项列表，包含函数在计算中使用的每个值。👆🏻使用到了`todos`和`tab`，所以传入了`[todos, tab]`。

**useMemo vs. computed**

Vue 里的`computed`计算属性和`useMemo`的作用很像，但是`computed`并不需要你输入依赖项，因为底层的响应式系统可以自动分辩出哪些变量是依赖项，然后依赖项变化才会返回新的值。

```
// vue2
export default {
  computed: {
    visibleTodos() {
      return filterTodos(this.todos, this.tab)
    }
  }
}

// vue3
import { computed } from '@vue/reactivity';

// ...
setup(props) {
 const visibleTodos = computed(() => filterTodos(props.todos, props.tab));
}
```

看到这里，是不是觉得除了依赖项`computed`和`useMemo`是一样的呢？

其实因为底层实现的不同，`useMemo`比起`computed`坑很多，主要是**依赖项是对象和数组**的情况下。下面细说一下：

```
function Dropdown({ allItems, text }) {  
  const searchOptions = { matchMode: 'whole-word', text };  
  
  const visibleItems = useMemo(() => {  
    return searchItems(allItems, searchOptions);  
}, [allItems, searchOptions]);

// ...
```

上面的`useMemo`是不生效的，因为每一次 render 的时候，无论`text`值和缓存的是否一样，`searchOptions`对象在 react 里都被认为是**不一样的**。

react 里判断依赖项里的变量是否和缓存的一样，是通过[Object.is()](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FObject%2Fis "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is")这个方法，这个方法就是一个浅层的比较，**类似**于对变量进行`===`这种比较。在 JS 里，对象和数组不属于基本数据类型，属于引用类型，所以`{}`与`{}`、`[]`与`[]`并不相等。

回到上面的代码，对于`Object.is({ matchMode: 'whole-word', text },{ matchMode: 'whole-word', text })`，哪怕`text`的值是一样的返回的结果也是`false`。

因此，上面的`useMemo`在组件每次重新渲染的时候都会重新计算，因为依赖项里的`searchOptions`每次都会被判定为不相等。

下面是正确的写法：

需要对对象再套一层`useMemo`

```
function Dropdown({ allItems, text }) {  
  const searchOptions = useMemo(() => {  
    return { matchMode: 'whole-word', text };  
  }, [text]); // ✅ 只在text改变的时候改变

  const visibleItems = useMemo(() => {  
    return searchItems(allItems, searchOptions);  
  }, [allItems, searchOptions]);
// ...
```

在 Vue 里判断一个变量是否改变是通过响应式系统里的`setter`，并且可以做到对象和数组递归都加上响应式，就不会出现`{} !== {}`的现象，这样的话对于 Vue 来说对象`{ matchMode: 'whole-word', text }`，只要`text`是一样的，那么表示这个变量是没有改变的，框架底层就不会重新渲染。这一切都是框架底层所做的，对于使用者来说就是关注变量在业务里的作用就行了，不需要关心这些底层原理。

所以这又是**响应式系统**带来的心智负担。

#### useContext：依赖注入钩子

`useContext`是用来解决**依赖注入**(prop drilling) 的问题，[Vue 的依赖注入](https://link.juejin.cn/?target=https%3A%2F%2Fcn.vuejs.org%2Fguide%2Fcomponents%2Fprovide-inject.html%23prop-drilling "https://cn.vuejs.org/guide/components/provide-inject.html#prop-drilling")的方法是`provide`和`inject`。

首先，什么是依赖注入？其实就是为了解决数据父传子中间有太深的层级，如果没有更高效的方法的话，就只能组件一级一级的向下传递。

很多时候，中间的组件其实并不需要这个数据，只是扮演了一个帮忙传递的角色（这也叫**透传**）。这样子，后期组件会越来越臃肿。所以为了解决这个问题，才有了**依赖注入**的概念。这里的依赖就是指的某个父级的数据，子组件需要它就注入它，整个过程的全称就是将父组的依赖注入到需要的子组件。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4bf23621111b4769ba80d4f5c795f5f5~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

先看 Vue 的解法：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd6cb2bc4e0f427c8ada6a2d72f27a68~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

父组件使用`Provide`函数将依赖注入，子组件使用`Inject`函数接收注入。

```
<!-- 在供给方组件内 -->
<script setup> 
  import { provide, ref } from 'vue' 
  
  const location = ref('North Pole')
  function updateLocation() { 
    location.value = 'South Pole' 
  }
  provide('location'/**注入名**/, { location, updateLocation }/**注入的值**/) 
</script>

<!-- 在注入方组件 -->
<script setup>
import { inject } from 'vue'

const { location, updateLocation } = inject('location')
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>
```

上面的实例有一个小细节需要注意：注入方如果需要**修改**注入的值，**最好尽可能将任何对响应式状态的变更都保持在供给方组件中**。所以`updateLocation`函数是定义在供给方并传递给了注入方。

这样做是因为实际项目中可能会很多地方都会用到同一个注入值，将变更统一定义在供给组件可以确保所提供状态的声明和变更操作都内聚在同一个组件内，使其更容易维护。

接下来看 react 的依赖注入：

1\. 首先你需要使用`createContext`创建一个可以共享的变量，用来传递我们需要传递的依赖：

```
export const Location = createContext(null);
```

2\. 然后在供给方组件使用`<Location.Provider></Location.Provider>`将被注入组件包裹，这样可以将依赖值传递过去：

```
import React, { createContext, useState } from 'react';
import { Section } from './features/section/Section';

export const Location = createContext('');
function App() {
  const [location, setLocation] = useState('North Pole');

  function updateLocation() {
    setLocation('South Pole');
  }
  
  return (
    <Location.Provider value={ { location, updateLocation } }>
      <Section></Section>
    </Location.Provider>
  );
}

export default App;
```

`value`里我们也像 Vue 一样把想要传递的依赖值`{ location, updateLocation }`传递进去。

3\. 被注入方组件需要把之前定义的`Location`引进，使用`useContext`拿到共享的值：

```
import React, { useContext } from 'react';
import { Location } from '../../App';

export const Section = () => {
  const { location, updateLocation } = useContext(Location);
  
  return (
    <section>
      <button onClick={updateLocation}>{location}</button>
    </section>
  );
};
```

这样就完成了依赖注入。但是，此时你会发现虽然 UI 层面是可以实现的，但是控制台是有报错或者警告的。

因为 react 里是需要优化`value`这里的对象传入的，不然会引发一些问题，所以我们必须要将传入的`{ location, updateLocation }`优化一下。

**优化的点：**

首先是使用`useCallback`将之前的`updateLocation`进行优化，这样只要值改变了就会使得函数更新；然后是将要传递的值使用`useMemo`缓存一下，最后再通过`value`共享：

```
import React, { createContext, useCallback, useMemo, useState } from 'react';
import './App.css';
import { Section } from './features/section/Section';

export const Location = createContext('');
function App() {
  const [location, setLocation] = useState('North Pole');

  const updateLocation = useCallback(() => {
    setLocation('South Pole');
  }, []);

  const contextValue = useMemo(() => ({
    location,
    updateLocation,
  }), [updateLocation, location]);

  return (
    <Location.Provider value={contextValue}>
      <Section></Section>
    </Location.Provider>
  );
}

export default App;
```

其实上面两点优化可以类比为给数据添加**响应式**。所以 Vue 里直接用就行了，react 还需要改造。

## 最后

回顾本篇文章要点：

1. 讲了 react hooks 的概念和用法
2. 讲了几个常用 hook:useState/useEffect/useMemo/useContext

[React 的官方文档](https://link.juejin.cn/?target=https%3A%2F%2Fbeta.reactjs.org%2Flearn "https://beta.reactjs.org/learn")里没有对函数组件有太多的介绍和解释，所以这里推荐[阮一峰的 react-hooks 教程](https://link.juejin.cn/?target=https%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2019%2F09%2Freact-hooks.html "https://www.ruanyifeng.com/blog/2019/09/react-hooks.html")。

预告：下一篇利用前面所学的知识点做一个井字游戏的 demo
