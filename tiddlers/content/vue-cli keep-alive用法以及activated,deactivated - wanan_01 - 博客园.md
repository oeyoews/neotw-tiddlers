** keep-alive 用法**

\<keep-alive> 是 Vue 的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染 DOM。

* include: 字符串或正则表达式。只有匹配的组件会被缓存。
* exclude: 字符串或正则表达式。任何匹配的组件都不会被缓存。

![复制代码](https://assets.cnblogs.com/images/copycode.gif)

```
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import Header from '@/components/home/header'
import Citylist from '@/components/city/city-list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/Header',
      name: 'Header',
      component: Header,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
        path:'/citylist',
        name:'citylist',
        component:Citylist,
        meta: {
        keepAlive: false // 不需要被缓存
      }
    }
  ]
})
```

![复制代码](https://assets.cnblogs.com/images/copycode.gif)

这样就需要在 app.vue 中这样写

![复制代码](https://assets.cnblogs.com/images/copycode.gif)

```
<template>
  <div id="app">
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
```

![复制代码](https://assets.cnblogs.com/images/copycode.gif)

这样就实现了有效的控制是否缓存。

**activated,deactivated**

注意一点：activated,deactivated 这两个生命周期函数一定是要在使用了 keep-alive 组件后才会有的，否则则不存在

当引入 keep-alive 的时候，页面第一次进入，**钩子的触发顺序 created-> mounted-> activated，退出时触发 deactivated。**当再次进入（前进或者后退）时，只触发 activated。

事件挂载的方法等，只执行一次的放在 mounted 中；组件每次进去执行的方法放在 activated 中， activated 中的不管是否需要缓存多会执行。
