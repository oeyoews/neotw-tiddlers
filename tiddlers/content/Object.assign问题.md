[![头像](https://avatar-static.segmentfault.com/159/590/1595900556-5ac7686510d5d_big64)](https://segmentfault.com/u/juneyjwang)

在看 Vue 官网教程，对于添加多个属性，有下面建议:

\===== 分割线 ===================\
如果你想添加新的响应式属性，不要像这样：

Object.assign(**vm.userProfile**, {\
age: 27,\
favoriteColor: 'Vue Green'\
})\
你应该这样做：

**vm.userProfile** = Object.assign(**{}**, **vm.userProfile**, {\
age: 27,\
favoriteColor: 'Vue Green'\
})\
\======= 分割线 ================

两种写法有区别？怎么样都会破坏了 vm.userProfile 啊

###### 你尚未登录，登录后可以

* **和开发者交流问题的细节
* **关注并接收问题和回答的更新提醒
* **参与内容的编辑和改进，让解决方法与时俱进

- ##### [后端一次传过来 2000 万条数据，前端怎么处理？](https://segmentfault.com/q/1010000045056858?utm_source=sf-similar-question)
  [要可视化展示设备数据，而这个设备数据非常多，一小时就能产生上百万条数据，传过来的 json 文件都有几百兆大小；我使用的 vue3 vite echarts chrome 单标签 4g 内存爆了](https://segmentfault.com/q/1010000045056858?utm_source=sf-similar-question)

  [7<!-- --> 回答 2.7k<!-- --> 阅读✓ 已解决](https://segmentfault.com/q/1010000045056858?utm_source=sf-similar-question)
- ##### [overflow 创建的 BFC 和 float 创建的 BFC 为什么会有这样的区别？](https://segmentfault.com/q/1010000044870852?utm_source=sf-similar-question)
  [现在的 css 布局，浮动用的比较少了，但是还是想 问一下 浮动的 BFC。创建 BFC 的情况 \[链接\] overflow:hidden 创建的 BFC \[链接\] 特点：即便 img 右侧没有足够的空间，这个 BFC 还是选择了在 img 的右侧，通过延申高度来放下文字 Float 创建的 BFC \[链接\] 文字比较多的受直接到下一行显示，而不是在 img 右侧延申高度。文字比较少的时候：文字...](https://segmentfault.com/q/1010000044870852?utm_source=sf-similar-question)

  [3<!-- --> 回答 752<!-- --> 阅读✓ 已解决](https://segmentfault.com/q/1010000044870852?utm_source=sf-similar-question)
- ##### [如何避免 css 全局污染？](https://segmentfault.com/q/1010000044952817?utm_source=sf-similar-question)
  [现在遇到一个项目，uniapp 开发的微信小程序，之前的所有页面都没有使用 scope 将 css 样式私有化，导致 css 属性全局污染了，现在要开发后续的功能，如何在后续的开发中避免之前 css 的样式污染？之前开发的内容不能使用 scope 将 css 私有化，因为一旦私有化可能会对某些页面造成影响，现在的情况就是之前的内容不能动，在此基础上...](https://segmentfault.com/q/1010000044952817?utm_source=sf-similar-question)

  [7<!-- --> 回答 1.8k<!-- --> 阅读](https://segmentfault.com/q/1010000044952817?utm_source=sf-similar-question)
- ##### [Vitepress 写产品手册渲染慢（8 分钟以上）如何优化？](https://segmentfault.com/q/1010000045040042?utm_source=sf-similar-question)
  [使用 Vitepress 写产品手册，渲染比较慢（8 分钟以上），有什么解决方法吗？因为手册功能比较多，有一千多个.md 文件，未来可能还会修修补补继续增加一些。最开始选择 vitepress 的时候，还有因为很多评论说 Vitepress 速度快。 现实咋不一样，是我用法问题？尝试过分成多个子项目，这样文件数就少了，但是这样管理比较麻烦。](https://segmentfault.com/q/1010000045040042?utm_source=sf-similar-question)

  [3<!-- --> 回答 838<!-- --> 阅读✓ 已解决](https://segmentfault.com/q/1010000045040042?utm_source=sf-similar-question)
- ##### [Vue 项目一个报错无法找到原因？](https://segmentfault.com/q/1010000045037442?utm_source=sf-similar-question)
  [排查了好久实在没有找到哪儿出了问题，时不时弹出来，编译结果又是正常的，尝试排查了好久但是一直没有办法排查出来，有遇到过这种报错的同学吗？或者有没有同学提供一种排查思路，因为我真的搞懵逼了。哈哈哈。](https://segmentfault.com/q/1010000045037442?utm_source=sf-similar-question)

  [4<!-- --> 回答 2.1k<!-- --> 阅读✓ 已解决](https://segmentfault.com/q/1010000045037442?utm_source=sf-similar-question)
- ##### [Vue 3.4+ 中 defineModel 该如何正确使用呢？](https://segmentfault.com/q/1010000044950185?utm_source=sf-similar-question)
  [在官网中查阅到了 defineModel 这个宏 API，于是就自己测试了一下，但是遇到一个很诡异的地方无法理解。下面是测试代码：这个是父组件，结构很简单，引入了一个子组件 {代码...} 子组件如下 {代码...} 问题：子组件的输出是不是有点问题呢？](https://segmentfault.com/q/1010000044950185?utm_source=sf-similar-question)

  [2<!-- --> 回答 1.9k<!-- --> 阅读✓ 已解决](https://segmentfault.com/q/1010000044950185?utm_source=sf-similar-question)
- ##### [VUE3 中 CSS 如何使用后台传过来的变量？](https://segmentfault.com/q/1010000044992754?utm_source=sf-similar-question)
  [最近在弄项目重构，里面所有的请求地址 (包括网络请求地址，样式地址，背景图片地址，图片地址) 都是拼接而成。具体的格式像:background-image:url ($!imageWebServer/$!config.store\_login\_pic.path/$!config.store\_login\_pic.name); 这样，这是在 css 中的引用。现在改用 VUE3+ElementPlus 来进行重构，现在后端提供 imageWebServe...](https://segmentfault.com/q/1010000044992754?utm_source=sf-similar-question)

  [3<!-- --> 回答 1.4k<!-- --> 阅读✓ 已解决](https://segmentfault.com/q/1010000044992754?utm_source=sf-similar-question)
