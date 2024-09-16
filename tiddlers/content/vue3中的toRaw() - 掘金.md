<!---->

<!---->

<!---->

<!---->

在 Vue 3 中，`toRaw` 是一个函数，用于获取被代理的原始（非响应式）对象。这个函数可以用来访问被响应式对象所包装的原始数据，而不是获取到的代理对象。

当我们使用 `reactive` 或 `ref` 创建响应式对象时，Vue 3 会通过代理将其转换为响应式对象，并劫持对其属性的访问和修改。但有时，我们可能需要直接访问原始的、非代理的对象。这就是 `toRaw` 函数的用途。

下面是一个使用 `toRaw` 的示例：

```
import { reactive, toRaw } from 'vue';

const original = { name: 'Alice', age: 25 };
const reactiveObj = reactive(original);

console.log(reactiveObj.name); // 输出：Alice

const rawObj = toRaw(reactiveObj);
console.log(rawObj === original); // 输出：true
```

在上述示例中，我们首先创建了一个原始的对象 `original`，然后使用 `reactive` 将其转换为响应式对象 `reactiveObj`。接着，我们使用 `toRaw` 函数获取 `reactiveObj` 真实的原始对象，并将其赋值给 `rawObj`。最后，我们通过比较 `rawObj` 和 `original`，确认它们是相同的对象。

`toRaw` 的主要用途是在 Vue 3 中与外部的不支持响应式的库或代码进行交互。通过获取原始对象，我们可以处理原始数据，而无需考虑代理对象的影响。

需要注意的是，`toRaw` 函数只能用于响应式对象，对于普通的对象、数组或其他非代理的数据，调用 `toRaw` 不会有任何影响。

**详细信息**

`toRaw()` 可以返回由 [`reactive()`](https://link.juejin.cn/?target=https%3A%2F%2Fcn.vuejs.org%2Fapi%2Freactivity-core.html%23reactive "https://cn.vuejs.org/api/reactivity-core.html#reactive")、[`readonly()`](https://link.juejin.cn/?target=https%3A%2F%2Fcn.vuejs.org%2Fapi%2Freactivity-core.html%23readonly "https://cn.vuejs.org/api/reactivity-core.html#readonly")、[`shallowReactive()`](https://link.juejin.cn/?target=https%3A%2F%2Fcn.vuejs.org%2Fapi%2Freactivity-advanced.html%23shallowreactive "https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive") 或者 [`shallowReadonly()`](https://link.juejin.cn/?target=https%3A%2F%2Fcn.vuejs.org%2Fapi%2Freactivity-advanced.html%23shallowreadonly "https://cn.vuejs.org/api/reactivity-advanced.html#shallowreadonly") 创建的代理对应的原始对象。

这是一个可以用于临时读取而不引起代理访问 / 跟踪开销，或是写入而不触发更改的特殊方法。不建议保存对原始对象的持久引用，请谨慎使用。

本文收录于以下专栏

![cover](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95414745836549ce9143753e2a30facd~tplv-k3u1fbpfcp-jj:120:90:0:0:q75.avis)

<!---->

![avatar](https://p9-passport.byteacctimg.com/img/user-avatar/3baf27474c7334d8e6424f467175a127~50x50.awebp)

<!---->
