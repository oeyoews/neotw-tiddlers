首先，在谈这个话题之前， 我们有必要了解一下库和框架的区别。

我们先来看 react 官网以及 vue 官网对他们的定位：

react:

![](https://pic1.zhimg.com/v2-ec94cb4ffa7ff59f7ad2bc4f10c5e5e0_b.jpg)

vue:

![](https://pic2.zhimg.com/v2-dfe5e136c2f95304b0d2947f5f9f1e01_b.jpg)

react 我们不说了，官网上明明白白说了，人家是一个 library，用于构建用户界面。

vue 的官方文档是说 vue 的核心库也只是关注视图（View）层。

所以，实际上来说，和 angular 有完整的解决方案不同，狭义的 vue.js 和 react.js 实际上只是 library，还并不是一个 framework，因为他们没有一整套的解决方案。

换句话来说，现在我们所讨论的 vue、react，都是我们将他们武装之后，他们有了一整套解决方案了。成为了一个框架，我们再来讨论他们的架构模式。

下面两层是不变的，先提前声明：

Model（数据模型）: 原始数据模型的管理。

View（视图）：用户接触操作的页面。

**MVC:**

Controller（应用逻辑控制层）：将用户的操作反馈给 Model，通知其进行数据更新，业务逻辑的中心。

![](https://pic4.zhimg.com/v2-d7ca7bf6923e55538ca497b322d7e83b_b.jpg)

我们可以先暂时抛开框架，MVC 的流程大概就是，html（View）操作，告知 js（Controller）要更新数据（Model）啦，js（Controller）经过请求也好啥也好，更新了数据（Model），然后再告诉 html (View) 找指定的 UI 节点去更新数据。当然这里也可以直接由 js（Controller）发起对数据（Model）的更新，流程差不多也是一样的。

其实流程列出来我们就可以看到，这样的架构模式在早期的 web 应用中可以适应的很好。因为早期的 web 应用，页面的作用基本也就作为数据展示使用。Model 层可以将数据处理好后通知 View 层渲染，就像 jquery 拿到 ajax 数据之后找到元素一顿 innerHtml 啥的。

但随着 web 的发展，业务逻辑的复杂，可以发现这种架构模式以下两个问题：

1、View 更新的时候，必须要通过 Controller 去更新一遍 Model；同样的 Model 更新的时候，也要去更新一遍视图。此时开发者是在同时维护 View 层和 Model 层。当页面复杂的时候，开发者不得不做许多繁琐的工作来保证数据的状态、页面的展示都是正确的。

2、View 层与 Model 层耦合，复用性差。比方说，我点击一个按钮，更新了 Model 并将数据渲染为 List；这是我再点击一个按钮，同样更新这份数据但是渲染为 Table。这个时候，由于之前逻辑已经连成一块，我们不得不再写一套渲染代码。

3、同样是由于 View 和 Model 耦合，数据流会十分混乱。比如改变了 Model，这时 View 的更新又触发了另一个 Controller，使得另一个 Model 又更新了，这就会使数据流像意大利面条一样缠在一起。

**MVP：**

诶这个时候我们想，好像这个 Controller 并没有什么卵用啊，就传递一下信号就完事儿了。不行，活干的这么少，让他再多干点！

如果我们能将数据返回给 Controller，让 Controller 来控制 View 的渲染，那么，View 和 Model 不就释放了吗？于是，MVP 模式诞生了，操作流如下图所示：

![](https://pic2.zhimg.com/v2-48157c1552520805fd56f0d749ac92dd_b.jpg)

不过此时的 Controller 层变成了**Presenter**（中介者）层，Presenter 层既能将页面操作告知 Model 进行数据更新，又能在数据更新时负责通知 View 进行更新视图，使 View 层与 Model 层解耦。

针对上述问题 2，在 MVP 架构模式下，Model 层将数据返回给 Presenter，再由 Presenter 决定我是渲染 Table 呢，还是渲染 List。这种架构模式下，加强了 Presenter 的职能，这样就解决了上述问题 2、3。

但问题 1 依然存在啊！开发者依旧需要在 Presenter 中同时兼顾 Dom 和 Data。

**MVVM：**

在此基础上，**如果说视图层（View）与数据层（Model）是在某个环境下是绑定的，可以实现通过数据驱动视图**，那么，上述两个问题，就都可以得到解决。于是 MVVM 诞生了，先看操作流：

![](https://pic3.zhimg.com/v2-f2a68090c4056de7604d488321479f8a_b.jpg)

在中间的 ViewModel 层中，会构建一份状态数据，视图层根据其渲染视图。这样， 开发者的精力被释放，只要聚焦在业务逻辑中。所以，我的理解是，**MVVM 就是实现了数据绑定的 MVP，注意，是绑定，而不是双向绑定！！！（单向数据流和双向数据流）**。

\----------------------------------------------------------------------------------------------

**Vue**

个人认为，这是毫无争议的一个 MVVM 框架，对 MVVM 理念的贯彻也是最显而易见的。

Model 层：接口层，原始数据模型。

View 层：视图层，template 中的 html 代码。

ViewModel 层：基于一个 html 元素构建的 vue 实例。将 Model 中的原始数据模型，构建成一份 View 层可以使用的视图模型。这个时候，Model 层、View 层完全解耦。开发者已经完全不需要顾及 View 的展示更新了，只需要专注业务逻辑以及 ViewModel 层与 Model 的交互逻辑就 ok。

**AngularJs**

Model 层：接口层，原始数据模型。

View 层：html 页面。

ViewModel 层：基于 ng-app 构建的应用实例，与 vue 类似，数据双向绑定机制不同。

**React**

Model 层：接口层，原始数据模型。

View 层：编译之后的 Dom。

ViewModel 层：基于 jsx 语法，以及 react 构建的 VDom，单向数据流。

这么一看，vue、react、angularJS 不就都是 MVVM 框架吗？唯一的区别就是，VM 层中的 Model 与 View，vue 与 angular 是数据双向绑定，而 react 由于是单向数据流，所以需要手动更改状态。

\-----------------------------------------------------------------------------------------------

最后说下感受吧，其实之前一直以为自己是对这三种架构模式心里有底，但现在越看越绕，感觉归根结底就是，**在结合现有框架进行分析的时候，对 model 层与 中间层（c，p 或 vm）的边界界定十分模糊，没有一个清晰的划分。但是，现在想来也没必要这么钻牛角尖，其实吧，每一层专注于每一层的任务，这即是核心。在此基础上的扩展以及如何对代码进行组织管理，是看需求来界定的，这也是框架架构模式不断发展的原因。**

**最后的最后：由于只是用过这三个框，个人理解肯定存在局限性和不足的地方，希望各位大佬指正！！！！**

**参考（看了很多，感觉就这三篇算是干货比较多的）：**

[前端框架模式的变迁](https://link.zhihu.com/?target=https%3A//www.sohu.com/a/196888650_466839)

[一篇文章了解架构模式：MVC/MVP/MVVM](https://link.zhihu.com/?target=https%3A//segmentfault.com/a/1190000015310674)

[MVC，MVP 和 MVVM 的图示](https://link.zhihu.com/?target=http%3A//www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)
