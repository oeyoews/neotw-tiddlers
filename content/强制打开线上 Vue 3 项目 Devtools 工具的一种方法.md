之前在[# Vue Debug 小技巧 ](https://juejin.cn/post/6945357464099356709 "https://juejin.cn/post/6945357464099356709")中有写到过 Vue 2 线上项目如何强制打开 devtools 的方法。

正好这几天在看 Vue 3 的项目，就想既然 Vue 2 可以，那么 Vue 3 我想应该一样也是可以的。

于是通过一晚上的摸索，让我找到了！bingo\~

区别之处和 Vue2 不大，大家请看：

这是 Vue 3

```
// 1.在先获取根节点Vue 实例
let el = document.querySelector('#app')
let vue3 = el.$0.__vue_app__

// 2.强制开启 
window.__VUE_DEVTOOLS_GLOBAL_HOOK__.apps.push({
    // 以下字段一个不能少
    app: vue3,
    version: vue3.version,
    types: {
      Comment: Symbol("Comment"),
      Fragment: Symbol("Fragment"),
      Static: Symbol("Static"),
      Text: Symbol("Text"),
    },
})
window.__VUE_DEVTOOLS_GLOBAL_HOOK__.enabled = true
```

这是 Vue 2

```
// 1.在先获取根节点Vue 实例
let el = document.querySelector('#app')||document.querySelector('#__nuxt')
let app = el.__vue__ 

// 2.获取该实例的构造函数 
let Vue = app.constructor 
// 3.获取Vue的基类 
while (Vue.super) { 
    Vue = Vue.super 
} 
// 4.强制开启 
Vue.config.devtools = true 
window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = Vue
```

可以看到，都是在 `__VUE_DEVTOOLS_GLOBAL_HOOK__` 上做文章。

🥳 比如在 vue 3 项目 [# Vben Admin](https://link.juejin.cn/?target=https%3A%2F%2Fvvbin.cn%2Fnext%2F%23%2Flogin "https://vvbin.cn/next/#/login") 上。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2bc831a37e8841ffa82a208dc030aae7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

🤪 或者 vue 2 项目比如说掘金，滑稽。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a6a2415e91aa48989cbc9919b3d76c37~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

同样的和之前文章一样，把下面代码保持成 `snippet` 就可以快速一件使用啦！

```
function detect() {
    // Method 1: Check Nuxt.js
    const nuxtDetected = !!(window.__NUXT__ || window.$nuxt)

    if (nuxtDetected) {
      let Vue

      if (window.$nuxt) {
        Vue = window.$nuxt.$root && window.$nuxt.$root.constructor
      }
      if (Vue.config.devtools != true) {
        Vue.config.devtools = true
        window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = Vue
      }

      window.postMessage(
        {
          devtoolsEnabled: true,
          vueDetected: true,
          nuxtDetected: true,
        },
        "*"
      )

      return
    }

    // Method 2: Check  Vue 3

    const vueDetected = !!window.__VUE__

    if (vueDetected) {
      const allVue3 = document.querySelectorAll("*")
      let elVue3
      let versionVue3
      for (let i = 0; i < allVue3.length; i++) {
        if (allVue3[i].__vue_app__) {
          elVue3 = allVue3[i].__vue_app__
          versionVue3 = allVue3[i].__vue_app__.version
          break
        }
      }
      if(elVue3){
          window.__VUE_DEVTOOLS_GLOBAL_HOOK__.apps.push({
            app: elVue3,
            version: versionVue3,
            types: {
              Comment: Symbol("Comment"),
              Fragment: Symbol("Fragment"),
              Static: Symbol("Static"),
              Text: Symbol("Text"),
            },
          })
          window.__VUE_DEVTOOLS_GLOBAL_HOOK__.enabled = true

          window.postMessage(
            {
              devtoolsEnabled: true,
              vueDetected: true,
            },
            "*"
          )
      }
      

      return
    }

    // Method 3: Scan all elements inside document
    const all = document.querySelectorAll("*")
    let el
    for (let i = 0; i < all.length; i++) {
      if (all[i].__vue__) {
        el = all[i]
        break
      }
    }
    if (el) {
      let Vue = Object.getPrototypeOf(el.__vue__).constructor
      while (Vue.super) {
        Vue = Vue.super
      }
      if (Vue.config.devtools != true) {
        Vue.config.devtools = true
        window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = Vue
      }
      window.postMessage(
        {
          devtoolsEnabled: true,
          vueDetected: true,
        },
        "*"
      )
    }
}

detect()
```

一些奇奇怪怪的提示：

* 如果要看到 vue 3 的 devtools ，请务必安装`beta`版本的 devtools。
* 以上都需要安装 vue devtools。
* 目前只在 chrome 上试过。
* 个别网站可能会不行，比如[vueuse](https://link.juejin.cn/?target=https%3A%2F%2Fvueuse.org%2F "https://vueuse.org/"), 他会提示 `backend.js:1026 [Vue devtools] No root instance found for app, it might have been unmounted`, 如果有大侠知道是为什么的话，快快评论！

花了一晚上整理出来的东西，虽然说基本上没有一点用，但是可以当作一个奇奇怪怪的知识点吧，为奇奇怪怪的八股文做一点点奇怪的贡献。🥶

好啦，既然都看到这里啦，觉得不错可以用的小手点一个赞！🤣。你的点赞就是我继续瞎写的动力！
