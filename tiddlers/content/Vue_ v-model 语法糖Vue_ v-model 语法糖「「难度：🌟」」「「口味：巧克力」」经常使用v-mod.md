<!---->

<!---->

<!---->

<!---->

## Vue: v-model 语法糖

**「「难度：🌟」」**

**「「口味：巧克力」」**

经常使用 v-model 却不知道它的原理 做个备忘

* 栗子：使用 V-model 双向数据绑定事件时

```
<input v-model = 'something'>
```

* 原理：只是一个语法糖

```
<input v-bind:value="something" v-on:input="something=$event.target.value">
```

* 所以在组件里使用的时候，相当于下面的简写:

```
<custom v-bind:value="something" v-on:input="something = $event.target.value"></custom>
```

想要组件 v-model 生效 它必须:

* **「接收一个 value 属性」**
* **「在 value 值改变时 触发 input 事件」**

使用 v-model

```
<template>
  <input v-model="value" />
</template>

<script>
export default {
  conponents:{input}
  data(){
    return {
    value: "我是文本框里的value值"
    }
  }
}
</script>
```

使用 v-bind 获取 value v-on 绑定 input 触发事件

```
<template>
  <input :value="value" @input="handleChange" />
</template>
<script>
  export default {
    components: { input },
    data () {
      return {
        value: "我文本框里的vaLue值"
      }
    },
    methods: {
      handleChange (val) {
        this.value = val;
      }
    }
  }
</script>
```

### 结论

> v-model 的原理就是 v-bind 数据绑定 与 v-on 处理函数绑定的语法糖

> **「v-model 的使用限制」**

```
//主要在表单控件与组件上实现双向双向数据绑定
<select>
<textarea>
components组件
```

本文使用 [mdnice](https://link.juejin.cn/?target=https%3A%2F%2Fmdnice.com%2F%3Ffrom%3Djuejin "https://mdnice.com/?from=juejin") 排版

<!---->
