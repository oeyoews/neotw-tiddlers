最近在看一篇[微前端](https://so.csdn.net/so/search?q=%E5%BE%AE%E5%89%8D%E7%AB%AF\&spm=1001.2101.3001.7020)的文章的时候，看到了这么一个评论，瞬间引起了我的求知欲，这个评论是这样的

![c5f57f4947a7415fbb6cf72b3264886b.jpg](https://i-blog.csdnimg.cn/blog_migrate/6617161d1c5885945335a125c4bf827d.jpg)

 可能有些人不知道微前端是啥，也不知道 主应用 和 子应用 是啥，我画一个图给大加简单展示一下吧：

![ea2bc355a3fa4618ad5a38dbf6353c3e.png](https://i-blog.csdnimg.cn/blog_migrate/8f51119dd095a146a14d9752b44f940f.png)

 在这里再说一下 vue 文件的 scoped [style](https://so.csdn.net/so/search?q=style\&spm=1001.2101.3001.7020) 是怎么做到样式隔离的，其实就是 vue 解析器 在解析 vue 文件的时候，会通过内部的一种计算方法（怎么算的后面会说），给每一个 vue 文件的 html 标签加上 data-v-xxx 这样的属性，接着通过 属性选择器 ，来进行样式隔离，也叫样式模块化

![3e788bd223b04216ae3b60114bb30aa6.png](https://i-blog.csdnimg.cn/blog_migrate/8845790f60f3cb73db5c8cf74a5c30f8.png)

![9a3e2909dcc24f4ba9aaa748b1e3bdb4.jpg](https://i-blog.csdnimg.cn/blog_migrate/02047e7b48fe81c3f594cc9e2cca2ecc.jpg)

 回到刚刚那个问题，微前端项目中的 主项目 和 子项目 由于存在了相同相对路径的 vue 文件，导致了两个项目的两个 vue 文件的样式产生了冲突～所以，我们可以初步知道了，data-v-xxx 这个属性是根据 vue 文件相对路径去计算出来的。但这也只是初步而已，具体我们还得去看一下源码才行，这样才能锻炼我们解决问题的能力～

[Vue2](https://so.csdn.net/so/search?q=Vue2\&spm=1001.2101.3001.7020) 和 Vue3 的计算方式大差不差

简单看源码

先来看看 Webpack + vue-loader 对 Vue2 是怎么处理的，源码链接：https\://github.com/vuejs/vue-loader/blob/8357e071c45e77de0889a9feedf2079a327f69d4/src/index.ts#L142

![fe2d35ea8ec4468ea754c7017dbd07e1.png](https://i-blog.csdnimg.cn/blog_migrate/b09bd4249dcf43bf3fb665800bd1a49e.png)

 再来看看 vite + @vitejs/plugin-vue 对于 Vue3 是怎么处理的，源码链接：https\://github.com/vitejs/vite-plugin-vue/blob/main/packages/plugin-vue/src/utils/descriptorCache.ts

![55604be91b5644099ebc9aaa7635da1c.png](https://i-blog.csdnimg.cn/blog_migrate/e83f64225afdfd30be52165eb76ffabd.png)

#### []()开发环境 & 生产环境

其实两种的解析方式大差不差，总结为以下：

* **开发环境：** 根据`文件的相对路径`进行计算`data-v-xxx`

* **生产环境：** 根据与文件的`相对路径 + 文件内容`进行计算 `data-v-xxx`

所以可以看出在开发环境和生产环境的时候，都有可能两个 vue 文件的 scoped style 样式发生冲，虽然这只是比较边界的情况～

为什么生产环境不把`文件内容`加入计算呢？我想应该是因为开发阶段文件内容变化的比较频繁，所以如果把`文件内容`加入计算的话，势必会造成构建时间的加长。

如何防样式冲突？

虽然 scoped style 发生样式冲突只是小概率事件，但是我们也得思考一下怎么去避免呢？掘金有一个大佬，给 Vue 官方提了一个 PR，就是在计算 data-v-xxx 的时候，加入 package.json 的 name 进行计算，也就是项目名，这样能防止两个不同项目之间的样式冲突～大佬牛啊！！！

![bb2daff57c194a689a10586f52037859.png](https://i-blog.csdnimg.cn/blog_migrate/3401707c97c9b8dafd01db896a1c5972.png)

 以上内容源自于，林三心不学挖掘机
