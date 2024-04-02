> 自己文章中虽然有几篇涉及到 vue 相关的知识，不过那都是学生时代总结的。可笑的是工作以来，自己一直是处在 react 技术栈。但是近来由于工作需要，不得不复习一下 vue 了。虽然说都是工具而已，但是毕竟一直在写 react，走出舒适区去接受一个不太熟悉的事物总的来说还是不太好受的。结下来我就结合 vue 与 react 的 diff，复习一下 vue 的重点知识。

## 从两者的入口函数和 app 组件开始

**react**

```
import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  return <div>app组件</div>;
};

ReactDOM.render(<App />, document.getElementById("root"));
```

**vue**

```
import Vue from "vue";
import App from "./App.vue";


new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

app 组件（.vue 文件类型）

```
<template>
  <div id="app">app组件</div>
</template>

<script>
export default {
  name: "App",
};
</script>
```

熟悉对比一下，大家可以看出多少区别呢？

* 【区别 1】react 组件全部采用 jsx 模式进行编写，vue 组件大部分采用模版方式进行编写

  说的再细一点就是

  * react 组件中，`<app/>`这个尖角号里面不是一个函数就是一个类（把 app 看成一个变量）。因为在 react 的组件中有两种类型，或 class 或 function 。故这里通过 import 导入的也就是这两种数据结构
  * vue 组件，`<app/>`这个尖角号里面是一个对象。因为组件中我们通常导出的就是一个选项对象，不过呢。传到外面的选项对象是会比起我们自己导出的多一些东西。打印一下看看【多了一些钩子、渲染函数和其他的属性们】![截屏 2021-11-13 上午 9.32.04.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ddd466c01c94031b55350ba0c81cbc2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

* 【区别 2】react 组件本质就是 function （class 类型的就是该 class 的实例），而 vue 组件的本质是一个 vue 实例

  说的再细一点，说白了其实一个组件的预期产物就是 vnode。

  **对于 react 而言：**

  首先要知道 jsx 在打包过程中就会被 babel 处理为`createElement`函数的调用（react v17 之前），而`createElement`函数的产物就是 react element 也就是 vnode，所以可以这样理解 react 中 jsx 就等同于 vnode。

  同时 react 中的两大组件类型都是很方便获取到 jsx 的。

  1. function 类型，这个 function 其本身返回值的就是一个 jsx
  2. class 类型，通过该 class 进行实例化的实例对象其 render 方法的返回值也同样是一个 jsx

  **function 类型**

  ```
  const App = () => {
    return <div>app组件</div>;
  };
  ```

  **class 类型**

  ```
  class App extends React.Component {
    render() {
      return <div>app</div>;
    }
  }
  ```

  看一下 react 的 vnode

  ```
  import React from "react";
  import ReactDOM from "react-dom";

  const Test01 = () => {
    return <div>test01</div>;
  };

  const Test02 = () => {
    return <div>test02</div>;
  };

  const App = () => {
    return (
      <>
        <Test01 />
        <Test02 />
      </>
    );
  };

  console.log(App());
  ReactDOM.render(<App />, document.getElementById("root"));
  ```

![截屏 2021-11-13 上午 10.39.53.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7740ddd49a004af78c5d25f1e1ffbf7b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

**但是对于 vue 中是怎么个样子呢？**

首先通过阅读文档，其解释说：每个 vue 组件本质是都是 vue 实例。我们先去验证一下，打印一下根实例，看看其数据结构是怎样的。

```
import Vue from "vue";
import App from "./App.vue";

console.log(
  new Vue({
    render: (h) => h(App),
  }).$mount("#app")
);
```

**输出**

![截屏 2021-11-13 上午 11.00.05.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/046fa606c8a14ddfb14d922c0ab33384~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

可见其子组件确实是 vue 实例（准确来说是`VueComponent`实例）

那我就有一些疑问了？

1. vue 中的子组件是怎么变成的 vue 实例？
2. vue 实例是怎么产出 vnode 的？

怎么变成的 vue 实例，我想应该和 react 的思想有些类似。react 想要拿到 vnode，如果是函数式组件，它会去执行 function（class 组件则会先进行实例化再调用实例的 render 方法）vue 应该也是在某一个时间节点内，通过传进去的子组件选项对象进行了组件的 vue 实例化。

至于它怎么产生的 vnode 呢，首先再看一下上面输出的子组件实例。它是有一个 vnode 属性。怎么整出来的呢？

首先要清楚一件事情，在`.vue`组件中模版最终是会编译成一个渲染函数的。这个渲染函数会被注入到`script`导出的选项对象中（可以看下上面我打印的 vue 导出的组件选项对象）

**来看一下官方文档提供的一个简单的渲染函数:**

```
render: function (createElement) {
  return createElement('h1', this.blogTitle)
}
```

看到这个`createElement`想必就有些熟悉了，这不和 jsx 有些相似吗。也就是说 vue 中也是有一个`createElement`函数，react 提供的`createElement`它的产物是一个 vnode，来看一下 vue 中呢？

**文档介绍：**

![截屏 2021-11-13 下午 3.54.27.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3bd495c4a8d94b05972a1d77612a427f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

答案来了：vue 中的`createElement`函数的产物也是 vnode，那么到这里就没有什么疑问了。大致的流程和 react 还是比较相似的

下面再来看一下日常开发中的不同点吧

## 开发核心 — 组件通信

组件通信其实是日常开发中最基础最重要的的部分，vue 中相比较于 react 的通信方式又存在哪些不同呢。

### 首先是父子通信

对于父子之间的通信，两者是没有什么区别的。都是 props 的形式向下层组件传递数据

**react**

1. 如果是函数式组件，则会在获取子组件 vnode 时把父组件属性以函数参数形式传递给子组件。故可以直接在子组件的 props 中获取
2. 如果是类组件，则会在获取子组件 vnode 时，把父组件属性以构造函数参数类型传递给子组件，这样数据就被放入了子组件实例的 props 属性中，故可直接通过`该组件实例.props`获取

```
const Test01 = (props) => {
  return <div>{props.name}</div>;
};

const App = () => {
  return (
    <>
      <Test01 name="zs" />
    </>
  );
};
```

**vue**（这里我就 jsx 和模版语法混用一下了，暂时仅写使用层面【汗颜💧】）

```
// 父组件
<template>
  <div id="app">
    app组件
    <Test01 :name="name" />
  </div>
</template>

<script>
import Test01 from "./components/Test01";
export default {
  name: "App",
  data: function () {
    return {
      name: "zs",
    };
  },
  components: {
    Test01,
  },
};
</script>
```

子组件

```
/* eslint-disable no-unused-vars */
export default {
  name: "test01",
  props: {
    name: {
      type: String,
    },
  },
  render: function (h) {
    return <div>test01 组件{this.name}</div>;
  },
};
```

### 其次是子父通信

`子父通信这里react和vue的方式是不同的`

子父通信的一般场景是：子组件想要修改父组件传给他的状态，但是呢因为要保证数据流的清晰，react 和 vue 的数据流思想都是单向的。也就是说子组件是不能在它内部进行 props 数据修改的

那么怎么办呢？

其实也很简单主要就是`谁的状态谁就要权限去管理`

* 对于 react：就是在将一个状态传递给子组件的同时还需要将改变这个状态的方法也传递下去，也就是说将这个状态的实际控制权交给子组件

* 对于 vue：发布订阅，采用一个自定义事件的思路。子组件触发一个自定义事件，父组件进行监听并且执行状态修改逻辑

#### **code demo**

**react**

```
// 子组件
const Test01 = ({ name, updataName }) => {
  return (
    <>
      <div>
        {name}
        <button
          onClick={() => {
            updataName("子组件");
          }}
        >
          修改name
        </button>
      </div>
    </>
  );
};

// 父组件
const App = () => {
  const [name, updataName] = useState("父组件初始状态");
  return (
    <>
      <Test01 name={name} updataName={updataName} />
    </>
  );
};
```

**vue**

子组件

```
/* eslint-disable no-unused-vars */
export default {
  name: "test01",
  props: {
    name: {
      type: String,
    },
  },
  render: function (h) {
    return (
      <div>
        test01 组件{this.name}
        <button onClick={() => this.$emit("updataData", "子组件控制的")}>
          修改父组件状态
        </button>
      </div>
    );
  },
};
```

父组件

```
<template>
  <div id="app">
    app组件
    <Test01 :name="name" @updataData="updataName" />
  </div>
</template>

<script>
import Test01 from "./components/Test01";
export default {
  name: "App",
  data: function () {
    return {
      name: "zs",
    };
  },
  methods: {
    updataName: function (value) {
      this.name = value;
    },
  },
  components: {
    Test01,
  },
};
</script>
```

### 跨层级通信

针对于跨层级通信

react 给出的方案是使用上下文`Context`。那么呢，思想就是创建并维护一个上下文，该上下文中的所有组件都可以访问到当前上下文的数据。可借作用域进行理解，子作用域无论嵌套多深都是可以凭借着作用域链找到其最顶层声明的变量

![截屏 2021-11-14 下午 5.29.11.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/acdc93a6c639417b935dcaee8227f2fc~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

vue 的选项对象中也提供了具有类似功能的选项属性`provide and inject`

#### vuex vs redux

这两个东西的思想也是一样的，都是基于发布订阅

##### redux

redux 其本身比较简单，但是在实际项目中还是需要借助一下它的周边的。比如`react-redux,redux-saga`等

看一下 redux 的基本原理，图解

![截屏 2021-11-14 下午 9.27.30.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c9a284d6a2746e696bd32ea710daef1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```
function createStore(reducer,preloadedState){
    let state=preloadedState;
    let listeners = [];

  
    function getState(){
        return state;
    }

    function subscribe(listener){
        listeners.push(listener);
        return ()=>{
            let index = listeners.indexOf(listener);
            listeners.splice(index,1);
        }
    }
   
    function dispatch(action){
        state=reducer(state,action);
        listeners.forEach(l=>l());
        return action;
    }
    dispatch({type:'@@REDUX/INIT'});
    const store = {
        getState,
        subscribe,
        dispatch
    }
    return store;
}
export default createStore;
```

react 技术栈的业务仅仅靠一个 redux 是行不通的，需要配合使用周边插件 & redux 的一些中间件

###### redux 中间件的基本思想

首先，每一个中间件都是一个函数。他们总是围绕着 dispatch 做文章

一个简单中间件的写法：同样也是基于洋葱模型，接受上一个 dispatch 返回一个新改造的 dispatch

```
const middlewareDemo=next=>action=>{
  // 逻辑处理
}
```

![lALPDhJzyNqX4WHNA1DNBP8\_1279\_848.png\_720x720g.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0ed6fc8fac84bb281886c5ffc65db4c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

###### react-redux 主要实现思想

一般想要在 react 项目中更好的应用`redux`，那么`react-redux这个东西是必不可少的`

核心思想：借助 context。将仓库作为 react 整个应用上下文的一个数据源，那么其子组件就可以很方便的进行消费（主要获取仓库提供的 dispatch 或者 getState）

###### redux-saga 基本思想

如果想使用 redux 进行异步操作，那么就可能会使用`redux-saga`这个中间件。关于它的基本实现思路我原来有过整理【可主页翻一下】

![截屏 2021-11-14 下午 9.27.56.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a6581adeea7451fa3dcc4846eab7d65~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

#### vuex

vuex 感觉上相比较而言简单一些了

![截屏 2021-10-15 下午 7.52.46.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2187d240a15c4dfe9cb2feafc0992f8d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

#### 其他

其他的通信方式，react 和 vue 就基本没有什么区别。就不做 code 展示了

1. 比如说使用事件总线，简单的一个发布订阅

2. 再比如说通过获取通信目标的实例对象，然后借助它来修改其状态

## 核心模块 — 组件及其代码复用方法

关于框架内提供的有关于代码复用的方法或者思想两者又存在哪些不一样呢

### react

从 mixins 到高阶组件，再到现在的函数式组件

对于现在而言，貌似大部分的业务仍然是 class 组件。那么现阶段对于 class 组件而言其主要使用的代码复用的方式就是采用高阶组件。

所谓高阶组件本质就是一个函数，以旧组件为如参新组件为返回值。主要我感觉其实类似于中间件的思想

### vue

vue 中复用代码的方式是使用 mixins，就是`把两个或两个以上组件中的公共逻辑抽取出来。然后在混入到相关组件中`。类似于 util 方法的抽离但又存在很多不同。

举个场景：比如说多个组件中都需要有一个倒计时的逻辑

简单实现的具体操作为：先定义一个 number 状态。然后在组件挂载钩子中进行`number--`的操作

如果不考虑复用的化，多个组件都需要写一套这样的逻辑代码不但臃肿手写的时候也十分恶心。

#### code demo

##### 未使用 mixins 之前：

```
// 组件test02
export default {
  data: () => {
    return {
      count: 10,
    };
  },
  mounted: function () {
    setInterval(() => {
      if (this.count > 0) {
        this.count--;
      }
    }, 1000);
  },
  render: function (h) {
    return <div>{this.count}</div>;
  },
};
```

此时如果还有一个组件也是需要一个相同的倒计时功能，那么毫无疑问。得再来一遍 copy 吧

##### 使用 mixins 抽离之后

**倒计时功能抽离**

```
// 倒计时
/* eslint-disable no-unused-vars */
export default {
  data: () => {
    return {
      count: 10,
    };
  },
  mounted: function () {
    setInterval(() => {
      if (this.count > 0) {
        this.count--;
      }
    }, 1000);
  },
};
```

**原来组件**

```
// 组件：test02
/* eslint-disable no-unused-vars */
import timer from "../common/timer";
export default {
  mixins: [timer],
  data: function () {
    return {
      count: 10,
    };
  },
  render: function (h) {
    return <div>test02:---{this.count}</div>;
  },
};
```

**若此时组件 test03 也需要此功能**

```
/* eslint-disable no-unused-vars */
import timer from "../common/timer";
export default {
  mixins: [timer],
  data: function () {
    return {
      count: 20,
    };
  },
  render: function (h) {
    return <div>test03:---{this.count}</div>;
  },
};
```

且因合并规则的存在，倒计时的初始值我们是还可以在组件内部自定义的

![截屏 2021-11-16 下午 2.11.11.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a214cc0adf884b598ee765ff43176704~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这样明显舒服多了

#### mixins 的合并规则

**data 中：** 有同名数据，以组件数据为主

**钩子中：** 有同名钩子函数，两者都会进行调用，执行顺序有些不同，混入 > 组件

**值是引用类型的选型**（eg：method）：属性 key 相同，以组件数据为主

## 再简单谈一下设计层面上，vue 相较于 react 的做出的优点

首先从 react 设计上的缺点说起

react 中组件更新时，应用是无法获取具体是哪块组件需要重新 diff 获取最新的 vnode 的。故只能是从整颗应用上下手，从头 diff。这就导致了 diff 计算量的增大，随着项目复杂度的上升，就其计算所消耗的时间可能无法在浏览器的一帧时间内执行完毕。导致页面出现卡顿

虽然后面 react 后面升级了架构，整出了 fiber。将 diff 这个大任务进行拆分并设置了任务优先级。虽然说效果上看是可以解决问题

但是细究，其根本问题还是存在（多出的不必要的 diff 计算量），只是不再容易产生页面卡顿的效果了。

vue 之所以不会出现 react 的这种情况，是因为 vue 在编译时做了一些优化。

首先要知道什么时候需要组件重新计算 vnode，或者按 react 的说法来说：什么会造成组件的 re-render，状态的改变（state，props）。vue 中也是一样的。

![截屏 2021-11-16 下午 3.00.36.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/256d13f7d3fc4c6db8d3db3581822076~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

简单理解，首先组件中每一个状态都是对应一个 dep 的。dep 和 watcher 先可以理解为一个的发布订阅，当 data 的属性触发 set 时其对应的 dep 就会让其关联的 watcher 进行更新工作

也就是说如图。组件树中的某一组件的状态发生了变化，其重新 diff 的仅仅是新老两个组件而不是像 react 那样全部进行 diff 一遍。
