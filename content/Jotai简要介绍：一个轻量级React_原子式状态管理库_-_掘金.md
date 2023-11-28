## 前言

随着前端应用承载的功能越来越复杂，状态管理一直是前端社区讨论的热门，从Flux，Redux，MobX到Hooks推出以来的unstated-next和Recoli，这些实现方式迥异的状态管理库实质上都是为了满足相似的需求：状态共享和逻辑的组织提取。\
​

根据状态`store`存放方式的不同可以将状态管理方案分为两类：

* 依赖于React `State`和`Context` API，状态存放在React tree中，因此只能在React中使用：Recoil
* 与UI层无关，状态存放在外部的store中：Redux，Mobx

或者根据实现理念的不同分为以下三类:

* Flux: 中心化`store`，通过action写入：Redux, Zustand
* Proxy: 双向绑定的响应式：Mobx, Valtio
* Atomic: 状态以原子式存在于React tree，和React的state类似：以Recoil, Jotai

​

本文要介绍的就是受到Recoil启发，但更轻量、更灵活的原子式状态管理库Jotai (狀態)。作者Daishi Kato是React社区中的著名开发者，产出了多个优秀状态管理库，包括上述提到的三类方案中的Zustand，Valtio和Jotai 相比“前辈”都更简单轻量。\
​\
[](https://link.juejin.cn/?target=)

## 原子式解决了什么问题？

React Hooks的提出使得state的拆分和逻辑共享变得更容易，但`useState + useContext`对于多个store仍需要维护多个Context Provider。因为当context值改变，所有消费该context的组件都会重新渲染，即使是组件仅用到了context的一部分，容易导致不必要的无用渲染，造成性能损失。（比如react-redux v6完全基于Context API而导致性能大幅下降，v7又回退到之前的内部订阅方案，详见这个[issue](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Freduxjs%2Freact-redux%2Fissues%2F1177%23issue-406051556 "https://github.com/reduxjs/react-redux/issues/1177#issue-406051556")）context更适合放类似主题这种变化不大的全局数据，而并不适合存放频繁更新的复杂状态集合。\
​\
[](https://link.juejin.cn/?target=)

#### 一个简单例子：

* 定义两个Counter子组件A和B，分别消费同一个Context中的a值和b值
* Counter组件包含了显示渲染时的时间（`Date.now()`），如果组件重新渲染，显示的时间就会改变。

```
import React, { useState, useContext, createContext } from "react";

const context = createContext(null);

const CounterA = () => {
  const [value, setValue] = useContext(context);
  return (
    <div>
      <div>
        A: {value.a};<span> Time: {Date.now()}</span>
      </div>
      <button onClick={() => setValue((prev) => ({ ...prev, a: prev.a + 1 }))}>
        A+1
      </button>
    </div>
  );
};

const CounterB = () => {
  const [value, setValue] = useContext(context);
  return (
    <div>
      <div>
        B: {value.b};<span> Time: {Date.now()}</span>
      </div>
      <button onClick={() => setValue((prev) => ({ ...prev, b: prev.b + 1 }))}>
        B+1
      </button>
    </div>
  );
};

const TimeC = () => {
  return <div>TimeC: {Date.now()}</div>;
};

const initValue = {
  a: 0,
  b: 1
};

const Provider = ({ children }) => {
  const [value, setValue] = useState(initValue);
  return (
    <context.Provider value={[value, setValue]}>{children}</context.Provider>
  );
};

export default function App() {
  return (
    <Provider>
      <div className="App">
        <CounterA />
        <CounterB />
        <TimeC />
      </div>
    </Provider>
  );
}
```

![Kapture 2021-09-21 at 16.42.08.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f19dcf014ccd46c1a107f64fa96d2831~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)\
可以看到，只要一个Counter改变了Context，另一个消费该Context的Counter也同样进行了重新渲染，作为对照的TimeC组件则没有重新渲染。[](https://link.juejin.cn/?target=)

### 原子式

以往Context API和Redux这类中心化状态管理方案中，所有状态都是一个对象自顶向下构建而成的。但在[Recoil](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ffacebookexperimental%2FRecoil "https://github.com/facebookexperimental/Recoil")，复杂状态集合拆分成一个个最小粒度的`atom`，每个`atom`可以理解为Redux Store中的一部分，不过是渐进式（可以按需创建）和分布式（可以在任何地方创建）的。\
`atom`通过hooks和selector纯函数来组合、创建、更新。只有使用到该`atom`的组件才会在`atom`更新时触发re-render。因此在原子式中，无需定义模版代码和大幅改动组件设计，直接沿用类似于`useState`的API就能实现高性能的状态共享和代码分割。

## 更轻量、更灵活的Jotai

虽然Recoil宣称的高性能原子式状态管理非常诱人，但不能忽视的是Reocil本身设计相当复杂，为了适用于更复杂的大型场景，Recoil拥有高达数十个APIs，上手成本不低。而且为了规避Context API的问题，Reocil使用了`useRef` API来存放状态并在内部管理状态订阅和更新，严格意义上状态也并不算在React Tree中，同样面临着外部状态的Concurrent Mode兼容性问题。\
但Context API这种能在React Tree中很方便地共享状态并且天然兼容未来Concurrent Mode的方案还是很香的，在意识到性能问题后React社区也提出`[useContextSelecotr](https://github.com/reactjs/rfcs/pull/119)`提案和社区实现方案`[use-context-selector](https://github.com/dai-shi/use-context-selector)` (作者同样也是Daishi Kato)，通过一个额外的selector来局部订阅Context的数据。

> `use-context-selector` 早期是在`creatContext`中回传 `changedBits=0` 这个没有出现在API文档的特性来阻断Provider触发组件更新。

那么有没有一种方案是兼顾原子式和Concurrent Mode呢，下面我们来介绍下更轻量，更灵活，为解决Context API而生的Jotai：

* 既然主打的是轻量级原子式状态管理，Jotai打包体积远小于Recoil（Gziped后2.8KB vs 20.4KB）。并且核心API仅有3个：`atom`，`Provider`和`useAtom`（扩展能力由`jotai/utils`和`jotai/devtools`提供）
* Jotai中的`atom`不需要Recoil中的string key，而是用的Object Reference。使用上更直观方便，但也损失了debug上直接利用string key的便利。
* 在Provider-Less mode推出之前，Jotai的`atom`存放在React Context中，利用`use-context-selector`来避免重复渲染问题。

![jotai.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9dcb5886c1f4059b09afdffca925a35~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)([github.com/pmndrs/jota…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fpmndrs%2Fjotai "https://github.com/pmndrs/jotai"))\
最简例子：

```
import { atom, useAtom } from 'jotai'



// 原始Atom
const countAtom = atom(0) 
// 派生Atom
const doubleCountAtom = atom((get) => get(countAtom) * 2) 
// 仅有更新函数的Atom
const increaseTenAtom = atom(null, (get, set, _arg) => set(countAtom, get(countAtom) + 10))

const Counter = () => {
  const [count, setCount] = useAtom(countAtom)
  return (
    <h1>
      {count}
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </h1>
  )
}
const DoubleText = () => {
  const [doubleCount] = useAtom(doubleCountAtom)
  const [increase] = useAtom(increaseTenAtom)
  return (
    <h1>
      {doubleCount}
    	<button onClick={increase}>+10</button>
    </h1>
  )
}

const App = () => {
 return (
 		<>
   		<DoubleText />
   		<Counter />
   	</>
 ) 
}
```

在Jotai中，只需要通过单个`atom` API的第一个参数来创建原始状态和派生状态，区别是后者参数是传入一个函数来对其他`atom`进行派生，第二个参数则用于生成指定更新函数的`atom` (writable derived atom和write only atom)。

下面从一个最常见的CURD场景展示下Jotai在更复杂实际场景的实践（参考[7GUIs](https://link.juejin.cn/?target=https%3A%2F%2Feugenkiss.github.io%2F7guis%2Ftasks "https://eugenkiss.github.io/7guis/tasks")中的场景）：

* 三个受控输入框，别名，内容和过滤。
* 一个列表显示添加的项目。
* 三个操作按钮，创建，删除，更新。

```
// atom.js
import { atom } from "jotai";

// 三个输入框的atom
export const aliasAtom = atom("");
export const textAtom = atom("");
export const filterAtom = atom("");

// 全部列表atom，每个atom都是包含alias和text的对象
const itemListAtom = atom([]);

// 当前选中atom，包含alias和text的对象
const currentSelectAtom = atom(null);

// 派生atom，获取过滤后的列表
export const filteredByAliasListAtom = atom((get) => {
  const filter = get(filterAtom);
  const list = get(itemListAtom);

  return filter
    ? list.filter((itemAtom) => get(itemAtom).alias.includes(filter))
    : list;
});

// 派生atom，获取/设定当前选中的列表项atom
export const selectItemAtom = atom(
  (get) => get(currentSelectAtom),
  (get, set, itemAtom) => {
    set(currentSelectAtom, itemAtom);
    if (itemAtom) {
      const { alias, text } = get(itemAtom);
      set(aliasAtom, alias);
      set(textAtom, text);
    }
  }
);

// 仅更新atom，创建列表的新项
export const createItemAtom = atom(null, (get, set) => {
  const alias = get(aliasAtom);
  const text = get(textAtom);

  if (alias && text) {
    const itemAtom = atom({ alias, text });
    set(itemListAtom, (prev) => [...prev, itemAtom]);
    set(aliasAtom, "");
    set(textAtom, "");
  }
});

// 仅更新atom，更新列表中选中的单项atom
export const updateItemAtom = atom(null, (get, set) => {
  const alias = get(aliasAtom);
  const text = get(textAtom);
  const current = get(selectItemAtom);
  if (alias && text && current) {
    set(current, { alias, text });
  }
});

// 仅更新atom，删除列表中选中的单项atom
export const deleteItemAtom = atom(null, (get, set) => {
  const current = get(selectItemAtom);
  if (current) {
    set(itemListAtom, (prev) => prev.filter((item) => item !== current));
  }
});
```

可以看到，Jotai比较推崇的是把状态相关的逻辑都写在单独的`atom`里，和React中的自定义Hooks的做法类似。

```
// App.js (部分内容)
const Item = ({ itemAtom }) => {
  const [value] = useAtom(itemAtom);
  const [selected, setSelected] = useAtom(selectItemAtom);
 
  const { alias, text } = value;
  const isSelected = selected === itemAtom;

  const onSelect = () => {
    setSelected(itemAtom);
  };

  return (
    <div
      onClick={onSelect}
      style={{ backgroundColor: isSelected ? "grey" : "#fff" }}
    >
      <span>{alias}</span>
      <span> - </span>
      <span>{text}</span>
    </div>
  );
};

const ItemList = () => {
  const [list] = useAtom(filteredByAliasListAtom);

  return (
    <div>
      List
      <ul>
        {list.map((item, i) => (
          <li key={i}>
            <Item itemAtom={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};
```

[CodeSanbox](https://link.juejin.cn/?target=https%3A%2F%2Fcodesandbox.io%2Fs%2Felastic-tu-sm2tt "https://codesandbox.io/s/elastic-tu-sm2tt")\
实际用起来和原来写Hooks区别和改动都不大，还是比较容易上手的。[](https://link.juejin.cn/?target=)

## 第三方集成

虽然Jotai的状态存放在React tree中，所以官方同时也提供了第三方库的集成插件用于和React Redux之类的外部状态交互，比如`jotai/query`，`jotai/valtio`和`jotai/redux`。而`jotai/immer`则集成了immer作为状态更新的方法。

* `jotai/redux` 例子:

```
import { useAtom } from 'jotai'
import { atomWithStore } from 'jotai/redux'
import { createStore } from 'redux'

const initialState = { count: 0 }
const reducer = (state = initialState, action: { type: 'INC' }) => {
  if (action.type === 'INC') {
    return { ...state, count: state.count + 1 }
  }
  return state
}
const store = createStore(reducer)
// 对Redux Store进行双向绑定，既可以从Redux更新状态，也可以从Jotai这边更新
const storeAtom = atomWithStore(store)

const Counter = () => {
  const [state, dispatch] = useAtom(storeAtom)

  return (
    <>
      count: {state.count}
      <button onClick={() => dispatch({ type: 'INC' })}>button</button>
    </>
  )
}
```

* `jotai/immer` 例子:

```
import { useAtom, atom } from 'jotai'
import { atomWithImmer } from 'jotai/immer'

// 注册一个以immer为更新状态方法的immer atom
const demoAtom = atomWithImmer({a: 0, b: 0})

const Display = () => {
  const [demo] = useAtom(demoAtom)
  return <div>a: {demo.a} and b: {demo.b}</div>
}

const Updater = () => {
	const [, setDemo] = useAtom(demoAtom)
	const onUpdate = () => setDemo((demo) => {
  	demo.a += 1
    demo.b += 2
  })
	return <button onClick={onUpdate}>Update!</button>
}
```

除了基本的immer atom，该插件还有个实用的hook `useImmerAtom` 来以immer的方式来更新已有的atom。[](https://link.juejin.cn/?target=)

## 调试工具

根据开发文档，Jotai官方提供了两种Debug方式:

1. 用Redux DevTools去查看特定`atom`的状态，只需要将`atom`和label传进`jotai/devtools`中的`useAtomDevtools` Hooks。
2. 用React Dev Tools去查看Jotai的Provider，全部`atom`的状态都存放在`DebugState`中，但需要额外设定`atom`的debugLabel作为key，否则会显示为`<no debugLabel>`。

```
// 1. Redux DevTools
import { useAtomDevtools } from 'jotai/devtools'
useAtomDevtools(cuntAtom, 'label')

// 2. React Dev Tools
countAtom.debugLabel = 'label'
```

总体而言，Jotai以及Recoil的调试都要额外的配置和API，开发体验上还有进步的空间。[](https://link.juejin.cn/?target=)

## Concurrent Mode支持

前面多次提到外部状态方案在React的Concurrent Mode（并发模式）中会存在兼容性问题就是指的tearing （撕裂），即在同一次渲染中状态不一致。因为在Concurrent Mode中，同一次render过程不像是过去那样是阻塞性的，而是可以被中断和恢复的。\
在同一层级下，如果一个child组件在render时读取了一个外部状态，而一个新的事件中断render并更新了这个状态，那么后续的child组件开始render时读取到的就是不一样的状态。关于tearing的更多细节可以看React 18的这个[讨论](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Freactwg%2Freact-18%2Fdiscussions%2F69 "https://github.com/reactwg/react-18/discussions/69")。\
在React 18发布计划公布以后，React官方发了一篇[公告](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Freactwg%2Freact-18%2Fdiscussions%2F70 "https://github.com/reactwg/react-18/discussions/70")来说明Concurrent Mode对第三方库的影响和修改建议。其中提到三个避免tearing的方式和阶段：

1. Level 1: 检测到外部状态不一致就让React进行re-render（`use-subscription`）。该方法还是可能会有短暂的UI不一致（首次render），而且下一次的re-render会是同步的从而享受不到Concurrent Mode带来的性能和体验提升。
2. Level 2: render时检测到外部状态不一致就让中断该render并进行re-render（`useMutableSource` [提案](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Freactjs%2Frfcs%2Fblob%2Fmain%2Ftext%2F0147-use-mutable-source.md "https://github.com/reactjs/rfcs/blob/main/text/0147-use-mutable-source.md")）。该方法好处是完全不会像Level 1那样出现tearing现象，但因为中断并重新调度了re-render，性能还是不如纯Concurrent Mode。
3. Level 3: 使用React内置的状态（`state`和`context`），或者外部状态在状态突变时有一个immutable的数据引用snapshots（还处于实验性质）。该方法始终render一致的UI，不会出现tearing，同时享受到Concurrent Mode的全部特性。

因为`useMutableSource`仍处于提案状态，还没有正式推出，所以大部分用到外部状态的状态管理库都或多或少有tearing。Jotai[目前是处于第一阶段](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fdai-shi%2Fwill-this-react-global-state-work-in-concurrent-rendering%2Fissues%2F45 "https://github.com/dai-shi/will-this-react-global-state-work-in-concurrent-rendering/issues/45")，但其实已经用到了部分`useMutableSource`的特性，所以作者也表示只要React正式推出该API，Jotai就能到达第二阶段。等第三阶段的那个实验性方法通过后，理论上在Jotai的API中加入immutable限制也能够完美兼容Concurrent Mode。[](https://link.juejin.cn/?target=)

## 总结

虽然Jotai很简单，也已经具备一个React全局状态管理应有的特性，在一些特定场景也有相当不错的表现。但因为面世时间还不长，社区上关于Jotai的最佳实践还在探索中（作者甚至开发了[jotai-jsx](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fdai-shi%2Fjotai-jsx "https://github.com/dai-shi/jotai-jsx")，基于Jotai同时不需要依赖React来渲染UI）。毕竟原子式也并不是一个能解决所有需求的银弹，能不能用于需要长期维护的大型项目还待考验。
