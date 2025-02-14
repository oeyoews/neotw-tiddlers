## 前言

React 的状态管理是一个缤纷繁杂的大世界，光我知道的就不下数十种，其中有最出名 immutable 阵营的`redux`，有 mutable 阵营的`mobx`，`react-easy-state`，在 hooks 诞生后还有极简主义的`unstated-next`，有蚂蚁金服的大佬出品的`hox`、`hoox`。

其实社区诞生这么多种状态管理框架，也说明状态管理库之间都有一些让人不满足的地方。

## rxv 状态管理库

`rxv`是我依据这些痛点，并且直接引入了 Vue3 的 package: `@vue/reactivity`去做的一个 React 状态管理框架，下面先看一个简单的示例：

```
// store.ts
import { reactive, computed, effect } from '@vue/reactivity';

export const state = reactive({
  count: 0,
});

const plusOne = computed(() => state.count + 1);

effect(() => {
  console.log('plusOne changed: ', plusOne);
});

const add = () => (state.count += 1);

export const mutations = {
  // mutation
  add,
};

export const store = {
  state,
  computed: {
    plusOne,
  },
};

export type Store = typeof store;
```

```
// Index.tsx
import { Provider, useStore } from 'rxv'
import { mutations, store, Store } from './store.ts'
function Count() {
  const countState = useStore((store: Store) => {
    const { state, computed } = store;
    const { count } = state;
    const { plusOne } = computed;

    return {
      count,
      plusOne,
    };
  });

  return (
    <Card hoverable style={{ marginBottom: 24 }}>
      <h1>计数器</h1>
      <div className="chunk">
        <div className="chunk">store中的count现在是 {countState.count}</div>
        <div className="chunk">computed值中的plusOne现在是 {countState.plusOne.value}</div>
         <Button onClick={mutations.add}>add</Button>
      </div>
    </Card>
  );
}

export default () => {
  return (
    <Provider value={store}>
       <Count />
    </Provider>
  );
};
```

可以看出，`store`的定义只用到了`@vue/reactivity`，而`rxv`只是在组件中做了一层桥接，连通了 Vue3 和 React，正如它名字的含义：React x Vue。

## 一些痛点

根据我自己的看法，我先简单的总结一下现有的状态管理库中或多或少存在的一些不足之处：

1. 以`redux`为代表的，语法比较冗余，样板文件比较多。
2. `mobx`很好，但是也需要单独的学一套 api，对于 react 组件的侵入性较强，装饰器语法不稳定。
3. `unstated-next`是一个极简的框架，对于 React Hook 做了一层较浅的封装。
4. `react-easy-state`引入了`observe-util`，这个库对于响应式的处理很接近 Vue3，我想要的了。

下面展开来讲：

### options-based 的痛点

Vuex 和 dva 的`options-based`的模式现在看来弊端多多。具体的可以看尤大在[vue-composition-api 文档](https://link.juejin.cn/?target=https%3A%2F%2Fvue-composition-api-rfc.netlify.com%2F%23logical-concerns-vs-option-types "https://vue-composition-api-rfc.netlify.com/#logical-concerns-vs-option-types")中总结的。

简单来说就是一个组件有好几个功能点，但是这几个功能点在分散在`data`,`methods`,`computed`中，形成了一个杂乱无章的结构。

当你想维护一个功能，你不得不先完整的看完这个配置对象的全貌。

心惊胆战的去掉几行，改掉几行，说不定会遗留一些没用的代码，也或者隐藏在 computed 选项里的某个相关的函数悄悄的坑了你...

而 hook 带来的好处是更加灵活的代码组织方式。

### redux

直接引入 dan 自己的吐槽吧，要学的概念太多，写一个简单的功能要在五个文件之间跳来跳去，好头疼。redux 的弊端在社区被讨论也不是一天两天了，相信写过 redux 的你也是深有同感。

![redux](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/26/16fe015af0db87d6~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

### unstated-next

unstated-next 其实很不错了，源码就 40 来行。最大程度的利用了 React Hook 的能力，写一个 model 就是写一个自定义 hook。但是极简也带来了一些问题：

1. 模块之间没有相互访问的能力。
2. Context 的性能问题，让你需要关注模块的划分。（具体可以看我这篇文章的[性能章节](https://juejin.cn/post/6844904046260666381#heading-3 "https://juejin.cn/post/6844904046260666381#heading-3")）
3. 模块划分的问题，如果全放在一个 Provider，那么更新的粒度太大，所有用了 useContext 的组件都会重复渲染。如果放在多个 Provider 里，那么就会回到第一条痛点，这些模块之间是相互独立的，没法互相访问。
4. hook 带来的一些心智负担的问题。[React Hooks 你真的用对了吗？](https://link.juejin.cn/?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F85969406 "https://zhuanlan.zhihu.com/p/85969406")

### react-easy-state

这个库引入的`observe-util`其实和 Vue3 reactivity 部分的核心实现很相似，关于原理解析也可以看我之前写的两篇文章：\
[带你彻底搞懂 Vue3 的 Proxy 响应式原理！TypeScript 从零实现基于 Proxy 的响应式库。](https://juejin.cn/post/6844904050014552072 "https://juejin.cn/post/6844904050014552072")\
[带你彻底搞懂 Vue3 的 Proxy 响应式原理！基于函数劫持实现 Map 和 Set 的响应式。](https://juejin.cn/post/6844904050912133133 "https://juejin.cn/post/6844904050912133133")

那其实转而一想，Vue3 reactivity 其实是`observe-util`的强化版，它拥有了更多的定制能力，如果我们能把这部分直接接入到状态管理库中，岂不是完全拥有了 Vue3 的响应式能力。

## 原理分析

`vue-next`是 Vue3 的源码仓库，Vue3 采用 lerna 做 package 的划分，而响应式能力`@vue/reactivity`被划分到了单独的一个 package 中

从这个包提供的几个核心 api 来分析：

### effect

effect 其实是响应式库中一个通用的概念：`观察函数`，就像 Vue2 中的`Watcher`，mobx 中的`autorun`，`observer`一样，它的作用是`收集依赖`。

它接受的是一个函数，这个函数内部对于响应式数据的访问都可以收集依赖，那么在响应式数据更新后，就会触发响应的更新事件。

### reactive

响应式数据的核心 api，这个 api 返回的是一个`proxy`，对上面所有属性的访问都会被劫持，从而在 get 的时候收集依赖（也就是正在运行的`effect`），在 set 的时候触发更新。

### ref

对于简单数据类型比如`number`，我们不可能像这样去做：

```
let data = reactive(2)
// 😭oops
data = 5
```

这是不符合响应式的拦截规则的，没有办法能拦截到`data`本身的改变，只能拦截到`data`身上的属性的改变，所以有了 ref。

```
const data = ref(2)
// 💕ok
data.value= 5
```

### computed

计算属性，依赖值更新以后，它的值也会随之自动更新。其实 computed 内部也是一个 effect。

拥有在 computed 中观察另一个 computed 数据、effect 观察 computed 改变之类的高级特性。

## 实现

从这几个核心 api 来看，只要 effect 能接入到 React 系统中，那么其他的 api 都没什么问题，因为它们只是去收集 effect 的依赖，去通知 effect 触发更新。

effect 接受的是一个函数，而且 effect 还支持通过传入`schedule`参数来自定义依赖更新的时候需要触发什么函数，

而`rxv`的核心 api: `useStore`接受的也是一个函数`selector`，它会让用户自己选择在组件中需要访问的数据。

那么思路就显而易见了：

1. 把`selector`包装在 effect 中执行，去收集依赖。
2. 指定依赖发生更新时，需要调用的函数是`当前正在使用useStore`的这个组件的`forceUpdate`强制渲染函数。

这样不就实现了数据变化，组件自动更新吗？

简单的看一下核心实现

```
export const useStore = <T, S>(selector: Selector<T, S>): S => {
  const forceUpdate = useForceUpdate();
  const store = useStoreContext();

  const effection = useEffection(() => selector(store), {
    scheduler: forceUpdate,
    lazy: true,
  });

  const value = effection();
  return value;
};
```

1. 先通过 useForceUpdate 在当前组件中注册一个强制更新的函数。
2. 通过 useContext 读取用户从 Provider 中传入的 store。
3. 再通过 Vue 的 effect 去帮我们执行 selector (store)，并且指定 scheduler 为 forceUpdate，这样就完成了依赖收集。

就简单的几行代码，就实现了在 React 中使用`@vue/reactivity`中的所有能力。

## 优点：

1. 直接引入 @vue/reacivity，完全使用 Vue3 的 reactivity 能力，拥有 computed, effect 等各种能力，并且对于 Set 和 Map 也提供了响应式的能力。后续也会随着这个库的更新变得更加完善的和强大。
2. vue-next 仓库内部完整的测试用例。
3. 完善的 TypeScript 类型支持。
4. 完全复用 @vue/reacivity 实现超强的全局状态管理能力。
5. 状态管理中组件级别的精确更新。
6. Vue3 总是要学的嘛，提前学习防止失业！

## 缺点：

1. 由于需要精确的收集依赖全靠`useStore`，所以`selector`函数一定要精确的访问到你关心的数据。甚至如果你需要触发数组内部某个值的更新，那你在 useStore 中就不能只返回这个数组本身。

举一个例子：

```
function Logger() {
  const logs = useStore((store: Store) => {
    return store.state.logs.map((log, idx) => (
      <p className="log" key={idx}>
        {log}
      </p>
    ));
  });

  return (
    <Card hoverable>
      <h1>控制台</h1>
      <div className="logs">{logs}</div>
    </Card>
  );
}
```

这段代码直接在`useStore`中返回了整段 jsx，是因为`map`的过程中回去访问数组的每一项来收集依赖，只有这样才能达到响应式的目的。

## 源码地址

[github.com/sl1673495/r…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fsl1673495%2Freact-composition-api "https://github.com/sl1673495/react-composition-api")

如果你喜欢这个库，欢迎给出你的 star✨，你的支持就是我最大的动力～
