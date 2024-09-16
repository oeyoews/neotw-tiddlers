最新推荐文章于 2024-07-03 09:29:05 发布

![](https://csdnimg.cn/release/blogv2/dist/pc/img/original.png)

[Casanover](https://blog.csdn.net/wzj2584454 "Casanover") ![](https://csdnimg.cn/release/blogv2/dist/pc/img/newCurrentTime2.png) 于 2017-09-26 16:19:15 发布

版权声明：本文为博主原创文章，遵循[ CC 4.0 BY-SA ](http://creativecommons.org/licenses/by-sa/4.0/)版权协议，转载请附上原文出处链接和本声明。

background-size 中，100% 和 cover 都是用于将图片扩大或者缩放来适应整个容器

background-size：100% 100%;--- 按容器比例撑满，图片变形；

background-size：cover;--- 把背景图片放大到适合元素容器的尺寸，图片比例不变，但是要注意，超出容器的部分可能会裁掉。

当为百分比的时候，100% 和 100%，100% 也会显示不一样的效果：

background-size: 这个属性有两个值，第一个值为 x 轴方向的缩放比例或者 px, 第二个值为 y 轴方向的缩放比例或者 px，如果只写一个值，则第二个值默认为 auto (根据图片原来的比例，以及现有的宽度，来确定高度)\
比方说：你有一张长宽比例为 4:3 的图片，有一个 width:100px;height:50px; 的盒子 (也就是长宽比例为 2:1)。\
background-size:100% 100%; 这种方式设置完背景图片的大小后，会完全铺满整个盒子，并且背景图片的比例会因此改变为 2:1\
background-size:100%; 这种方式设置的背景图片的大小，x 轴会和盒子一样的宽，但是 y 轴由于默认为 auto，根据上面的理论计算得背景图片的高度为 300px, 但是盒子只有 50px 高，超出的部分隐藏，所以看两种写法的效果自然就不一样啦。\
第一种效果你一定会看到完整的背景图片，但是有可能被挤压 (失去图片原来的比例)\
第二种效果你不一定能看到完整的图片，但是图片的比例没有发生变化。
