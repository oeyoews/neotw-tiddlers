## No setTimeout, No setInterval

如果你不得不使用 setTimeout 或者 setInterval 来实现动画，那么原因只能是你需要精确的控制动画。但我认为至少在现在这个时间点，高级浏览器、甚至手机浏览器的普及程度足够让你有理由有条件在实现动画时使用更高效的方式。

### 什么是高效

页面是每一帧变化都是系统绘制出来的 (GPU 或者 CPU)。但这种绘制又和 PC 游戏的绘制不同，它的最高绘制频率受限于显示器的刷新频率 (而非显卡)，所以大多数情况下最高的绘制频率只能是每秒 60 帧 (frame per second，以下用 fps 简称)，对应于显示器的 60Hz。60fps 是一个最理想的状态，在日常对页面性能的测试中，60fps 也是一个重要的指标，the closer the better。在 Chrome 的调试工具中，有不少工具都是用于衡量当前帧数：

![](http://infoqstatic.com/resource/articles/javascript-high-performance-animation-and-page-rendering/zh/resources/0409000.jpg)

接下来的工作中，我们将会用到这些工具，来实时查看我们页面的性能。

60fps 是动力也是压力，因为它意味着我们只有 16.7 毫秒 (1000 / 60) 来绘制每一帧。如果使用 setTimeout 或者 setInterval (以下统称为 timer) 来控制绘制，问题就来了。

首先，Timer 计算延时的精确度不够。延时的计算依靠的是浏览器的内置时钟，而时钟的精确度又取决于时钟更新的频率 (Timer resolution)。IE8 及其之前的 IE 版本更新间隔为 15.6 毫秒。假设你设定的 setTimeout 延迟为 16.7ms，那么它要更新两个 15.6 毫秒才会该触发延时。这也意味着无故延迟了 15.6 x 2 - 16.7 = 14.5 毫秒。

```
            16.7ms
DELAY: |------------|

CLOCK: |----------|----------|
          15.6ms    15.6ms
```

所以即使你给 setTimeout 设定的延时为 0ms，它也不会立即触发。目前 Chrome 与 IE9 + 浏览器的更新频率都为 4ms (如果你使用的是笔记本电脑，并且在使用电池而非电源的模式下，为了节省资源，浏览器会将更新频率切换至于系统时间相同，也就意味着更新频率更低)。

退一步说，假使 timer resolution 能够达到 16.7ms，它还要面临一个异步队列的问题。因为异步的关系 setTimeout 中的回调函数并非立即执行，而是需要加入等待队列中。但问题是，如果在等待延迟触发的过程中，有新的同步脚本需要执行，那么同步脚本不会排在 timer 的回调之后，而是立即执行，比如下面这段代码：

```js
function runForSeconds(s) {
    var start = +new Date();
    while (start + s * 1000 > (+new Date())) {}
}

document.body.addEventListener("click", function () {
    runForSeconds(10);
}, false);

setTimeout(function () {
    console.log("Done!");
}, 1000 * 3);
```

如果在等待触发延迟的 3 秒过程中，有人点击了 body，那么回调还是准时在 3s 完成时触发吗？当然不能，它会等待 10s，同步函数总是优先于异步函数：

```
等待3秒延迟 |    1s    |    2s    |    3s    |--->console.log("Done!");

经过2秒     |----1s----|----2s----|          |--->console.log("Done!");

点击body后

以为是这样：|----1s----|----2s----|----3s----|--->console.log("Done!")--->|------------------10s----------------|

其实是这样：|----1s----|----2s----|------------------10s----------------|--->console.log("Done!");
```

John Resign 有三篇关于 Timer 性能与准确性的文章: 1.[Accuracy of JavaScript Time](http://ejohn.org/blog/accuracy-of-javascript-time/), 2.[Analyzing Timer Performance](http://ejohn.org/blog/analyzing-timer-performance/)， 3.[How JavaScript Timers Work](http://ejohn.org/blog/how-javascript-timers-work/)。从文章中可以看到 Timer 在不同平台浏览器与操作系统下的一些问题。

再退一步说，假设 timer resolution 能够达到 16.7ms，并且假设异步函数不会被延后，使用 timer 控制的动画还是有不尽如人意的地方。这也就是下一节要说的问题。

### 垂直同步问题

这里请再允许我引入另一个常量 60—— 屏幕的刷新率 60Hz。

60Hz 和 60fps 有什么关系？没有任何关系。fps 代表 GPU 渲染画面的频率，Hz 代表显示器刷新屏幕的频率。一幅静态图片，你可以说这副图片的 fps 是 0 帧 / 秒，但绝对不能说此时屏幕的刷新率是 0Hz，也就是说刷新率不随图像内容的变化而变化。游戏也好浏览器也好，我们谈到掉帧，是指 GPU 渲染画面频率降低。比如跌落到 30fps 甚至 20fps，但因为视觉暂留原理，我们看到的画面仍然是运动和连贯的。

接上一节，我们假设每一次 timer 都不会有延时，也不会被同步函数干扰，甚至能把时间缩短至 16ms，那么会发生什么呢：

(点击图像放大)

[![](http://infoqstatic.com/resource/articles/javascript-high-performance-animation-and-page-rendering/zh/resources/0505000.png)](http://infoqstatic.com/resource/articles/javascript-high-performance-animation-and-page-rendering/zh/resources/0505000.png)

在 22 秒处发生了丢帧

如果把延迟时间缩的更短，丢失的帧数也就更多：

![](http://infoqstatic.com/resource/articles/javascript-high-performance-animation-and-page-rendering/zh/resources/0409002.png)

实际情况会比以上想象的复杂的多。即使你能给出一个固定的延时，解决 60Hz 屏幕下丢帧问题，那么其他刷新频率的显示器应该怎么办，要知道不同设备、甚至相同设备在不同电池状态下的屏幕刷新率都不尽相同。

以上同时还忽略了屏幕刷新画面的时间成本。问题产生于 GPU 渲染画面的频率和屏幕刷新频率的不一致：如果 GPU 渲染出一帧画面的时间比显示器刷新一张画面的时间要短 (更快)，那么当显示器还没有刷新完一张图片时，GPU 渲染出的另一张图片已经送达并覆盖了前一张，导致屏幕上画面的撕裂，也就是是上半部分是前一张图片，下半部分是后一张图片：

![](http://infoqstatic.com/resource/articles/javascript-high-performance-animation-and-page-rendering/zh/resources/0409003.png)

PC 游戏中解决这个问题的方法是开启垂直同步 (v-sync)，也就是让 GPU 妥协，GPU 渲染图片必须在屏幕两次刷新之间，且必须等待屏幕发出的垂直同步信号。但这样同样也是要付出代价的：降低了 GPU 的输出频率，也就降低了画面的帧数。以至于你在玩需要高帧数运行的游戏时 (比如竞速、第一人称射击) 感觉到 “顿卡”，因为掉帧。

## requestAnimationFrame

在这里不谈 requestAnimationFrame (以下简称 rAF) 用法，具体请参考[MDN:Window.requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame)。我们来具体谈谈 rAF 所解决的问题。

从上一节我们可以总结出实现平滑动画的两个因素

1. 时机 (Frame Timing)： 新的一帧准备好的时机
2. 成本 (Frame Budget)： 渲染新的一帧需要多长的时间

这个 Native API 把我们从纠结于多久刷新的一次的困境中解救出来 (其实 rAF 也不关心距离下次屏幕刷新页面还需要多久)。当我们调用这个函数的时候，我们告诉它需要做两件事： 1. 我们需要新的一帧；2. 当你渲染新的一帧时需要执行我传给你的回调函数

那么它解决了我们上面描述的第一个问题，产生新的一帧的时机。

那么第二个问题呢。不，它无能为力。比如可以对比下面两个页面：

1. [DEMO](http://www.html5rocks.com/en/tutorials/speed/rendering/too-much-layout.html)
2. [DEMO-FIXED](http://www.html5rocks.com/en/tutorials/speed/rendering/too-much-layout-fixed.html)

对比两个页面的源码，你会发现只有一处不同：

```js
// animation loop
function update(timestamp) {
    for(var m = 0; m < movers.length; m++) {
        // DEMO 版本
        //movers[m].style.left = ((Math.sin(movers[m].offsetTop + timestamp/1000)+1) * 500) + 'px';

        // FIXED 版本
        movers[m].style.left = ((Math.sin(m + timestamp/1000)+1) * 500) + 'px';
        }
    rAF(update);
};
rAF(update);
```

DEMO 版本之所以慢的原因是，在修改每一个物体的 left 值时，会请求这个物体的 offsetTop 值。这是一个非常耗时的 reflow 操作 (具体还有哪些耗时的 reflow 操作可以参考这篇: [How (not) to trigger a layout in WebKit](http://gent.ilcore.com/2011/03/how-not-to-trigger-layout-in-webkit.html))。这一点从 Chrome 调试工具中可以看出来 (截图中的某些功能需要在 Chrome canary 版本中才可启用)

未矫正的版本

![](http://infoqstatic.com/resource/articles/javascript-high-performance-animation-and-page-rendering/zh/resources/0409004.png)

可见大部分时间都花在了 rendering 上，而矫正之后的版本：

![](http://infoqstatic.com/resource/articles/javascript-high-performance-animation-and-page-rendering/zh/resources/0409005.png)

rendering 时间大大减少了

但如果你的回调函数耗时真的很严重，rAF 还是可以为你做一些什么的。比如当它发现无法维持 60fps 的频率时，它会把频率降低到 30fps，至少能够保持帧数的稳定，保持动画的连贯。

## 使用 rAF 推迟代码

没有什么是万能的，面对上面的情况，我们需要对代码进行组织和优化。

看看下面这样一段代码：

```js
function jank(second) {
    var start = +new Date();
    while (start + second * 1000 > (+new Date())) {}
}

div.style.backgroundColor = "red";

// some long run task
jank(5);

div.style.backgroundColor = "blue";
```

无论在任何的浏览器中运行上面的代码，你都不会看到 div 变为红色，页面通常会在假死 5 秒，然后容器变为蓝色。这是因为浏览器的始终只有一个线程在运行 (可以这么理解，因为 js 引擎与 UI 引擎互斥)。虽然你告诉浏览器此时 div 背景颜色应该为红色，但是它此时还在执行脚本，无法调用 UI 线程。

有了这个前提，我们接下来看这段代码：

```
var div = document.getElementById("foo");

var currentWidth = div.innerWidth; 
div.style.backgroundColor = "blue";

// do some "long running" task, like sorting data
```

这个时候我们不仅仅需要更新背景颜色，还需要获取容器的宽度。可以想象它的执行顺序如下：

![](http://infoqstatic.com/resource/articles/javascript-high-performance-animation-and-page-rendering/zh/resources/0409006.png)

当我们请求 innerWidth 一类的属性时，浏览器会以为我们马上需要，于是它会立即更新容器的样式 (通常浏览器会攒着一批，等待时机一次性的 repaint，以便节省性能)，并把计算的结果告诉我们。这通常是性能消耗量大的工作。

但如果我们并非立即需要得到结果呢？

上面的代码有两处不足，

1. 更新背景颜色的代码过于提前，根据前一个例子，我们知道，即使在这里告知了浏览器我需要更新背景颜色，浏览器至少也要等到 js 运行完毕才能调用 UI 线程；

2. 假设后面部分的 long runing 代码会启动一些异步代码，比如 setTimeout 或者 Ajax 请求又或者 web-worker，那应该尽早为妙。

综上所述，如果我们不是那么迫切的需要知道 innerWidth，我们可以使用 rAF 推迟这部分代码的发生：

```
requestAnimationFrame(function(){
    var el = document.getElementById("foo");

    var currentWidth = el.innerWidth;
    el.style.backgroundColor = "blue";

    // ...
});

// do some "long running" task, like sorting data
```

可见即使我们在这里没有使用到动画，但仍然可以使用 rAF 优化我们的代码。执行的顺序会变成：

![](http://infoqstatic.com/resource/articles/javascript-high-performance-animation-and-page-rendering/zh/resources/0409007.png)

在这里 rAF 的用法变成了：把代码推迟到下一帧执行。

有时候我们需要把代码推迟的更远，比如这个样子：

![](http://infoqstatic.com/resource/articles/javascript-high-performance-animation-and-page-rendering/zh/resources/0409008.png)

再比如我们想要一个效果分两步执行：1.div 的 display 变为 block；2. div 的 top 值缩短移动到某处。如果这两项操作都放入同一帧中的话，浏览器会同时把这两项更改应用于容器，在同一帧内。于是我们需要两帧把这两项操作区分开来：

```
requestAnimationFrame(function(){
   el.style.display = "block";
   requestAnimationFrame(function(){
      // fire off a CSS transition on its `top` property
      el.style.top = "300px";
   });
});
```

这样的写法好像有些不太讲究，Kyle Simpson 有一个开源项目[h5ive](https://github.com/getify/h5ive)，它把上面的用法封装了起来，并且提供了 API。实现起来非常简单，摘一段代码瞧瞧：

```js
function qID(){
    var id;
    do {
        id = Math.floor(Math.random() * 1E9);
    } while (id in q_ids);
    return id;
}

function queue(cb) {
    var qid = qID();

    q_ids[qid] = rAF(function(){
        delete q_ids[qid];
        cb.apply(publicAPI,arguments);
    });

    return qid;
}

function queueAfter(cb) {
    var qid;

    qid = queue(function(){
        // do our own rAF call here because we want to re-use the same `qid` for both frames
        q_ids[qid] = rAF(function(){
            delete q_ids[qid];
            cb.apply(publicAPI,arguments);
        });
    });

    return qid;
}
```

使用方法：

```js
// 插入下一帧
id1 = aFrame.queue(function(){
    text = document.createTextNode("##");
    body.appendChild(text);
});

// 插入下下一帧
id2 = aFrame.queueAfter(function(){
    text = document.createTextNode("!!");
    body.appendChild(text);
});
```

## 使用 rAF 解耦代码

先从一个 2011 年 twitter 遇到的 bug 说起。

当时 twitter 加入了一个新功能：“无限滚动”。也就是当页面滚至底部的时候，去加载更多的 twitter：

```
$(window).bind('scroll', function () {
    if (nearBottomOfPage()) {
        // load more tweets ...
    }
});
```

但是在这个功能上线之后，发现了一个严重的 bug：经过几次滚动到最底部之后，滚动就会变得奇慢无比。

经过排查发现，原来是一条语句引起的：$details.find (".details-pane-outer");

这还不是真正的罪魁祸首，真正的原因是因为他们将使用的 jQuery 类库从 1.4.2 升级到了 1.4.4 版。而这 jQuery 其中一个重要的升级是把 Sizzle 的上下文选择器全部替换为了 querySelectorAll。但是这个接口原实现使用的是 getElementsByClassName。虽然 querySelectorAll 在大部分情况下性能还是不错的。但在通过 Class 名称选择元素这一项是占了下风。有两个对比测试可以看出来：1. [querySelectorAll v getElementsByClassName](http://jsperf.com/queryselectorall-v-getelementsbyclassname) 2.[jQuery Simple Selector](http://jsperf.com/jquery-context-find-class)

通过这个 bug，John Resig 给出了一条 (实际上是两条，但是今天只取与我们话题有关的) 非常重要的建议

> It’s a very, very, bad idea to attach handlers to the window scroll event.

他想表达的意思是，像 scroll，resize 这一类的事件会非常频繁的触发，如果把太多的代码放进这一类的回调函数中，会延迟页面的滚动，甚至造成无法响应。所以应该把这一类代码分离出来，放在一个 timer 中，有间隔的去检查是否滚动，再做适当的处理。比如如下代码：

```js
var didScroll = false;

$(window).scroll(function() {
    didScroll = true;
});

setInterval(function() {
    if ( didScroll ) {
        didScroll = false;
        // Check your page position and then
        // Load in more results
    }
}, 250)
```

这样的作法类似于 Nicholas 将需要长时间运算的循环分解为 “片” 来进行运算：

```
// 具体可以参考他写的《javascript高级程序设计》
// 也可以参考他的这篇博客： http://www.nczonline.net/blog/2009/01/13/speed-up-your-javascript-part-1/
function chunk(array, process, context){
    var items = array.concat();   //clone the array
    setTimeout(function(){
        var item = items.shift();
        process.call(context, item);

        if (items.length > 0){
            setTimeout(arguments.callee, 100);
        }
    }, 100);
}
```

原理其实是一样的，为了优化性能、为了防止浏览器假死，将需要长时间运行的代码分解为小段执行，能够使浏览器有时间响应其他的请求。

回到 rAF 上来，其实 rAF 也可以完成相同的功能。比如最初的滚动代码是这样：

```
function onScroll() {
    update();
}

function update() {

    // assume domElements has been declared
    for(var i = 0; i < domElements.length; i++) {

        // read offset of DOM elements
        // to determine visibility - a reflow

        // then apply some CSS classes
        // to the visible items - a repaint

    }
}

window.addEventListener('scroll', onScroll, false);
```

这是很典型的反例：每一次滚动都需要遍历所有元素，而且每一次遍历都会引起 reflow 和 repaint。接下来我们要做的事情就是把这些费时的代码从 update 中解耦出来。

首先我们仍然需要给 scroll 事件添加回调函数，用于记录滚动的情况，以方便其他函数的查询：

```js
var latestKnownScrollY = 0;

function onScroll() {
    latestKnownScrollY = window.scrollY;
}
```

接下来把分离出来的 repaint 或者 reflow 操作全部放入一个 update 函数中，并且使用 rAF 进行调用：

```
function update() {
    requestAnimationFrame(update);

    var currentScrollY = latestKnownScrollY;

    // read offset of DOM elements
    // and compare to the currentScrollY value
    // then apply some CSS classes
    // to the visible items
}

// kick off
requestAnimationFrame(update);
```

其实解耦的目的已经达到了，但还需要做一些优化，比如不能让 update 无限执行下去，需要设标志位来控制它的执行：

```js
var latestKnownScrollY = 0,
    ticking = false;

function onScroll() {
    latestKnownScrollY = window.scrollY;
    requestTick();
} 

function requestTick() {
    if(!ticking) {
        requestAnimationFrame(update);
    }
    ticking = true;
}
```

并且我们始终只需要一个 rAF 实例的存在，也不允许无限次的 update 下去，于是我们还需要一个出口：

```js
function update() {
    // reset the tick so we can
    // capture the next onScroll
    ticking = false;

    var currentScrollY = latestKnownScrollY;

    // read offset of DOM elements
    // and compare to the currentScrollY value
    // then apply some CSS classes
    // to the visible items
}

// kick off - no longer needed! Woo.
// update();
```

## 理解 Layer

Kyle Simpson 说：

> **Rule of thumb: don’t do in JS what you can do in CSS.**

如以上所说，即使使用 rAF，还是会有诸多的不便。我们还有一个选择是使用 css 动画：虽然浏览器中 UI 线程与 js 线程是互斥，但这一点对 css 动画不成立。

在这里不聊 css 动画的用法。css 动画运用的是什么原理来提升浏览器性能的。

首先我们看看淘宝首页的焦点图：

![](http://infoqstatic.com/resource/articles/javascript-high-performance-animation-and-page-rendering/zh/resources/0409009.png)

我想提出一个问题，为什么明明可以使用 translate 2d 去实现的动画，它要用 3d 去实现呢？

我不是淘宝的员工，但我的第一猜测这么做的原因是为了使用 translate3d hack。简单来说如果你给一个元素添加上了 - webkit-transform: translateZ (0); 或者 - webkit-transform: translate3d (0,0,0); 属性，那么你就等于告诉了浏览器用 GPU 来渲染该层，与一般的 CPU 渲染相比，提升了速度和性能。(我很确定这么做会在 Chrome 中启用了硬件加速，但在其他平台不做保证。就我得到的资料而言，在大多数浏览器比如 Firefox、Safari 也是适用的)。

但这样的说法其实并不准确，至少在现在的 Chrome 版本中这算不上一个 hack。因为默认渲染所有的网页时都会经过 GPU。那么这么做还有必要吗？有。在理解原理之前，你必须先了解一个层 (Layer) 的概念。

html 在浏览器中会被转化为 DOM 树，DOM 树的每一个节点都会转化为 RenderObject, 多个 RenderObject 可能又会对应一个或多个 RenderLayer。浏览器渲染的流程如下：

1. 获取 DOM 并将其分割为多个层 (RenderLayer)
2. 将每个层栅格化，并独立的绘制进位图中
3. 将这些位图作为纹理上传至 GPU
4. 复合多个层来生成最终的屏幕图像 (终极 layer)。

这和游戏中的 3D 渲染类似，虽然我们看到的是一个立体的人物，但这个人物的皮肤是由不同的图片 “贴” 和 “拼” 上去的。网页比此还多了一个步骤，虽然最终的网页是由多个位图层合成的，但我们看到的只是一个复印版，最终只有一个层。当然有的层是无法拼合的，比如 flash。以爱奇艺的一个播放页 ([http://www.iqiyi.com/v\_19rrgyhg0s.html) 为例，我们可以利用 Chrome 的 Layer 面板 (默认不启用，需要手动开启) 查看页面上所有的层：](http://www.iqiyi.com/v_19rrgyhg0s.html\)%E4%B8%BA%E4%BE%8B%EF%BC%8C%E6%88%91%E4%BB%AC%E5%8F%AF%E4%BB%A5%E5%88%A9%E7%94%A8Chrome%E7%9A%84Layer%E9%9D%A2%E6%9D%BF\(%E9%BB%98%E8%AE%A4%E4%B8%8D%E5%90%AF%E7%94%A8%EF%BC%8C%E9%9C%80%E8%A6%81%E6%89%8B%E5%8A%A8%E5%BC%80%E5%90%AF\)%E6%9F%A5%E7%9C%8B%E9%A1%B5%E9%9D%A2%E4%B8%8A%E6%89%80%E6%9C%89%E7%9A%84%E5%B1%82%EF%BC%9A)

我们可以看到页面上由如下层组成：

![](http://infoqstatic.com/resource/articles/javascript-high-performance-animation-and-page-rendering/zh/resources/04090010.png)

OK，那么问题来了。

假设我现在想改变一个容器的样式 (可以看做动画的一个步骤)，并且是一种最糟糕的情况，改变它的长和宽 —— 为什么说改变长和宽是最糟糕的情况呢。通常改变一个物体的样式需要以下四个步骤：

![](http://infoqstatic.com/resource/articles/javascript-high-performance-animation-and-page-rendering/zh/resources/0409011.jpg)

任何属性的改变都导致浏览器重新计算容器的样式，比如你改变的是容器的尺寸或者位置 (reflow)，那么首先影响的就是容器的尺寸和位置 (也影响了与它相关的父节点自己点相邻节点的位置等)，接下来浏览器还需要对容器重新绘制 (repaint)；但如果你改变的只是容器的背景颜色等无关容器尺寸的属性，那么便省去了第一步计算位置的时间。也就是说如果改变属性在瀑布图中开始的越早 (越往上)，那么影响就越大，效率就越低。reflow 和 repaint 会导致所有受影响节点所在 layer 的位图重绘，反复执行上面的过程，导致效率降低。

为了把代价降到最低，当然最好只留下 compositing layer 这一个步骤即可。假设当我们改变一个容器的样式时，影响的只是它自己，并且还无需重绘，直接通过在 GPU 中改变纹理的属性来改变样式，岂不是更好？这当然是可以实现的，前提是你有自己的 layer

这也是上面硬件加速 hack 的原理，也是 css 动画的原理 —— 给元素创建自己 layer，而非与页面上大部分的元素共用 layer。

什么样的元素才能创建自己 layer 呢？在 Chrome 中至少要符合以下条件之一：

* Layer has 3D or perspective transform CSS properties (有 3D 元素的属性)
* Layer is used by \<video> element using accelerated video decoding (video 标签并使用加速视频解码)
* Layer is used by a \<canvas> element with a 3D context or accelerated 2D context (canvas 元素并启用 3D)
* Layer is used for a composited plugin (插件，比如 flash)
* Layer uses a CSS animation for its opacity or uses an animated webkit transform (CSS 动画)
* Layer uses accelerated CSS filters (CSS 滤镜)
* Layer with a composited descendant has information that needs to be in the composited layer tree, such as a clip or reflection (有一个后代元素是独立的 layer)
* Layer has a sibling with a lower z-index which has a compositing layer (in other words the layer is rendered on top of a composited layer)(元素的相邻元素是独立 layer)

很明显刚刚我们看到的播放页中的 flash 和开启了 translate3d 样式的焦点图符合上面的条件。

同时你也可以勾选 Chrome 开发工具中的 rendering 选显卡下的 Show composited layer borders 选项。页面上的 layer 便会加以边框区别开来。为了验证我们的想法，看下面这样一段代码：

```html
<html>
<head>
  <style type="text/css">
  div {
      -webkit-animation-duration: 5s;
      -webkit-animation-name: slide;
      -webkit-animation-iteration-count: infinite;
      -webkit-animation-direction: alternate;
      width: 200px;
      height: 200px;
      margin: 100px;
      background-color: skyblue;
  }
  @-webkit-keyframes slide {
      from {
          -webkit-transform: rotate(0deg);
      }
      to {
          -webkit-transform: rotate(120deg);
      }
  }
  </style>
</head>
<body>
  <div id="foo">I am a strange root.</div>
</body>
</html>
```

运行时的 timeline 截图如下：

![](http://infoqstatic.com/resource/articles/javascript-high-performance-animation-and-page-rendering/zh/resources/0409014.png)

可见元素有自己的 layer，并且在动画的过程中没有触发 reflow 和 repaint。

最后再看看淘宝首页，不仅仅只有焦点图才拥有了独立的 layer：

![](http://infoqstatic.com/resource/articles/javascript-high-performance-animation-and-page-rendering/zh/resources/04090012.png)

但太多的 layer 也未必是一件好事情，有兴趣的同学可以看一看这篇文章：[Jank Busting Apple's Home Page](http://wesleyhales.com/blog/2013/10/26/Jank-Busting-Apples-Home-Page/)。看一看在苹果首页太多 layer 时出现的问题。