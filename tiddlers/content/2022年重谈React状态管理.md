## 1. 什么是 "状态"？ 

jQuery 时代，JS 代码中混杂 DOM 结构，各个流程庞杂交织时，就形成面条式代码，当使用发布订阅模型时，调试会一团乱麻。

jQuery 是针对 "过程" 的命令式编程，而那么多命令，最终都是为了更新 UI 中的 "数据"，为什么不直接去改数据呢？

北京 → 上海，把 `city="北京"` 变为 `city="上海"` 就行。不管飞机火车步行抛锚，也不管路上会不会遇到王宝强，

现代前端框架的意义，就是问题解决思路的革新，把对 "过程" 的各种命令，变为了对 "状态" 的描述。

什么是状态？状态就是 UI 中的动态数据。

2013 年 5 月 React 诞生。但 2015 年之前，大概都是 jQuery 的天下。2015 年 3 月 React 0.13.0 发布，带来了 class 组件写法。

在 React class 组件时代，状态就是 `this.state`，使用 `this.setState` 更新。

为避免一团乱麻，React 引入了 "组件" 和 "单向数据流" 的理念。有了状态与组件，自然就有了状态在组件间的传递，一般称为 "通信"。

父子通信较简单，而深层级、远距离组件的通信，则依赖于 "状态提升" + props 层层传递。

于是，React 引入了 Context，一个用于解决组件 "跨级" 通信的官方方案。

但 Context 其实相当于 "状态提升"，并没有额外的性能优化，且写起来比较啰嗦。

为优化性能，一般会添加多个 Context，写起来就更啰嗦。在项目没那么复杂时，还不如层层传递简单。

## 3. 什么是 "状态管理"？

实用主义来说，"状态管理" 就是为了解决组件间的 "跨级" 通信。

当然，在使用状态管理库时，其会带来一些衍生的思维模式，比如如何组织 state，如何拆分公共逻辑、业务逻辑、组件逻辑等，但归根结底，这些都不是核心缘由。

核心就是为了解决实际问题 —— 为了通信。其它的各种概念与哲学，都不是必要的。

Context 没那么好用，React 官方也没什么最佳实践，于是一个个社区库就诞生了。

## 4. class 时代的状态管理

React class 组件时代，就是 Redux（及其相关衍生库）与 MobX 的故事。

Redux 是符合 React 理念的实现。而 MobX 这种 "监听" 的模式，特点是 "不够 React"，但用起来简单。

Redux 的利弊已讨论太多，简单来说，开发者关心的是 "使用"，而 Redux 关心的是 "哲学"。

之前开玩笑说，其实 Redux 用一行代码就可以表示，却写出了论文规格昏昏欲睡的文档：

```
createStore = (reducer, state) => ({ dispatch: (action) => (state = reducer(state, action)) });
```

而几乎所有 React 状态管理器的原理，其实都很简单，一个 "观察者模式" 的实现：

在各个组件中订阅 listener，state 更新时，再把 listener 都调用一遍，从而触发组件更新。

## 5. 为什么是 Hooks？

React class 组件存在以下问题：

1. `this.state` 是一个对象，每次更新局部，更新时也可新加 state 进去，这就让 state 整体比较混沌。
2. 使用高阶组件等模式时，会造成 `this.props` 中的数据来源不透明，同样混沌。
3. 因为 `this` 魔法指针的存在，很容易挂一大堆东西上去，互相随意调用，就会让逻辑缠绕。

为了解决以上问题，React 引入了 Hooks：

1. 将混沌的 state 打散为一个个元数据。
2. 提供逻辑共享，以替代高阶组件。
3. 组件中不再存在 `this`。

这是一种开发理念与组织理念的革新，Hooks 带有强烈的 3 个特点：primitive、decentralization、algebraic effects。

1. primitive。元数据化，从最底层构建，让数据结构更清晰。同时也是一种工程趋势，比如 Tailwind CSS 便是将 CSS 元数据化。
2. decentralization。去中心化，class 时代普遍是一种 "顶层下发" 的理念，但 Hooks 带来强烈的 "组件自治" 的理念（比如 Provider 不再必须，组件请求自行处理）。同时，在其他领域，去中心化也是一个大的流行概念。
3. algebraic effects。代数效应，归根结底，Hooks 可以理解为一根管道，直通 React 核心能力，将内部机器暴露给了开发者。

## 6. Hooks 时代的状态管理

Hooks 出现之后，社区还没有一个像 Redux 一样曾经一统江湖的状态管理器。

Redux 添加了一些 useSelector、useDispatch、useStore 之类的能力，而 Facebook 自己也开源了 Recoil 这样的库。

但 Redux 终究老气沉沉，且早期给人留下的阴影太大，很多人的思维被格式化，随便一写就是云里雾里，只为实现一个简单功能，

而 Recoil 的写法则看起来有些别扭、有些啰嗦，发展也不温不火。

```
// Recoil
atom({ key: 'textState', default: '' });
useRecoilState(textState);
```

而在 Hooks 时代，一个神秘组织异军突起，一口气贡献了 3 个状态管理库。

它就是 pmndrs，pmndrs for Poimandres。[pmnd.rs](https://link.zhihu.com/?target=https%3A//pmnd.rs/)

说是 "组织"，其实主要开发者应该是一个人，就是这位大师，Daishi Kato。[github.com/dai-shi](https://link.zhihu.com/?target=https%3A//github.com/dai-shi)

这三个库分别是 zustand、jotai、valtio。有趣的是，这三个词其实都是 "状态" 的意思。

zustand 德语 "状态"，jotai 日语 "状态"、valtio 芬兰语 "状态"。

简单看一下用法：

```
// zustand - Redux 理念，旧时代精神，中心化逻辑
const useStore = create((set) => ({
  bears: 0,
  removeBears: () => set({ bears: 0 }),
}));
const bears = useStore((state) => state.bears);


// jotai - primitive 理念，用法略啰嗦，但符合 Hooks 精神
const countAtom = atom(0);
const [count, setCount] = useAtom(countAtom);


// valtio - proxy 理念，"不太 React"，但用起来简单
const state = proxy({ count: 0, text: 'hello' });
const snap = useSnapshot(state);
```

## 7. 贪婪更新 vs 惰性更新？

如之前提及 MobX 时所说，使用 proxy "监听" 的方案，虽然不够 React，但确实用起来简单，且最符合直觉。

本质上来说，React 是一种 "贪婪更新" 的策略，全量 re-render 然后 diff。

而 proxy 是一种 "惰性更新" 的策略，可以精准知道是哪个变量更新。所以利用 proxy，可以做一些 re-render 的性能优化。

而 React conf 上介绍的 React Forget，代表 React 自身也并不排斥在 "惰性更新" 的思路上做一些优化。

注意上面的 "贪婪更新" 和 "惰性更新" 是我自创的词，参考了正则中的贪婪和惰性概念。

## 8. React 状态管理思路的变迁

1. 所有 state 在一个大对象里 → 分割为元数据
2. 数据不透明 → 数据透明
3. 顶层请求，下发数据 → 组件自身处理请求
4. 状态提升 → 组件自治
5. Provider & Container components → just Hooks
6. 混沌集合 → 透明解耦
7. 贪婪更新 → 惰性更新
8. 大而全、强概念、DX ❌ → 更清晰、更简单、DX ✅
9. 少一些概念，多一些直觉
10. 少一些规则，多一些自动化

总的来说，这虽是状态管理思路的变迁，但更是 React 社区开发思路的变迁，一种对最佳实践的不断探索：

1. 中心化 → 去中心化
2. 数据集合 → 元数据
3. Build a structure, completely from the ground up

## 9. 隆重介绍 resso，可能是最简单的 React 状态管理器

我一直在思索怎样的一个 React 状态管理器用起来最简单，不断去探索一个自己用起来最舒服的工具。

之前曾经开发过 Retalk（Redux 最佳实践）、flooks（Hooks 状态管理），但随着新思路的出现，现在将最新的一些灵感集中在了 resso 这个状态管理库里。

下面是 resso 的使用方式：

```
import resso from 'resso';

const store = resso({ count: 0, text: 'hello' });

function App() {
  const { count } = store;
  return (
    <>
      {count}
      <button onClick={() => store.count++}>+</button>
    </>
  );
}
```

GitHub 地址：[github.com/nanxiaobei/resso](https://link.zhihu.com/?target=https%3A//github.com/nanxiaobei/resso)

注意它与很简单的 valtio 相比，写法也更简单一些，应该没法更简单了，如果有，请告诉我。

更重要的是，resso 会自动优化 re-render，绝不因为数据在同一个对象里，就触发额外的 re-render。

其实状态管理本是个很简单的东西，但 Redux 等工具追加了太多的复杂上去。人们用一个工具的原始目的，就是解决问题，如何而已。

所以，简单，清晰，让工具回归工具。我们了解一个锤子的方式，就是拿起来用。

希望 resso 会让有此需要的人喜欢。

## 10. Invest the future

但是这一切，又有什么用呢？

在新东西不断涌来时，人们不免会发出疑问：class 组件又不是不能用，Redux 又不是不能用，或者更彻底一些，jQuery 又不是不能用，为什么一定要去追逐这些新的东西呢？

一个抽象的解释：我们应该不断投资未来。

这不只是在开发中，在工作中，更是在任何领域 —— “在新赛道中以不断细分的形式，用第一的身份换取资源。”

旧世界的轨道上挤满了辛苦的赶路者，虽然新大陆海市蜃楼，但只有新大陆才会跃升一切。

***

以上内容来源于《React State Management in 2022》分享。

PDF 下载：

Keynote 下载（更多动画效果～）：
