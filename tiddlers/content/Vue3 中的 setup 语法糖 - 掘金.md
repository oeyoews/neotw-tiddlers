`<script setup>` 是在单文件组件 (SFC) 中使用组合式 API 的编译时**语法糖**。当同时使用 SFC 与组合式 API 时该语法是默认推荐。相比于普通的 `<script>` 语法，它具有更多**优势**：

* 更少的样板内容，更简洁的代码。**不需要 return** 响应式数据。

* 能够使用纯 `TypeScript` 声明 props 和自定义事件。

* 更好的运行时性能 (其模板会被编译成同一作用域内的渲染函数，避免了渲染上下文代理对象)。

* 更好的 IDE 类型推导性能 (减少了语言服务器从代码中抽取类型的工作)。

```
<script setup>
  console.log('hello script setup')
</script>
```

里面的代码会被编译成组件 `setup()` 函数的内容。这意味着与普通的 `<script>` 只在组件被首次引入的时候执行一次不同，`<script setup>` 中的代码会在每次组件实例被创建的时候执行。

## 1. 使用组件

直接作为自定义组件的标签名使用。这里 `MyComponent` 应当被理解为像是在引用一个变量。

```
<script setup>
import MyComponent from './MyComponent.vue'
</script>

<template>
  <MyComponent />
</template>
```

## 2. 使用自定义指令

自定义指令在`<script setup>`中不需要显式注册，但他们必须遵循`vNameOfDirective`这样的命名规范：

```
<script setup>
const vMyDirective = {
  beforeMount: (el) => {
    // 在元素上做些操作
  }
}
</script>

<template>
  <h1 v-my-directive>This is a Heading</h1>
</template>
```

```
<script setup>
import { myDirective as vMyDirective } from './MyDirective.js'
</script>

<template>
  <h1 v-my-directive>This is a Heading</h1>
</template>
```

## 3. defineProps () 和 defineEmits ()

* `defineProps` 和 `defineEmits` 都是只能在 `<script setup>` 中使用的编译器宏。他们不需要导入，且会随着 `<script setup>` 的处理过程一同被编译掉。
* `defineProps` 接收与 `props` 选项相同的值，`defineEmits` 接收与 `emits` 选项相同的值。
* `defineProps` 和 `defineEmits` 在选项传入后，会提供恰当的类型推导。
* 传入到 `defineProps` 和 `defineEmits` 的选项会从 `setup` 中提升到模块的作用域。因此，传入的选项不能引用在 `setup` 作用域中声明的局部变量。这样做会引起编译错误。但是，它可以引用导入的绑定，因为它们也在模块作用域内。

```
<script setup>
const props = defineProps({
  foo: String
})

const emit = defineEmits(['change', 'delete'])
// setup 代码
</script>
```

## 4. useAttrs()

`useAttrs`是组件传参的一种方法，使用该方法能够一次获取到子组件标签上的所有属性。

```
<template>
  <div>
    <Demo 
      class="demo-class" 
      id="demo-id" 
      data-hash="00000-11111-22222"
    ></Demo>
  </div>
</template>
```

```
<script setup>
import { useAttrs } from 'vue'
const attrs = useAttrs()
 
console.log(attrs); // 返回值与 setupContext.attrs 等价
console.log(attrs.class); // demo-class
console.log(attrs.id); // demo-id
console.log(attrs.['data-hash']); // 00000-11111-22222
</script>
```

⚠️注意：当`useAttrs`和`defineProps`一起使用时，`defineProps`优先级会更高，`useAttrs`只能获取到`defineProps`没有获取的属性。

## 4. defineModel()

`defineModel()`用来**声明一个双向绑定 prop**，通过父组件的 `v-model` 来使用。

`defineModel` 是一个便利宏。编译器将其展开为以下内容：

* 一个名为 `modelValue` 的 prop，本地 `ref` 的值与其同步；
* 一个名为 `update:modelValue` 的事件，当本地 `ref` 的值发生变更时触发。

```
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```

`defineModel()` 返回的值是一个 `ref`。它可以像其他 `ref` 一样被访问以及修改，不过它能起到在父组件和当前变量之间的双向绑定的作用：

* 它的 `.value` 和父组件的 `v-model` 的值同步；
* 当它被子组件变更了，会触发父组件绑定的值一起更新。

## defineModel () 的参数

* 如果**第一个参数**是一个**字符串**字面量，它将被用作 **prop 名称**；
* 否则，prop 名称将默认为 "`modelValue`"。
* 在这两种情况下，你都可以再传递一个**额外的对象**，它可以包含 prop 的选项和 model ref 的值转换选项。

```
// 声明 "count" prop，由父组件通过v-model:count使用：<Child v-model:count="count" />
const count = defineModel("count")
// 或者：声明带选项的 "count" prop
const count = defineModel("count", { type: Number, default: 0 })

function inc() {
  // 在被修改时，触发 "update:count" 事件
  count.value++
}


// 声明 "modelValue" prop，由父组件通过v-model使用：<Child v-model="count" />
const model = defineModel()
// 或者：声明带选项的 "modelValue" prop
const model = defineModel({ type: String })

// 在被修改时，触发 "update:modelValue" 事件
model.value = "hello"
```

## 修饰符和转换器

🌰 创建一个自定义的修饰符 `capitalize`：

```
<MyComponent v-model.capitalize="myText" />
```

MyComponent.vue:

```
// 解构 defineModel() 的返回值
const [model, modifiers] = defineModel()

console.log(modifiers) // { capitalize: true }
```

当存在修饰符时，我们可能需要在读取或将其同步回父组件时对其值进行转换。我们可以通过使用 `get` 和 `set` 转换器选项来实现这一点：

```
const [model, modifiers] = defineModel({
  set(value) {
    if (modifiers.capitalize) { // 首字母大写
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})
```

## 5. defineExpose()

通过 `defineExpose` 编译器宏来显式指定在 `<script setup>` 组件中**要暴露出去的属性或方法**。

子组件 child.vue:

```
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)
const open = (data) => {
  console.log(data)
}

defineExpose({
  a,
  b,
  open
})
</script>
```

父组件：

```
<script setup>
  import Child from './components/child.vue';

  const childRef = ref(null)

  const handleChild = () => {
    childRef.value.open("hello world！");
  }
</script>

<template>
  <button @click="handleChild">触发子组件方法</button>
  <Child ref="childRef"></Child>
</template>
```

## 6. 如何定义组件名称？

`Vue3` 中的 `setup` 语法糖无法自定义组件 `name`，而我们在使用 `keep-alive` 的时候，往往是需要用到 `name` 的，因此我们就需要一个方案来解决这个问题。

## 方案一：写两个 script 标签

最简单的方法就是写两个 `script` 标签，一个用 `setup` 语法，一个不用 `setup` 语法，代码如下：

```
<script>
    export default {
        name: 'demo'
    }
</script>

<script setup>
	// do something...
</script>
```

这种方法简单，但确实不够优雅，对于有强迫症的来说，大概率是接受不了～

## 方案二：Vue3.3 新特性 —— defineOptions

从 `Vue3.3` 开始可以直接通过 `<script setup>` 中的 `defineOptions` 来设置组件名。

```
<script setup> 
    defineOptions({
        name: 'demo',
        inheritAttrs: false,
        customOptions: { /* ... */ },
        // 更多自定义属性
    }) 
</script>
```

## 方案三：通过插件 vite-plugin-vue-setup-extend

**1. **安装****

```
npm i vite-plugin-vue-setup-extend -D
```

**2. **配置****

```
import { defineConfig } from 'vite'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
export default defineConfig({
	plugins: [ VueSetupExtend() ]
})
```

**3. **使用****

```
<script lang="ts" setup name="demo"></script>
```

虽然说 `Vue3` 会根据文件名推断组件的 `name` ，但是很多时候还是自定义 `name` 更加方便一点，而且在使用 `keep-alive` 的 `include` 和 `exclude` 功能时，必须显示的声明 `name` 才能正常执行逻辑，所以上面的方法任选一种即可。
