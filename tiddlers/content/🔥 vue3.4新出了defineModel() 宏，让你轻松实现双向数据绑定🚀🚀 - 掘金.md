## 前言

最近在阅读**vue 官方中文文档**时发现`defineModel()`**宏**，已经加入了`v-model`类目教程下面，记得之前刚出来还是实验性阶段的时候只在英文文档中有`defineModel()`宏的相关介绍。目前，在 vue 官方文档中也明确指出，从 `Vue 3.4` 开始，`v-model`推荐的实现方式是使用[`defineModel()`](https://link.juejin.cn/?target=https%3A%2F%2Fcn.vuejs.org%2Fapi%2Fsfc-script-setup.html%23definemodel "https://cn.vuejs.org/api/sfc-script-setup.html#definemodel") 宏，**它**已经可以正式投入使用了！下面我们开始进入`defineModel()`宏的使用教程，体验一下它所带来的便利。

## defineModel () 宏

## 简介

`defineModel()` 返回的值是一个 **ref**。它可以像其他 **ref** 一样被访问以及修改，不过它能起到在父组件和当前变量之间的双向绑定的作用：

* 它的 `.value` 和父组件的 `v-model` 的值同步；
* 当它被子组件变更了，会触发父组件绑定的值一起更新。

## 底层机制

`defineModel` 是一个便利宏。 编译器将其展开为以下内容：

* 一个名为 `modelValue` 的 prop，本地 ref 的值与其同步；
* 一个名为 `update:modelValue` 的事件，当本地 ref 的值发生变更时触发。

## 默认 v-model

**父组件 Parent.vue**

```
<template>
  <Child v-model="value"></Child>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
</script>
```

**子组件 Child.vue**

```
<!-- vue3.4用法 -->
<template>
  <input type="text" v-model="model">
</template>

<script setup>
// model变量名称可随意取
const model = defineModel()
</script>
```

```
<!-- vue3.4前用法 -->
<template>
  <input
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>
```

## 带参数的 v-model

**父组件 Parent.vue**

```
<template>
  <Child v-model:name="myName"></Child>
</template>

<script setup>
import { ref } from 'vue'

const myName = ref('')
</script>
```

**子组件 Child.vue**

```
<!-- vue3.4用法 -->
<template>
  <input type="text" v-model="name">
</template>

<script setup>
const name = defineModel('name')
</script>
```

```
<!-- vue3.4前用法 -->
<template>
  <input
    type="text"
    :value="name"
    @input="emit('update:name', $event.target.value)"
  />
</template>

<script setup>
const props = defineProps(['name'])
const emit = defineEmits(['update:name'])
</script>
```

## 同时绑定多个 v-model

**父组件 Parent.vue**

```
<template>
  <Child v-model:name="name" v-model:address="address"></Child>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const address = ref('')
</script>
```

**子组件 Child.vue**

```
<!-- vue3.4用法 -->
<template>
  <input type="text" v-model="name">
  <input type="text" v-model="address">
</template>

<script setup>
const name = defineModel('name')
const address = defineModel('address')
</script>
```

```
<!-- vue3.4前用法 -->
<template>
  <input
    type="text"
    :value="name"
    @input="$emit('update:name', $event.target.value)"
  />
  <input
    type="text"
    :value="address"
    @input="$emit('update:address', $event.target.value)"
  />
</template>

<script setup>
defineProps(['name', 'address'])
defineEmits(['update:name', 'update:address'])
</script>
```

## 自定义 v-model 修饰符

**父组件 Parent.vue**

```
<template>
  <Child v-model.capitalize="foo" v-model:content.capitalize="bar"></Child>
</template>

<script setup>
import { ref } from 'vue'

const foo = ref('hello')
const bar = ref('hello')
</script>
```

**子组件 Child.vue**

```
<!-- vue3.4用法 -->
<template>
  <input v-model="model" />
  <input v-model="content" />
  {{ model }}--{{ content }}
</template>

<script setup>
const [model, modifiers] = defineModel({
  // 可根据需求在set或者get其一中做处理相关逻辑
  set(value) {
    // 设置时设置首字母大写
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  },
  get(value) {
    // 读取时设置首字母大写
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})

const [content, contentmodifiers] = defineModel('content', {
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})

console.log(modifiers)  // {capitalize: true}
console.log(contentmodifiers)  // {capitalize: true}
</script>
```

```
<!-- vue3.4前用法 -->
<template>
  <input
    type="text"
    :value="name"
    @input="$emit('update:name', $event.target.value)"
  />
  <input
    type="text"
    :value="address"
    @input="$emit('update:address', $event.target.value)"
  />
</template>

<script setup>
defineProps(['name', 'address'])
defineEmits(['update:name', 'update:address'])
</script>
```

```
<!-- vue3.4前用法 -->
<template>
  <input type="text" :value="modelValue" @input="emitValue" />
  <input type="text" :value="content" @input="emitContent" />
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  content: String,
  modelModifiers: { default: () => ({}) },
  contentModifiers: { default: () => ({}) }
})

const emit = defineEmits(['update:modelValue', 'update:content'])

function emitValue(e) {
  // input事件触发时设置首字母大写
  let value = e.target.value
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emit('update:modelValue', value)
}
function emitContent(e) {
  let value = e.target.value
  if (props.contentModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emit('update:content', value)
}
</script>
```

## defineModel () 宏 - 额外的 prop 选项

**父组件 Parent.vue**

```
<template>
  <Child v-model="name" v-model:address="address"></Child>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('李四')
const address = ref()
</script>
```

**子组件 Child.vue**

```
<!-- vue3.4用法 -->
<template>
  <input type="text" v-model="name">
  <input type="text" v-model="address">
</template>

<script setup>
const name = defineModel({
  // 是否必传
  required: true,
  // 默认值
  default: '张三',
  // 数据类型
  type: String,
  // 校验器
  validator: (val) => {
    // 验证值必须是张三、李四，否则会发出警告
    return ['张三', '李四'].includes(val)
  }
})
const address = defineModel('address', {
  required: false,
  default: '稀土掘金'
})
</script>
```

```
<!-- vue3.4前用法 -->
<template>
  <input
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
  <input
    :value="address"
    @input="emit('update:address', $event.target.value)"
  />
</template>

<script setup>
const props = defineProps({
  modelValue: {
     // 是否必传
    required: true,
    // 默认值
    default: '张三',
    // 数据类型
    type: String,
    // 校验器
    validator: (val) => {
       // 验证值必须是张三、李四，否则会发出警告
       return ['张三', '李四'].includes(val)
    }
  },
  address: {
    required: false,
    default: '稀土掘金'
  }
})

const emit = defineEmits(['update:modelValue', 'update:address'])

</script>
```

**注意：** 如果为 `prop` 设置了一个 `default` 值且父组件没有为该 `prop `提供任何值，会导致父组件与子组件之间不同步。在上面的示例中，父组件的 `address` 是 **undefined**，而子组件的 `address` 是 **稀土掘金**：

**父组件中打印的值：**

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ece73bca69b42d385f94b864127f41e~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=456\&h=105\&s=3493\&e=png\&b=ffffff)

**子组件中的值：**

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bab75389c2ce43dc932abb262b2b9dff~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=736\&h=166\&s=5077\&e=png\&b=ffffff)

**当在输入框修改值后才可同步父组件中的值！**

## 结语

从以上`Vue3.4`和`Vue3.4`**之前**实现双向数据绑定的**例子**的对比中可发现，[`defineModel()`](https://link.juejin.cn/?target=https%3A%2F%2Fcn.vuejs.org%2Fapi%2Fsfc-script-setup.html%23definemodel "https://cn.vuejs.org/api/sfc-script-setup.html#definemodel") **宏** 对于我们实现组件的双向数据绑定提供了诸多便利，代码也变得更加简洁！

如果想了解更多关于**宏**的相关信息，可参考一位掘友的文章[vue3 的宏到底是什么东西？](https://juejin.cn/post/7335721246931189795 "https://juejin.cn/post/7335721246931189795")
