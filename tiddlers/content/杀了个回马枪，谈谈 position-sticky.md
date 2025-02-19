by [zhangxinxu](https://www.zhangxinxu.com/) from <https://www.zhangxinxu.com/wordpress/?p=8244>\
本文可全文转载，个人网站无需授权，只要保留原作者、出处以及文中链接即可，任何网站均可摘要聚合，商用请联系授权。

### 一、Chrome 杀了个回马枪

`position:sticky`早有耳闻也有所了解，后来，Chrome 放弃了对其支持，我也就不关心这个声明了，今天偶然发现，卧槽，Chrome 什么时候杀了个回马枪，居然又支持了。眼瞅着，各个浏览器纷纷立了山头，要必要关心关心`position:sticky`了，不要被人留下厚此薄彼的口舌。

![position:sticky 兼容性](https://image.zhangxinxu.com/image/blog/201812/2018-12-01_004224.png)

Safari 目前还需要 - webkit - 私有前缀。

### 二、position:sticky 简介

单词 sticky 的中文意思是 “粘性的”，`position:sticky`表现也符合这个粘性的表现。基本上，可以看出是`position:relative`和`position:fixed`的结合体 —— 当元素在屏幕内，表现为 relative，就要滚出显示器屏幕的时候，表现为 fixed。例如，可以滚动下面这个框框感受下交互表现：

其中导航元素设置了如下 CSS：

```
nav {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
}
```

于是，正如大家看到，随着页面的滚动，当导航距离上边缘 0 距离的时候，黏在了上边缘，表现如同`position:fixed`。

//zxx: position:sticky 要想生效，top 属性或则 left 属性（看滚动方向）是必须要有明确的计算值的，否则 fixed 的表现不会出现。

这就是`position:sticky`最基本的表现，特别适合导航的跟随定位效果。

![转折示意图片](https://image.zhangxinxu.com/image/blog/201812/shilaimu-s.jpg)

很多人以为`position:sticky`就上面这点效果，就好像以为就是个平常的史莱姆一样，实际上，`position:sticky`可以实现性价比极高，甚至还有点小酷的交互布局效果。嘿嘿，这可是皇帝的夜壶 —— 不是人人都能看到的哟。

### 三、富有层次的滚动交互

滚动下面这个嵌入页面的滚动条，我们可以看到新闻标题依次推上去，网友评论也会在恰当的时间从背后钻出来。

如果上面页面显示不出来，可以狠狠地点击这里：[position:sticky 实现的富有层次的滚动交互 demo](https://www.zhangxinxu.com/study/201812/position-sticky-demo.php)

GIF 录屏效果如下：

![GIF 录屏效果截图](https://image.zhangxinxu.com/image/blog/201812/sticky-layout-s.gif)

### 四、你可能不知道的 position:sticky

`position:sticky`有个非常重要的特性，那就是**sticky 元素效果完全受制于父级元素们**。

这和`position:fixed`定位有着根本性的不同，fixed 元素直抵页面根元素，其他父元素对其 left/top 定位无法限制。

根据我简单的测试，发现了 sticky 元素以下一些特性表现：

1. 父级元素不能有任何`overflow:visible`以外的 overflow 设置，否则没有粘滞效果。因为改变了滚动容器（即使没有出现滚动条）。因此，如果你的`position:sticky`无效，看看是不是某一个祖先元素设置了`overflow:hidden`，移除之即可。
2. `2019-05-22新增`\
   父级元素设置和粘性定位元素等高的固定的`height`高度值，或者高度计算值和粘性定位元素高度一样，也没有粘滞效果。我专门写了篇文章深入讲解了粘性效果无效的原因，可以[点击这里查看](https://www.zhangxinxu.com/wordpress/2020/03/position-sticky-rules/)。
3. 同一个父容器中的 sticky 元素，如果定位值相等，则会重叠；如果属于不同父元素，且这些父元素正好紧密相连，则会鸠占鹊巢，挤开原来的元素，形成依次占位的效果。至于原因需要理解粘性定位的计算规则，同样[点击这里查看](https://www.zhangxinxu.com/wordpress/2020/03/position-sticky-rules/)。
4. sticky 定位，不仅可以设置`top`，基于滚动容器上边缘定位；还可以设置`bottom`，也就是相对底部粘滞。如果是水平滚动，也可以设置`left`和`right`值。

下面，我们再看看看富有层次的滚动效果的实现原理。

### 五、层次滚动实现原理

首先，HTML 结构如下（结构很重要）：

```
<article>
    <section>
        <h4>网曝王宝强殴打马蓉</h4>
        <content>
            <p>12月2日，有网友爆料称...</p>
        </content>
        <footer>网友评论：...</footer>
    </section>
    <section>
        <h4>知情人爆料称马蓉闯入王宝强家拿剪刀对峙</h4>
        <content>
            <p>...</p>
        </content>
        <footer>网友评论：...</footer>
    </section>
    ...
</article>
```

其中，标题`<h4>`和底部`<footer>`设置了 sticky 定位，如下：

```
article h4, 
h4 {
    position: sticky;
    top: 0;
    z-index: 1;
}
content {
    position: relative;
}
footer {
    position: sticky;
    bottom: 50vh;
    z-index: -1;
}
```

由于每一段短新闻都在 section 标签中，属于不同的父元素，因此，滚动的时候，后面的新闻标题才能把前面已经 sticky 定位的新闻标题推开，这是 sticky 定位天然的特性，无需任何 JavaScript 的帮助。

如果，我们这里的 HTML 结构做调整，标题都是平级的，如下：

```
<article>
    <section>
        <h4>网曝王宝强殴打马蓉</h4>
        <content>
            <p>12月2日，有网友爆料称...</p>
        </content>
        <footer>网友评论：...</footer>
        
        <h4>知情人爆料称马蓉闯入王宝强家拿剪刀对峙</h4>
        <content>
            <p>...</p>
        </content>
        <footer>网友评论：...</footer>
    </section>
    ...
</article>
```

则最终效果是所有 sticky 定位的新闻标题都会重叠在一起，这并不是我们想要的效果。所以，记住了，`position:sticky`布局的时候，使用合适的 HTML 结构很重要。

***

效果中，网友评论从后面钻出来的效果又是如何实现的呢？

两个关键点：

1. 定位用的`bottom`，效果和`top`正好是对立的。设置`top`粘滞的元素随着往下滚动，是先滚动后固定；而设置`bottom`粘滞的元素则是先固定，后滚动；
2. `z-index:-1`让网友评论 footer 元素藏在了 content 的后面，于是才有了 “犹抱琵琶半遮面” 的效果。

#### position:sticky polyfill

CSS \`position: sticky\` 声明的 Polyfill 地址：<https://github.com/wilddeer/stickyfill>

可以兼容到 IE9 及其以上浏览器。

### 六、男人这辈子最重要的是什么？

这男人这辈子，最重要的一件事情，不是高考胜败，或者某场比赛输赢，最重要的绝对是找一个靠谱的老婆！

好的老婆可以让你不断进步，不断成长，一往无前，蒸蒸日上。正所谓一个成功男人的背后总有一个默默支持他的女人！而一个糟糕的老婆，…… 看看王宝强，我就不多说什么了。

所以，在座的诸位年轻才俊们，作为过来人，一定要给你们一些建议：找老婆，外表绝对不是最重要的，内心的品质绝对是最最重要的。那种性格暴烈，或者自卑压抑，或者好逸恶劳，或者总是损你贬你的女人，一定要敬而远之，至少千万不要迈进婚姻的殿堂。

这就像一个蝴蝶效应，你们要相处 40 年甚至更久，平时看似微不足道对你的不好的影响，那日积月累就会质变；反之，如果是贤妻，久而久之，你就会慢慢超越那些家门不幸的男人，成为所谓成功的男人。

这远比你一场成功的面试，或者中一次锦鲤重要太多太多了。

皮囊不重要，关键内在，内在！

谨记！

![](https://image.zhangxinxu.com/image/emtion/emoji/1f44a.svg)

（本篇完）![](https://image.zhangxinxu.com/image/emtion/emoji/1f44d.svg) 是不是学到了很多？可以分享到微信！\
![](https://image.zhangxinxu.com/image/emtion/emoji/1f44a.svg) 有话要说？点击[这里](#comment "点击定位到评论")。

<!-- Tag -->
