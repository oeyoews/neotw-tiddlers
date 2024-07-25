#### []()结论先行：

在优先级上， mounted 生命周期高于 activated 生命周期。

当一个组件实例第一次被挂载时，mounted 生命周期会被触发。而 activated 生命周期是在组件从缓存中取出并且成功渲染到 DOM 之后才会被调用的。

因此，优先级上 mounted [生命周期](https://so.csdn.net/so/search?q=%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F\&spm=1001.2101.3001.7020)高于 activated 生命周期。

#### []()分析： 

在 Vue 中，mounted 生命周期是指一个组件被挂载到 [DOM](https://so.csdn.net/so/search?q=DOM\&spm=1001.2101.3001.7020) 中后触发的钩子函数。

而 keep-alive 是一个用来缓存组件的抽象组件，它自身没有任何展示效果，只是将内部包含的组件缓存起来，从而能够在需要时快速地切换到缓存的组件。当一个组件被 keep-alive 包裹时，那该组件就多了 2 个生命周期，分别是 [activated](https://so.csdn.net/so/search?q=activated\&spm=1001.2101.3001.7020) 和 diactivated。

> 在 Vue 中，mounted 和 activated 生命周期函数都是组件被挂载到 DOM 上时自动执行的钩子函数。

> 不同的是，mounted 在每次组件挂载（或重新渲染）到 DOM 上时都会调用，而 activated 只在使用了 \<keep-alive> 组件缓存时才会调用。

activated 是在组件从缓存中取出并且成功渲染到 DOM 之后才会被调用的。

当一个组件第一次被挂载时，mounted 生命周期会被触发，同时 keep-alive 中的缓存组件还没有被渲染，因此 activated 生命周期并不会被触发。只有当一个被缓存的组件被激活后（比如从其他页面返回到该组件所在的页面），activated 生命周期才会被触发。

因此，优先级上 mounted 生命周期高于 activated 生命周期。
