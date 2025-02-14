## []()从一个入口开始

vue3 从发布正式版到现在已经过去半年左右，大家聚焦讨论的重点集中在响应式 api 和组合式 api，无可厚非，这俩个 api 的变化确实可以直接影响到整个 vue 应用的开发方式和体验，今天我们来谈一个不那么起眼的小知识点

相信大家在使用 vue-cli 脚手架开发 vue 应用的时候，一定在 src/main.js 里见过这样的代码

```
new Vue({

  render: h => h(App)

}).$mount('#app')
```

一切从 new 一个 vue 实例开始，然后当你使用 vue3 进行开发的时候，同样是入口文件 main.js，却变成了下面这样

```
import { createApp } from 'vue'

import App from './App.vue'

createApp(App).mount('#app')
```

一切从一个 createApp 方法的执行开始，那 vue3 为什么把应用的初始化变成这样子，和 new Vue 相比，createApp 有哪些好处呢？

## []()createApp 的好处

想象一个场景：我们需要开发一个比较大的 vue 应用，团队 A 需要一个 vueA 实例对象，它拥有全局组件 ShowDialog，团队 B 需要一个 vueB 实例对象，它不需要全局组件 showDialog，要求俩个 vue 实例的功能要完全独立，相互隔离，该如何实现？

vue2 中，我们可能会写出这样的代码

![](https://img-blog.csdnimg.cn/img_convert/a73dfb54ed54090ebeadd8c9535535d1.webp?x-oss-process=image/format,png)

以上，我们通过 new 操作符，连续实例化了俩个 vue 实例 A 和 B，并且注册好了一个全局组件，我们期待全局组件只能在实例 A 控制的视图区域中使用，然而这是行不通的，因为 vue2 的组件系统设计中，所有的 vue 实例是共享一个 Vue 构造函数对象的（包括全局指令 / 全局组件等），无法做到完全隔离

看 vue3 中如何解决该问题

createApp 方法可以返回一个提供应用上下文的应用实例，应用实例挂载的整个组件树共享同一个上下文

![](https://img-blog.csdnimg.cn/img_convert/b5ddb4746805e3db5d6dbf398d095d0e.webp?x-oss-process=image/format,png)

以上，我们使用 vue3 中的 createApp 方法进行实例创建，这一次创建出来的实例 A 和 B 拥有完全隔离的环境，这一次我们的 show-dialog 组件，在 vueA 实例控制的视图中是完全全局可用的，而在 vueB 控制的视图区域是不可用的（如果你想在 A 和 B 环境中共享，把 show-dialog 组件配置项抽离出来，各自注册一下即可）大家可以把案例中的 vueA 和 vueB 想象成俩个完全不同的应用实例，它们各自为营，互不影响，完全隔离，同样也可以自由的选择要共享哪些东西

## []()场景应用

我们可能会奇怪，做了蛮多的 vue 项目，貌似很少见到有多次 new Vue 的情景，事实上随着项目规模的扩大，由独立团队共同协作开发项目以及前端微服务的普及，你可能会在某个时候发现自己也需要这样做，说的简单一点，如果多个单页应用由多个团队一起开发，并且共享一套 js 运行环境的时候，隔离就显得格外的重要了

所以某种程度上，createApp 新 api 的产生算是一种前瞻性的面向未来的设计，你可以自由的选择当前需要几个应用实例，并且可以在隔离环境的前提下自由的组合需要共享的东西，不是吗？nice\
 
