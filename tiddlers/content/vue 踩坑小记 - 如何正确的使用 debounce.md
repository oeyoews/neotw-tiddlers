我们经常会在页面 resize 的时候做些操作，比如重新渲染一个图表组件，使其自适应当前页面大小， 但是 `window.resize` 事件触发的很频繁，所以我们一般都会加 debounce 做个「去抖」操作，代码如下：

```
import debounce from 'lodahs/debounce'

export default {
  methods: {
    resize: debounce(function () {
      // do something
    }, 100)
  },

  mounted () {
    window.addEventListener('resize', this.resize)
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
  }
}
```

然而，上面的代码是有深坑的（在坑中爬了半天 - . -），下面聊聊我的爬坑历程。

### 先看个例子

```
<template>
  <div id="app">
    <chart></chart>
    <chart></chart>
  </div>
</template>

<script>
const Chart = {
  template: '<span>chart</span>',

  methods: {
    resize: _.debounce(function () {
      console.log('resize')
    }, 1000 /* 时间设长一点，便于后面的观察 */)
  },

  mounted () {
    window.addEventListener('resize', this.resize)
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
  }
}

new Vue({
  el: '#app',
  components: {
    Chart
  }
})
</script>
```

页面中有两个 Chart 组件，他们会监听 `window.resize` 事件，然后在控制台输出 "resize"。

现在我拖动页面，改变其大小，**1s 后（debounce 设的延迟为 1s），控制台会输出几次 "resize" ?**

这还不简单，难道不是每个 Chart 组件各输出 1 次，共计 2 次？

这里提供一个线上 [demo](https://link.juejin.cn/?target=https%3A%2F%2Fjsfiddle.net%2Fg5jykkrn%2F10%2F "https://jsfiddle.net/g5jykkrn/10/")，大家可以去把玩一下，**实际上每次改变页面大小，控制台只输出了 1 次 "resize"**，是不是很诡异？

### 从 `methods` 说起

假设我们在组件 Chart 中定义了如下方法：

```
{
  methods: {
    resize () {}
  }
}
```

那么有一个与本文很重要的点需要弄清楚：**所有该 Chart 组件的实例，调用 `this.resize()` 时，最后都会调用 `this.$options.methods.resize()`**，在 vue 内部，组件实例化的时候其实就干了下面这个事：

```
// 绑定 this
this.resize = this.options.methods.resize.bind(this)
```

这种关系如下图：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/25/15ff2ab19db222b8~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

然后我们来解释下诡异现象的原因：

两个 Chart 实例中的 resize 会调用同一个 debounce 函数，因此当两个组件同时执行 resize 方法的时候，前者被 debounce 掉了，所以我们只看到输出了 1 次 "resize"。

### 将 resize 方法独立出来

由于 `methods` 中定义的方法是共享的，造成 debounce 效果在组件中相互影响，导致 bug，那么只要避免共享，每个 resize 相互独立就可以了，改进后的代码如下：

```
<template>
  <div id="app">
    <chart></chart>
    <chart></chart>
  </div>
</template>

<script>
const Chart = {
  template: '<span>chart</span>',

  created () {
    // 将 resize 的定义从 methods 中拿到这里来
    // 这样就能保证 resize 只归某个实例拥有
    this.resize = _.debounce(function () {
      console.log('resize')
    }, 1000 /* 时间设长一点，便于后面的观察 */)
  },

  mounted () {
    window.addEventListener('resize', this.resize)
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
  }
}

new Vue({
  el: '#app',
  components: {
    Chart
  }
})
</script>
```

改进后的 [demo](https://link.juejin.cn/?target=https%3A%2F%2Fjsfiddle.net%2Fg5jykkrn%2F13%2F "https://jsfiddle.net/g5jykkrn/13/")

### 最后说两句

细心的小伙伴可能会发现，不对呀，官方的例子 [vuejs.org/v2/guide/mi…](https://link.juejin.cn/?target=https%3A%2F%2Fvuejs.org%2Fv2%2Fguide%2Fmigration.html%23debounce-search-demo "https://vuejs.org/v2/guide/migration.html#debounce-search-demo") 就是将 debounce 放到了 `methods` 中。在官方的例子中，确实没什么问题，因为一个页面不可能同时有两个输入框在输入，同时调用 `expensiveOperation` 方法。但是，假设把 debounce 的延迟设大一点，然后快速在两个输入框中切换输入（虽然这个场景几乎不存在），就会出现我一开始说的那个诡异现象。
