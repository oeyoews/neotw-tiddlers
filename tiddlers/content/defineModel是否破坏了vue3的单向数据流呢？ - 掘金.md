本文是 [vue3 编译原理揭秘](https://juejin.cn/column/7340830470463242278 "https://juejin.cn/column/7340830470463242278") 的第 7 篇，和该系列的其他文章一起服用效果更佳。

1. [vue3 的宏到底是什么东西？](https://juejin.cn/post/7335721246931189795 "https://juejin.cn/post/7335721246931189795")
2. [Vue 3 的 setup 语法糖到底是什么东西？](https://juejin.cn/post/7339210740455440419 "https://juejin.cn/post/7339210740455440419")
3. [看不懂来打我，vue3 的.vue 文件 (SFC) 编译过程](https://juejin.cn/post/7343139078486982710 "https://juejin.cn/post/7343139078486982710")
4. [为什么 defineProps 宏函数不需要从 vue 中 import 导入？](https://juejin.cn/post/7345129748006354978 "https://juejin.cn/post/7345129748006354978")
5. [天天用 defineEmits 宏函数，竟然不知道编译后是 vue2 的选项式 API？](https://juejin.cn/post/7347670979635314703 "https://juejin.cn/post/7347670979635314703")
6. [面试官：只知道 v-model 是:modelValue 和 @onUpdate 语法糖，那你可以走了](https://juejin.cn/post/7349936384512131107 "https://juejin.cn/post/7349936384512131107")
7. [defineModel 是否破坏了 vue3 的单向数据流呢？](https://juejin.cn/post/7354960709010260005 "https://juejin.cn/post/7354960709010260005")
8. [看不懂来打我，vue3 如何将 template 编译成 render 函数](https://juejin.cn/post/7356154581208072226 "https://juejin.cn/post/7356154581208072226")
9. [面试官：来说说 vue3 是怎么处理内置的 v-for、v-model 等指令？](https://juejin.cn/post/7358709354425090083 "https://juejin.cn/post/7358709354425090083")
10. [你不知道的 v-model](https://juejin.cn/post/7360663978647404559 "https://juejin.cn/post/7360663978647404559")
11. [vue3 早已具备抛弃虚拟 DOM 的能力了](https://juejin.cn/post/7364764922338934818 "https://juejin.cn/post/7364764922338934818")
12. [vue3 编译优化之 “静态提升”](https://juejin.cn/post/7368355894708994088 "https://juejin.cn/post/7368355894708994088")
13. [终于搞懂了！原来 Vue 3 的 generate 是这样生成 render 函数的](https://juejin.cn/post/7370138993064067124 "https://juejin.cn/post/7370138993064067124")
14. [彻底搞清楚 vue3 的 defineExpose 宏函数是如何暴露方法给父组件使用](https://juejin.cn/post/7373502637730332706 "https://juejin.cn/post/7373502637730332706")
15. [终于搞懂了！原来 vue3 中 template 使用 ref 无需.value 是因为这个](https://juejin.cn/post/7376930488738611240 "https://juejin.cn/post/7376930488738611240")
16. [有点东西，template 可以直接使用 setup 语法糖中的变量原来是因为这个](https://juejin.cn/post/7379569983128862735 "https://juejin.cn/post/7379569983128862735")
17. [有点儿神奇，原来 vue3 的 setup 语法糖中组件无需注册因为这个](https://juejin.cn/post/7382039232380731392 "https://juejin.cn/post/7382039232380731392")
18. [终于搞懂了！原来 vue3.4 的:title 等同于:title="title" 原来是因为这个](https://juejin.cn/post/7383264553721626659 "https://juejin.cn/post/7383264553721626659")
19. [掉了两根头发后，我悟了！vue3 的 scoped 原来是这样避免样式污染（上）](https://juejin.cn/post/7384633860520083508 "https://juejin.cn/post/7384633860520083508")
20. [掉了两根头发后，我悟了！vue3 的 scoped 原来是这样避免样式污染（下）](https://juejin.cn/post/7386875278423982115 "https://juejin.cn/post/7386875278423982115")

## 前言

vue3.4 增加了`defineModel`宏函数，在子组件内修改了`defineModel`的返回值，父组件上`v-model`绑定的变量就会被更新。大家都知道`v-model`是`:modelValue`和`@update:modelValue`的语法糖，但是你知道为什么我们在子组件内没有写任何关于`props`的定义和`emit`事件触发的代码吗？还有在`template`渲染中`defineModel`的返回值等于父组件`v-model`绑定的变量值，那么这个返回值是否就是名为`modelValue`的 props 呢？直接修改`defineModel`的返回值就会修改父组件上面绑定的变量，那么这个行为是否相当于子组件直接修改了父组件的变量值，破坏了 vue 的单向数据流呢？

[欧阳平时写文章参考的多本 vue 源码电子书、加入欧阳的第一个 vue 源码交流群](https://juejin.cn/pin/7387215691155734567 "https://juejin.cn/pin/7387215691155734567")

## 先说答案

`defineModel`宏函数经过编译后会给 vue 组件对象上面增加`modelValue`的 props 选项和`update:modelValue`的 emits 选项，执行`defineModel`宏函数的代码会变成执行`useModel`函数，如下图： ![convert](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64dac6ab5b06477f9cbebc8f1f4fab8b~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1591\&h=521\&s=89200\&e=png\&b=ffffff)

经过编译后`defineModel`宏函数已经变成了`useModel`函数，而`useModel`函数的返回值是一个 ref 对象。注意这个是 ref 对象不是 props，所以我们才可以在组件内直接修改`defineModel`的返回值。当我们对这个`ref`对象进行 “读操作” 时，会像`Proxy`一样被拦截到`ref`对象的 get 方法。在 get 方法中会返回本地维护`localValue`变量，`localValue`变量依靠`watchSyncEffect`让`localValue`变量始终和父组件传递的`modelValue`的`props`值一致。

对返回值进行 “写操作” 会被拦截到`ref`对象的 set 方法中，在 set 方法中会将最新值同步到本地维护`localValue`变量，调用 vue 实例上的 emit 方法抛出`update:modelValue`事件给父组件，由父组件去更新父组件中`v-model`绑定的变量。如下图： ![useModel](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8168d54738bd4d1b83570dc32913a44a~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2016\&h=2374\&s=365676\&e=png\&b=ffffff)

所以在子组件内无需写任何关于`props`的定义和`emit`事件触发的代码，因为在编译`defineModel`宏函数的时候已经帮我们生成了`modelValue`的 props 选项。在对返回的 ref 变量进行写操作时会触发 set 方法，在 set 方法中会调用 vue 实例上的 emit 方法抛出`update:modelValue`事件给父组件。

`defineModel`宏函数的返回值是一个 ref 变量，而不是一个 props。所以我们可以直接修改`defineModel`宏函数的返回值，父组件绑定的变量之所以会改变是因为在底层会抛出`update:modelValue`事件给父组件，由父组件去更新绑定的变量，这一行为当然满足 vue 的单向数据流。

## 什么是 vue 的单向数据流

vue 的单向数据流是指，通过 props 将父组件的变量传递给子组件，在子组件中是没有权限去修改父组件传递过来的变量。只能通过`emit`抛出事件给父组件，让父组件在事件回调中去修改 props 传递的变量，然后通过 props 将更新后的变量传递给子组件。在这一过程中数据的流动是单向的，由父组件传递给子组件，只有父组件有数据的更改权，子组件不可直接更改数据。 ![single-progress](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/330af8963fb64a09a48a7b12632dd948~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1998\&h=1289\&s=197618\&e=png\&b=ffffff)

## 一个`defineModel`的例子

我在前面的 [一文搞懂 Vue3 defineModel 双向绑定：告别繁琐代码！](https://juejin.cn/post/7343139078486982710 "https://juejin.cn/post/7343139078486982710")文章中已经讲过了`defineModel`的各种用法，在这篇文章中我们就不多余赘述了。我们直接来看一个简单的`defineModel`的例子。

下面这个是父组件的代码：

```
<template>
  <CommonChild v-model="inputValue" />
  <p>input value is: {{ inputValue }}</p>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CommonChild from "./child.vue";

const inputValue = ref();
</script>
```

父组件的代码很简单，使用`v-model`指令将`inputValue`变量传递给子组件。然后在父组件上使用 p 标签渲染出`inputValue`变量的值。

我们接下来看子组件的代码：

```
<template>
  <input v-model="model" />
  <button @click="handelReset">reset</button>
</template>

<script setup lang="ts">
const model = defineModel();

function handelReset() {
  model.value = "init";
}
</script>
```

子组件内的代码也很简单，将`defineModel`的返回值赋值给`model`变量。然后使用`v-model`指令将`model`变量绑定到子组件的 input 输入框上面。并且还在按钮的 click 事件时使用`model.value = "init"`将绑定的值重置为`init`字符串。请注意在子组件中我们没有任何定义 props 的代码，也没有抛出`emit`事件的代码。而是通过`defineModel`宏函数的返回值来接收父组件传过来的名为`modelValue`的 prop，并且在子组件中是直接通过给`defineModel`宏函数的返回值进行赋值来修改父组件绑定的`inputValue`变量的值。

## `defineModel`编译后的样子

要回答前面提的几个问题，我们还是得从编译后的子组件代码说起。下面这个是经过简化编译后的子组件代码：

```
import {
  defineComponent as _defineComponent,
  useModel as _useModel
} from "/node_modules/.vite/deps/vue.js?v=23bfe016";

const _sfc_main = _defineComponent({
  __name: "child",
  props: {
    modelValue: {},
    modelModifiers: {},
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const model = _useModel(__props, "modelValue");
    function handelReset() {
      model.value = "init";
    }
    const __returned__ = { model, handelReset };
    return __returned__;
  },
});

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    // ... 省略
  );
}
_sfc_main.render = _sfc_render;
export default _sfc_main;
```

从上面我们可以看到编译后主要有`_sfc_main`和`_sfc_render`这两块，其中`_sfc_render`为`render`函数，不是我们这篇文章关注的重点。我们来主要看`_sfc_main`对象，看这个对象的样子有 name、props、emits、setup 属性，我想你也能够猜出来他就是 vue 的组件对象。从组件对象中我们可以看到已经有了一个`modelValue`的`props`属性，还有使用`emits`选项声明了`update:modelValue`事件。我们在源代码中没有任何地方有定义`props`和`emits`选项，很明显这两个是通过编译`defineModel`宏函数而来的。

我们接着来看里面的 setup 函数，可以看到经过编译后的 setup 函数中代码和我们的源代码很相似。只有`defineModel`不在了，取而代之的是一个`useModel`函数。

```
// 编译前的代码
const model = defineModel();

// 编译后的代码
const model = _useModel(__props, "modelValue");
```

还是同样的套路，在浏览器的 sources 面板上面找到编译后的 js 文件，然后给这个`useModel`打个断点。至于如何找到编译后的 js 文件我们在前面的文章中已经讲了很多遍了，这里就不赘述了。刷新浏览器我们看到断点已经走到了使用`useModel`函数的地方，我们这里给`useModel`函数传了两个参数。第一个参数为子组件接收的`props`对象，第二个参数是写死的字符串`modelValue`。进入到`useModel`函数内部，简化后的`useModel`函数是这样的：

```
function useModel(props, name) {
  const i = getCurrentInstance();
  const res = customRef((track2, trigger2) => {
    watchSyncEffect(() => {
      // 省略
    });
  });
  return res;
}
```

从上面的代码中我们可以看到`useModel`中使用到的函数没有一个是 vue 内部源码专用的函数，全都是调用的 vue 暴露出来的 API。**这意味着我们可以参考`defineModel`的实现源码，也就是`useModel`函数，然后根据自己实际情况改良一个适合自己项目的`defineModel`函数。**

我们先来简单介绍一下`useModel`函数中使用到的 API，分别是`getCurrentInstance`、`customRef`、`watchSyncEffect`，这三个 API 都是从 vue 中 import 导入的。

## `getCurrentInstance`函数

首先来看看`getCurrentInstance`函数，他的作用是返回当前的 vue 实例。为什么要调用这个函数呢？因为在 setup 中 this 是拿不到 vue 实例的，后面对值进行写操作时会调用 vue 实例上面的 emit 方法抛出 update 事件。

## `watchSyncEffect`函数

接着我们来看`watchSyncEffect`函数，这个 API 大家平时应该比较熟悉了。他的作用是立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时立即重新执行这个函数。

比如下面这段代码，会立即执行`console`，当`count`变量的值改变后，也会立即执行 console。

```
const count = ref(0)

watchSyncEffect(() => console.log(count.value))
// -> 输出 0
```

## `customRef`函数

最后我们来看`customRef`函数，他是`useModel`函数的核心。这个函数小伙伴们应该用的比较少，我们这篇文章只简单讲讲他的用法即可。如果小伙伴们对`customRef`函数感兴趣可以留言或者给我发消息，关注的小伙伴们多了我后面会安排一篇文章来专门讲`customRef`函数。官方的解释为：

> 创建一个自定义的 ref，显式声明对其依赖追踪和更新触发的控制方式。`customRef()` 预期接收一个工厂函数作为参数，这个工厂函数接受 `track` 和 `trigger` 两个函数作为参数，并返回一个带有 `get` 和 `set` 方法的对象。

这句话的意思是`customRef`函数的返回值是一个 ref 对象。当我们对返回值 ref 对象进行 “读操作” 时，会被拦截到 ref 对象的 get 方法中。当我们对返回值 ref 对象进行 “写操作” 时，会被拦截到 ref 对象的 set 方法中。和`Promise`相似同样接收一个工厂函数作为参数，`Promise`的工厂函数是接收的`resolve`和`reject`两个函数作为参数，`customRef`的工厂函数是接收的`track`和`trigger`两个函数作为参数。`track`用于手动进行依赖收集，`trigger`函数用于手动进行依赖触发。

我们知道 vue 的响应式原理是由依赖收集和依赖触发的方式实现的，比如我们在 template 中使用一个`ref`变量。当 template 被编译为`render`函数后，在浏览器中执行`render`函数时，就会对`ref`变量进行读操作。读操作会被拦截到 Proxy 的 get 方法中，由于此时在执行`render`函数，所以当前的依赖就是`render`函数。在 get 方法中会进行依赖收集，将当前的`render`函数作为依赖收集起来。**注意这里的依赖收集是 vue 内部自动完成的，在我们的代码中无需手动去进行依赖收集。**

当我们对`ref`变量进行写操作时，此时会被拦截到 Proxy 的 set 方法，在 set 方法中会将收集到的依赖依次取出来执行，我们前面收集的依赖是`render`函数。所以`render`函数就会重新执行，执行`render`函数生成虚拟 DOM，再生成真实 DOM，这样浏览器中渲染的就是最新的`ref`变量的值。**同样这里依赖触发也是在 vue 内部自动完成的，在我们的代码中无需手动去触发依赖。**

搞清楚了依赖收集和依赖触发现在来讲`track`和`trigger`两个函数你应该就能很容易理解了，`track`和`trigger`两个函数可以让我们手动控制什么时候进行依赖收集和依赖触发。执行`track`函数就会手动收集依赖，执行`trigger`函数就会手动触发依赖，进行页面刷新。在`defineModel`这个场景中`track`手动收集的依赖就是`render`函数，`trigger`手动触发会导致`render`函数重新执行，进而完成页面刷新。

## `useModel`函数

现在我们可以来看`useModel`函数了，简化后的代码如下：

```
function useModel(props, name) {
  const i = getCurrentInstance();

  const res = customRef((track2, trigger2) => {
    let localValue;
    watchSyncEffect(() => {
      const propValue = props[name];
      if (hasChanged(localValue, propValue)) {
        localValue = propValue;
        trigger2();
      }
    });
    return {
      get() {
        track2();
        return localValue;
      },
      set(value) {
        if (hasChanged(value, localValue)) {
          localValue = value;
          trigger2();
        }
        i.emit(`update:${name}`, value);
      },
    };
  });
  return res;
}
```

从上面我们可以看到`useModel`函数的代码其实很简单，`useModel`的返回值就是`customRef`函数的返回值，也就是一个`ref`变量对象。我们看到返回值对象中有`get`和`set`方法，还有在`customRef`函数中使用了`watchSyncEffect`函数。

### `get`方法

在前面的 demo 中，我们在子组件的 template 中使用`v-model`将`defineModel`的返回值绑定到一个 input 输入框中。代码如下：

```
<input v-model="model" />
```

在第一次执行`render`函数时会对`model`变量进行读操作，而`model`变量是`defineModel`宏函数的返回值。编译后我们看到`defineModel`宏函数变成了`useModel`函数。所以对`model`变量进行读操作，其实就是对`useModel`函数的返回值进行读操作。我们看到`useModel`函数的返回值是一个自定义 ref，在自定义 ref 中有 get 和 set 方法，当对自定义`ref`进行读操作时会被拦截到`ref`对象中的 get 方法。这里在`get`方法中会手动执行`track2`方法进行依赖收集。因为此时是在执行`render`函数，所以收集到的依赖就是`render`函数，然后将本地维护的`localValue`的值进行拦截返回。

### `set`方法

在我们前面的 demo 中，子组件 reset 按钮的 click 事件中会对`defineModel`的返回值`model`变量进行写操作，代码如下：

```
function handelReset() {
  model.value = "init";
}
```

和对`model`变量 “读操作” 同理，对`model`变量进行 “写操作” 也会被拦截到返回值`ref`对象的 set 方法中。在`set`方法中会先判断新的值和本地维护的`localValue`的值比起来是否有修改。如果有修改那就将更新后的值同步更新到本地维护的`localValue`变量，这样就保证了本地维护的`localValue`始终是最新的值。然后执行`trigger2`函数手动触发收集的依赖，在前面`get`的时候收集的依赖是`render`函数，所以这里触发依赖会重新执行 render 函数，然后将最新的值渲染到浏览器上面。

在 set 方法中接着会调用 vue 实例上面的`emit`方法进行抛出事件，代码如下：

```
i.emit(`update:${name}`, value)
```

这里的`i`就是`getCurrentInstance`函数的返回值。前面我们讲过了`getCurrentInstance`函数的返回值是当前 vue 实例，所以这里就是调用 vue 实例上面的`emit`方法向父组件抛出事件。这里的`name`也就是调用`useModel`函数时传入的第二个参数，我们来回忆一下前面是怎样调用`useModel`函数的 ，代码如下：

```
const model = _useModel(__props, "modelValue")
```

传入的第一个参数为当前的`props`对象，第二个参数是写死的字符串`"modelValue"`。那这里调用`emit`抛出的事件就是`update:modelValue`，传递的参数为最新的 value 的值。**这就是为什么不需要在子组件中使用使用`emit`抛出事件，因为在`defineModel`宏函数编译成的`useModel`函数中已经帮我们使用`emit`抛出事件了。**

### `watchSyncEffect`函数

我们接着来看子组件中怎么接收父组件传递过来的 props 呢，答案就在`watchSyncEffect`函数中。回忆一下前面讲过的`useModel`函数中的`watchSyncEffect`代码如下：

```
function useModel(props, name) {
  const res = customRef((track2, trigger2) => {
    let localValue;
    watchSyncEffect(() => {
      const propValue = props[name];
      if (hasChanged(localValue, propValue)) {
        localValue = propValue;
        trigger2();
      }
    });
    return {
     // ...省略
    };
  });
  return res;
}
```

这个`name`也就是调用`useModel`函数时传过来的第二个参数，我们前面已经讲过了是一个写死的字符串`"modelValue"`。那这里的`const propValue = props[name]`就是取父组件传递过来的名为`modelValue`的`prop`，我们知道`v-model`就是`:modelValue`的语法糖，所以这个`propValue`就是取的是父组件`v-model`绑定的变量值。如果本地维护的`localValue`变量的值不等于父组件传递过来的值，那么就将本地维护的`localValue`变量更新，让`localValue`变量始终和父组件传递过来的值一样。并且触发依赖重新执行子组件的`render`函数，将子组件的最新变量的值更新到浏览器中。为什么要调用`trigger2`函数呢？原因是可以在子组件的 template 中渲染`defineModel`函数的返回值，也就是父组件传递过来的 prop 变量。如果父组件传递过来的 prop 变量值改变后不重新调用`trigger2`函数以重新执行`render函数`，那么子组件中的渲染的变量值就一直都是旧的值了。因为这个是在`watchSyncEffect`内执行的，所以每次父组件传过来的`props`值变化后都会再执行一次，让本地维护的`localValue`变量的值始终等于父组件传递过来的值，并且子组件页面上也始终渲染的是最新的变量值。

**这就是为什么在子组件中没有任何`props`定义了，因为在`defineModel`宏函数编译后会给 vue 组件对象塞一个`modelValue`的 prop，并且在`useModel`函数中会维护一个名为`localValue`的本地变量接收父组件传递过来的`props.modelValue`，并且让`localValue`变量和`props.modelValue`的值始终保持一致。**

## 总结

现在我们可以回答前面提的几个问题了：

* 使用`defineModel`宏函数后，为什么我们在子组件内没有写任何关于`props`定义的代码？

  答案是本地会维护一个`localValue`变量接收父组件传递过来的名为`modelValue`的 props。调用`defineModel`函数的代码经过编译后会变成一个调用`useModel`函数的代码，`useModel`函数的返回值是一个`ref`对象。当我们对`defineModel`的返回值进行 “读操作” 时，类似于`Proxy`的`get`方法一样会对读操作进行拦截到返回值`ref`对象的`get`方法中。而`get`方法的返回值为本地维护的`localValue`变量，在`watchSyncEffect`的回调中将父组件传递过来的名为`modelValue`的 props 赋值给本地维护的`localValue`变量。并且由于是在`watchSyncEffect`中，所以每次`props`改变都会执行这个回调，所以本地维护的`localValue`变量始终是等于父组件传递过来的`modelValue`。也正是因为`defineModel`宏函数的返回值是一个 ref 对象而不是一个 prop，所以我们可以在子组件内直接将`defineModel`的返回值使用`v-model`绑定到子组件 input 输入框上面。

* 使用`defineModel`宏函数后，为什么我们在子组件内没有写任何关于`emit`事件触发的代码？

  答案是因为调用`defineModel`函数的代码经过编译后会变成一个调用`useModel`函数的代码，`useModel`函数的返回值是一个`ref`对象。当我们直接修改`defineModel`的返回值，也就是修改`useModel`函数的返回值。类似于`Proxy`的`set`方法一样会对写行为进行拦截到`ref`对象中的`set`方法中。在`set`方法中会手动触发依赖，`render`函数就会重新执行，浏览器上就会渲染最新的变量值。然后调用 vue 实例上的`emit`方法，向父组件抛出`update:modelValue`事件。并且将最新的值随着事件一起传递给父组件，由父组件在`update:modelValue`事件回调中将父组件中`v-model`绑定的变量更新为最新值。

* 在`template`渲染中`defineModel`的返回值等于父组件`v-model`绑定的变量值，那么这个返回值是否就是名为`modelValue`的 props 呢？

  从第一个回答中我们知道`defineModel`的返回值不是 props，而是一个 ref 对象。

* 直接修改`defineModel`的返回值就会修改父组件上面绑定的变量，那么这个行为是否相当于子组件直接修改了父组件的变量值，破坏了 vue 的单向数据流呢？

  修改`defineModel`的返回值，就会更新父组件中`v-model`绑定的变量值。看着就像是子组件中直接修改了父组件的变量值，从表面上看着像是打破了 vue 的单向数据流。实则并不是那样的，虽然我们在代码中没有写过`emit`抛出事件的代码，但是在`defineModel`函数编译成的`useModel`函数中已经帮我们使用`emit`抛出事件了。所以并没有打破 vue 的单向数据流
