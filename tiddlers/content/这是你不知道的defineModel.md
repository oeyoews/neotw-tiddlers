相信大伙都已经收到`Vue3`最新版的风了吧，新版本的更新中优化了不少此前在`Vue3`中比较 “麻烦” 的使用方法，下面是更新的简介图 👇

![Vue3.3.4](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b0dd330dc6a4f32b7d53bcd301acc54~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2679\&h=4096\&s=478552\&e=webp\&b=222120)

相信看完上面的简介图，大伙对新特性已经有一个大概的了解了，下面就进入正文：**`defineModel`是如何实现的**

那接下来我就开始操作了🤺 (e 点点 q 点点 w 点点嘟嘟嘟嘟...)

## `defineModel核心`

### 新旧对比

在开发的过程中，如果有需要通过`子组件进行状态更新`的话，`v-model`是一个绕不开的点。以前的`v-model`是这样用的 👇

```
<!-- Father.vue -->
<template>
  <span>count</span>
  <Child v-model="count" />
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  const count = ref<number>(0)
</script>
```

```
<!-- Child.vue -->
<template>
  count: {{ count }}
  <button @click="onClick">count</button>
</template>

<script lang="ts" setup>
  const $props = defineProps<{ modelValue: number }>()
  const $emits = defineEmit<{
    (e: 'update:modelValue', modelValue: number)
    // 注册update:modelValue事件，作为状态更新的回调
  }>()
  function onClick() {
    $emits('update:modelValue', $props.modelValue+1)
    // 状态更新时发布事件
  }
</script>
```

在有了`defineModel`之后，我们就可以在`Child.vue`中这样实现 👇

```
<!-- Child.vue -->
<template>
  count: {{ count }}
  <button @click="onClick">count</button>
</template>

<script lang="ts" setup>
  const count = defineModel<number>()
  // 一步到位，完成事件注册和监听状态变化并发布事件
  function onClick() {
    count += 1
  }
</script>
```

相信看完上面的案例之后大伙就已经有一个大概的猜想了：

**`defineModel`其实为组件实例注册了`update:modelValue`事件，并且在`props`的`setter`中又调用了`update:modelValue`事件，从而实现的`v-model`语法糖**

上面的猜测又包含了两个问题：

> 1. `defineModel`是如何注册`update:modelValue`事件的
> 2. 如何在`defineModel变量`修改时发布`update:modelValue`事件的

### 从编译后代码开始探索

要验证上面的猜想，我们可以通过查看编译之后的`Vue`代码来完成。

这里我们通过[Vue 官方 Playground](https://link.juejin.cn/?target=https%3A%2F%2Fplay.vuejs.org%2F "https://play.vuejs.org/")来作为查看编译后代码的工具，同样是实现上面的例子，来看看`编译后的Vue源码`是怎么样的 👇

```
// Father.vue
const __sfc__ = _defineComponent({
  __name: 'App',
  setup(__props) {

    const count = ref(0)

    return (_ctx,_cache) => {
      return (_openBlock(), _createElementBlock(_Fragment, null, [
        _createElementVNode("h1", null, _toDisplayString(count.value), 1 /* TEXT */),
        _createVNode(Child, {
          modelValue: count.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => ((count).value = $event))
          // 将v-model转换为modelValue属性以及update:modelValue事件
        }, null, 8 /* PROPS */, ["modelValue"])
      ], 64 /* STABLE_FRAGMENT */))
    }
  }
})
```

```
// Child.vue
const __sfc__ = _defineComponent({
  __name: 'Child',
  props: {
    "modelValue": {},
  },
  emits: ["update:modelValue"],
  setup(__props) {

    const compCount = _useModel(__props, "modelValue") 
    // 核心代码
    // 调用_useModel对传入的modelValue属性进行处理
    return (_ctx,_cache) => {
      return (_openBlock(), _createElementBlock(_Fragment, null, [
        _createTextVNode(" Comp count: " + _toDisplayString(compCount.value) + " ", 1 /* TEXT */),
        _createElementVNode("button", {
        onClick: _cache[0] || (_cache[0] = ($event) => (compCount.value++))
        }, " press ")
      ], 64 /* STABLE_FRAGMENT */))
    }
  }
})
```

通过上面的源码可以很清晰地看到，`defineModel`的核心其实是`_useModel`函数，通过`_useModel`为注册了`v-model`的`props`执行`双向绑定`操作。

那就让我们继续`Deep Down`🤿，从[Vue3 源码](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fcore "https://github.com/vuejs/core")中一探这`_useModel`究竟是何方神圣～

### 如何发布事件

首先我们找到[`defineModel`的源码](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fcore%2Fblob%2Fmain%2Fpackages%2Fcompiler-sfc%2Fsrc%2Fscript%2FdefineModel.ts%23L92 "https://github.com/vuejs/core/blob/main/packages/compiler-sfc/src/script/defineModel.ts#L92")，在`92行`中可以找到`defineModel`是通过调用`useModel`函数来实现的👇

```
export function processDefineModel(
  ctx: ScriptCompileContext,
  node: Node,
  declId?: LVal
): boolean {
  if (!ctx.options.defineModel || !isCallOf(node, DEFINE_MODEL)) {
    return false
  }

  ctx.hasDefineModelCall = true // 将该组件标记为使用了defineModel
  ...
  // 在这里对被绑定到子组件的props进行标记，被标记为props类型的值将会在defineProps中被合并为组件的props
  // 由于这里不属于本文讨论的内容，如需查看请前往源码仓库

  ctx.s.overwrite(
    ctx.startOffset! + node.start!,
    ctx.startOffset! + node.end!,
    `${ctx.helper('useModel')}(__props, ${JSON.stringify(modelName)}${
      runtimeOptions ? `, ${runtimeOptions}` : ``
    })`
    // 从这里可以找到调用了useModel，并将对应的prop作为参数传递👆
  )
  return true
}
```

那么接下来就是`defineModel`的核心，`useModel`的实现了👇

```
export function useModel(
  props: Record<string, any>,
  name: string,
  options?: { local?: boolean }
): Ref {
  const i = getCurrentInstance()!
  if (__DEV__ && !i) {
    warn(`useModel() called without active instance.`)
    // 当组件实例不存在时则返回ref
    return ref() as any
  }

  if (__DEV__ && !(i.propsOptions[0] as NormalizedProps)[name]) {
    warn(`useModel() called with prop "${name}" which is not declared.`)
    // 当useModel被一个不存在的prop调用时，返回ref
    return ref() as any
  }

  // 通过watch监听或setter时发布事件的形式实现在修改时同步更新prop，而不需要显性注册`update:modelValue`事件
  if (options && options.local) {
  // 确认是否在defineModel中配置local属性为true
    const proxy = ref<any>(props[name])
    watch(
      () => props[name],
      v => (proxy.value = v)
    )

    watch(proxy, value => {
      if (value !== props[name]) {
        i.emit(`update:${name}`, value)
      }
    })
    return proxy
  } else {
    return {
      __v_isRef: true,
      get value() {
        return props[name]
      },
      set value(value) {
        i.emit(`update:${name}`, value)
      }
    } as any
    // 直接返回一个标记为ref的对象，当对这个对象进行赋值时即执行事件的发布
  }
}
```

### 如何注册`update:modelValue`事件

到此为止，`defineModel`的主体基本上已经较为清晰地展现出来了，但我们的第一个问题仍没有解决，**`defineModel`是如何注册`update:modelValue`事件的？**

其实这个问题已经很明显了，在上面的[`processDefineModel`源码](#%E5%A6%82%E4%BD%95%E5%8F%91%E5%B8%83%E4%BA%8B%E4%BB%B6 "#%E5%A6%82%E4%BD%95%E5%8F%91%E5%B8%83%E4%BA%8B%E4%BB%B6")中，我将这段代码单独留下并进行标注👇

```
ctx.hasDefineModelCall = true // 将该组件标记为使用了defineModel
```

其实在这里`defineModel`就已经将这个组件标记为`hasDefineModelCall`，后续在[`defineEmits`源码](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fcore%2Fblob%2Fmain%2Fpackages%2Fcompiler-sfc%2Fsrc%2Fscript%2FdefineEmits.ts%23L52 "https://github.com/vuejs/core/blob/main/packages/compiler-sfc/src/script/defineEmits.ts#L52")中我们可以找到`defineEmit`会自动为被标记为`hasDefineModelCall`的组件注册对应名称的`update`事件👇

```
export function genRuntimeEmits(ctx: ScriptCompileContext): string | undefined {
  ...
  if (ctx.hasDefineModelCall) {
  // 对标记为使用了defineModel的实例进行处理
    let modelEmitsDecl = `[${Object.keys(ctx.modelDecls)
      .map(n => JSON.stringify(`update:${n}`))
      // 为每一个使用defineModel注册的prop属性进行事件注册
      .join(', ')}]`
    emitsDecl = emitsDecl
      ? `${ctx.helper('mergeModels')}(${emitsDecl}, ${modelEmitsDecl})`
      : modelEmitsDecl
      // 将使用defineEmits注册的事件和使用defineModel注册的事件合并
  }
  return emitsDecl
}
```

### 新的问题

其实到这为止，`defineModel`的整个执行过程已经基本讲解完毕了，但是在看`useModel`的源码时我发现了一个问题，**为什么要将`option`区分为`local`和`非local`呢？**

带着这个问题，我请教了`chatGPT老师`，得到了下面的答复👇 ![vue3-defineModel-local](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9d91925cc0e48c5a96c913565edc072~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1265\&h=740\&s=219138\&e=webp\&b=282c34)

好吧，我承认我没看懂，于是乎我找到了关于[`defineModel`的 Discussion](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Frfcs%2Fdiscussions%2F503 "https://github.com/vuejs/rfcs/discussions/503")并且在尤大给的[Demo](https://link.juejin.cn/?target=https%3A%2F%2Fplay.vuejs.org%2F%23eNqFkL1uwzAMhF%2BF0JIUTuPMhm206Ny1kxZHoVuj%2BoNMZRH87pUsO0aTIRvJO%2FD4MbB3a49Xj6xi9SjcYAlGJG9brgdljSP4MMpC74yC3bFMTbLvbnJw2E%2BLngUAroXRI4EwXhM0EC370wvXdZkj4vLYECorO8LYAdRzTJnrH7dW8%2FT6qswFZcPZvJCzR9%2BgradHY1ZDWC6ZpnTDLZcd2Mpzjw%2By098NjdsbQqKA%2F6Qr55z61UmPEfaC%2FaDxM41q7dUZXbsPII3oZAXkPB6SpfOSKjjB9OQtZ09kNLwJOYjfCLZFFQVnbVGX2bGAbvI96%2FQH6WaqLQ%3D%3D "https://play.vuejs.org/#eNqFkL1uwzAMhF+F0JIUTuPMhm206Ny1kxZHoVuj+oNMZRH87pUsO0aTIRvJO/D4MbB3a49Xj6xi9SjcYAlGJG9brgdljSP4MMpC74yC3bFMTbLvbnJw2E+LngUAroXRI4EwXhM0EC370wvXdZkj4vLYECorO8LYAdRzTJnrH7dW8/T6qswFZcPZvJCzR9+gradHY1ZDWC6ZpnTDLZcd2Mpzjw+y098NjdsbQqKA/6Qr55z61UmPEfaC/aDxM41q7dUZXbsPII3oZAXkPB6SpfOSKjjB9OQtZ09kNLwJOYjfCLZFFQVnbVGX2bGAbvI96/QH6WaqLQ==")中找到了我想要的答案👇 ![why-defineModel-local](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9978cab9dff343178c07dd47456b069e~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1221\&h=482\&s=133688\&e=gif\&f=108\&b=fafafa)

## 结语

其实本来想和`defineProps是如何解构仍保持响应式`一起写的，但是感觉如果放在一篇文章中篇幅就太长了，阅读体验不好，所以就放到下一篇中解析吧

如果文中有任何错误或者需要修改的地方，烦请指出，不胜感激

> PS: 大伙都看`蜘蛛侠：纵横宇宙`了吗，真好看啊！特别是迈尔斯和格温看纽约的那个镜头，让我有一种在看边缘行者的快感😎，打算这周末去二刷了

我的个人博客：[johnsonhuang\_blog](https://link.juejin.cn/?target=http%3A%2F%2Fblog.johnsonhuang.studio%2F "http://blog.johnsonhuang.studio/")
