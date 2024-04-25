小知识，大挑战！本文正在参与 “[程序员必备小知识](https://juejin.cn/post/7008476801634680869 "https://juejin.cn/post/7008476801634680869")” 创作活动。

**本文同时参与** **[「掘力星计划」](https://juejin.cn/post/7012210233804079141 "https://juejin.cn/post/7012210233804079141")**  **，赢取创作大礼包，挑战创作激励金**

![Live2D (1).png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c07210db25b4af485766b04e52200b1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

### 前言

平时开发项目我们在使用第三方插件时，必须使用 element-ui 的某些组件需要修改样式时，老是需要加上 /deep/ 深度选择器，以前只是知道这样用，但是还不清楚他的原理。还有平时每个组件的样式都会加上 scoped，但是也不知道他具体的原理。今天我就带大家理解理解理解

### 1. Scoped CSS 的原理

#### 1.1 区别

先带大家看一下无设置`Scoped`与设置`Scoped`的区别在哪

**无设置`Scoped`**

```
<div class="login">登录</div>
<style>
.login {
    width: 100px;
    height: 100px
}
</style>
```

打包之后的结果是跟我们的代码一摸一样的，没有区别。

**设置`Scoped`**

```
<div class="login">登录</div>
<style scoped>
.login {
    width: 100px;
    height: 100px
}
</style>
```

打包之后的结果是跟我们的代码就有所区别了。如下：

```
<div data-v-257dda99b class="login">登录</div>
<style scoped>
.login[data-v-257dda99b] {
    width: 100px;
    height: 100px
}
</style>
```

> 我们通过上面的例子，不难发现多了一个 data-v-hash 属性，也就是说加了 scoped，PostCSS 给一个组件中的所有 dom 添加了一个独一无二的动态属性，然后，给 CSS 选择器额外添加一个对应的属性选择器来选择该组件中 dom，这种做法使得样式只作用于含有该属性的 dom—— 组件内部 dom，可以使得组件之间的样式不互相污染。

#### 1.2 原理

Vue 的作用域样式 Scoped CSS 的实现思路如下：

1. 为每个组件实例（注意：是组件的实例，不是组件类）生成一个能唯一标识组件实例的标识符，我称它为组件实例标识，简称实例标识，记作 InstanceID；
2. 给组件模板中的每一个标签对应的 Dom 元素（组件标签对应的 Dom 元素是该组件的根元素）添加一个标签属性，格式为 `data-v-实例标识`，示例：`<div data-v-e0f690c0="" >`；
3. 给组件的作用域样式 `<style scoped>` 的每一个选择器的最后一个选择器单元增加一个属性选择器 `原选择器[data-v-实例标识]` ，示例：假设原选择器为 `.cls #id > div`，则更改后的选择器为 `.cls #id > div[data-v-e0f690c0]`；

#### 1.3 特点

1. 将组件的样式的作用范围限制在了组件自身的标签，即：组件内部，包含子组件的根标签，但不包含子组件的除根标签之外的其它标签；所以 组件的 css 选择器也不能选择到子组件及后代组件的中的元素（子组件的根元素除外）；

   > 因为它给选择器的最后一个选择器单元增加了属性选择器 `[data-v-实例标识]` ，而该属性选择器只能选中当前组件模板中的标签；而对于子组件，只有根元素 即有 能代表子组件的标签属性 `data-v-子实例标识`，又有能代表当前组件（父组件）的 签属性 `data-v-父实例标识`，子组件的其它非根元素，仅有能代表子组件的标签属性 `data-v-子实例标识`；

2. 如果递归组件有后代选择器，则该选择器会打破特性 1 中所说的子组件限制，从而选中递归子组件的中元素；

   > 原因：假设递归组件 A 的作用域样式中有选择器有后代选择器 `div p` ，则在每次递归中都会为本次递归创建新的组件实例，同时也会为该实例生成对应的选择器 `div p[data-v-当前递归组件实例的实例标识]`，对于递归组件的除了第一个递归实例之外的所有递归实例来说，虽然 `div p[data-v-当前递归组件实例的实例标识]` 不会选中子组件实例（递归子组件的实例）中的 p 元素（具体原因已在特性 1 中讲解），但是它会选中当前组件实例中所有的 p 元素，因为 父组件实例（递归父组件的实例）中有匹配的 div 元素；

### 2. >>>、/deep/、::v-deep 深度选择器的原理

#### 2.1 例子

实际开发中遇到的例子：当我们开发一个页面使用了子组件的时候，如果这时候需要改子组件的样式，但是又不影响其他页面使用这个子组件的样式的时候。比如：

**父组件：Parent.vue**

```
<template>
  <div class="parent" id="app">
    <h1>我是父组件</h1>
    <div class="gby">
      <p>我是一个段落</p>
    </div>

    <child></child>
  </div>
</template>

<style scoped>
  .parent {
    background-color: green;
  }

  .gby p {
    background-color: red;
  }
  // 把子组件的背景变成红色，原组件不变
  .child .dyx p {
    background-color: red;
  }
</style>
```

**子组件：Child.vue**

```
<template>
    <div class="child">
        <h1>我是子组件</h1>
        <div class="dyx">
            <p>我是子组件的段落</p>
        </div>
    </div>
</template>

<style scoped>
    .child .dyx p {
        background-color: blue;
    }
</style>
```

这时候我们就会发现没有效果。但是如果我们使用`>>>`、`/deep/`、`::v-deep`三个深度选择器其中一个就能实现了。看代码:

```
<template>
  <div class="parent" id="app">
    <h1>我是父组件</h1>
    <div class="gby">
      <p>我是一个段落</p>
    </div>

    <child></child>
  </div>
</template>

<style scoped>
  .parent {
    background-color: green;
  }

  .gby p {
    background-color: red;
  }
  // 把子组件的背景变成红色，原组件不变
  ::v-deep .child .dyx p {
    background-color: red;
  }
</style>
```

#### 2.2 原理

如果你希望 scoped 样式中的一个选择器能够选择到子组 或 后代组件中的元素，我们可以使用 `深度作用选择器`，它有三种写法：

* `>>>`，示例： `.gby div >>> #dyx p`
* `/deep/`，示例： `.gby div /deep/ #dyx p` 或 `.gby div/deep/ #dyx p`
* `::v-deep`，示例： `.gby div::v-deep #dyx p` 或 `.gby div::v-deep #dyx p`

它的原理与 Scoped CSS 的原理基本一样，只是第 3 步有些不同（前 2 步一样），具体如下：

1. 为每个组件实例（注意：是组件的实例，不是组件类）生成一个能唯一标识组件的标识符，我称它为实例标识，记作 InstanceID；
2. 给组件模板中的每一个标签对应的 Dom 元素（组件标签对应的 Dom 元素是该组件的根元素）添加一个标签属性，格式为 `data-v-实例标识`，示例：`<div data-v-e0f690c0="" >`；
3. 给组件的作用域样式 `<style scoped>` 的每一个深度作用选择器前面的一个选择器单元增加一个属性选择器`[data-v-实例标识]` ，示例：假设原选择器为 `.cls #id >>> div`，则更改后的选择器为 `.cls #id[data-v-e0f690c0] div`；

因为 Vue 不会为深度作用选择器后面的选择器单元增加 属性选择器`[data-v-实例标识]`，所以，后面的选择器单元能够选择到子组件及后代组件中的元素；

> 这篇就讲到这里了，讲一下我个人的使用习惯，我个人是比较偏向使用`::v-deep`这个深度选择器，毕竟这个兼容性最好，之前被其他两个坑过，所以都不敢用。我把被坑的经历也写出来，有兴趣的小伙伴可以去看一下。[解决 sass 插件遇到的问题（坑）会不会成为前端的必备知识](https://juejin.cn/post/7020214695990820872 "https://juejin.cn/post/7020214695990820872")
