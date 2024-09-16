最新推荐文章于 2024-05-31 19:50:46 发布

![](https://csdnimg.cn/release/blogv2/dist/pc/img/original.png)

[想上天的小鱼](https://blog.csdn.net/weixin_38629529 "想上天的小鱼") ![](https://csdnimg.cn/release/blogv2/dist/pc/img/newCurrentTime2.png) 于 2021-09-19 16:13:02 发布

版权声明：本文为博主原创文章，遵循[ CC 4.0 BY-SA ](http://creativecommons.org/licenses/by-sa/4.0/)版权协议，转载请附上原文出处链接和本声明。

说来惭愧，最近刚犯错这个错误。为避免再犯，还是记录一下吧。

在出现 z-index 设置不起作用，没有效果的情况下，我们首先检查 z-index 设置的元素是否存在以下两种状况：

1. 该元素是否设置了定位
2. 该元素的父级是否已经设置了 z-index（检查需比较的元素是否同在一个层叠上下文）

为什么要检查这两种情况呢？我们先来说结论：

* **z-index 只作用在使用了定位的元素上，也就是我们经常用的 position 属性，static 除外（如果不是定位元素，那我们设置 z-index 是不会起作用的）**
* **同一个父级元素下的元素层叠效果是受父级影响的，就是说如果你的父级 z-index 很小，那你子级设置再大也没有用**

如果看明白了这个结论，那我想你应该找到解决方案了。

几种比较常见的失效情况：

1. 元素没有设置 position 属性
2. 元素设置了浮动 float
3. 父级元素的 z-index 比子级元素的 z-index 小
4. 元素的父级设置了 position: relative

解决方案：

1. 设置 position 属性（除了 static）
2. 清除浮动
3. 提高父级 z-index
4. 父级的 position 改为绝对定位 absolute

好了，后续遇到其他情况再继续补充，也欢迎大家一起交流！
