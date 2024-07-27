<!---->

<!---->

<!---->

<!---->

reactive 和 ref 大家都会用，基本用法就不多说了。

可是如果 reacive 嵌套 ref 却会出现一些反直觉的情况。

## 例子 1

```
{
  template: '<div>{{observeA.a}}</div>',
  setup() {
    const observeA = Vue.reactive({a: Vue.ref(1)})
    // 问: 如何修改变量才能触发视图更新?
    // 答: ...
    return {
      observeA,
    }
  }
}
```

查看答案

`答: observeA.a = 3`

你可能会猜 **observeA.a.value = 3**。然而这么做是无效的。

## 例子 2

```
{
  template: '<div>{{observeA[0]}}</div>',
  setup() {
    const observeA = Vue.reactive([Vue.ref(1)])
    return {
      observeA,
    }
  }
}
// 问: 页面展示内容是什么?
// 答: ...
```

查看答案

`答: { "_rawValue": 1, "_shallow": false, "__v_isRef": true, "_value": 1 }`\
`正确写法: {{observeA[0].value}}`

你以为是**1**?

## 例子 3

```
// 将例子1和例子2结合
{
  template: '<div>{{observeA[0].value}}</div>',
  setup() {
    const observeA = Vue.reactive([ Vue.ref(1) ])
    // 问: 如何触发视图更新
    // 答: ...
    return {
      observeA,
    }
  }
}
```

查看答案

`答: observeA[0].value = 3`

很好。到这你是否已经成功懵圈

## 解析

有人问啊，这是什么回事啊。你这是乱试，瞎测试碰到的把。我说这可不是乱测试，我是有备而来。

### 例子 1 和 例子 3 解析

为何更新 ref，不需要 `.value` 呢。咱们看源码 [reactive/src/baseHandlers](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue-next%2Fblob%2Fmaster%2Fpackages%2Freactivity%2Fsrc%2FbaseHandlers.ts "https://github.com/vuejs/vue-next/blob/master/packages/reactivity/src/baseHandlers.ts") 139 \~ 142 行。

```
if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
  oldValue.value = value
  return true
}
// !isArray(target);  reactive 更新目标不是一个数组
// isRef(oldValue);  待更新的值是一个 ref 对象
// !isRef(value);  即将要更新的值不是一个 ref 对象
```

```
// 例子 1 符合情况
const observeA = Vue.reactive({a: Vue.ref(1)})
observeA.a = 3

!isArray({a: Vue.ref(1)})  // true 
isRef(Vue.ref(1))          // true
!isRef(3)                  // true
```

同理例子 3 因为 `target` 是数组，就无法直接更新。

### 例子 2 解析

这里 `ref` 在 `reactive<RefImpl[]>` 被嵌套的时候，无法自动展开，在[文档](https://link.juejin.cn/?target=https%3A%2F%2Fwww.vue3js.cn%2Fdocs%2Fzh%2Fguide%2Freactivity-fundamentals.html%23%25E8%25AE%25BF%25E9%2597%25AE%25E5%2593%258D%25E5%25BA%2594%25E5%25BC%258F%25E5%25AF%25B9%25E8%25B1%25A1 "https://www.vue3js.cn/docs/zh/guide/reactivity-fundamentals.html#%E8%AE%BF%E9%97%AE%E5%93%8D%E5%BA%94%E5%BC%8F%E5%AF%B9%E8%B1%A1")内也有提到一嘴。

![vue 文档](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3acc6b387d649c182f4e4616634d6f9~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

继续看源码 [reactive/src/baseHandlers](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue-next%2Fblob%2Fmaster%2Fpackages%2Freactivity%2Fsrc%2FbaseHandlers.ts "https://github.com/vuejs/vue-next/blob/master/packages/reactivity/src/baseHandlers.ts") 109 \~ 113 行。

```
function createGetter(isReadonly = false, shallow = false) {
  // ...
  if (isRef(res)) {
    // ref unwrapping - does not apply for Array + integer key.
    const shouldUnwrap = !targetIsArray || !isIntegerKey(key)
    return shouldUnwrap ? res.value : res
  }
  // ...
}
```

可以看到，这段逻辑在 `createGetter` 函数中。就是 Proxy 的 `getter handler`。\
这里判断：\
你获取的目标的值 `res` 是 `ref` 对象。 `target` 不是数组，或者 `key` 不是一个整数的时候，就给你自动展开，即不用写 `.value`。

```
  // 回顾例 2
  <div>{{observeA[0]}}</div>
  const observeA = Vue.reactive([ Vue.ref(1) ])
  
  // 这里没有 value, 是因为 value 是一个 getter，所以序列化之后就只剩下 class RefImpl 的实例属性
  // _value 是 class RefImpl 内部的私有值
  observeA[0] //  { "_rawValue": 1, "_shallow": false, "__v_isRef": true, "_value": 1 }
  
  !isArray(observeA)  // false
  !isIntegerKey(0)   // false
  shouldUnwrap      // false
```

这里试过改源码直接 `return res.value`。可以达到预期结果，但是不这么写肯定有原因，我源码也才看完 `createApp` 和 `reactive` 两个模块。接下去看可能知道为什么。继续加油吧～

<!---->
