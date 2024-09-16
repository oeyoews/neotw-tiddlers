本篇通译自：[The large, small, and dynamic viewport units](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fweb.dev%2Fviewport-units%2F\&source=article\&objectId=2187974)

***

vw 和 vh 单位是我们都比较熟悉的两个单位，100vw 和 100vh 代表着视图窗口的宽和高。

![image.png](https://ask.qcloudimg.com/http-save/yehe-7738744/838f91daedc2ba4a4a1b54d7cd551b09.png)

image.png

我们在写移动端布局兼容的时候会经常用到它们，类似于百分比的写法；

它们有不错的兼容性：

![image.png](https://ask.qcloudimg.com/http-save/yehe-7738744/ddbc027c18656896f9cbc83bf6d818af.png)

image.png

然而有一个问题，当我们使用 100vh ，且有顶部地址栏或底部操作栏的时候，会出现溢出屏幕的情况：

![image.png](https://ask.qcloudimg.com/http-save/yehe-7738744/ac65da5dfffcde4c3bb6f5cae9118a48.png)

image.png

当滑动滚动条的时候，地址栏和操作栏又会搜索，此时 100vh 又会充满整个窗口：

宽度也是如此，会受滚动条宽度的影响；

![image.png](https://ask.qcloudimg.com/http-save/yehe-7738744/495291c985eb930cab046f083a1807f7.png)

image.png

为了解决这个问题，出现了两个新单位：

**svh、lvh**

![image.png](https://ask.qcloudimg.com/http-save/yehe-7738744/b0d16bdae4641eb1b0d5363f6c4971fb.png)

image.png

s 就是 small 的缩写

l 就是 large 的缩写

100 svh 将不会有溢出的情况！

![image.png](https://ask.qcloudimg.com/http-save/yehe-7738744/1382c708d46ed0ffc2c3bffd3ee08182.png)

image.png

除了 svh 还有另外一个更神奇的新单位：dvh，这个 d 是 dynamic 的缩写，它是动态的：

一图胜千言：

![image.png](https://ask.qcloudimg.com/http-save/yehe-7738744/f21fc2efc8694ccb2bee05b45cc5b92a.png)

image.png

只不过 svh 和 dvh 的支持还没有特别的好

![image.png](https://ask.qcloudimg.com/http-save/yehe-7738744/f98c335c67470842b2633f9d951c71e4.png)

image.png

不过将来肯定会用上的～因为已经厌倦了那种算顶部栏、底部狂、侧边滚动条宽度及高度的日子。

除了 vh、svh、dvh 这个系列，再回复下另外我们可能忽视的单位：

vmin、vmax

vmin 是设备宽高最小的那个；

vmax 则是设备宽高最大的那个；

vi、vb

vi 是 *Viewport Inline*，可以简单理解为文本的走向上的宽度；

vb 则是与 vi 垂直；

与之对应的，也是有 svmin、dvmin、svmax、dvmax、svi、dvi、svb、dvb

总而言之：

svh 的 s 就是 small

dvh 的 d 就是 dynamic

看图说话，你学废了吗？

***

> OK，以上便是本篇分享，希望各位工友喜欢～欢迎点赞、收藏、评论 🤟 我是掘金安东尼 🤠 100 万人气前端技术博主 💥 INFP 写作人格坚持 1000 日更文 ✍ 关注我，安东尼陪你一起度过漫长编程岁月 🌏 😺我的博客：[tuaran.github.io](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Flink.juejin.cn%2F%3Ftarget%3Dhttps%253A%252F%252Ftuaran.github.io%252F\&source=article\&objectId=2187974) 😸公众号：掘金安东尼

***本文正在参加***[***「金石计划。瓜分 6 万现金大奖」***](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fjuejin.cn%2Fpost%2F7162096952883019783\&source=article\&objectId=2187974)

本文参与 [腾讯云自媒体同步曝光计划](https://cloud.tencent.com/developer/support-plan)，分享自作者个人站点 / 博客。

原始发表：2022-12-02，

<!-- -->

如有侵权请联系 <cloudcommunity@tencent.com> 删除
