<!---->

<!---->

<!---->

<!---->

> 哈喽，大家好 我是`xy`👨🏻‍💻。不少同学可能没有发现，`Vue3.2` 新增了一个指令 `v-memo`, 引入这个指令的目的是帮助大家更好的为我们的应用做`性能优化`💪

## v-memo 官方定义

* **「📚 期望的绑定值类型：」**`any[]`

* **「📚 详细信息」**

  缓存一个模板的子树。在元素和组件上都可以使用。为了实现缓存，该指令需要传入一个固定长度的依赖值数组进行比较。如果数组里的每个值都与最后一次的渲染相同，那么整个子树的更新将被跳过。举例来说：

```
  <div v-memo="[valueA, valueB]">
    ...
  </div>
```

当组件重新渲染，如果 `valueA` 和 `valueB` 都保持不变，这个 `<div>` 及其子项的所有更新都将被跳过。实际上，甚至虚拟 `DOM` 的 `vnode` 创建也将被跳过，因为缓存的子树副本可以被重新使用。

正确指定缓存数组很重要，否则应该生效的更新可能被跳过。`v-memo` 传入空依赖数组 (`v-memo="[]"`) 将与 `v-once` 效果相同。

## 我对 v-memo 的理解

简单理解：`v-memo` 接受一个依赖的`数组`，依赖的数组变化，`v-memo` 所对应的 `DOM` 包括子集将会`重新渲染`，反过来说，如果依赖的`数组不变`，即使整组件重新渲染了，`v-memo` 所对应的 `DOM` 包括子集更新都将被`跳过`

另外，依赖的数组接受一个或多个值 `v-memo="[valueOne, valueTwo]"`，也接受像 `v-memo="myValue === true"`这样的表达式。

如果用一个`空数组`调用 `v-memo` 相当于使用 `v-once`，只会`渲染`该部分组件`一次`。

## 与 `v-for` 一起使用

`v-memo` 仅用于性能至上场景中的微小优化，应该很少需要。最常见的情况可能是有助于渲染海量 `v-for` 列表 (长度超过 1000 的情况)：

```
<div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
  <p>ID: {{ item.id }} - selected: {{ item.id === selected }}</p>
  <p>...more child nodes</p>
</div>
```

当组件的 `selected` 状态改变，默认会重新创建大量的 vnode，尽管绝大部分都跟之前是一模一样的。`v-memo` 用在这里本质上是在说 “只有当该项的被选中状态改变时才需要更新”。这使得每个选中状态没有变的项能完全重用之前的 vnode 并跳过差异比较。注意这里 memo 依赖数组中并不需要包含 `item.id`，因为 Vue 也会根据 item 的 `:key` 进行判断。

## 使用场景

假设后端返回来了 10000 条数据， 前端需要做筛选， 选出符合条件的数据进行展示， 如果没有符合条件的，则保持上次的搜索结果。

```
<template>
  <div class="home">
    <input type="text" v-model="value">
    <!-- v-memo中值若不发生变化，则不会进行更新 -->
    <ul v-memo="[shouldUpdate]">
        <li class="licss" v-for="item in arr" :key="item">
          {{ value }} -- {{ animalType[value] }}
        </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "@vue/reactivity"
import { watch } from "@vue/runtime-core"
const arr=new Array(10000)
const animalType={
  'mie':'🐏',
  'mo':'🐂',
  'miao':'🐱',
}
const value=ref('mie')
const shouldUpdate=ref(0)
// 监听value(输入框中的值)。
// 如果数据发生变化，并且在animalType对象中存在。试图进行更新。否则试图不进行更新。
watch(()=>value.value,()=>{
  if(Object.keys(animalType).includes(value.value)){
    shouldUpdate.value++
  }
})
</script>
```

## 写在最后

> `公众号`：`前端开发爱好者` 专注分享 `web` 前端相关`技术文章`、`视频教程`资源、热点资讯等，如果喜欢我的分享，给 🐟🐟 点一个`赞` 👍 或者 ➕`关注` 都是对我最大的支持。

大家好，我 xy, 是一名前端🤫 爱好：瞎折腾

如果你也是一名瞎折腾的前端欢迎加我微信交流哦...

[🤫一定要点我](https://juejin.cn/pin/7040966241468547109 "https://juejin.cn/pin/7040966241468547109")

<!---->
