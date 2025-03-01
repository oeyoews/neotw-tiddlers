#### []()[]()1、setTimeout 是什么

首先看一下 w3school 上面对于 setTimeout 的解释

`setTimeout(fn,millisec)` 方法用于在指定的毫秒数后调用函数或计算表达式。\
很简单，`setTimeout()` 只执行 fn 一次，到底什么时候执行取决于第二个参数 millisec 设定的毫秒数，所以很多人习惯上称之为延迟，无非就是延迟一段时间后再执行里面的代码。

```js
setTimeout(function(){
 console.log('我是setTimeout');
}, 1000);
```

正常情况下，我是`setTimeout` 这句话并不会马上输出而是等 1000 毫秒以后会在浏览器的控制台输出。

#### []()[]()2、js 是单线程的

OK，看一个例子，这个例子的输出结果是什么？

```js
setTimeout(function(){
 console.log(1);
}, 0);
console.log(2);
console.log(3);
```

出乎一些人的意料，得到的结果竟然是`2、3、1`。这似乎不按套路出牌啊，明明是等待了 0 毫秒也就是不等待直接输出啊，为啥 1 却在最后输出了呢？

这就需要搞清楚一个很重要的概念：js 是单线程的，单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。\
其实很好理解，就像大家去超市买东西一样，所有买东西的人都需要在收银台排队结账，正常情况下每个收银台同一时间只能为一位顾客结账，这位顾客结账完成才能为下一位顾客服务。

而浏览器的内核是多线程的，它们在内核制控下相互配合以保持同步，一个浏览器至少实现三个常驻线程：javascript 引擎线程，GUI 渲染线程，浏览器事件触发线程。

* javascript 引擎是基于事件驱动单线程执行的，JS 引擎一直等待着任务队列中任务的到来，然后加以处理，浏览器无论什么时候都只有一个 JS 线程在运行 JS 程序。
* GUI 渲染线程负责渲染浏览器界面，当界面需要重绘（Repaint）或由于某种操作引发回流 (reflow) 时，该线程就会执行。但需要注意 GUI 渲染线程与 JS 引擎是互斥的，当 JS 引擎执行时 GUI 线程会被挂起，GUI 更新会被保存在一个队列中等到 JS 引擎空闲时立即被执行。
* 事件触发线程，当一个事件被触发时该线程会把事件添加到待处理队列的队尾，等待 JS 引擎的处理。这些事件可来自 JavaScript 引擎当前执行的代码块如 setTimeOut、也可来自浏览器内核的其他线程如鼠标点击、AJAX 异步请求等，但由于 JS 的单线程关系所有这些事件都得排队等待 JS 引擎处理。（当线程中没有执行任何同步代码的前提下才会执行异步代码）\
  其实，当 js 代码执行遇到 setTimeout (fn,millisec) 时，会把 fn 这个函数放在任务队列中，当 js 引擎线程空闲时并达到 millisec 指定的时间时，才会把 fn 放到 js 引擎线程中执行。

`setTimeout(fn,0)`的含义是，指定某个任务在主线程最早可得的空闲时间执行，也就是说，尽可能早得执行。它在 "任务队列" 的尾部添加一个事件，因此要等到同步任务和 "任务队列" 现有的事件都处理完，才会得到执行。

HTML5 标准规定了 setTimeout () 的第二个参数的最小值（最短间隔），不得低于 4 毫秒，如果低于这个值，就会自动增加。在此之前，老版本的浏览器都将最短间隔设为 10 毫秒。另外，对于那些 DOM 的变动（尤其是涉及页面重新渲染的部分），通常不会立即执行，而是每 16 毫秒执行一次。这时使用`requestAnimationFrame()`的效果要好于`setTimeout()` 。

需要注意的是，setTimeout () 只是将事件插入了 "任务队列"，必须等到当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。要是当前代码耗时很长，有可能要等很久，所以并没有办法保证，回调函数一定会在 setTimeout () 指定的时间执行。

#### []()[]()3、setTimeout 的妙用

其实 setTimeout 是有一些妙用的，这里简单列举几个。

**函数去抖**\
让一个函数在一定间隔内没有被调用时，才开始执行被调用方法。比如当你在使用 google 搜索内容的时候，有些关键词输入到一半，谷歌会展示一个可选列表，根据你当前输入的内容作出的一个猜测联想。需要监听文字改变，每一次改变都会调用一次回调函数，现在需要的一种实现是在用户停止键盘事件一段时间后，去发送一个请求。

```
var debounce = function(method, context) {
 clearTimeout(method.tId);
 method.tId = setTimeout(function(){
  method.call(context);
 },100);
}

1
2
3
4
5
6
```

**轮训任务**\
js 中可以使用 setInterval 开启轮询，但是这种存在一个问题就是执行间隔往往就不是你希望的间隔时间。

比如有个轮询任务间隔是 100ms，但是执行方法的时间需要 450ms，那么在 200ms、300ms、400ms 本来是计划中执行任务的时间，浏览器发现第一个还未执行完，那么就会放弃 2、3、4 次的任务执行，并且在 500ms 之后再次执行任务，这样的话，其实再次执行的间隔就只有 50ms。使用 setTimeout 构造轮询能保证每次轮询的间隔。

```
setTimeout(function () {
 console.log('我被调用了');
 setTimeout(arguments.callee, 100);
}, 100);

1
2
3
4
```

**延迟 js 引擎的调用**

```
var div = document.createElement('div');
div.innerHTML = '我是一个div';
div.setAttribute('style', 'width:200px; height:200px;background-color:#f00; ');
document.body.appendChild(div);
setTimeout(function() {
 console.log('我被调用了');
}, 1000);

1
2
3
4
5
6
7
```

虽然 setTimeout 有一些妙用，但是他确实是在宏观任务队列中新增任务了，所以万万不能滥用啊。
