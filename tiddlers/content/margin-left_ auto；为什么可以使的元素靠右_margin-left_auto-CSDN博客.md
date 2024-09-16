最新推荐文章于 2024-06-06 11:50:45 发布

![](https://csdnimg.cn/release/blogv2/dist/pc/img/original.png)

[野生小米椒](https://blog.csdn.net/x1037490413 "野生小米椒") ![](https://csdnimg.cn/release/blogv2/dist/pc/img/newCurrentTime2.png) 于 2021-01-28 14:40:18 发布

版权声明：本文为博主原创文章，遵循[ CC 4.0 BY-SA ](http://creativecommons.org/licenses/by-sa/4.0/)版权协议，转载请附上原文出处链接和本声明。

div {\
width: 100px;\
[margin](https://so.csdn.net/so/search?q=margin\&spm=1001.2101.3001.7020)-left: auto;\
}\
margin-right 不设置的话默认是 0，width 定宽之后，margin-left 取值为 auto ，自动占据了剩余的全部宽度，具体见 《css 权威指南》 P170\
除了 width 和 margin-left 其他值都是 0 ，把宽度值带入计算得到 margin-left = 包含块的宽度 - 100px 。所以最终 div 会靠近包含块的右边。
