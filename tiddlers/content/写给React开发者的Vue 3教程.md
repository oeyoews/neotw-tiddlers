如果你是一个有经验的 React 开发者，并且对学习 Vue 3 感兴趣，那么这篇文章就是为你准备的。在这篇文章中，我们将探讨 Vue 3 的 Composition API, 并将其与 React 的 Hooks 进行比较。通过这种方式，你将能够快速理解 Vue 3 的核心概念，并将你的 React 知识应用到 Vue 3 的开发中。

在我们开始比较 Vue 3 的 Composition API 和 React 的 Hooks 之前，让我们先回顾一下它们各自的一些核心概念。

在 Vue 3 中，组件是由三部分组成的：模板 (template)、逻辑 (script) 和样式 (style)。模板定义了组件的结构，逻辑定义了组件的行为，样式定义了组件的外观。Vue 3 使用声明式的模板语法，通过指令 (如`v-if`, `v-for`) 和插值 (如`{{ }}`), 将数据与 DOM 进行绑定。

在 React 中，组件通常是用 JavaScript (或 TypeScript) 编写的函数或类。React 使用 JSX, 一种类似 XML 的语法，来描述组件的结构。在 JSX 中，你可以直接使用 JavaScript 表达式，这使得在组件逻辑和模板之间切换非常容易。

Vue 3 的 Composition API 和 React 的 Hooks 都是为了解决在组件中管理状态和逻辑的问题而引入的。它们都允许你在组件外部定义和重用有状态的逻辑。这使得组件的逻辑更加模块化和可复用。

然而，Vue 3 的 Composition API 和 React 的 Hooks 在实现方式上有一些区别。Vue 3 的 Composition API 更加依赖于响应式系统，通过`reactive`, `ref`等函数创建响应式状态，并通过`watch`, `computed`等函数来响应状态的变化。React 的 Hooks 则更加依赖于 JavaScript 的函数特性，通过`useState`, `useEffect`等函数来管理状态和副作用。

接下来，我们将通过比较 Vue 3 的 Composition API 和 React 的 Hooks 在处理状态管理、计算属性、副作用等方面的异同，来帮助你更好地理解它们。

## 1. Vue 3 Composition API 与 React Hooks 的比较

### 1.1 状态管理: useState 和 ref,reactive

在 React 中，我们使用`useState`钩子来管理组件的状态:

```
const [count, setCount] = useState(0)
```

在 Vue 3 中，我们可以使用`ref`或`reactive`来创建响应式状态:

```
const count = ref(0)
// 或
const state = reactive({ count: 0 })
```

`ref`用于创建一个包含单个值的响应式引用，而`reactive`用于创建一个响应式对象。

### 1.2 计算属性: useMemo 和 computed

在 React 中，我们可以使用`useMemo`钩子来创建一个记忆化的值，它只在其依赖项发生变化时才会重新计算:

```
const doubledCount = useMemo(() => count * 2, [count])
```

在 Vue 3 中，我们可以使用`computed`函数来创建一个计算属性:

```
const doubledCount = computed(() => count.value * 2)
```

计算属性会自动跟踪其依赖项，并在依赖项发生变化时更新。不同于`useMemo`,`computed`会返回一个新的响应式引用，而不是一个普通的值。

### 1.3 副作用: useEffect 和 watch,watchEffect

在 React 中，我们使用`useEffect`钩子来执行副作用，如订阅事件或发起 HTTP 请求:

```
useEffect(() => {
  document.title = `You clicked ${count} times`
}, [count])
```

在 Vue 3 中，我们可以使用`watch`或`watchEffect`来执行副作用:

```
watch(count, (newCount) => {
  document.title = `You clicked ${newCount} times`
})
// 或
watchEffect(() => {
  document.title = `You clicked ${count.value} times`
})
```

`watch`允许你显式地指定要监视的数据源，而`watchEffect`会自动跟踪其回调函数中使用的所有响应式状态。不同于`computed`,`watch`和`watchEffect`不会返回新的值，而是执行副作用。

## 2. Vue 3 Composition API 的其他特性

### 2.1 生命周期: onMounted, onUpdated 等

Vue 3 提供了一组与 Vue 2 生命周期钩子相对应的函数，如`onMounted`, `onUpdated`和`onUnmounted`:

```
onMounted(() => {
  console.log('Component mounted')
  // 在这里执行一些初始化操作,如发起HTTP请求或订阅事件
})

onUpdated(() => {
  console.log('Component updated')
  // 在这里执行一些在组件更新后需要进行的操作
})

onUnmounted(() => {
  console.log('Component unmounted')
  // 在这里执行一些清理操作,如取消订阅或清除定时器
})
```

这些函数允许你在组件的特定生命周期阶段执行逻辑。它们类似于 React 的`useEffect`钩子，但提供了更细粒度的控制。

### 2.2 依赖注入: provide 和 inject

Vue 3 提供了`provide`和`inject`函数，用于在组件层次结构中共享状态:

```
// 在父组件中
const ThemeProvider = {
  setup() {
    const theme = ref('dark')
    provide('theme', theme)
    return {}
  }
}

// 在子组件中
const ThemeConsumer = {
  setup() {
    const theme = inject('theme', 'light')
    return { theme }
  }
}
```

在这个例子中，父组件`ThemeProvider`使用`provide`函数提供了一个名为`theme`的状态，其初始值为`'dark'`。子组件`ThemeConsumer`使用`inject`函数注入这个状态，如果没有找到提供者，则使用默认值`'light'`。

通过`provide`和`inject`, 你可以避免通过 props 逐层传递数据，这在处理深层嵌套的组件树时非常有用。此外，由于注入的状态是响应式的，当提供者更新状态时，所有注入该状态的组件都会自动更新。

### 2.3 `<script setup>`语法糖

Vue 3 引入了一种新的编写组件的方式，称为`<script setup>`。这是一种编译时的语法糖，它让我们可以更简洁地使用 Composition API。

使用`<script setup>`, 我们可以直接在`<script>`标签中编写组件的逻辑，而不需要显式地定义`setup`函数并返回一个对象:

```
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```

在`<script setup>`中定义的变量和函数可以直接在模板中使用，不需要再通过`setup`函数返回。这使得组件的定义更加简洁和直观。

## 3. Composition API Q\&A

### 3.1 computed 和 watch 的区别

`computed`用于创建一个依赖于其他状态的新的响应式引用。它是一个带有缓存的 getter, 只在其依赖项发生变化时才会重新计算，并返回一个新的值。

`watch`用于在特定状态发生变化时执行副作用。它不会创建新的值，而是执行一些操作，如发起 HTTP 请求或修改 DOM。

### 3.2 ref 和 reactive 的区别

`ref`用于创建一个包含单个值的响应式引用。当你需要将一个原始值 (如字符串或数字) 变成响应式时，可以使用`ref`。在访问或修改`ref`创建的响应式引用时，需要使用`.value`属性:

```
const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

`reactive`用于创建一个响应式对象。当你有一个对象，并且想让整个对象都变成响应式时，可以使用`reactive`。在访问或修改`reactive`创建的响应式对象时，不需要使用`.value`属性:

```
const state = reactive({ count: 0 })
console.log(state.count) // 0

state.count++
console.log(state.count) // 1
```

这是因为`reactive`返回的是一个 Proxy 对象，它会自动解包内部的属性，使其也成为响应式的。

另一个区别是，`ref`可以接受任何类型的值作为参数，而`reactive`只接受对象 (包括数组和自定义对象) 作为参数。

在大多数情况下，你可以根据数据的类型选择使用`ref`或`reactive`。如果数据是一个基本类型的值，使用`ref`; 如果数据是一个对象，使用`reactive`。

### 3.3 watch 和 watchEffect 的区别

`watch`允许你显式地指定要监视的数据源。它适用于那些依赖项在初始渲染时可能还不存在的情况。

`watchEffect`会自动跟踪其回调函数中使用的所有响应式状态。它更适合用于那些依赖项在初始渲染时就已经存在的情况。

## 总结

Vue 3 的 Composition API 提供了一种强大而灵活的方式来组织组件逻辑。对于有 React 经验的开发者来说，许多概念 (如状态管理、计算属性和副作用) 都会非常熟悉。通过理解`ref`, `reactive`, `computed`, `watch`等函数的作用和区别，你可以快速上手 Vue 3 的开发。

当然，这只是一个概览。Vue 3 还有许多其他的特性和概念，如模板语法、组件系统、过渡效果等。但通过掌握 Composition API, 你已经迈出了理解 Vue 3 的重要一步。希望这篇文章能对你的 Vue 3 学习之旅有所帮助。
