[![Ashley Yang](https://miro.medium.com/v2/resize:fill:88:88/1*fQR8RRIEO19Ng41pBeMEMw@2x.jpeg)](https://medium.com/@ash.hana?source=post_page-----e6a0531050ba--------------------------------)

通常在 mobile web 的开发上，我们常常会在`<meta name=”viewport” />` tag 上加上`user-scalable=no`的属性以避免放大缩小造成的跑版，事实上就我开发的经验，如果排版得宜不乱用 position 跟 flexbox，放大缩小本身并不大会造成跑版问题，但若是与 mobile device 横向与直向萤幕 rotate 结合，每一次 rotate 时 browser 都会重新计算现在 viewport 要显示的范围，这的确会造成使用者不知道现在在哪的情形，这件事情有机会之后再来做讨论。

在 Mobile Safari 10.0 之后的版本有一项重要的修改，预设[ignore 了”user-scalable=no” 的设定](https://developer.apple.com/library/content/releasenotes/General/WhatsNewInSafari/Articles/Safari_10_0.html)，让我们来看看这段叙述：

>  无障碍
>
> 捏合缩放始终对所有用户启用。 `user-scalable`的视口设置将被忽略。

原先在 mobile 浏览器上，使用者有以下几种方式可以放大或缩小网页 (zoom-in/zoom-out)：

1. 捏合以放大 / 缩小
2. 双击可放大 / 缩小

同样在 header 里加入了 `<meta name=”viewport” content=”width=device-width, initial-scale=1, user-scalable=no”>` ，在 iOS Chrome 跟 iOS Safari 上的表现就不同，在 iOS Chrome 上无论是 Double-tap 跟 Pinch 都无法触发网页 zoom-in/zoom-out，反之，在 iOS Safari 上 Double-tap 跟 Pinch 依旧会触发网页 zoom-in/zoom-out。

## 解法

现在已经有不少解决方式，以下列出其中几种的实际测试结果：

## 以 JavaScript 监听并处理 touchstart/touchend 事件

```
window.onload = () => {
  document.addEventListener('touchstart', (event) => {
    if (event.touches.length > 1) {
       event.preventDefault();
    }
  });

    let lastTouchEnd = 0;
  document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
}
```

> **实际测试结果：Pinch/Double-tap 触发的 zoom-in/zoom-out 均可成功 handle**

其中`touchstart`事件 handle 的是 Pinch 手势，而`touchend`事件 handle 的则是 double-tap 手势，讲到 double-tap 就会想到 mobile 网页开发时大家都会遇到的 300ms 延迟事件，事实上每一次使用者 touch 萤幕时，都会产生 300ms 的延迟去监听是否触发 double-tap 事件，于是就可以用这个特性来做处理，当两次 touch 之间的时间差小于 300ms 时做`event.preventDefault();`直接 cancel 掉使用者 double -tap 手势原先会触发的 zoom-in/zoom-out 效果。

## \[2018.6.29 更新] 被动事件监听器

感谢网友回覆，上面这个 workaround 的 Pinch 在新版 Safari 仍然可以触发 zoom-in/zoom-out，刚好在公司专案也遇到的一样的问题所以来做个 update，在百思不得其解的过程之中发现了一个东西叫做[Passive Event Listener](https://developers.google.com/web/tools/lighthouse/audits/passive-event-listeners) ，这是在大概 2016 年新发表的特性，目的是 improve scroll 时的 performance，其中`wheel` 、 `mousewheel` 、 `touchstart`和`touchmove`四个 event 的 passive 属性 default value 都是 true ( `{ passive: true }` )，虽说是从 Firefox 跟 Chrome 开始的新东西，但是从[browser support list](https://caniuse.com/#feat=passive-event-listener)可以看到目标 browser iOS Safari 已经 support 了这个属性：

![](https://miro.medium.com/v2/resize:fit:1050/1*DP9iwB8Q22aQF2zOuz6bQg.png)

重点是当`{ passive: true }`时会导致**preventDefault 一点作用都没有！**

所以我们必须将 touchstart 的 passive value 覆写为`false` ，也就是将 return value 改为`{ passive: false }` ：

```
window.onload = () => {
  document.addEventListener('touchstart', (event) => {
    if (event.touches.length > 1) {
       event.preventDefault();
    }
  }, { passive: false });

    let lastTouchEnd = 0;
  document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
}
```

上面这个做法实际试过是可以成功 handle pinch/double-tap 的 zoom-in/zoom-out 喔！

## 以 CSS touch-action: 操作禁止双击

```
html, body {
  touch-action: manipulation;
}
```

> **实际测试结果：只可 handle Double-tap 手势触发的 zoom-in/zoom-out**

这个[CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action)可以禁止所有不合法的手势，针对 manipulation 我们撷取其中的叙述：

> `manipulation`
>
> 启用平移和捏合缩放手势，但禁用其他非标准手势，例如双击缩放。禁用双击缩放可以消除浏览器在用户点击屏幕时延迟生成**点击**事件的需要。这是 “ **pan-x pan-yinch-zoom** ” 的别名（为了兼容性，它本身仍然有效）。

换言之，pinch 手势不会被禁止，但是 double-tap 手势会被禁止，测试结果也是只有 double-tap 的手势触发的 zoom-in/zoom-out 被 handle 了。

依据 iOS 发布的内容，这项更改是为了给使用者更好的浏览体验，现今的网页通常会用响应式设计来针对不同浏览模式给予使用者最佳的浏览模式，若是无法让使用者在浏览时自由放大缩小网页，似乎也造成了使用者的不便，最好的做法还是跟设计师及客户确认好使用者的需求并做好两者之间的权衡了！
