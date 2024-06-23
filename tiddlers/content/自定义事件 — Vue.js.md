[![vue logo](https://v2.cn.vuejs.org/images/logo.svg) Vue.js](https://v2.cn.vuejs.org/)

*

* [学习]()

  * #### 文档

  * * [教程](https://v2.cn.vuejs.org/v2/guide/)
    * [API](https://v2.cn.vuejs.org/v2/api/)
    * [风格指南](https://v2.cn.vuejs.org/v2/style-guide/)
    * [示例](https://v2.cn.vuejs.org/v2/examples/)
    * [Cookbook](https://v2.cn.vuejs.org/v2/cookbook/)

  * #### 视频教程

  * * [Vue Mastery (英文)](https://www.vuemastery.com/courses/)
    * [Vue School (英文)](https://vueschool.io/?friend=vuejs\&utm_source=Vuejs.org\&utm_medium=Link\&utm_content=Navbar%20Dropdown)
    * <!-- start: special logic for cn -->
      [DCloud 视频教程](https://learning.dcloud.io/)
      <!-- end: special logic for cn -->

* [生态系统]()

  * #### 帮助

  * * [论坛](https://forum.vuejs.org/)
    * [聊天室](https://chat.vuejs.org/)
    * [聚会](https://events.vuejs.org/meetups/)

  * #### 工具

  * * [Devtools](https://github.com/vuejs/vue-devtools)
    * [Vue CLI](https://cli.vuejs.org/zh/)
    * [Vue Loader](https://vue-loader.vuejs.org/zh/)

  * #### 核心插件

  * * [Vue Router](https://router.vuejs.org/zh/)
    * [Vuex](https://vuex.vuejs.org/zh/)
    * [Vue 服务端渲染](https://v2.ssr.vuejs.org/zh/)

  * #### 信息

  * * [周刊](https://news.vuejs.org/)
    * [活动](https://events.vuejs.org/)
    * [Twitter](https://twitter.com/vuejs)
    * [博客](https://blog.vuejs.org/)
    * [工作](https://vuejobs.com/?ref=vuejs)
    * [DEV 社区](https://dev.to/t/vue)

* [资源列表](#)

  * [团队](https://cn.vuejs.org/about/team.html)
  * [赞助商](https://cn.vuejs.org/sponsor/)
  * [合作伙伴](https://cn.vuejs.org/partners/)
  * [主题](https://cn.vuejs.org/ecosystem/themes.html)
  * [Awesome Vue](https://github.com/vuejs/awesome-vue)
  * [浏览和 Vue 相关的包](https://awesomejs.dev/for/vue/)

* [终止支持 (EOL) 新](https://v2.cn.vuejs.org/eol/)

* [多语言]()

  * [English](https://v2.vuejs.org/v2/guide/components-custom-events.html)
  * [日本語](https://jp.vuejs.org/v2/guide/components-custom-events.html)
  * [Русский](https://ru.vuejs.org/v2/guide/components-custom-events.html)
  * [한국어](https://kr.vuejs.org/v2/guide/components-custom-events.html)
  * [Português](https://br.vuejs.org/v2/guide/components-custom-events.html)
  * [Français](https://fr.vuejs.org/v2/guide/components-custom-events.html)
  * [Tiếng Việt](https://vi.vuejs.org/v2/guide/components-custom-events.html)
  * [Español](https://es.vuejs.org/v2/guide/components-custom-events.html)
  * [Bahasa Indonesia](https://docs.vuejs.id/v2/guide/components-custom-events.html)

* <!-- start: special logic for cn -->
  [参与翻译](https://github.com/vuejs/v2.cn.vuejs.org/)
  <!-- end: special logic for cn -->

您正在浏览的是 Vue 2.x 的文档。Vue 3 的文档[在这里](https://cn.vuejs.org/)。

## 自定义事件

<!-- start: special logic for cn -->

<!-- start: special logic for cn -->

<!-- <div class="ad-pagetop">
  <a href="http://www.vueshop.com.cn/index.php?http_referer=vuejs" target="_blank" rel="noopener noreferrer">
    <span class="name">VUEshop</span>
    <span class="description">中国免费商城系统 - 搜豹商城系统 - 免费50小时 Vue 视频教程</span>
    <span class="action">立即查看 &gt;</span>
  </a>
</div> -->

<!-- end: special logic for cn -->

<!-- end: special logic for cn -->

> 该页面假设你已经阅读过了[组件基础](https://v2.cn.vuejs.org/v2/guide/components.html)。如果你还对组件不太了解，推荐你先阅读它。

## [事件名](#事件名 "事件名")

不同于组件和 prop，事件名不存在任何自动化的大小写转换。而是触发的事件名需要完全匹配监听这个事件所用的名称。举个例子，如果触发一个 camelCase 名字的事件：

```
this.$emit('myEvent')
```

则监听这个名字的 kebab-case 版本是不会有任何效果的：

```
<!-- 没有效果 -->
<my-component v-on:my-event="doSomething"></my-component>
```

不同于组件和 prop，事件名不会被用作一个 JavaScript 变量名或 property 名，所以就没有理由使用 camelCase 或 PascalCase 了。并且 `v-on` 事件监听器在 DOM 模板中会被自动转换为全小写 (因为 HTML 是大小写不敏感的)，所以 `v-on:myEvent` 将会变成 `v-on:myevent`—— 导致 `myEvent` 不可能被监听到。

因此，我们推荐你**始终使用 kebab-case 的事件名**。

## [自定义组件的 `v-model`](#自定义组件的-v-model "自定义组件的 v-model")

> 2.2.0+ 新增

一个组件上的 `v-model` 默认会利用名为 `value` 的 prop 和名为 `input` 的事件，但是像单选框、复选框等类型的输入控件可能会将 `value` attribute 用于[不同的目的](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Value)。`model` 选项可以用来避免这样的冲突：

```
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```

现在在这个组件上使用 `v-model` 的时候：

```
<base-checkbox v-model="lovingVue"></base-checkbox>
```

这里的 `lovingVue` 的值将会传入这个名为 `checked` 的 prop。同时当 `<base-checkbox>` 触发一个 `change` 事件并附带一个新的值的时候，这个 `lovingVue` 的 property 将会被更新。

注意你仍然需要在组件的 `props` 选项里声明 `checked` 这个 prop。

## [将原生事件绑定到组件](#将原生事件绑定到组件 "将原生事件绑定到组件")

你可能有很多次想要在一个组件的根元素上直接监听一个原生事件。这时，你可以使用 `v-on` 的 `.native` 修饰符：

```
<base-input v-on:focus.native="onFocus"></base-input>
```

在有的时候这是很有用的，不过在你尝试监听一个类似 `<input>` 的非常特定的元素时，这并不是个好主意。比如上述 `<base-input>` 组件可能做了如下重构，所以根元素实际上是一个 `<label>` 元素：

```
<label>
  {{ label }}
  <input
    v-bind="$attrs"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  >
</label>
```

这时，父级的 `.native` 监听器将静默失败。它不会产生任何报错，但是 `onFocus` 处理函数不会如你预期地被调用。

为了解决这个问题，Vue 提供了一个 `$listeners` property，它是一个对象，里面包含了作用在这个组件上的所有监听器。例如：

```
{
  focus: function (event) { /* ... */ }
  input: function (value) { /* ... */ },
}
```

有了这个 `$listeners` property，你就可以配合 `v-on="$listeners"` 将所有的事件监听器指向这个组件的某个特定的子元素。对于类似 `<input>` 的你希望它也可以配合 `v-model` 工作的组件来说，为这些监听器创建一个类似下述 `inputListeners` 的计算属性通常是非常有用的：

```
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    inputListeners: function () {
      var vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on="inputListeners"
      >
    </label>
  `
})
```

现在 `<base-input>` 组件是一个**完全透明的包裹器**了，也就是说它可以完全像一个普通的 `<input>` 元素一样使用了：所有跟它相同的 attribute 和监听器都可以工作，不必再使用 `.native` 监听器。

## [`.sync` 修饰符](#sync-修饰符 ".sync 修饰符")

> 2.3.0+ 新增

在有些情况下，我们可能需要对一个 prop 进行 “双向绑定”。不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以变更父组件，且在父组件和子组件两侧都没有明显的变更来源。

这也是为什么我们推荐以 `update:myPropName` 的模式触发事件取而代之。举个例子，在一个包含 `title` prop 的假设的组件中，我们可以用以下方法表达对其赋新值的意图：

```
this.$emit('update:title', newTitle)
```

然后父组件可以监听那个事件并根据需要更新一个本地的数据 property。例如：

```
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>
```

为了方便起见，我们为这种模式提供一个缩写，即 `.sync` 修饰符：

```
<text-document v-bind:title.sync="doc.title"></text-document>
```

注意带有 `.sync` 修饰符的 `v-bind` **不能**和表达式一起使用 (例如 `v-bind:title.sync=”doc.title + ‘!’”` 是无效的)。取而代之的是，你只能提供你想要绑定的 property 名，类似 `v-model`。

当我们用一个对象同时设置多个 prop 的时候，也可以将这个 `.sync` 修饰符和 `v-bind` 配合使用：

```
<text-document v-bind.sync="doc"></text-document>
```

这样会把 `doc` 对象中的每一个 property (如 `title`) 都作为一个独立的 prop 传进去，然后各自添加用于更新的 `v-on` 监听器。

将 `v-bind.sync` 用在一个字面量的对象上，例如 `v-bind.sync=”{ title: doc.title }”`，是无法正常工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑。

<!-- main custom script for sidebars, version selects etc. -->

<!-- search -->
