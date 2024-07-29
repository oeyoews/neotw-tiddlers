## 前言

大家好，我是[webfansplz](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebfansplz "https://github.com/webfansplz"). 继[将 Vue 渲染到嵌入式液晶屏](https://link.juejin.cn/?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F333179202 "https://zhuanlan.zhihu.com/p/333179202")后，今天要跟大家分享的是如何将 Vue 渲染到命令行工具 :). 关于命令行工具，大家应该都比较熟悉了，比如 vue-cli、Vite 等。我们在编写前端应用面向用户时，通常会非常关注用户体验，作为开发者，我们在使用工具时，它给予我们的开发者体验 (DX) 我们也会十分关注。团队在今年有自研脚手架的计划，作为前端，我就在想是否能有较低成本的研发方案能让团队的小伙伴参与进来，大家可以像编写前端应用一样搞定它。因此，[Temir](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebfansplz%2Ftemir "https://github.com/webfansplz/temir")应运而生.

## Temir

### 介绍

[Temir](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebfansplz%2Ftemir "https://github.com/webfansplz/temir"), 一个用 Vue 组件来编写命令行界面应用的工具。开发者只需要使用 Vue 就可以编写命令行应用，不需要任何额外的学习成本.

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d4d0d05f59d6476cab4e28bcbff8e9a3~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

```
<script lang="ts" setup>
import { ref } from '@vue/runtime-core'
import { TBox, TText } from '@temir/core'
const counter = ref(0)
setInterval(() => {
  counter.value++
}, 100)
</script>

<template>
  <TBox>
    <TText color="green">
      {{ counter }} tests passed
    </TText>
  </TBox>
</template>
```

### 组件

[Temir](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebfansplz%2Ftemir "https://github.com/webfansplz/temir")提供了一些基础组件帮助开发者编写与扩展命令行工具:

#### 文本组件 (Text)

文本组件可以显示文本，将其样式更改为粗体、下划线、斜体或删除线.

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e2ddc1f642140b9ad62af92589d8cfd~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

```
<TText color="green">
  I am green
</TText>

<TText color="black" background-color="white">
  I am black on white
</TText>

<TText color="white">
  I am white
</TText>

<TText :bold="true">
  I am bold
</TText>

<TText :italic="true">
  I am italic
</TText>

<TText :underline="true">
  I am underline
</TText>

<TText :strikethrough="true">
  I am strikethrough
</TText>

<TText :inverse="true">
  I am inversed
</TText>
```

#### 盒子组件 (Box)

`<Box>`是构建布局必不可少的 Temir 组件。就像在浏览器中`<div style='display: flex'>.`它提供了一些构建布局的常用属性，比如尺寸、内外边距、对齐方式等.

```
<template>
  <TBox justify-content="flex-start">
    <TText>X</TText>
  </TBox>
  // [X      ]

  <TBox justify-content="center">
    <TText>X</TText>
  </TBox>
  // [   X   ]

  <TBox justify-content="flex-end">
    <TText>X</TText>
  </TBox>
  // [      X]

  <TBox justify-content="space-between">
    <TText>X</TText>
    <TText>Y</TText>
  </TBox>
  // [X      Y]

  <TBox justify-content="space-around">
    <TText>X</TText>
    <TText>Y</TText>
  </TBox>
  // [  X   Y  ]
</template>
```

#### 换行组件 (Newline)

添加一个或多个换行符 (\n)。 必须在`<Text>`组件中使用。

```
<script>
import { TBox, TNewline, TText } from '@temir/core'
</script>

<template>
  <TBox>
    <TText>
      <TText color="green">
        Hello
      </TText>
      <TNewline />
      <TText color="red">
        World
      </TText>
    </TText>
  </TBox>
</template>
```

#### 填充组件 (Spacer)

沿其包含布局的主轴展开的灵活空间。 作为填充元素之间所有可用空间的快捷方式，它非常有用。

例如，在具有默认伸缩方向 (`row`) 的`<Box>`中使用`<Spacer>`将把 "Left" 定位到左边，并将 "Right" 推到右边。

```
<script lang="ts" setup>
import { TBox, TSpacer, TText } from '@temir/core'
</script>

<template>
  <TBox>
    <TText>Left</TText>
    <TSpacer />
    <TText>Right</TText>
  </TBox>
</template>
```

#### 超链接组件 (Link)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/889cb476baa14a05a62187b14934135a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

```
<script lang="ts" setup>
import { TBox, TText } from '@temir/core'
import TLink from '@temir/link'
</script>

<template>
  <TBox
    :margin="5"
    width="20"
    border-style="round"
    justify-content="center"
  >
    <TLink url="https://github.com">
      <TText color="yellow">
        Hi
      </TText>
      <TText color="cyan">
        Github
      </TText>
    </TLink>
  </TBox>
</template>
```

#### 加载中组件 (Spinner)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e784daed86dd4111864456a5cf37c454~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

```
<script lang="ts" setup>
import { TBox, TText } from '@temir/core'
import TSpinner from '@temir/spinner'
</script>

<template>
  <TBox
    :margin="5"
    width="20"
    border-style="round"
    justify-content="center"
  >
    <TText>
      <TText color="yellow">
        <TSpinner />
      </TText>
      Loading
    </TText>
  </TBox>
</template>
```

#### 标签页组件 (Tab)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f7d55c2c0774ced8fc0b5e0ec004d2c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

```
<script lang="ts" setup>
import { computed, ref } from '@vue/runtime-core'
import { TBox, TText } from '@temir/core'
import { TTab, TTabs } from '@temir/tab'

const tabs = ['Vue', 'React', 'Angular', 'Solid', 'Svelte']
const activeIndex = ref(0)
const selectedText = computed(() => tabs[activeIndex.value])
</script>

<template>
  <TBox>
    <TText>
      Selected Text :
      <TText color="red">
        {{ selectedText }}
      </TText>
    </TText>
  </TBox>

  <TBox>
    <TTabs :on-change="(index) => activeIndex = +index">
      <TTab v-for="item in tabs" :key="item">
        {{ item }}
      </TTab>
    </TTabs>
  </TBox>
</template>
```

#### 选择组件

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77d70f8b554c419c8f9bb33d72b12536~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

```
<script lang="ts" setup>
import TSelectInput from '@temir/select-input'

const items = [
  {
    label: 'Vue',
    value: 'Vue',
  },
  {
    label: 'Vite',
    value: 'Vite',
  },
  {
    label: 'Temir',
    value: 'Temir',
  },
]
function onSelect(value) {
  console.log('selected', value)
}
</script>

<template>
  <TSelectInput :items="items" :on-select="onSelect" />
</template>
```

### 安装

```
npm install @temir/core
```

### 使用

```
<script lang="ts" setup>
import { ref } from '@vue/runtime-core'
import { TBox, TText } from '@temir/core'
const counter = ref(0)
setInterval(() => {
  counter.value++
}, 100)
</script>

<template>
  <TBox>
    <TText color="green">
      {{ counter }} tests passed
    </TText>
  </TBox>
</template>
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fab409cb20f74961b1742aec925e8737~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### HMR 支持

前面我们提到了开发者体验 (DX), 在现在的前端工程中，对开发者很有帮助且提效的就是 HMR, 这么香的东西[Temir](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebfansplz%2Ftemir "https://github.com/webfansplz/temir")没有理由不拥有它，话不多说，直接展示:

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0d571104f94446abaee88f5d8b1216c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 开箱即用

使用[Temir](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebfansplz%2Ftemir "https://github.com/webfansplz/temir")定制化 CLI 非常简单，我们提供了[@temir/cli](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebfansplz%2Ftemir%2Ftree%2Fmain%2Fpackages%2Fcli "https://github.com/webfansplz/temir/tree/main/packages/cli")帮助你快速构建一个基于[Temir](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebfansplz%2Ftemir "https://github.com/webfansplz/temir")的 CLI.

```
mkdir my-temir-cli

cd my-temir-cli

touch main.ts

npm install @temir/cl

# Dev (开发)

temir main.ts

# Build (打包)

temir build main.ts
```

你可以通过下载这个 [例子](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebfansplz%2Ftemir%2Ftree%2Fmain%2Fexamples%2Fhi-temir "https://github.com/webfansplz/temir/tree/main/examples/hi-temir") 来快速开始，你也可以打开 [repl.it sandbox](https://link.juejin.cn/?target=https%3A%2F%2Freplit.com%2F%40webfansplz%2Fhi-temir%3Fv%3D1 "https://replit.com/@webfansplz/hi-temir?v=1")来在线体验和尝试它。

## 演示

### [Hi Temir](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebfansplz%2Ftemir%2Ftree%2Fmain%2Fexamples%2Fhi-temir "https://github.com/webfansplz/temir/tree/main/examples/hi-temir")

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d65340f2e04640cca58239f2ace707d9~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### [Borders](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebfansplz%2Ftemir%2Ftree%2Fmain%2Fexamples%2Fborders "https://github.com/webfansplz/temir/tree/main/examples/borders")

### [Table](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebfansplz%2Ftemir%2Ftree%2Fmain%2Fexamples%2Ftable "https://github.com/webfansplz/temir/tree/main/examples/table")

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18eff35d9ea24f77a4c01ee86b49f465~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### [Vitest](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebfansplz%2Ftemir%2Ftree%2Fmain%2Fexamples%2Fvitest "https://github.com/webfansplz/temir/tree/main/examples/vitest")

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6af4e6e9e1e2452eb4127d9a3ebf1bfd~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## 实现

* createRenderer

Temir 的实现主要得益于 Vue3 出色的跨平台能力，我们可以通过[createRenderer](https://link.juejin.cn/?target=https%3A%2F%2Fv3.cn.vuejs.org%2Fapi%2Fglobal-api.html%23createrenderer "https://v3.cn.vuejs.org/api/global-api.html#createrenderer") API 创建一个自定义渲染器，通过创建宿主环境中对应的 Node 和 Element, 并对元素进行增删改查操作.

* Yoga

Vue 提供了跑在命令行界面的接口，那我们就还缺少一个布局引擎就能把 Vue 跑在命令行工具了.Temir 使用了 Yoga, 一款 Flexbox 布局引擎。使用你在构建浏览器应用时使用过的类似 CSS 的属性，为你的 CLI 构建出色的用户界面。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d2044cda90874fa18083838430bf621e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## 致谢

* 这个项目的灵感来源于[ink](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvadimdemedes%2Fink "https://github.com/vadimdemedes/ink")

* [vite-node](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fantfu%2Fvite-node "https://github.com/antfu/vite-node")为实现 HMR 提供了强力的支持

## 结语

文章到这里就结束了，如果我的文章和项目对你有所启发和帮助，请给一个[star](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebfansplz%2Ftemir "https://github.com/webfansplz/temir")支持作者 ✌
