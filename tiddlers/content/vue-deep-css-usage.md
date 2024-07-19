## SFC CSS Features [​](#sfc-css-features) SFC CSS 特性

> https://github.com/vuejs/docs/issues/1794

## Scoped CSS  作用域 CSS[​](#scoped-css)

When a `<style>` tag has the `scoped` attribute, its CSS will apply to elements of the current component only. This is similar to the style encapsulation found in Shadow DOM. It comes with some caveats, but doesn't require any polyfills. It is achieved by using PostCSS to transform the following: 当标签 `<style>` 具有该 `scoped` 属性时，其 CSS 将仅应用于当前组件的元素。这类似于 Shadow DOM 中的样式封装。它带有一些注意事项，但不需要任何 polyfills。它是通过使用 PostCSS 转换以下内容来实现的：

vue vue 格式

```
<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class="example">hi</div>
</template>
```

Into the following: 分为以下内容：

vue vue 格式

```
<style>
.example[data-v-f3f3eg9] {
  color: red;
}
</style>

<template>
  <div class="example" data-v-f3f3eg9>hi</div>
</template>
```

### Child Component Root Elements 子组件根元素[​](#child-component-root-elements)

With `scoped`, the parent component's styles will not leak into child components. However, a child component's root node will be affected by both the parent's scoped CSS and the child's scoped CSS. This is by design so that the parent can style the child root element for layout purposes. 使用 `scoped` 时，父组件的样式不会泄漏到子组件中。但是，子组件的根节点将受到父组件的作用域 CSS 和子组件的作用域 CSS 的影响。这是设计使然，以便父元素可以为子根元素设置样式以进行布局。

### Deep Selectors  深度选择器[​](#deep-selectors)

If you want a selector in `scoped` styles to be "deep", i.e. affecting child components, you can use the `:deep()` pseudo-class: 如果你希望样式中的 `scoped` 选择器是 “深度” 的，即影响子组件，你可以使用 `:deep()` 伪类：

vue vue 格式

```
<style scoped>
.a :deep(.b) {
  /* ... */
}
</style>
```

The above will be compiled into: 以上内容将汇编成：

css CSS 的

```
.a[data-v-f3f3eg9] .b {
  /* ... */
}
```

TIP 提示

DOM content created with `v-html` are not affected by scoped styles, but you can still style them using deep selectors. 创建的 `v-html` DOM 内容不受作用域样式的影响，但您仍然可以使用深度选择器来设置它们的样式。

### Slotted Selectors  开槽选择器[​](#slotted-selectors)

By default, scoped styles do not affect contents rendered by `<slot/>`, as they are considered to be owned by the parent component passing them in. To explicitly target slot content, use the `:slotted` pseudo-class: 默认情况下，作用域样式不会影响 `<slot/>` 呈现的内容，因为它们被视为由传入它们的父组件拥有。要显式定位槽内容，请使用 `:slotted` 伪类：

vue vue 格式

```
<style scoped>
:slotted(div) {
  color: red;
}
</style>
```

### Global Selectors  全局选择器[​](#global-selectors)

If you want just one rule to apply globally, you can use the `:global` pseudo-class rather than creating another `<style>` (see below): 如果您只想全局应用一个规则，则可以使用伪类， `:global` 而不是创建另一个 `<style>` （见下文）：

vue vue 格式

```
<style scoped>
:global(.red) {
  color: red;
}
</style>
```

### Mixing Local and Global Styles 混合本地和全球风格[​](#mixing-local-and-global-styles)

You can also include both scoped and non-scoped styles in the same component: 您还可以在同一组件中同时包含作用域样式和非作用域样式：

vue vue 格式

```
<style>
/* global styles */
</style>

<style scoped>
/* local styles */
</style>
```

### Scoped Style Tips  作用域样式提示[​](#scoped-style-tips)

* **Scoped styles do not eliminate the need for classes**. Due to the way browsers render various CSS selectors, `p { color: red }` will be many times slower when scoped (i.e. when combined with an attribute selector). If you use classes or ids instead, such as in `.example { color: red }`, then you virtually eliminate that performance hit. 作用域样式并不能消除对类的需求。由于浏览器呈现各种 CSS 选择器的方式， `p { color: red }` 在作用域内（即与属性选择器结合使用时）会慢很多倍。如果改用 classes 或 ids（例如 in `.example { color: red }` ），则实际上可以消除这种性能影响。

* **Be careful with descendant selectors in recursive components!** For a CSS rule with the selector `.a .b`, if the element that matches `.a` contains a recursive child component, then all `.b` in that child component will be matched by the rule. 在递归组件中使用后代选择器时要小心！对于带有选择器 `.a .b` 的 CSS 规则，如果匹配 `.a` 的元素包含递归子组件，则该子组件中的所有内容 `.b` 都将由规则匹配。

## CSS Modules  CSS 模块[​](#css-modules)

A `<style module>` tag is compiled as [CSS Modules](https://github.com/css-modules/css-modules) and exposes the resulting CSS classes to the component as an object under the key of `$style`: 标签 `<style module>` 被编译为 CSS 模块，并将生成的 CSS 类作为对象暴露给组件，其键为 `$style` ：

vue vue 格式

```
<template>
  <p :class="$style.red">This should be red</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

The resulting classes are hashed to avoid collision, achieving the same effect of scoping the CSS to the current component only. 对生成的类进行哈希处理以避免冲突，从而实现仅将 CSS 范围限定为当前组件的相同效果。

Refer to the [CSS Modules spec](https://github.com/css-modules/css-modules) for more details such as [global exceptions](https://github.com/css-modules/css-modules/blob/master/docs/composition.md#exceptions) and [composition](https://github.com/css-modules/css-modules/blob/master/docs/composition.md#composition). 有关更多详细信息，例如全局异常和组合，请参阅 CSS 模块规范。

### Custom Inject Name  自定义注入名称[​](#custom-inject-name)

You can customize the property key of the injected classes object by giving the `module` attribute a value: 您可以通过为 `module` 属性提供值来自定义注入的类对象的属性键：

vue vue 格式

```
<template>
  <p :class="classes.red">red</p>
</template>

<style module="classes">
.red {
  color: red;
}
</style>
```

### Usage with Composition API 与组合式 API 一起使用[​](#usage-with-composition-api)

The injected classes can be accessed in `setup()` and `<script setup>` via the `useCssModule` API. For `<style module>` blocks with custom injection names, `useCssModule` accepts the matching `module` attribute value as the first argument: 可以在 API 中 `setup()` 访问注入的类，也可以 `<script setup>` 通过 API 访问。 `useCssModule` 对于 `<style module>` 具有自定义注入名称的模块， `useCssModule` 接受匹配 `module` 的属性值作为第一个参数：

js JS 的

```
import { useCssModule } from 'vue'

// inside setup() scope...
// default, returns classes for <style module>
useCssModule()

// named, returns classes for <style module="classes">
useCssModule('classes')
```

## `v-bind()` in CSS   `v-bind()` 在 CSS 中[​](#v-bind-in-css)

SFC `<style>` tags support linking CSS values to dynamic component state using the `v-bind` CSS function:SFC `<style>` 标签支持使用 `v-bind` CSS 函数将 CSS 值链接到动态组件状态：

vue vue 格式

```
<template>
  <div class="text">hello</div>
</template>

<script>
export default {
  data() {
    return {
      color: 'red'
    }
  }
}
</script>

<style>
.text {
  color: v-bind(color);
}
</style>
```

The syntax works with [`<script setup>`](https://vuejs.org/api/sfc-script-setup), and supports JavaScript expressions (must be wrapped in quotes): 该语法适用于 `<script setup>` ，并支持 JavaScript 表达式（必须用引号括起来）：

vue vue 格式

```
<script setup>
import { ref } from 'vue'
const theme = ref({
    color: 'red',
})
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```

The actual value will be compiled into a hashed CSS custom property, so the CSS is still static. The custom property will be applied to the component's root element via inline styles and reactively updated if the source value changes. 实际值将被编译为经过哈希处理的 CSS 自定义属性，因此 CSS 仍然是静态的。自定义属性将通过内联样式应用于组件的根元素，并在源值更改时做出反应性更新。
