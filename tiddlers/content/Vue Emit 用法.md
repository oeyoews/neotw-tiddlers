在 vue3 中，与组件和 prop 一样，事件名提供了自动的大小写转换。如果在子组件中触发一个以 camelCase (驼峰式命名) 命名的事件，你将可以在父组件中添加一个 kebab-case (短横线分隔命名) 的监听器。

许多 Vue 模式涉及使用 props 将数据从父组件传递到子组件。但如果我们需要一个子组件将数据传给它的父组件呢？

使用 emit，我们可以触发事件并将数据传递到组件的层次结构中。这对下面几种情况很有用，如：

* 从 input 中发出数据
* 从 modal 本身内部关闭 modal
* 父组件响应子组件

#### Vue Emit 是如何工作的？

当我们 emit 一个事件时，我们用一个或多个参数调用一个方法：

* eventName: string - 事件的名称
* values: any - 通过事件传递的参数

下面是一个内联 emit 的例子，\<button @click="$emit ('add', Math.random ())">​。emit 一个名为 add​的事件，并将 Math.random () 的值作为参数传递出去。

然后，在父组件使用 v-on 或 @指令可以监听我们的自定义添加事件并接收该参数值。

**Child.vue**

```
<template>
  <button @click="$emit('add', Math.random())">
    Add Math.random()
  </button>
</template>
```

在 \*\* Parent.vue \*\* 中监听：

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
// 也可以从我们的模板中调用一个函数 `<ChildComponent @add="add" />
// const add = (i) => count.value += i
</script>
<template>
  <ChildComponent @add="(i) => count += i" /> 
  <p>Count: {{ count }}</p>
</template>
```

![图片](https://s3.51cto.com/oss/202207/13/c83f0f6675bf9bbb03c3656b051f207a3bf3e5.gif "图片")

每次我们点击按钮，Child.vue​ 都会 emit 一个 add​ 事件，并带有一个 0 到 1 之间的随机值。然后，Parent.vue 捕捉到这个事件，并将这个值添加到计数中。

可以传递任意多的参数，监听器也会收到所有的参数：

* Child - $emit('add', Math.random(), 44, 50)
* Parent -\@add="(i, j, k) => count += i + j + k"

现在，我们知道如何在我们的模板中 emit 内联事件，但在更复杂的例子中，如果我们从 SFC 的 script 中 emit 一个事件会更好。特别是当我们想在 emit 事件之前执行一些逻辑时，这很有用。

在 Vue 3 中，我们有 2 种不同的方法来做到这一点:

* 选项 API - this.$emit
* 带有 setup ()​的组合 API - context.emit
* 带有 \<script setup>​的组合 API -defineEmits ()

我们一个一个来看。

#### 选项 API - this.$emit

在 Vue3 中，我人可以选择使用选项 API 或组合 API。

在选项 API 中，我们可以调用 this.$emit 来 emit 一个自定义事件。

看下面这个例子在 MyTextInput.vue​ 中，它包含一个 label​ 和 input​。每当 input 改变时，我们会 emit 一个事件，并将输入的值转成大写作为参数传递出去。

我们可以不从模板中调用 $emit​，而是调用一个组件方法。在该方法中调用 this.$emit 并把我们的值传给它。

**MyTextInput.vue**

```vue
<script>
  export default {
      methods: {
          handleChange (event) {
              this.$emit("customChange", event.target.value.toUpperCase())
          }
      }
  }
</script>

<template>
  <div>
    <label>My Custom Input</label>
    <input type="text" placeholder="Custom input!" @input="handleChange" />
  </div>
</template>
```

在 Parent.vue 中接收：

```vue
<script>
  export default {
      methods: {
          handleChange (event) {
              this.$emit("customChange", event.target.value.toUpperCase())
          }
      }
  }
</script>

<template>
  <div>
    <label>My Custom Input</label>
    <input type="text" placeholder="Custom input!" @input="handleChange" />
  </div>
</template>
```

#### 带有 setup ()​的组合 API - context.emit

在 组合 API 中，如果使用 setup​函数，就不能在用 this​, 也就是不能调用 this.$emit () 方法了。

相反，可以使用 setup 方法中的第二个参数 context​ 来访问 emit​  方法。我们可以用之前使用的事件名称和值调用 context.emit。

**MyTextInput.vue**

```vue
<script>
  export default {
    // can use the entire context object
    setup (props, context) {
        const handleChange = (event) => {
            context.emit("customChange", event.target.value)
        }
        return {
            handleChange
        }
    },
    // or we can destructure it and get `emit`
    setup (props, { emit }) { 
        const handleChange = (event) => {
            emit("customChange", event.target.value)
        }
        return {
            handleChange
        }
    }
  }
</script>

<template>
  <div>
    <label>My Custom Input</label>
    <input type="text" placeholder="Custom input!" @input="handleChange" />
  </div>
</template>
```

![图片](https://s2.51cto.com/oss/202207/13/d41dfbf68a8d24c4caf9009e7a5533a0e4386c.gif "图片")

#### 在 \<script setup> 中的用法

当我们使用 \<script setup>​时，我们无法访问组件实例或 context​ 上下文参数。那我们怎么获得 emit ?

在这种情况下，我们可以使用 defineEmits:

* 指定组件要 emit 事件
* 为每个事件添加验证信息
* 可以访问与 context.emit 相同的值

在最简单的情况下，defineEmits 是一个字符串数组，每个字符串是一个事件的名称。

**MyTextInput.vue**

```
<script setup>
const emit = defineEmits(['customChange'])

const handleChange = (event) => {
  emit('customChange', event.target.value.toUpperCase())
}
</script>
1.
2.
3.
4.
5.
6.
7.
```

![图片](https://s3.51cto.com/oss/202207/13/f854e9e0931886a7a34072d4b587be653ad900.gif "图片")

然而，如果我们传递一个对象，我们可以为每个事件添加一个验证器函数，我们可以在里面检查值是否是我们所需要的格式。

像事件监听器一样，验证器接受我们传入所有参数。

这与 prop  validation 类似，如果我们的验证器返回 false，会在控制台得到一个警告，这为我们提供了一些有用的信息。

**MyTextInput.vue**

```vue
<script setup>
const emit = defineEmits({
  unvalidatedEvent: null, // if we want an event without validation
  customChange: (s) => {
    if (s && typeof s === 'string') {
      return true
    } else {
      console.warn(`Invalid submit event payload!`)
      return false
    }
  },
})

const handleChange = (event) => {
  // no console warning
  emit('customChange', event.target.value.toUpperCase())
}

onMounted(() => {
  emit('customChange', 1) // not a string, warning!
})
</script>
1.
2.
3.
4.
5.
6.
7.
8.
9.
10.
11.
12.
13.
14.
15.
16.
17.
18.
19.
20.
21.
22.
```

#### 最佳实践

**使用 emits 定义自定义事件**

如果我们不使用 defineEmits​，我们仍然可以通过 export default​中定义 emits 选项来跟踪一个组件的自定义事件。

这对保持良好的组件文档很重要，如果我们试图使用一个没有在 emits 中声明的事件，也会从 Vue 那里得到错误。

当在 emits 选项中定义了原生事件 (如 change) 时，将使用组件中的事件替代原生事件侦听器。

```
<script>
  export default {
      emits: ["change"] // or can pass object with validators
  }
</script>
<template>
  <div>
    <label>My Custom Input</label>
    <input
      type="text"
      placeholder="Custom input!"
      @input='$emit("change", $event.target.value)'
    />
  </div>
</template>
1.
2.
3.
4.
5.
6.
7.
8.
9.
10.
11.
12.
13.
14.
15.
```

**正确的事件命令**

在 vue3 中，与组件和 prop 一样，事件名提供了自动的大小写转换。如果在子组件中触发一个以 camelCase (驼峰式命名) 命名的事件，你将可以在父组件中添加一个 kebab-case (短横线分隔命名) 的监听器。

然而，如果你使用的是 Vue 2，事件名称没有自动的大小写转换，由于 v-on 指令会自动将你的事件名称转换为小写，所以 camelCase 命名的事件不可能被监听到。

例如，如果我们发出了一个名为 myEvent​的事件，监听 my-event 将无法工作。

作者：Noveo 译者：小智  来源：learnvue 原文：https\://learnvue.co/tutorals/vue-emit-guide​
