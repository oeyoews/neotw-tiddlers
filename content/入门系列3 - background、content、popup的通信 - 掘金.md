![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/2/16e29ccb6a35d42c~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

## 前言

😋😋😋嘿，各位爷好～～

前面两节简单的总结了一些关于什么是浏览器插件，以及浏览得的`manifest.json`文件配置。同时在后续也给插件增加了页面和逻辑，说明了`background`、`popup`、`content`三个字段的具体使用。

不同字段对应着不同的作用，协作构成了插件的强大功能。合作就得沟通，就像`Electron`的主进程和渲染进程通信，那它们之间是如何通信的呢？

## 插件的架构体系

插件呢，必须具有存在位于浏览器工具栏中的图标，工具栏图标允许轻松访问，并使用户了解安装了哪些插件。大多数用户通过单击图标，使用其弹出窗口进行交互，比如 CORS 跨域插件，谷歌翻译插件等等。

插件的体系结构是取决于其功能，但大多数功能强大的插件包括以下多个组件：

* `manifest`
* `background scripts`
* `ui elements ==> popup`
* `content scripts`
* `optional page`

备注：就像插件允许用户自定义 Chrome 浏览器一样，`optional page`可以自定义插件。在 chrome40 以前，使用`options_page配置`；在 chrome40 以后，则使用`options_ui`配置。

组件的`background`、`popup`、`content`三个字段整体关系图如下:

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/2/16e29cd9ac8d8495~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

## 通信

插件的不同组件之间通常需要彼此通信，不同的 HTML 页面可以使用`chrome.extension`方法找到彼此，例如 getViews () 和 getBackgroundPage ()。一旦页面引用了其他扩展页面，第一个页面就可以调用其他页面上的函数并操纵它们的 DOM。此外，插件的所有组件还可以使用 storage API 存储值，并使用消息传递进行通信。

而对于组件`background`、`popup`、`content`，具体通信可以看下图：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/2/16e29d0dea8191b9~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

可以看到存在 6 种通信路径：

1. `popup`和`background`之间的通信

   1. `background`给`popup`发送消息
   2. `popup`给`background`发送消息

2. `background`和`content`之间的通信

   1. `background`给`content`发送消息
   2. `content`给`background`发送消息

3. `popup`和`content`之间的通信

   1. `popup`给`content`发送消息
   2. `content`给`popup`发送消息

### 脚本权限

我们已经了解了存在的几种通信路径，通信意味着各种 API 的相互调用，因此在实践之前，也需要去了解一点关于 chrome 插件的脚本权限

脚本的类型决定着脚本存在什么权限：比如`Chrome API`、`DOM 访问`、`跨域访问`、`原页面JS访问`，具体如图：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/2/16e29ccb69463a4d~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

\=====> 图使用 markdown 编辑 好了，了解了权限以后，就知道什么脚本可以使用何种 API 来实现信息传递，接下来就尝试去打通每一关吧。

### `popup`和`background`之间的通信

首先，给一个大致通信图。关于`content script`、`popup script`、`background script`，它们之间的通信总体概览图如下：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/2/16e29ccb69853e93~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

开始吧。还是和以前一样，新建插件文件夹，增加必须的`manifest.json`和基本文件。

#### `background`给`popup`发送消息

插件的`background`，对于浏览器只存在一个，而对于`popup`，不同的 tab 就会存在一个前端，如果`background`需要给不同前端发送信息，就需要特殊的 tab id。这里是针对`background`给`popup`传递信息。

`background.js` 添加代码:

```
function toPopup() {
    alert('to popup!')
}
```

`popup.js` 添加代码：

```
const bg = chrome.extension.getBackgroundPage()
document.getElementById('rBgInfo').onclick = function() {
    bg.toPopup()
}
```

在`popup.html`引入`popup.js`，并添加 id 为`rBgInfo`的按钮，安装插件，点击按钮，如果弹窗如下样式，则表明成功。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/2/16e29d21b5fe8ca2~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

#### `popup`给`background`发送消息

`background => popup` 是通过`getBackgroundPage`，而`popup => background`是通过`getViews`。

下面就来瞧一下

##### 使用长连接

在`popup.js`增加如下代码：

```
// 使用长连接
let port = chrome.extension.connect({
    name: 'popup-name'
})

// 使用postMs 发送信息
port.postMessage('给 background 传递信息~')

// 接收信息
port.onMessage.addListener(msg => {
    console.log('接收的信息：', msg)
})
```

在`background.js` 增加如下代码：

```
// 获取所有 tab
const pups = chrome.extension.getViews({
    type: 'popup'
}) || []

// 输出第一个使用插件页面的url
if (pups.length) {
    console.log(pups[0].location.href)
}
```

点击插件刷新按钮，点击【背景页】按钮，可以看到每次点击一下插件图标，就会发送一次信息。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/2/16e29ce54869ce68~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

这也告诉了 chrome 插件的另一个机制：点击图标出现和隐藏`popup`弹窗页面，实际上是对整个页面的销毁，类似于关闭网页，而不是切换网页。（很重要的哦）

##### 操作 DOM

除了信息传递，`background`可能也需要对`popup.html`的页面进行操作，比如检测到当前是万圣节🎃，给插件页面添加个`happy halloween`。

首先给`popup.html`增加一个 text

```
<p id="pbText">不是万圣节</p>
```

然后只需要在`background.js`中如下处理：

```
// 使用长连接 - 监听 popup 传递来的消息
chrome.extension.onConnect.addListener(port => {
    console.log('连接中------------')
    port.onMessage.addListener(msg => {
        console.log('接收消息：', msg)
        getAll()
        port.postMessage('popup，我收到了你的信息~')
    })
})

// 获取所有 tab
function getAll() {
    const views = chrome.extension.getViews({
        type: 'popup'
    })

    for (let o of views) {
        console.log(111)
        o.document.getElementById('pbText').innerHTML = "万圣节🎃快乐"
    }
}
```

添加`getAll()`函数，将函数防止长连接即可。这里主要想展示`chrome.extension.getViews`函数的使用。

刷新插件，点击插件图标，就会弹窗如下页面了：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/2/16e29ce9c7c3bfe7~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

### `popup`和`content`之间的通信

有了`background`和`popup`，下面需要做的就是创建一个`content`页面。

`manifest`添加下列配置

```
{
    ...
    "content_scripts": [
        {
            "matches": [
                "<all_urls>"
            ],
            "js": [
                "content.js"
            ]
        }
    ]
}
```

#### `content`给`popup`发送消息

首先在`content.js`添加如下代码：

```
// Chrome提供的大部分API是不支持在content_scripts中运行
// sendMessage onMessage 是可以使用
chrome.runtime.sendMessage({
    info: "我是 content.js"
}, res => {
    // 答复
    alert(res)
})
```

代码负责发送信息和接收反馈，然后给`popup.js`添加：

```
chrome.runtime.onMessage.addListener((req,sender, sendResponse) => {
    sendResponse('我收到了你的来信')
    console.log('接收了来自 content.js的消息', req.info)
})
```

代码负责接收消息和发送反馈。

刷新插件，点击插件按钮，打开一个页面，保持插件`popup`处于活跃状态（上面讲了哈～，插件关闭等于页面销毁），然后刷新页面，会发现浏览器弹出弹窗：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/2/16e29ced73c0a7f0~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

最后，右键插件图标，点击 “审查弹窗内容”，可以看到`content.js`和`popup.js`的`console.log`日志（👻这等于告诉您如何调试插件～）

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/2/16e29d04da3067b0~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

弹窗说明我们的程序是成功运行的，日志打印表明我们的通信是成功的，现在我们已经知道了`content`给`popup`发送消息。

#### `popup`给`content`发送消息

其实上面已经告诉了`popup`给`content`发送信息了，但毕竟不是`popup`主动地，谈恋爱了，肯定需要主动一些了。

给`popup`添加如下代码，放入 rBgInfo 按钮点击事件：

```
// popup ---> content
chrome.tabs.query({
    active: true,
    currentWindow: true
}, (tabs) => {
    let message = {
        info: '来自popup的情书💌'
    }
    chrome.tabs.sendMessage(tabs[0].id, message, res => {
        console.log('popup=>content')
        console.log(res)
    })
})
```

寄送一封信，`content`得接收信：

```
// get popup2content info
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request.info)
    sendResponse('我收到了你的情书，popup~')
})
```

点击插件刷新按钮，打开页面，点击弹窗的 rBgInfo 按钮，日志打印如下：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/2/16e29d07f3d99af1~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

关于`popup`给`content`的通信又又又成功了～

### `background`和`content`之间的通信

`background`和`content`之间的通信与`popup`和`content`类似的，写者就不写 demo 了，与上面一样。

### 长连接与短连接

在上面的一些 demo 中，可以看到通信使用了两个函数，一个就是`sendMessage`，另一个就是`connect`，其实这两个分别对应着不同的连接方式：

* 长连接： `chrome.tabs.connect` 和 `chrome.runtime.connect`
* 短连接： `chrome.tabs.sendMessage`

## 总结

了解了脚本之前的通信以后，才算真正的入门了，希望各位能学到点什么。下面关于 chrome 插件的博客，可能会涉及到具体真正插件开发的实践了，更新或许会慢一点，见谅❤❤❤！

备注：这几天工作较忙，写博客都得挤时间了。希望大家也能在工作之余过好每天，谢谢时光～
