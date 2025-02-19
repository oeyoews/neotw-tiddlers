Google Chrome 推出文档画中画新特性，可将网页部分元素以画中画方式置顶展示。介绍了其与视频画中画 API 的区别、当前状态、应用场景、接口、示例、特性检测、演示、反馈及学习资料等，开发者反馈重要，可在 GitHub 提交。

关联问题：画中画窗口如何调整 API 支持哪些浏览器 反馈有何具体作用

> 首发于公众号 [前端从进阶到入院](https://link.juejin.cn/?target=https%3A%2F%2Fp1-juejin.byteimg.com%2Ftos-cn-i-k3u1fbpfcp%2F6a12bff1af1d436a990e970812086e05~tplv-k3u1fbpfcp-watermark.image%3F "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a12bff1af1d436a990e970812086e05~tplv-k3u1fbpfcp-watermark.image?")，欢迎关注。

Hi，大家好我 ssh，今天在逛推的时候，发现咱们的 Anthony Fu 大佬分享了一个让人亢奋的消息！

Google Chrome 推出了**文档画中画**（不光是视频）的一系列支持。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ebb5244165374bee988d4076d4b782d1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp "屏幕截图")

咱们通过 Gif 来看一下：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/598897b882b346fd98613e644cc4a45d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp "GIF 2023-6-28 15-36-51.gif")

简单来说，就是把一个网页中 Nuxt Devtool 那一小部分的元素，直接用画中画的方式剥离到了置顶的小窗口中展示。这也太实用了，以前只有 video 元素可以这样做，这个新功能给了 Web 内容更无边的想象空间！

[文档画中画（Document Picture-in-Picture）API](https://link.juejin.cn/?target=https%3A%2F%2Fwicg.github.io%2Fdocument-picture-in-picture%2F "https://wicg.github.io/document-picture-in-picture/")现在可以在弹出置顶的小窗口中展示任意 HTML 内容。它扩展了现有的[视频画中画（Picture-in-Picture）API](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.chrome.com%2Fblog%2Fwatch-video-using-picture-in-picture%2F "https://developer.chrome.com/blog/watch-video-using-picture-in-picture/")，后者仅允许将 HTML 的`<video>`元素放入画中画窗口中。

谷歌针对这个特性，发布了一个详细的文档[Picture-in-Picture for any Element, not just video](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.chrome.com%2Fdocs%2Fweb-platform%2Fdocument-picture-in-picture%2F "https://developer.chrome.com/docs/web-platform/document-picture-in-picture/")，接下来就由我来给大家分享一下谷歌开发者文档里的这篇 [Picture-in-Picture for any Element, not just ](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.chrome.com%2Fdocs%2Fweb-platform%2Fdocument-picture-in-picture "https://developer.chrome.com/docs/web-platform/document-picture-in-picture")：

## Picture-in-Picture for any Element

文档画中画 API 中的画中画窗口类似于通过[`window.open()`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fdocs%2FWeb%2FAPI%2FWindow%2Fopen "https://developer.mozilla.org/docs/Web/API/Window/open")打开的空白同源窗口，但存在一些区别：

* 画中画窗口浮动在其他窗口之上。
* 画中画窗口不会超过打开它的窗口的生命周期。
* 无法导航画中画窗口。
* 网站无法设置画中画窗口的位置。

![输入图片说明](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89e8d3b1458d4896b71d31b6031d9dac~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp "屏幕截图")

使用文档画中画 API 创建的画中画窗口（[示例](https://link.juejin.cn/?target=https%3A%2F%2Fdocument-picture-in-picture-api.glitch.me%2F "https://document-picture-in-picture-api.glitch.me/")）。

## 当前状态

| 步骤           | 状态                                                                                                                                                                                                                |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. 创建说明文档    | [完成](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FWICG%2Fdocument-picture-in-picture%2Fblob%2Fmain%2FREADME.md "https://github.com/WICG/document-picture-in-picture/blob/main/README.md")            |
| 2. 创建规范初始草案  | [进行中](https://link.juejin.cn/?target=https%3A%2F%2Fwicg.github.io%2Fdocument-picture-in-picture%2F "https://wicg.github.io/document-picture-in-picture/")                                                         |
| 3. 收集反馈并迭代设计 | [进行中](#feedback "#feedback")                                                                                                                                                                                      |
| 4. **原型试验**  | [**已开始**](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.chrome.com%2Forigintrials%2F%23%2Fview_trial%2F1885882343961395201 "https://developer.chrome.com/origintrials/#/view_trial/1885882343961395201") |
| 5. 发布        | 未开始                                                                                                                                                                                                               |

## 在桌面上尝试 API

在试用阶段，你可以通过以下两种方法在桌面上测试这个 API。

### 本地测试

要在本地尝试文档画中画 API，无需原型试验 Token，只需启用`chrome://flags/#document-picture-in-picture-api`标志。

### 注册原型试验

从 Chrome 111 版本开始，文档画中画 API 可以作为[原型试验](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.chrome.com%2Fdocs%2Fweb-platform%2Forigin-trials%2F "https://developer.chrome.com/docs/web-platform/origin-trials/")使用。预计该试验将于 Chrome 115 版本（2023 年 9 月 8 日）结束。[在此注册](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.chrome.com%2Forigintrials%2F%23%2Fview_trial%2F1885882343961395201 "https://developer.chrome.com/origintrials/#/view_trial/1885882343961395201")。

## 应用场景

### 自定义视频播放器

网站可以利用现有的[\<video> 画中画 API](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.chrome.com%2Fblog%2Fwatch-video-using-picture-in-picture%2F "https://developer.chrome.com/blog/watch-video-using-picture-in-picture/")提供画中画视频体验，但其功能非常有限。现有的画中画窗口接受的输入较少，并且在样式方面的能力也有限。通过完整的画中画文档，网站可以提供自定义的控件和输入选项（例如[字幕](https://link.juejin.cn/?target=https%3A%2F%2Fbugs.chromium.org%2Fp%2Fchromium%2Fissues%2Fdetail%3Fid%3D854935 "https://bugs.chromium.org/p/chromium/issues/detail?id=854935")、播放列表、时间轴、视频点赞和踩），来改善用户的画中画视频体验。

### 视频会议

在视频会议期间，用户通常出于各种原因（例如展示另一个选项卡以进行通话或多任务处理）而离开浏览器标签，但仍希望保持通话的可见性，因此这是画中画的一个主要应用场景。再次强调，当前视频会议网站通过[video 画中画 API](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.chrome.com%2Fblog%2Fwatch-video-using-picture-in-picture%2F "https://developer.chrome.com/blog/watch-video-using-picture-in-picture/")提供的体验在样式和输入方面有限。通过完整的画中画文档，网站可以轻松将多个视频流合并到单个画中画窗口中，而无需依赖[Canvas 技巧](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.chrome.com%2Fblog%2Fwatch-video-using-picture-in-picture%2F%23show-canvas-element-in-picture-in-picture-window "https://developer.chrome.com/blog/watch-video-using-picture-in-picture/#show-canvas-element-in-picture-in-picture-window")，并提供**自定义控件，例如发送消息、静音其他用户或举手**等功能。

### 提高生产力

研究表明，用户需要更多在网络上提高生产力的方式。画中画中的文档使 Web 应用程序具备了更大的灵活性来完成更多任务。无论是文本编辑、记笔记、任务列表、消息和聊天，还是设计和开发工具，Web 应用程序现在都可以始终保持内容的可访问性。

## 接口

### 属性

`documentPictureInPicture.window`

返回当前的画中画窗口（如果有）。否则，返回`null`。

### 方法

`documentPictureInPicture.requestWindow(options)`

返回一个 Promise，在打开画中画窗口时解析。如果在用户没有进行操作的情况下调用该方法，Promise 将被拒绝。`options`字段包含以下可选成员：

`width`

设置画中画窗口的初始宽度。

`height`

设置画中画窗口的初始高度。

### 事件

`documentPictureInPicture.onenter`

在打开画中画窗口时，在`documentPictureInPicture`上触发。

## 示例

以下 HTML 代码设置了一个自定义视频播放器和一个按钮元素，用于在画中画窗口中打开视频播放器。

```
<div id="playerContainer">
  <div id="player">
    <video id="video"></video>
  </div>
</div>
<button id="pipButton">打开画中画窗口</button>
```

### 打开画中画窗口

以下 JavaScript 代码在用户点击按钮时调用`documentPictureInPicture.requestWindow()`，以打开一个空白的画中画窗口。返回的 Promise 将解析为一个画中画窗口的 JavaScript 对象。使用[`append()`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fdocs%2FWeb%2FAPI%2FElement%2Fappend "https://developer.mozilla.org/docs/Web/API/Element/append")方法将视频播放器移动到该窗口中。

```
pipButton.addEventListener("click", async () => {
  const player = document.querySelector("#player");

  // 打开一个画中画窗口。
  const pipWindow = await documentPictureInPicture.requestWindow();

  // 将播放器移动到画中画窗口中。
  pipWindow.document.body.append(player);
});
```

### 设置画中画窗口的大小

要设置画中画窗口的大小，请将`documentPictureInPicture.requestWindow()`的`width`和`height`选项设置为所需的画中画窗口大小。如果选项值太大或太小，无法适应用户友好的窗口大小，Chrome 可能会截断展示它们。

```
pipButton.addEventListener("click", async () => {
  const player = document.querySelector("#player");

  // 打开一个与播放器大小相同的画中画窗口。
  const pipWindow = await documentPictureInPicture.requestWindow({
    width: player.clientWidth,
    height: player.clientHeight,
  });

  // 将播放器移动到画中画窗口中。
  pipWindow.document.body.append(player);
});
```

### 将样式表复制到画中画窗口

要从原始窗口复制所有 CSS 样式表，请循环遍历初始文档的[`styleSheets`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fdocs%2FWeb%2FAPI%2FDocument%2FstyleSheets "https://developer.mozilla.org/docs/Web/API/Document/styleSheets")，把它们添加到画中画窗口中。请注意，这是个一次性的复制。

```
pipButton.addEventListener("click", async () => {
  const player = document.querySelector("#player");

  // 打开一个画中画窗口。
  const pipWindow = await documentPictureInPicture.requestWindow();

  // 从初始文档中复制样式表，以使播放器外观相同。
  const allCSS = [...document.styleSheets]
    .map((styleSheet) => {
      try {
        return [...styleSheet.cssRules].map((r) => r.cssText).join("");
      } catch (e) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = styleSheet.type;
        link.media = styleSheet.media;
        link.href = styleSheet.href;
        pipWindow.document.head.appendChild(link);
      }
    })
    .filter(Boolean)
    .join("\n");
  const style = document.createElement("style");
  style.textContent = allCSS;
  pipWindow.document.head.appendChild(style);

  // 将播放器移动到画中画窗口中。
  pipWindow.document.body.append(player);
});
```

`copyStyleSheets`选项在先前版本的规范中得到支持。现在弃用了（详情请参阅[GitHub Pull Request](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FWICG%2Fdocument-picture-in-picture%2Fpull%2F79 "https://github.com/WICG/document-picture-in-picture/pull/79")）。

### 处理画中画窗口关闭时的情况

通过监听窗口的`"pagehide"`事件，可以了解画中画窗口何时关闭（无论是因为网站启动还是用户手动关闭）。Evnet 事件可以很方便的知晓用户何时从画中画返回，如下所示：

```
pipButton.addEventListener("click", async () => {
  const player = document.querySelector("#player");

  // 打开一个画中画窗口。
  const pipWindow = await documentPictureInPicture.requestWindow();

  // 将播放器移动到画中画窗口中。
  pipWindow.document.body.append(player);

  // 当画中画窗口关闭时，将播放器移回原位置。
  pipWindow.addEventListener("pagehide", (event) => {
    const playerContainer = document.querySelector("#playerContainer");
    const pipPlayer = event.target.querySelector("#player");
    playerContainer.append(pipPlayer);
  });
});
```

使用[`close()`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fdocs%2FWeb%2FAPI%2FWindow%2Fclose "https://developer.mozilla.org/docs/Web/API/Window/close")方法以编程方式关闭画中画窗口。

```
// 以编程方式关闭画中画窗口。
// "pagehide"事件将正常触发。
pipWindow.close();
```

### 监听网站进入画中画模式

监听`documentPictureInPicture`的`"enter"`事件，可以知道用户何时打开画中画窗口。事件包含一个`window`对象，可用于访问画中画窗口。

```
documentPictureInPicture.addEventListener("enter", (event) => {
  const pipWindow = event.window;
});
```

### 访问画中画窗口中的元素

要访问画中画窗口中的元素，可以使用`documentPictureInPicture.requestWindow()`返回的对象，或者如下所示使用`documentPictureInPicture.window`。

```
const pipWindow = documentPictureInPicture.window;
if (pipWindow) {
  // 静音在画中画窗口中播放的视频。
  const pipVideo = pipWindow.document.querySelector("#video");
  pipVideo.muted = true;
}
```

### 处理来自画中画窗口的事件

像通常在 JavaScript 中那样，创建按钮和控件，并响应用户的输入事件，如`"click"`。

```
// 向画中画窗口添加"mute"按钮。
const pipMuteButton = pipWindow.document.createElement("button");
pipMuteButton.textContent = "Mute";
pipMuteButton.addEventListener("click", () => {
  const pipVideo = pipWindow.document.querySelector("#video");
  pipVideo.muted = true;
});
pipWindow.document.body.append(pipMuteButton);
```

## 特性检测

要检查是否支持文档画中画 API，请使用：

```
if ("documentPictureInPicture" in window) {
  // 支持文档画中画API。
}
```

## 演示

### VideoJS 播放器

你可以使用文档画中画 API 的[VideoJS 播放器演示](https://link.juejin.cn/?target=https%3A%2F%2Fdocument-picture-in-picture-api.glitch.me%2F "https://document-picture-in-picture-api.glitch.me/")进行尝试。欢迎查看[源代码](https://link.juejin.cn/?target=https%3A%2F%2Fglitch.com%2Fedit%2F%23!%2Fdocument-picture-in-picture-api%3Fpath%3Dscript.js "https://glitch.com/edit/#!/document-picture-in-picture-api?path=script.js")。

### 番茄钟

[Tomodoro](https://link.juejin.cn/?target=https%3A%2F%2Flazy-guy.github.io%2Ftomodoro%2Findex.html "https://lazy-guy.github.io/tomodoro/index.html")，一个番茄钟网络应用程序，在可用时也利用了文档画中画 API（请参阅[GitHub Pull Request](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Flazy-guy%2Ftomodoro%2Fpull%2F2 "https://github.com/lazy-guy/tomodoro/pull/2")）。

![番茄时钟 Tomodoro](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c15dabd90e4b459c94605f49248497c6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp "屏幕截图")

## 反馈

在这个阶段，开发者的反馈非常重要，请在 GitHub 上[提交问题](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FWICG%2Fdocument-picture-in-picture%2Fissues "https://github.com/WICG/document-picture-in-picture/issues")，提出建议和问题。

> 首发于公众号 [前端从进阶到入院](https://link.juejin.cn/?target=https%3A%2F%2Fp1-juejin.byteimg.com%2Ftos-cn-i-k3u1fbpfcp%2F6a12bff1af1d436a990e970812086e05~tplv-k3u1fbpfcp-watermark.image%3F "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a12bff1af1d436a990e970812086e05~tplv-k3u1fbpfcp-watermark.image?")，分享 Vue 源码 / React / TS / 浏览器 / 工程化等各个前端领域，我的文章帮助了很多小伙伴进入大厂，欢迎关注。

## 学习资料

* [公开说明](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FWICG%2Fdocument-picture-in-picture%2Fblob%2Fmain%2FREADME.md "https://github.com/WICG/document-picture-in-picture/blob/main/README.md")
* [WICG 规范](https://link.juejin.cn/?target=https%3A%2F%2Fwicg.github.io%2Fdocument-picture-in-picture%2F "https://wicg.github.io/document-picture-in-picture/")
* [Chromium 跟踪问题](https://link.juejin.cn/?target=https%3A%2F%2Fbugs.chromium.org%2Fp%2Fchromium%2Fissues%2Fdetail%3Fid%3D1315352 "https://bugs.chromium.org/p/chromium/issues/detail?id=1315352")
* [ChromeStatus.com 条目](https://link.juejin.cn/?target=https%3A%2F%2Fchromestatus.com%2Ffeature%2F5755179560337408 "https://chromestatus.com/feature/5755179560337408")
* Blink 组件：[`Blink>Media>PictureInPicture`](https://link.juejin.cn/?target=https%3A%2F%2Fbugs.chromium.org%2Fp%2Fchromium%2Fissues%2Flist%3Fq%3Dcomponent%3ABlink%253EMedia%253EPictureInPicture "https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EMedia%3EPictureInPicture")
* [TAG Review](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fw3ctag%2Fdesign-reviews%2Fissues%2F798 "https://github.com/w3ctag/design-reviews/issues/798")
* [Intent to Experiment](https://link.juejin.cn/?target=https%3A%2F%2Fgroups.google.com%2Fa%2Fchromium.org%2Fg%2Fblink-dev%2Fc%2FTz1gUh92dXs "https://groups.google.com/a/chromium.org/g/blink-dev/c/Tz1gUh92dXs")
