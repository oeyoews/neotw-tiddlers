![](https://csdnimg.cn/release/blogv2/dist/pc/img/original.png)

[南乔几经秋](https://blog.csdn.net/weixin_39072332 "南乔几经秋") ![](https://csdnimg.cn/release/blogv2/dist/pc/img/newCurrentTime2.png) 于 2019-08-30 17:14:20 发布

版权声明：本文为博主原创文章，遵循[ CC 4.0 BY-SA ](http://creativecommons.org/licenses/by-sa/4.0/)版权协议，转载请附上原文出处链接和本声明。

在写界面时遇到一个问题：在[flex](https://so.csdn.net/so/search?q=flex\&spm=1001.2101.3001.7020)布局中想实现文字超出隐藏并显示省略号，结果使用 white-space:nowrap 后，flex 布局失效了....

想实现的效果：

![](https://i-blog.csdnimg.cn/blog_migrate/824c60826a408a2f6a3f20b2aea3de13.png)

结果：

![](https://i-blog.csdnimg.cn/blog_migrate/5418786cdd4a400750548896487de1a1.png)

解决办法：

*给包含文字元素的父元素设置 min-width: 0*

总结：

white-space:nowrap 会影响 flex 布局下未设定宽度的元素，而只要对元素的宽度有一个下限设定就可以解决这个问题，不管是最小宽还是直接的宽度都 ok
