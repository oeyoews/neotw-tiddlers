<!-- 文章页 post detail page -->

<!--
 * @Description: 
 * @Author: wang.weiyang
 * @Date: 2022-07-22 08:25:45
 * @LastEditors: wang.weiyang
 * @LastEditTime: 2022-07-25 10:08:50
-->

<!-- 文章详情 Post Detail -->

## 聊一个复用组件中使用 debounce 时遇到的问题

此文章更新于 715 天前，其中的信息可能已经有所发展或是发生改变，请自行斟酌确认。

<!-- 文章内容 article body -->

今天我中遇到了一个这样的场景，发现触发复用的自定义组件中添加了防抖的函数，发现只执行了一次，并没有如预期的那样每个组件内的函数都执行一次。

一开始以为是没有同步赋值，检查了一下没问题，才把关注点转移到 `debounce` 上面。移除防抖之后果然解决问题了，但防抖又不能去去掉。

所以查了一下相关的问题，发现是因为多个组件实例是共享同一个预置防抖的函数，并不是相互独立的。

一直以来都是直接如 Vue 文档中演示的这样来写的，加上请求接口就会是下面这样：

```
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

## [](#那么如何解决这个问题呢？ "# 那么如何解决这个问题呢？")# 那么如何解决这个问题呢？

Vue 的文档中也给出了相应的解决方案。

> 要保持每个组件实例的防抖函数都彼此独立，我们可以改为在 `created` 生命周期钩子中创建这个预置防抖的函数：
>
> ```
> export default {
>  created() {
>    // 每个实例都有了自己的预置防抖的处理函数
>    this.debouncedClick = _.debounce(this.click, 500)
>  },
>  unmounted() {
>    // 最好是在组件卸载时
>    // 清除掉防抖计时器
>    this.debouncedClick.cancel()
>  },
>  methods: {
>    click() {
>      // ... 对点击的响应 ...
>    }
>  }
> }
> ```

***

## [](#参考资源 "参考资源")参考资源

[vue 踩坑小记 - 如何正确的使用 debounce](https://juejin.cn/post/6844903516788506637)\
[#有状态方法 响应式基础 | Vue.js](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#stateful-methods)

[**Newer**](https://yogwang.site/2022/vue-props-type-validation-with-Null-and-undefined/ "Vue 中接收没有声明的 Prop 属性 \[null/undefined] 的接收问题")

[Vue 中接收没有声明的 Prop 属性 \[null/undefined\] 的接收问题](https://yogwang.site/2022/vue-props-type-validation-with-Null-and-undefined/ "Vue 中接收没有声明的 Prop 属性 \[null/undefined] 的接收问题")

[**Older**](https://yogwang.site/2022/CSS-frosted-glass/ "CSS 实现毛玻璃效果的一种新方式")

[CSS 实现毛玻璃效果的一种新方式](https://yogwang.site/2022/CSS-frosted-glass/ "CSS 实现毛玻璃效果的一种新方式")

<!-- 侧边栏 sidebar -->
