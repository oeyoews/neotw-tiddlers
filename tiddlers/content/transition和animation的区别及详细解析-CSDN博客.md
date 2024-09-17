最新推荐文章于 2023-10-07 17:44:46 发布

![](https://csdnimg.cn/release/blogv2/dist/pc/img/original.png)

[SpringRolls](https://blog.csdn.net/SpringRolls "SpringRolls") ![](https://csdnimg.cn/release/blogv2/dist/pc/img/newCurrentTime2.png) 于 2020-05-08 14:13:11 发布

版权声明：本文为博主原创文章，遵循[ CC 4.0 BY-SA ](http://creativecommons.org/licenses/by-sa/4.0/)版权协议，转载请附上原文出处链接和本声明。

答案：

他们虽然都可以做出动画效果，但是 transition 主要做简单的过渡效果，而 animation 可以做复杂的动画效果，在语法和用法上有非常大的区别。

transition 是**过渡属性**，强调过渡，他的实现需要触发一个事件（比如鼠标移动上去，焦点，点击等）才执行动画，过渡只有一组（两个：开始 - 结束）关键帧。

animation 是**动画属性**，他的实现不需要触发事件，设定好时间之后可以自己执行，且可以循环一个动画（设置多个关键帧）。

详细解析：

#### []()**transition - 属性：**

transition-property：动画展示哪些属性，可以使用 all 关键字；

transition--duration：动画过程有多久；

transition-timing-function:linear,ease,ease-in,ease-out,ease-in-out，贝塞尔曲线等：控制动画速度变化；

transition-delay：动画是否延迟执行；

#### []()animation - 属性：

animation-name：keyframes 中定义的动画名称；

animation-duration：动画执行一次持续的时长；

animation-timing-function：动画速率变化函数；

animation-delay：动画延迟执行的时间；

animation-iteration-count：动画执行的次数，可以是数字，或者关键字（infinate）;

animation-direction：alternate (奇数次超前运行，偶数次后退运行)。

animation-fill-mode：告诉浏览器将元素的格式保持为动画结束时候的样子。
