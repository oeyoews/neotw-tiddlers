by [zhangxinxu](https://www.zhangxinxu.com/) from <https://www.zhangxinxu.com/wordpress/?p=8073>\
本文可全文转载，个人网站无需授权，只要保留原作者、出处以及文中链接即可，任何网站均可摘要聚合，商用请联系授权。

### 一、引言开始言开头言

![浏览器原生平滑滚动缩略图](https://image.zhangxinxu.com/image/blog/201810/scroll-smooth-thumb.jpg)

#### 1. 这些年自己步子慢了

这些年自己在无障碍访问，SVG 和 Canvas 这些偏小众的领域花了大量的学习精力，以至于很多前端新特性，新技术没能及时关注和了解，有 CSS3 领域的新属性，有 JS 领域的新 API，包括全新的 ES6/ES7 语法等，相比以前的学习，步子确实慢了。比方说，本文要介绍的平滑滚动，无论是 CSS 还是 JS，现代浏览器都提供了原生的属性或方法支持，而且差不多已经有一年时间，而我最近才知道，和数年前实时关注新技术的自己形成了明显的对比。

不过随着 SVG 和 Canvas 的基础越来越牢固，细节越来越深入，我的学习重心已经开始往广度方向转移，慢慢拾起那些遗落的麦穗。

#### 2. 从干巴巴到又湿又滑

假设页面中有下面这一段 HTML：

```
<a href="#" rel="internal">返回顶部</a>
```

帮我们点击 “返回顶部” 这个文字链接的时候，页面就会 “唰” 地一声瞬间定位到浏览器顶部，速度之快，升势之猛，以至于你没有任何反应，就像暴风雨般的爱情，让你猝不及防，脑中不断回想：“我在哪里？我是谁？我刚刚做了什么？”

所有这些反应的产生，归根结底在于我们这个滚动效果实在是太干巴巴了，机械生硬没有灵性不解风情。

人是有情感的动物，既然我们做的网页是给人用的，那自然充满情感，不要那么干巴巴，让滚动效果又湿又滑，用户体验就会好。

光滑如雪的肌肤，饱满湿润的红唇，是不是总能让人心动不已？如果我们的交互效果也能做得如此，也同样也能让用户心动。

浏览器似乎也意识到这一点，从去年年底开始，已经开始支持浏览器的原生平滑滚动定位，CSS `scroll-behavior`属性和 JS `scrollIntoView()`方法都可以。

![scroll-behavior 浏览器兼容性](https://image.zhangxinxu.com/image/blog/201810/2018-10-20_101654.png)

OK，下面开始进入正题。![](https://image.zhangxinxu.com/image/emtion/emoji/1f61d.svg)

### 二、CSS scroll-behavior 与平滑滚动

`scroll-behavior:smooth`写在滚动容器元素上，可以让容器（非鼠标手势触发）的滚动变得平滑。

#### 语法

```
scroll-behavior: auto;
scroll-behavior: smooth;
```

初始值是`'auto'`。

我们先看一个实际的案例。

8 年前 “[无 JavaScript 纯 CSS 实现选项卡轮转切换效果](https://www.zhangxinxu.com/wordpress/?p=1108)” 这篇文章介绍了一种利用锚点定位纯 CSS 实现选项卡切换的技术（本质上是触发滚动条滚动）。

可以狠狠地点击这里：[无 JavaScript 实现的切换效果 demo](https://www.zhangxinxu.com/study/201009/anchor-and-div-show.html)

实现后的效果参见下 GIF 截屏：

![锚点选项卡切换](https://image.zhangxinxu.com/image/blog/201810/anchor-tab.gif)

基本功能可以满足，但有两个问题，一是由于改变 location 的 hash 实现的定位，会触发浏览器原生滚动行为，体验不好；二是选项卡内容的切换 “邦邦邦” 过于生硬。

于是，后来，我发明了一种基于控件元素 focus 触发滚动重定位的特性实现的纯 CSS 选项卡切换效果，在《CSS 世界》这本书 overflow 章节有提到，您可以狠狠的点击这里：[focus 锚点定位和 overflow 的选项卡切换 demo](https://demo.cssworld.cn/6/4-3.php)

![focus 输入框与选项卡切换](https://image.zhangxinxu.com/image/blog/201810/css-focus-tab.gif)

也是纯 CSS 实现，没有任何 JavaScript 代码，相比直接利用`<a>`元素的`href`锚点跳转方法，此方法不会触发浏览器外部窗体的滚动，体验更上一层楼，但是还有一个问题，那就是选项卡内容切换的时候，还是 “邦邦邦” 这种干巴巴的效果，并没有滑来滑去那种湿湿的效果。

不要担心，现在有了 CSS scroll-behavior，则平滑滚动的问题也可以解决了。您可以狠狠地点击这里：[CSS scroll-behavior 选项卡平滑滚动 demo](https://www.zhangxinxu.com/study/201810/css-scroll-behavior.php)

相比之前干巴巴的实现，就多了这么一句 CSS——`scroll-behavior:smooth`：

```
.box {
    scroll-behavior: smooth; 
    overflow: hidden; 
}
```

结果一股如沐春风的交互效果扑面而来，参见下面视频截屏效果（若无效果，访问[原文地址](https://www.zhangxinxu.com/wordpress/?p=8073)）：

一行 CSS 就可以锦上添花。

#### 更简单更实际的用途

其实`scroll-behavior`的使用没有那么多花头，你就记住这么一句话 ——

**凡是需要滚动的地方都加一句 scroll-behavior:smooth 就好了！**

你别管他用不用得到，也不用管浏览器兼容性如何，你都加上。这就像一个不要钱的免费抽奖，没有中奖，没关系，又没什么损失，中奖了自然好，锦上添花！`scroll-behavior:smooth`就是这种尿性。

举个例子，在 PC 浏览器中，网页默认滚动是在`<html>`标签上的，移动端大多数在`<body>`标签上，于是，我加上这么一句：

```
html, body { scroll-behavior:smooth; }
```

此时，点击下面这个 “返回顶部” 链接，就会平滑滚动到顶部（真・实时效果，可以点击尝试）。

[返回顶部](#)

HTML 代码如下：

```
<a href="#">返回顶部</a>
```

***

从这一点来看，业界浏览器的 CSS reset 都可以加上这么一条规则：

```
html, body { scroll-behavior:smooth; }
```

### 三、JS scrollIntoView 与平滑滚动

DOM 元素的`scrollIntoView()`方法是一个 IE6 浏览器也支持的原生 JS API，可以让元素进入视区，通过触发滚动容器的定位实现。

随着 Chrome 和 Firefox 浏览器开始支持 CSS `scroll-behavior`属性，顺便对，`scrollIntoView()`方法进行了升级，使支持更多参数，其中一个参数就是可以使滚动平滑。

语法如下：

```
target.scrollIntoView({
    behavior: "smooth"
});
```

我们随便打开一个有链接的页面，把首个链接滚动到屏幕外，然后控制台输入类似下面代码，我们就可以看到页面平滑滚动定位了：

```
document.links[0].scrollIntoView({
    behavior: "smooth"
});
```

如下视频截屏：

**其它：**

* `scrollIntoView()`升级后的方法，除了支持`'behavior'`，还有`'block'`和`'inline'`等参数，有兴趣可以参阅[MDN 相关文档](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)。
* 如果我们的网页已经通过 CSS 设置了`scroll-behavior:smooth`声明，则我们直接执行`target.scrollIntoView()`方法就会有平滑滚动，无需再额外设置`behavior`参数。例如，如果你是在鑫空间原站浏览的此文章，打开控制台，执行下面代码，就可以看到平滑滚动效果了：
  ```
  document.forms[0].scrollIntoView();
  ```

### 四、JS 平滑滚动向下兼容处理

JS 实现平滑滚动并不难，jQuery 中`animate()`方法：

```
scrollContainer.animate({
    scrollTop: 0
});
```

或者使用[requestAnimationFrame API](https://www.zhangxinxu.com/wordpress/?p=3695)这类原生 JS 也能实现。例如下面这个我速写的个方法：

```

var scrollSmoothTo = function (position) {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            return setTimeout(callback, 17);
        };
    }
    
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    
    var step = function () {
        
        var distance = position - scrollTop;
        
        scrollTop = scrollTop + distance / 5;
        if (Math.abs(distance) < 1) {
            window.scrollTo(0, position);
        } else {
            window.scrollTo(0, scrollTop);
            requestAnimationFrame(step);
        }
    };
    step();
};
```

使用的是[自己私藏缓动动画 JS 小算法](https://www.zhangxinxu.com/wordpress/2017/01/share-a-animation-algorithm-js/)，滚动先快后慢。

使用如下，例如，我们希望网页平滑滚动到顶部，直接：

```
scrollSmoothTo(0);
```

就可以了。

***

难的是如何支持平滑滚动的浏览器原生处理，不支持的浏览器还是使用老的 JS 方法处理。

我是这么处理的 JS 如下判断：

```
if (typeof window.getComputedStyle(document.body).scrollBehavior == 'undefined') {
   
}
```

这样就可以无缝对接了。

### 五、结语结尾语结束语

没有个人特质的文章就像没有灵魂的机器一样。怀念张含韵的照片，家里领导不放心，怕侵犯版权找上门，都给下掉了，现在的那些美女照片，就像白开水一样，索然无味……

我琢磨着要换个角色或者标签，例如…… 一匹马！

![一匹马的呼唤](https://image.zhangxinxu.com/image/blog/201810/2018-10-21_010855.png)

![](https://image.zhangxinxu.com/image/emtion/emoji/1f644.svg)

（本篇完）![](https://image.zhangxinxu.com/image/emtion/emoji/1f44d.svg) 是不是学到了很多？可以分享到微信！\
![](https://image.zhangxinxu.com/image/emtion/emoji/1f44a.svg) 有话要说？点击[这里](#comment "点击定位到评论")。

<!-- Tag -->
