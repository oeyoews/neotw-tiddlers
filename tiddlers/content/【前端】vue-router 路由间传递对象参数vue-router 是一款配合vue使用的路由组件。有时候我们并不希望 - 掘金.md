[vue-router](https://link.juejin.cn/?target=https%3A%2F%2Frouter.vuejs.org%2F "https://router.vuejs.org/") 是一款配合 vue 使用的路由组件。最近项目上遇到了一些历史遗留的问题代码，在解决问题的同时，决定梳理一下路由传参的各个方式。

vue-router 常见的传参方式有以下几种：

### 带参数的动态路由匹配

官方文档：[带参数的动态路由匹配 | Vue Router (vuejs.org)](https://link.juejin.cn/?target=https%3A%2F%2Frouter.vuejs.org%2Fzh%2Fguide%2Fessentials%2Fdynamic-matching.html "https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html")

简单来说，就是使用页面的路径来传递参数。

比如定义路由：

```
// 这些都会传递给 `createRouter`
const routes = [
  // 动态字段以冒号开始,User 是一个 vue 组件
  { 
    path: '/users/:username', 
    name: 'UserHomePage'
   	component: User 
  },
]
```

就可以通过如下方式将用户 id 传递给目标路由：

```
router.push({
  name:'UserHomePage',
  params: { username:"zhangsan" }
})
```

路由跳转成功后，地址栏的路径会变成 `/users/zhangsan`, 在目标路由页面可以通过如下方式获取参数：

```
let { username } = route.params; 
```

需要注意的是，使用此种方法建议要使用 name 来 push 到目标路由，因为如果你指定了 path 参数，那么 params 里对应的字段将会被忽略，不会展现在 URL 上。

### query 传参数

通过指定 query 参数来将数据传递到下一个页面：

```
router.push({
  name:'UserHomePage',
  params: { username:"zhangsan" }
  query: { showAvatar: "true" }
})
```

这个方式，是使用 URL 中的 search 字段来传递参数，路由跳转成功后地址栏的路径会变成 `/users/zhangsan?showAvatar=true`, 在目标路由页面可以通过如下方式获取参数：

```
let { username } = route.query; 
```

这种方式，和第一种其实是可以混合使用的。他们并不冲突

> 以上两种方式，都是通过路由地址来传递参数，他们有一些很明显的缺点：
>
> * query 方式 只支持字符串或者字符串数组，传递对象需要进行 JSON 序列化
> * 路由间的参数会以明文的方式暴露在 URL 中
>
> 同样的，从另一方面考虑，也有它的优势
>
> * 刷新页面不会丢失参数
> * 路径参数让 url 路径看起来更加有可读性，结构分明

### 错误的使用 params 传参

除了 1、2 两种，还有第三种不规范的使用方式，它解决了一些问题，但引入了更多的问题。

在开发中，有时候由于一些需求，不得不在两个路由间传递大量结构化数据。虽然我们可以通过将数据序列化成 JSON 字符串后通过上面的两种方式传递，但有时候我们并不希望这些杂乱无章不可阅读的数据出现在 URL 上，或者，出于某些因素，不方便将这些数据展示在 URL 上。而且在目标路由获取到 JSON 字符串后还需要反序列化成对象才能使用。

此时，程序员们充分发挥了 “ **又不是不能用** ” 的编程精神，开始不规范的使用第一种 通过 params 参数的传参数方式。

⚠️**以下是不规范的做法**

在定义路由的时候，不定义参数匹配字段，而是像 普通固定路由那样定义路由：

```
const routes = [
  // User 是一个 vue 组件
  { 
    path: '/users/profile', 
  	name:'UserHomePage', // name 字段可有可无，这不重要
   	component: User 
  },
]
```

路由跳转时依然正常的使用 params 字段传参数：

```
router.push({
  name:'UserHomePage',
  params: { username:"zhangsan" }
})
```

在目标路由依然使用同样正常的方式获取参数。

这样就达到了我们上面说的两个目的：

* 由于路由的 path 没有定义动态匹配字段。所以 URL 上不会展示 params 字段里的任何参数。
* 目标路由通过 route.params 可以获取到 JSON 对象，而不是字符串，不需要进行序列化和反序列化到操作。

看似完美解决了问题，但这样做有两个致命的缺陷，

* 一旦刷新页面，参数将丢失。
* 一旦跳转到其他页面，然后用户点击浏览器的返回按钮，路由重新加载，参数也将丢失。

也许通过一些处理，比如将参数在 local storage 等存储方式上做一些缓存可以解决这些问题，但这无疑引入了更多的复杂逻辑和不规范的操作。

而且，在 vue-router 4.1.4 中 ，官方为了规范使用，已经移除 了对这一方式的支持，未在 path 中匹配的参数字段将被移除，详情见更新日志：[router/CHANGELOG.md at main · vuejs/router (github.com)](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Frouter%2Fblob%2Fmain%2Fpackages%2Frouter%2FCHANGELOG.md%23414-2022-08-22 "https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22")

### 完美的解决方案：使用 window\.history.state

上面不规范的使用方式主要为了实现以下几个目标：

* URL 不展示参数
* 参数不进行序列化和反序列化

同时还要保证：

* 刷新和回退等操作不会导致参数丢失

在官方的 [4.1.4 更新日志](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Frouter%2Fblob%2Fmain%2Fpackages%2Frouter%2FCHANGELOG.md%23414-2022-08-22 "https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22") 中，推荐了几种替换上面不规范使用方式。

我更喜欢其中的 window\.history.state 实现方式。

只需在 push 时 将参数传递到 state 字段中，vue-router 就会将参数存到 window\.history.state 中。

使用方式如下：

```
/// 路由的定义与普通方式无异

// 传参
router.push({
  name:'UserHomePage',
  state: { username:"zhangsan" }
})

// 获取参数
let username = window.history.state.username;
```

即使是刷新或者前进后退，参数也不会丢失，而且 URL 路径中也不会显示参数，同时也不需要对参数进行序列化。支持所有能序列化成 JSON 的对象。唯一的限制是大小不能超过 2MiB。

具体请参考 window\.history.state 的 MDN 文档：

* [state - Web API 接口参考 | MDN (mozilla.org)](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FHistory%2Fstate "https://developer.mozilla.org/zh-CN/docs/Web/API/History/state")
* [History.pushState () - Web API 接口参考 | MDN (mozilla.org)](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FHistory%2FpushState "https://developer.mozilla.org/zh-CN/docs/Web/API/History/pushState")

至此，我们完美实现了上述几个目标。
