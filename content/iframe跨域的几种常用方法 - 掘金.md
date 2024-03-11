> * 苏格团队
> * 作者：Brady

## 背景

随着业务的发展，自然地会有一些公共的业务被抽离成为公共组件共各个项目使用。但是由于各个项目用到的技术栈都有所不同，所以这个公共组件就不能方便地被引用了。为解决这个问题，我们把这个组件写成了单独的页面挂到一个域名下，其他项目采用 iframe 或者 webview 的方式去加载这个页面，从而实现功能的简单复用。\
不过这过程中也产生了很多问题，单是跨域就会出现好几次了。以下我将会介绍我遇到的跨域问题以及一些解决方法。

## 为什么会跨域

为了保证用户信息的安全，95 年的时候 Netscape 公司引进了同源策略，里面的同源指的是三个相同：协议、域名、端口。\
违反了同源策略就会出现跨域问题，主要表现为以下三方面：

* 无法读取 cookie、localStorage、indexDB
* DOM 无法获得
* ajax 请求无法发送

## 场景

最近在做一个需求，需要用 iframe 引入一个别人封装好的类似视频播放器的东西。iframe 里面有一个全屏的按钮，点击后需要页面让 iframe 全屏，由于受到同源策略的限制，iframe 无法告诉页面全屏。

## 解决办法

## 设置 domain

document.domain 作用是获取 / 设置当前文档的原始域部分，同源策略会判断两个文档的原始域是否相同来判断是否跨域。这意味着只要把这个值设置成一样就可以解决跨域问题了。\
在此我将 domain 设置为一级域名的值，a 页面 url 为 a.demo.com，a 页面中 iframe 引用的 b 页面 url 为 b.demo.com，具体设置为

```
document.domain = 'demo.com'
```

设置完之后，在 a 页面的 window 上挂载使 iframe 全屏的方法

```
// a页面
window.toggleFullScreen = () => {
    // do something
}
```

在 b 页面上可以直接获取到 a 页面的 window 对象并直接调用

```
// b页面
window.parent.toggleFullScreen()
```

但是这个值的设置也有一定限制，只能设置为当前文档的上一级域或者是跟该文档的 URL 的 domain 一致的值。如 url 为 a.demo.com，那 domain 就只能设置为 demo.com 或者 a.demo.com。因此，设置 domain 的方法只能用于解决主域相同而子域不同的情况。

## 使用中间页面

我们还可以使用一个与 a 页面同域名但不同路由的 c 页面作为中间页面，b 页面加载 c 页面，c 页面调用 a 页面的方法，从而实现 b 页面调用 a 页面的方法。具体操作如下：\
在 a 页面的 node 层新开一个路由，此路由加载一个 c 页面作为中间页面，c 页面的 url 为 a.demo.com/c。c 页面只是一个简单的 html 页面，在 window 的 onload 事件上调用了 a 页面的方法。

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
    <script>
        window.onload = function () {
            parent.parent.toggleFullScreen();
        }
    </script>
</body>
</html>
```

由于 c 页面和 a 页面是符合同源策略的，所以可以避开跨域问题，执行全屏的方法。

## postmessage

window\.postMessage 方法可以安全地实现跨源通信，写明目标窗口的协议、主机地址或端口就可以发信息给它。

```
// b页面
parent.postMessage(
    value,
    "http://a.demo.com"
);
```

```
// a页面
window.addEventListener("message", function( event ) {
    if (event.origin !== 'http://b.demo.com') return;
    toggleFullScreen()
 });
```

为了安全，收到信息后要检测下 event.origin 判断是否要收信息的窗口发过来的。

## 总结

通过以上的方法，我们就可以和 iframe 自由通信啦。
