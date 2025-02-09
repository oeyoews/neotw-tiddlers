<!---->

<!---->

<!---->

![v-slot](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/4/12/16a11af663103c7e~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

## slot 是什么

slot，也称**插槽**，可以类比为插卡式的 FC 游戏机，游戏机（子组件）暴露卡槽（插槽）让用户插入不同的游戏磁条（自定义内容），游戏机会读取并加载磁条里的游戏。\
Vue 的 slot，是**组件的一块 HTML 模版**，这块模版**由使用组件者即父组件提供**。可以说是子组件暴露的一个让父组件传入自定义内容的接口。

![FC-slot](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/4/12/16a122cf219755de~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

## slot 的作用

让用户可以拓展组件，去更好地复用组件和对其做定制化处理。\
举一些例子，比如布局组件、表格列、下拉选项

## slot 怎么用

slot 的用法可以分为三类，分别是**默认插槽、具名插槽和作用域插槽**\
**子组件中：**

* 插槽用`<slot>`标签来确定渲染的位置，里面放如果父组件没传内容时的后备内容
* **具名插槽**用`name`属性来表示插槽的名字，不传为默认插槽
* **作用域插槽**在作用域上绑定属性来将子组件的信息传给父组件使用，这些属性会被挂在父组件 slot-scope 接受的对象上。

```
// Child.vue
<template>
  <div>
    <main>
    <!-- 默认插槽 -->
        <slot>
          <!-- slot内为后备内容 -->
          <h3>没传内容</h3>
        </slot>
    </main>

    <!-- 具名插槽 -->
    <header>
        <slot name="header">
          <h3>没传header插槽</h3>
        </slot>
    </header>

    <!-- 作用域插槽 -->
    <footer>
        <slot name="footer" testProps="子组件的值">
          <h3>没传footer插槽</h3>
        </slot>
    <footer>
  </div>
</template>

<style scoped>
div{
 border: 1px solid #000;  
}
</style>
```

**父组件中在使用时：**

* **默认插槽**的话直接在子组件的标签内写入内容即可
* **具名插槽**是在默认插槽的基础上加上`slot`属性，值为子组件插槽`name`属性值
* **作用域插槽**则是通过`slot-scope`获取子组件的信息，在内容中使用。这里可以用解构语法去直接获取想要的属性

```
// Parent.vue
<child>
  <!-- 默认插槽 -->
  <div>默认插槽</div>  
  <!-- 具名插槽 -->
  <div slot="header">具名插槽header</div>
  <!-- 作用域插槽 -->
  <div slot="footer" slot-scope="slotProps">
    {{slotProps.testProps}}
  </div>
</child>
```

**渲染结果为**

![slot-demo](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/4/12/16a123489dbab815~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

## v-slot

> 在 vue2.6 中，上述的 API 被软废弃（3.0 正式废弃），取而代之的是内置指令 v-slot，可以缩写为【#】

**子组件用法保持不变**，父组件中

* `slot`属性弃用，具名插槽通过指令参数`v-slot:插槽名` 的形式传入，可以简化为 `#插槽名`。
* `slot-scope`属性弃用，作用域插槽通过`v-slot:xxx="slotProps"`的 slotProps 来获取子组件传出的属性
* `v-slot`属性只能在`<template>`上使用，但在【**只有默认插槽时**】可以在组件标签上使用

```
//Parent
<template>
  <child>
   <!--默认插槽-->
   <template v-slot>
     <div>默认插槽</div>
   </template>
   <!--具名插槽-->
   <template #header>
     <div>具名插槽</div>
   </template>
   <!--作用域插槽-->
   <template #footer="slotProps">
     <div>
      {{slotProps.testProps}}
     </div>
   </template>
  <child>
</template>
```

### 拓展用法：

1. 同样可以通过解构获取`v-slot={user}`,\
   还可以重命名`v-slot="{user: newName}"`和定义默认值`v-slot="{user = '默认值'}"`
2. 插槽名可以是动态变化的 `v-slot:[slotName]`

### 注意：

1. 默认插槽名为`default`，可以省略 default 直接写`v-slot`，\
   缩写为 #时不能不写参数，写成`#default`（这点所有指令都一样，v-bind、v-on）
2. 多个插槽混用时，v-slot 不能省略 default

## 作用域插槽的原理

slot 本质上是返回 VNode 的函数，一般情况下，Vue 中的组件要渲染到页面上需要经过\
`template >> render function >> VNode >> DOM` 过程。 组件挂载的本质就是执行渲染函数得到 VNode，至于 data/props/computed 这些属性都是给 VNode 提供数据来源。

在 2.5 之前，如果是普通插槽就**直接是 VNode**的形式了，而如果是作用域插槽，由于子组件需要在父组件访问子组件的数据，所以父组件下是一个**未执行的函数** `(slotScope) => return h('div', slotScope.msg)` ，接受子组件的 slotProps 参数，在子组件渲染实例时会调用该函数传入数据。

在 2.6 之后，两者合并，普通插槽也变成一个函数，只是不接受参数了。

## 大纲速记：

![outline](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/4/13/16a1253a89d07261~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

> 仅作学习记录。如有错漏之处，敬请指正

## 参考

[vue 文档 - 插槽](https://link.juejin.cn/?target=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fguide%2Fcomponents-slots.html "https://cn.vuejs.org/v2/guide/components-slots.html")\
[如何理解 Vue.js 的组件中的 slot？](https://link.juejin.cn/?target=https%3A%2F%2Fwww.zhihu.com%2Fquestion%2F37548226%2Fanswer%2F609289491 "https://www.zhihu.com/question/37548226/answer/609289491")\
[v-slot 由来 - RFC](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Frfcs%2Fblob%2Fmaster%2Factive-rfcs%2F0001-new-slot-syntax.md "https://github.com/vuejs/rfcs/blob/master/active-rfcs/0001-new-slot-syntax.md")

<!---->

![avatar](https://p6-passport.byteacctimg.com/img/user-avatar/cd5faf465f1a5bb7f7360e23fdb3f8fa~50x50.awebp)

<!---->
