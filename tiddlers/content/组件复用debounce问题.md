## 聊一个复用组件中使用 debounce 时遇到的问题

<!-- 文章内容 article body -->

今天我中遇到了一个这样的场景，发现触发复用的自定义组件中添加了防抖的函数，发现只执行了一次，并没有如预期的那样每个组件内的函数都执行一次。

一开始以为是没有同步赋值，检查了一下没问题，才把关注点转移到 `debounce` 上面。移除防抖之后果然解决问题了，但防抖又不能去去掉。

所以查了一下相关的问题，发现是因为多个组件实例是共享同一个预置防抖的函数，并不是相互独立的。

一直以来都是直接如 Vue 文档中演示的这样来写的，加上请求接口就会是下面这样：

```js
import debounce from "lodash.debounce";
import { remoteSearchAPI } from 'xxxx';

export default {
  // ...
  methods: {
    remoteMethod: debounce(function (value = "") {
      const params = {
        keywords: value,
      };
      this.fetching = true;
      remoteSearchAPI(params)
        .then((res) => {
          // ...
        })
        .finally(() => {
          this.fetching = false;
        });
    }, 350, { maxWait: 1000 }),
  },
};
```

这样写的话就会有一个问题：

> 这种方法对于被重用的组件来说是有问题的，因为这个预置防抖的函数是 **有状态的**：它在运行时维护着一个内部状态。如果多个组件实例都共享这同一个预置防抖的函数，那么它们之间将会互相影响。\
> 响应式基础 | Vue.js

## 那么如何解决这个问题呢？

Vue 的文档中也给出了相应的解决方案。

> 要保持每个组件实例的防抖函数都彼此独立，我们可以改为在 `created` 生命周期钩子中创建这个预置防抖的函数：

 ```js
 export default {
  created() {
    // 每个实例都有了自己的预置防抖的处理函数
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // 最好是在组件卸载时
    // 清除掉防抖计时器
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... 对点击的响应 ...
    }
  }
 }
 ```
