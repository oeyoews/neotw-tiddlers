## 定制浏览器方案

[](#定制浏览器方案)

@(文档)\[Electron, NW\.js, NodeJS, Chromium]

\[TOC]

***

最近研究了一下基于 `Chromium` 定制浏览器的方案，查阅了大量资料，具体方案也有了大概的蓝图。 <https://persilee.github.io/nwjs_electronjs/>

在阐述方案之前，先要了解几个名词：

### 简介

[](#简介)

#### Chromium

[](#chromium)

> Chromium 是一个由 Google 主导开发的网页浏览器，以 BSD 许可证等多重自由版权发行并开放源代码。Chromium 的开发可能早自 2006 年即开始。

> Chromium 是 Google 为发展自家的浏览器 Google Chrome 而打开的项目，所以 Chromium 相当于 Google Chrome 的工程版或实验版（尽管 Google Chrome 本身也有 β 版），新功能会率先在 Chromium 上开放，待验证后才会应用在 Google Chrome 上，故 Google Chrome 的功能会相对落后但较稳定。 —— [维基百科](https://zh.wikipedia.org/wiki/Chromium#cite_note-3)

#### CEF

[](#cef)

> Chromium Embedded Framework (CEF) 是个基于 Google Chromium 项目的开源 Web browser 控件，支持 Windows, Linux, Mac 平台。除了提供 C/C++ 接口外，也有其他语言的移植版。

> 因为基于 Chromium，所以 CEF 支持 Webkit & Chrome 中实现的 HTML5 的特性，并且在性能上面，也比较接近 Chrome。 CEF 还提供的如下特性：自定义插件、自定义协议、自定义 JavaScript 对象和扩展；可控制的 resource loading, navigation, context menus 等等 —— [百度百科](https://baike.baidu.com/item/CEF/20837917?fr=aladdin)

#### NW

[](#nw)

> NW\.js 是基于 Chromium 和 Node.js 运行的， 以前也叫 nodeWebkit。这就给了你使用 HTML 和 JavaScript 来制作桌面应用的可能。在应用里你可以直接调用 Node.js 的各种 api 以及现有的第三方包。因为 Chromium 和 Node.js 的跨平台，那么你的应用也是可以跨平台的。—— [SegmentFault](https://segmentfault.com/a/1190000003870613)

#### Electron

[](#electron)

> Electron（最初名为 Atom Shell）是 GitHub 开发的一个开源框架。它允许使用 Node.js（作为后端）和 Chromium（作为前端）完成桌面 GUI 应用程序的开发。Electron 现已被多个开源 Web 应用程序用于前端与后端的开发，著名项目包括 GitHub 的 Atom 和微软的 Visual Studio Code。—— [维基百科](https://zh.wikipedia.org/wiki/Electron_%28%E8%BD%AF%E4%BB%B6%E6%A1%86%E6%9E%B6%29)

所以 ，**CEF**、**nw**、**Electron** 都是基于 `Chromium` 的开源框架，可以实现所需的定制浏览器需求，准确的讲应该是用 `HTML5` 、 `CSS3` 、 `JavaScript` 来制作拥有漂亮界面的**桌面应用**。

就是一个本地客户端应用程序使用一个内置的浏览器内核渲染前端界面，另一方面还可以调用本地系统级 API，实现本地应用程序的各种功能。

***

### 市场调研

[](#市场调研)

通过查阅大量资料得知，以各企业的线上产品及使用的技术供参考。

#### CEF 案例

[](#cef-案例)

据 **CEF** 官方介绍，以下（如图）桌面应用在使用 `CEF`。

[![@who is using CEF | center | 800x0](https://github.com/persilee/nwjs_electronjs/raw/master/desktop_application/CEF.png)](https://github.com/persilee/nwjs_electronjs/blob/master/desktop_application/CEF.png)

国内桌面应用有：[有道云笔记](http://note.youdao.com/) *（网易）*、[钉钉](https://www.dingtalk.com/?source=2202\&lwfrom=2017120202092064209309201)*（阿里巴巴）*、[QQ](https://im.qq.com/pcqq/)*（腾讯）* 等，查看安装后目录及文件，可以看出 **有道云笔记**、**钉钉** 是使用的是`CEF`，而 **钉钉** 界面是使用 `AngularJs`，据了解后端应该用了`C++`和`Python`。

**QQ** 很早之前就通过内嵌 **IE** 来实现一些功能和界面。从 2013 年开始，**QQ** 引入了 `CEF`，对一些之前用 **IE** 的地方进行了替换。

[![@钉钉 Mac 版目录 | center](https://github.com/persilee/nwjs_electronjs/raw/master/desktop_application/1520329975606.png)](https://github.com/persilee/nwjs_electronjs/blob/master/desktop_application/1520329975606.png)

[![@钉钉 Mac 版应用界面 | center](https://github.com/persilee/nwjs_electronjs/raw/master/desktop_application/1520330256871.png)](https://github.com/persilee/nwjs_electronjs/blob/master/desktop_application/1520330256871.png)

#### NW 案例

[](#nw-案例)

这个是 **[NW](https://nwjs.io/)** 官方给出的使用 `nw.js` 的应用列表：<https://github.com/nwjs/nw.js/wiki/List-of-apps-and-companies-using-nw.js>

而国内的有，比如微信开发工具等，是基于 `nw.js` 开发的。

[![@微信开发工具 Mac 版目录 | center](https://github.com/persilee/nwjs_electronjs/raw/master/desktop_application/1520571438918.png)](https://github.com/persilee/nwjs_electronjs/blob/master/desktop_application/1520571438918.png)

[![@微信开发工具 Mac 版 | center](https://github.com/persilee/nwjs_electronjs/raw/master/desktop_application/1520571517344.png)](https://github.com/persilee/nwjs_electronjs/blob/master/desktop_application/1520571517344.png)

#### Electron 案例

[](#electron-案例)

这个是 **[Electron](https://electronjs.org/)** 官方给出的是用 `electron` 的应用列表：<https://electronjs.org/apps>

如图，**Electron** 已被像 **微软**、 **Facebook**、 **Slack** 和 **Docker** 这样的公司用于创建应用程序。

[![#electron 应用 | center | 550x0](https://github.com/persilee/nwjs_electronjs/raw/master/desktop_application/1520668439676.png)](https://github.com/persilee/nwjs_electronjs/blob/master/desktop_application/1520668439676.png)

我所用的编辑器 **Visual Studio Code** 就是基于 `electron` 开发的

[![@VS Code Mac 版](https://github.com/persilee/nwjs_electronjs/raw/master/desktop_application/1520669844227.png)](https://github.com/persilee/nwjs_electronjs/blob/master/desktop_application/1520669844227.png)

***

### 实战

[](#实战)

下面会分别用 `nw.js` 和 `electron` 做一个简单的 **Dome**。

由于 **CEF** 文档资料少且原生是 `C\C++` ，虽然官方给出了 `java` 版的 **JCEF** ，开发起来效率较低，故此不知演示。

这个是 **[CEF](https://bitbucket.org/chromiumembedded/cef)** 官网，在 *External Projects* 章节列出支持语言：

> * Net (CEF3) - <https://github.com/cefsharp/CefSharp>
> * Net (CEF1) - <https://bitbucket.org/fddima/cefglue>
> * Net/Mono (CEF3) - <https://bitbucket.org/xilium/xilium.cefglue>
> * Net (CEF3) - <https://bitbucket.org/chromiumfx/chromiumfx>
> * Delphi (CEF1) - <http://code.google.com/p/delphichromiumembedded/>
> * Delphi (CEF3) - <https://github.com/hgourvest/dcef3>
> * Delphi (CEF3) - <https://github.com/salvadordf/CEF4Delphi>
> * Go - <https://github.com/CzarekTomczak/cef2go>
> * Java - <https://bitbucket.org/chromiumembedded/java-cef>
> * Java - <http://code.google.com/p/javacef/>
> * Python - <http://code.google.com/p/cefpython/>

#### NW => Hello, world!

[](#nw--hello-world)

从一个简单的例子来让我们看看如何编写一个 **NW** 应用。

* **第一步** 创建 `package.json` 配置文件

```
{
    "name": "helloworld",
    "main": "index.html",
    "icon": "img/app.png",
    "window": {
        "icon": "img/app.png"
    }
}
```

`main` 配置应用打开首页，`name` 配置应用的名称。

* **第二步** 创建 `index.html`

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Holle NW</title>
</head>
<style>
    html,
    body {
        height: 100%;
        margin: 0;
    }

    .box {
        height: 100%;
        display: flex; /* css3 弹性盒子 */
        justify-content: center;
        align-items: center;
    }
</style>

<body>
    <div class="box">
        <h1>Holle NW!</h1>
    </div>
</body>

</html>
```

这是一个简单的 **HTML** 文件，加入了一点 CSS，目的是让 **Holle NW!** 水平垂直居中。

* **第三步** 打包应用

这里我只测试了 **Mac** 和 **Windows** 的打包，**Linux** 没有测试。

**Mac 打包应用：** 在项目根目录执行以下命令，把所有文件压缩成 `app.nw` 文件。

然后把`app.nw` 文件放到 `nwjs.app/Contents/Resources/` 目录下即可，效果如图：

[![@Mac 下运行效果 | center](https://github.com/persilee/nwjs_electronjs/raw/master/desktop_application/1520711078780.png)](https://github.com/persilee/nwjs_electronjs/blob/master/desktop_application/1520711078780.png)

**Windows 打包应用：** 将应用的所有相关文件打成一个名为`package.nw` 的压缩包，将`package.nw` 与**NW**可执行文件放到相同目录即可，效果如图：

[![@Windons 下运行效果 | center | 880x0 ](https://github.com/persilee/nwjs_electronjs/raw/master/desktop_application/1520711343860.png)](https://github.com/persilee/nwjs_electronjs/blob/master/desktop_application/1520711343860.png)

***

#### Electron => Hello, world!

[](#electron--hello-world)

**Electron** 可以让你使用纯 `JavaScript` 调用丰富的原生 (操作系统) **APIs** 来创造桌面应用。

只需 3 个文件就可以构建一个简单的应用

```
your-app/
  ├── package.json
  ├── main.js
  └── index.html
```

* **第一步** 创建配置文件

首先需要安装 **Node** 环境，用 `npm` 来创建一个应用的配置文件 `package.json`

在 `package.json` 里新增启动命令 `start`

```
{
    "name": "your-app",
    "version": "0.1.0",
    "main": "main.js",
    "scripts": {
      "start": "electron ."
    }
  }
```

* **第二步** 创建入口文件 `main.js`

```
const {app, BrowserWindow} = require('electron');
const path = require('path')
const url = require('url')

function createWindow() {
    win = new BrowserWindow({
        width: 1008,
        height: 759
    })
      
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))
}

app.on('ready', createWindow)
```

代码已经很清晰直观，`createWindow` 创建一个桌面窗口，而大小由 `width`、`height` 控制，`win.loadURL` 用来加载页面。

* **第三步** 创建展示文件 `index.html`

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Hello Electron</title>
</head>
<style>
    html,
    body {
        height: 100%;
        margin: 0;
    }

    .box {
        height: 100%;
        display: flex;
        /* css3 弹性盒子 */
        justify-content: center;
        align-items: center;
    }
</style>

<body>
    <div class="box">
        <h1>Hello Electron!</h1>
    </div>
</body>

</html>
```

这是一个简单的 **HTML** 文件，加入了一点 CSS，目的是让 **Holle NW!** 水平垂直居中。

* **第四步** 打包应用

**打包应用：** 打包应用可以是用 `electron-packager` 工具进行打包，需要在 `package.json` 配置以下命令

```
"scripts": {
    "start": "electron .",
    "packager": "electron-packager ./ HelloElectron --all --out ./OutApp --version 0.0.1 --overwrite --ignore=node_modules --icon=./app/img/app.ico"
  },
```

然后，运行在终端执行命令 `npm run packagerMac` 即可打包`linux`、`Mac`、`windows` 三大平台应用包，效果如图：

[![@打包后的应用 | center| 400x0](https://github.com/persilee/nwjs_electronjs/raw/master/desktop_application/1520791859473.png)](https://github.com/persilee/nwjs_electronjs/blob/master/desktop_application/1520791859473.png)

[![@Mac 下运行效果 | center](https://github.com/persilee/nwjs_electronjs/raw/master/desktop_application/1520790145115.png)](https://github.com/persilee/nwjs_electronjs/blob/master/desktop_application/1520790145115.png)

[![@Windows 下运行效果 | center | 880x0](https://github.com/persilee/nwjs_electronjs/raw/master/desktop_application/1520792416456.png)](https://github.com/persilee/nwjs_electronjs/blob/master/desktop_application/1520792416456.png)

***

### GitHub 关注度和活跃度

[](#github关注度和活跃度)

首先我们需要先了解一下 **GitHub** 的以下三个状态的意思，

[![Alt text | center | 400x0](https://github.com/persilee/nwjs_electronjs/raw/master/desktop_application/1520857435681.png)](https://github.com/persilee/nwjs_electronjs/blob/master/desktop_application/1520857435681.png)

[![Alt text](https://github.com/persilee/nwjs_electronjs/raw/master/desktop_application/1520857536175.png)](https://github.com/persilee/nwjs_electronjs/blob/master/desktop_application/1520857536175.png) ：表示你以后会关注这个项目的所有动态，这个项目以后只要发生变动，如被别人提交了 `pull request`、被别人发起了`issue` 等等情况，你都会在自己的个人通知中心，收到一条通知消息，如果你设置了个人邮箱，那么你的邮箱也可能收到相应的邮件。

[![Alt text](https://github.com/persilee/nwjs_electronjs/raw/master/desktop_application/1520857569746.png)](https://github.com/persilee/nwjs_electronjs/blob/master/desktop_application/1520857569746.png)：表示你喜欢这个项目或者通俗点，可以把他理解成朋友圈的点赞，表示对这个项目的支持。

[![Alt text](https://github.com/persilee/nwjs_electronjs/raw/master/desktop_application/1520857709924.png)](https://github.com/persilee/nwjs_electronjs/blob/master/desktop_application/1520857709924.png)：当选择 `fork`，相当于你自己有了一份原项目的拷贝，当然这个拷贝只是针对当时的项目文件，如果后续原项目文件发生改变，你必须通过其他的方式去同步。*（一般用于修改**bug**和优化项目或者在此项目上开发新功能等）*

#### CEF

[](#cef-1)

**CEF** 在 **GitHub** 找不到项目，这个[官网](https://bitbucket.org/chromiumembedded/cef/overview) 提供的数据，如图*（由于在**GitHub** 没有项目，相关数据无法准确统计）*。

[![@CEF 关注度 | center](https://github.com/persilee/nwjs_electronjs/raw/master/desktop_application/1520855809138.png)](https://github.com/persilee/nwjs_electronjs/blob/master/desktop_application/1520855809138.png)

#### NW

[](#nw-1)

**NW 关注度：** [![Alt text](https://github.com/persilee/nwjs_electronjs/raw/master/desktop_application/1520856387728.png)](https://github.com/persilee/nwjs_electronjs/blob/master/desktop_application/1520856387728.png)

\*\*NW 活跃度：\*\* 如图

[![@2011 年～2018 年提交量 | center](https://github.com/persilee/nwjs_electronjs/raw/master/desktop_application/1520858064076.png)](https://github.com/persilee/nwjs_electronjs/blob/master/desktop_application/1520858064076.png)

#### Electron

[](#electron-1)

**Electron 关注度：** [![Alt text](https://github.com/persilee/nwjs_electronjs/raw/master/desktop_application/1520858325207.png)](https://github.com/persilee/nwjs_electronjs/blob/master/desktop_application/1520858325207.png)

**活跃度：** 如图

[![@electron2013 年～2018 年提交量 | center](https://github.com/persilee/nwjs_electronjs/raw/master/desktop_application/1520858451333.png?raw=true)](https://github.com/persilee/nwjs_electronjs/blob/master/desktop_application/1520858451333.png?raw=true)

***

通过以上的 **市场调研**、**实战**、**GitHub 关注度和活跃度** 等 **Electron** 都占有优势，如下

* 市场案例较多，各大型企业都在使用
* 开发实战代码更直观，容易理解和维护，各种文档健全、网络资料较多且质量较高，周边辅助工具齐全，开发效率可大大提高
* **GitHub** 关注度和活跃度持续攀升

所以结合以上情况，之后会用以下技术栈基于 **branch** 做一个完善的案例

* **跨平台桌面应用框架：**`electron` *（Chromium + Node.js）*
* **UI 库：** `iView`
* **js 框架：** `Vue.js`
* **自动化构建工具：** `webpack`
* **HTML5、CSS3、ES6**

***
