### 前言

iphoneX 的 “刘海” 为相机和其他组件留出了空间，同时在底部也留有可操作区域。其实对于 web 前端来说，刘海在绝大多数的场景下是可以不用处理的，因为 safari 或客户端（微信，手 Q 等）的 statusBar 已经替我们抹平了顶部刘海，我们只需要关心底部的可操作区域，因为如果页面底部有按钮的话，就会被可操作区域给挡住。

### iPhoneX 之变化

#### 1. 屏幕尺寸、分辨率

追求全面屏的 iPhone X 此次启用 5.8 英寸的超视网膜高清显示屏，458ppi 的屏幕像素密度。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98b5dd9e7ac44177a9f50b91a2ca52d6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

竖屏时像素分辨率达到了 1125px × 2436px（375pt × 812pt @3x），可以发现 iPhone X 的宽度与原来的 iPhone 7 等 4.7 英寸屏的宽度是一致的，而高度却大了 145pt，长宽比也由原来常见的 16 : 9 变成了 13 : 6。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4931fd44613b45088711ad8eb73c38e5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

#### 2. 顶部刘海

新版本的 iPhone 顶部有高度为 30pt 的黑色圆角条来放置扬声器、前置摄像头及各种传感器等，江湖人称 「刘海儿」，这也意味着原页面此处的内容有可能会被遮挡导致显示欠佳，进而影响用户体验，所以这也是我们需要关注的一个适配点。

刘海在绝大多数的场景下是可以不用处理的，因为 safari 或客户端（微信，手 Q 等）的 statusBar 已经替我们抹平了顶部刘海。

#### 3. 虚拟 Home 键

iPhone X 取消了以往的实体圆形 home 键，取而代之的是在屏幕底部一条 134pt × 5pt 的虚拟指示条。整个虚拟 Home 键也占据了一个高度 34pt 的保留区域。

原来实体 Home 键的单击返回桌面、双击唤起多任务处理、长按启动 Siri 等等基础功能操作，也幻化成了不同的手势操作或新技术替代，具体交互手势将在下节详述。而为了增强手势的操作感，整个虚拟 Home 键也占据了一个高度 34pt 的保留区域。

而在非特定条件下，这个虚拟指示条无论在横、竖屏中都将是强制性设计元素出现在屏幕底部上，意味着这设计中必须考虑好周围元素与它的兼容，因此，这又是我们适配过程中的另一个关注点。只有在需要获得沉浸式体验（如播放视频、查看图片）时，才会建议开发者可以虚拟指示条 「自动隐藏」功能。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93c92494141447a183a34e4e125654fd~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

#### 4. 安全区域

根据上述顶部刘海、虚拟 home 键的不同要求，Apple 提供了横、竖屏状态下的安全区域视觉规范。

* 竖屏：竖屏时候，除去屏幕最顶部往下 44pt，底部往上 34pt 后，中间部分视为安全区域。

* 横屏：而横屏时候则相对复杂一些，因为虚拟指示条通常情况下都是出现在屏幕底部，所以不仅屏幕左右会留出 44pt 的空白位置，屏幕底部也会留出 21pt 的位置。

至于为什么没有 “刘海儿” 一侧也会留出空白位置，则是 Apple 认为，“刘海儿” 出现于左侧或右侧并不确定，让安全区域中的内容居中显示，可以避免屏幕旋转所造成的 UI 元素位置变化。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8db05a3f336046c0bbcfe413b3852bdf~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 适配方案

了解到 iPhone X 这边变化之后，我们大致可以知道需要在于安全区域布局、全屏图缩放裁切以及边界交互手势做相关的适配。在 iOS11 中我们可以使用 viewport-fit=cover + safe-area-inset-\*，

#### 关于 viewport-fit

viewport-fit 可以设置可视视窗的大小，它有三个属性值：

* Auto：默认值。这个值不影响初始布局视窗，整个 Web 页面是可视的，与 Contain 表现一致。

* Contain：最初的布局视窗和视觉布局视窗被设置为最大的矩形（左图）。

* Cover：初始布局视窗和视觉布局视窗被设置为设备物理屏幕的限定矩形（右图）。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d8d25709b574ec6933d2a645fcb3eec~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

#### 关于 safe-area-inset-\*

各种 iPhone x 都是不规则形状，我们如何控制页面元素到安全区域呢？Apple 把安全区域的位置通过 css 属性提供给了开发者，它们可以通过 CSS 的 constant ( ) 函数来完成：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/02b48a42f1664e2493feb26cf065fb71~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

* constant (safe-area-inset-top)：在 Viewport 顶部的安全区域内设置量（CSS 像素）
* constant (safe-area-inset-bottom)：在 Viewport 底部的安全区域内设置量（CSS 像素）
* constant (safe-area-inset-left)：在 Viewport 左边的安全区域内设置量（CSS 像素）
* constant (safe-area-inset-right)：在 Viewport 右边的安全区域内设置量（CSS 像素）

简单来说我们可以通过 constant () 可以获取到非安全边距，再结合 padding 或 margin 来控制页面元素避开非安全区域。 Webkit 在 iOS11 中新增 CSS Functions: env () 替代 constant ( )，文档中推荐使用 env ( )，而 constant ( ) 从 Safari Techology Preview 41 和 iOS11.2 Beta 开始会被弃用。在不支持 env ( ) 的浏览器中，会自动忽略这一样式规则，不影响网页正常的渲染。为了达到最大兼容目的，我们可以 constant ( ) 和 env ( ) 同时使用。

```
.footerClass {
  padding-bottom: constant(safe-area-inset-bottom); /* iOS 11.0 */
  padding-bottom: env(safe-area-inset-bottom); /* iOS 11.2 */
}
```

### 实践

#### 1. 设置网页在可视区域的布局方式

新增 viweport-fit 属性，使得页面内容完全覆盖整个窗口：

```
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, minimum-scale=1, maximum-scale=1.0, user-scalable=0">
```

#### 2. 让主体内容控制在安全区域内

假设我们的底部按钮高度是 50px：

```
body {
  padding-top: env(safe-area-inset-top);
  padding-right: env(safe-area-inset-right);
  padding-bottom: 50px;  /* 兼容不支持 env( ) 的设备  */
  padding-bottom: calc(env(safe-area-inset-bottom) + 50px); /* 在 iphone x + 中本句才会生效 */
  padding-left: env(safe-area-inset-left);
}
```

有两个关键点：

1. 写在前面的 padding-bottom: 50px 为了兼容没有底部胡子的设备，让主体内容偏移出底部按钮的高度，避免按钮遮挡内容。
2. padding-bottom: calc (env (safe-area-inset-bottom) + 50px); 计算 底部非安全区域距离 与 底部按钮高度 之和 来做为 padding-bottom 值，如果设备支持 env，那么 calc 会计算出一个合法的值，本句的优先级则最高，会覆盖前面的 padding-bottom: 50px。否则 calc 会计算出一个不合法的值，则本句声明不会生效。这样在不支持 env 设备中也可以达到兼容的目的。

目前到这，在横屏场景下左侧的内容就不会被刘海遮挡住了：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1181c7513ce48b580208eb16432c3ea~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

#### 3. 底部按钮的处理

首先给底部按钮一个外层容器 .btn-container ，设置样式时其中有几点比较关键：

1. 设置 padding-bottom: env (safe-area-inset-bottom); 增加一个 padding 值，让底部向外扩展一个非安全区域的距离。
2. 设置 background: #FFF 让整个 .btn-container 背景为白色（包括刚新增的 padding-bottom 的区域）这样就可以遮挡住了底部内容。
3. 设置 box-sizing: content-box; ，因为在通常情况下 css 在 reset 阶段一般都设置了 \* {box-sizing: border-box;} 这样一来设置 padding 就不能向外扩展距离了，所以在这里我们要把他改回 content-box。

```
.btn-container {
  box-sizing: content-box;
  height: 50px;
  line-height: 50px;
  color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  background: #FFF;
  padding-bottom: env(safe-area-inset-bottom);
}

.btn {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #00c340;
  border: none;
}
```

最终效果如图所示

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1766f0dab7184d66a2e7d8e03c41f506~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) 在 safari 中，页面往上稍滑动一点，出现 safari 的操作栏后，底部按钮依然会紧贴着操作栏：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c476a76ad564487398850f4c3caaf7ca~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 参考资料

[如何适配 iPhone X](https://link.juejin.cn/?target=https%3A%2F%2Fwww.jianshu.com%2Fp%2Fa1e8c7cf8821 "https://www.jianshu.com/p/a1e8c7cf8821")

[CSS Round Display Level 1](https://link.juejin.cn/?target=https%3A%2F%2Fwww.w3.org%2FTR%2Fcss-round-display-1%2F%23viewport-fit-descriptor "https://www.w3.org/TR/css-round-display-1/#viewport-fit-descriptor")

[viewport-fit](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2Fconflicting%2FWeb%2FCSS%2F%40viewport_a33ee59ffd8336ffb3336900dea02e9f "https://developer.mozilla.org/zh-CN/docs/conflicting/Web/CSS/@viewport_a33ee59ffd8336ffb3336900dea02e9f")
