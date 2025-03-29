## 前言

本文主要介绍 `Electron` 客户端应用的自动更新，包括全量和增量这两种方式。

**全量更新：** 运行新的安装包，安装目录所有资源覆盖式更新。

**增量更新：** 只更新修改的部分，通常是渲染进程和主进程文件。

本文并没有拿真实项目来举例子，而是起一个 **新的项目** 从 0 到 1 来实现自动更新。

如果已有的项目需要支持该功能，借鉴本文的主要步骤即可。

**前置说明：**

1. 由于业务场景的限制，本文介绍的更新仅支持 `Windows` 操作系统，其余操作系统未作兼容处理。
2. 更新流程全部由前端完成，不涉及到后端，**没有轮询** 更新的机制。
3. 发布方式限制为 `generic`，线上服务需要配置 `nginx` 确保访问到资源文件。

## 准备工作

### 脚手架搭建项目

我们通过 [electron-vite](https://link.juejin.cn/?target=https%3A%2F%2Fcn-evite.netlify.app%2Fguide%2F%23electron-%25E5%2585%25A5%25E5%258F%25A3 "https://cn-evite.netlify.app/guide/#electron-%E5%85%A5%E5%8F%A3") 快速搭建一个基于 `Vite + React + TS` 的 `Electron` 项目。

![1.jpg](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/d229acb91332414c96a126e52eb408f6~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP6ZmI5ZCM5a2m5ZCX:q75.awebp?rk3s=f64ab15b\&x-expires=1742507621\&x-signature=voPVicYj4zVtrJEjnFKWnyoOIDw%3D)

该模板已经包括了我们需要的核心第三方库：`electron-builder`，`electron-updater`。

前者是用来打包客户端程序的，后者是用来实现自动更新的。

在项目根目录下，已经自动生成了两份配置文件：`electron-builder.yml` 和 `dev-app-update.yml`。

### electron-builder.yml

该文件描述了一些 **打包配置**，更多信息可参考 [官网](https://link.juejin.cn/?target=https%3A%2F%2Fwww.electron.build%2Fconfiguration "https://www.electron.build/configuration")。

在这些配置项中，`publish` 字段比较重要，因为它关系到更新源。

```
publish:
  provider: generic // 使用一个通用的 HTTP 服务器作为更新源。
  url: https://example.com/auto-updates // 存放安装包和描述文件的地址
```

`provider` 字段还有其他可选项，但是本文只介绍 `generic` 这种方式，即把安装包放在 HTTP 服务器里。

### dev-app-update.yml

```
provider: generic
url: https://example.com/auto-updates
updaterCacheDirName: electron-update-demo-updater
```

其中，`updaterCacheDirName` 定义下载目录，也就是安装包存放的位置。全路径是`C:\Users\用户名\AppData\Local\electron-update-demo-updater`，不配置则在`C:\Users\用户名\AppData\Local`下自动创建文件夹，开发环境下为`项目名`，生产环境下为`项目名-updater`。

![image.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/6faf7f8a46f346d9b0aed8cf5624c706~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP6ZmI5ZCM5a2m5ZCX:q75.awebp?rk3s=f64ab15b\&x-expires=1742507621\&x-signature=%2B1fzVZNbISWxvU5aLGatyS7f6qc%3D)

### 模拟服务器

我们直接运行 `npm run build:win`，在默认 `dist` 文件夹下就出现了打包后的一些资源。

![image.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/c2ec305dbb9d4d84968490df7e2563bd~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP6ZmI5ZCM5a2m5ZCX:q75.awebp?rk3s=f64ab15b\&x-expires=1742507621\&x-signature=7VP0uk924eVcE%2BJIiLuOD3Ys6u0%3D)

其实更新的基本思路就是对比版本号，即对比本地版本和 **线上服务器** 版本是否一致，若不一致则需要更新。

![image.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/c1b384c69e474cf99dcc8c394dfb9a67~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP6ZmI5ZCM5a2m5ZCX:q75.awebp?rk3s=f64ab15b\&x-expires=1742507621\&x-signature=AkDwAuBaU3rtFFGVPLZlGne4Hro%3D)

因此我们在开发调试的时候，**需要起一个本地服务器**，来模拟真实的情况。

新建一个文件夹 `mockServer`，把打包后的 `setup.exe` 安装包和 `latest.yml` 文件粘贴进去，然后通过 `serve` 命令默认起了一个 `http://localhose:3000` 的本地服务器。

既然有了存放资源的本地地址，在开发调试的时候，我们更新下 `dev-app-update.yml` 文件的 `url` 字段，也就是修改为 `http://localhose:3000`。

注：如果需要测试打包后的更新功能，需要同步修改打包配置文件。

## 全量更新

与主进程文件同级，创建 `update.ts` 文件，之后我们的更新逻辑将在这里展开。

```
import { autoUpdater } from 'electron-updater' //核心库
```

需要注意的是，在我们开发过程中，通过 `npm run dev` 起来的 `Electron` 程序其实不能算是打包后的状态。

你会发现在调用 `autoUpdater` 的一些方法会提示下面的错误：

`Skip checkForUpdates because application is not packed and dev update config is not forced`

因此我们需要在开发环境去做一些动作，并且手动指定 `updateConfigPath`：

```
// update.ts
if (isDev) {
  Object.defineProperty(app, 'isPackaged', {
    get: () => true
  })
  autoUpdater.updateConfigPath = path.join(__dirname, '../../dev-app-update.yml')
}
```

核心对象 `autoUpdater` 有很多可以主动调用的方法，也有一些监听事件，同时还有一些属性可以设置。

这里只展示了本人项目场景所需的一些配置。

```
autoUpdater.autoDownload = false // 不允许自动下载更新
autoUpdater.allowDowngrade = true // 允许降级更新（应付回滚的情况）

autoUpdater.checkForUpdates()
autoUpdater.downloadUpdate()
autoUpdater.quitAndInstall()

autoUpdater.on('checking-for-update', () => {
  console.log('开始检查更新')
})
autoUpdater.on('update-available', info => {
  console.log('发现更新版本')
})
autoUpdater.on('update-not-available', info => {
  console.log('不需要全量更新', info.version)
})
autoUpdater.on('download-progress', progressInfo => {
  console.log('更新进度信息', progressInfo)
})
autoUpdater.on('update-downloaded', () => {
  console.log('更新下载完成')
})
autoUpdater.on('error', errorMessage => {
  console.log('更新时出错了', errorMessage)
})
```

在监听事件里，我们可以拿到下载新版本 **整个生命周期** 需要的一些信息。

```
// 新版本的版本信息（已筛选）
interface UpdateInfo {
    readonly version: string;
    releaseName?: string | null;
    releaseNotes?: string | Array<ReleaseNoteInfo> | null;
    releaseDate: string;
}

// 下载安装包的进度信息
interface ProgressInfo {
    total: number;
    delta: number;
    transferred: number;
    percent: number;
    bytesPerSecond: number;
}
```

在写完这些基本的方法之后，我们需要决定 **检验更新** 的时机，一般是在应用程序真正启动之后，即 `mainWindow` 创建之后。

运行项目，预期会提示 `不需要全量更新`，因为刚才复制到本地服务器的 `latest.yml` 文件里的版本信息与本地相同。修改 `version` 字段，重启项目，主进程就会提示有新版本需要更新了。

频繁启动应用太麻烦，除了应用初次启动时主进程主动帮我们检验更新外，还需要用户 **手动触发** 版本更新检测，此外，由于产品场景需要，当发现有新版本的时候，需要在 **渲染进程** 通知用户，包括版本更新时间和更新内容。因此我们需要加上主进程与渲染进程的 `IPC通信` 来实现这个功能。

其实需要的数据主进程都能够提供了，渲染进程具体的展示及交互方式就自由发挥了，这里简单展示下我做的效果。

**1. 发现新版本** ![GIF 2024-9-19 16-48-44.gif](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/59cc5a8828dd41209c635ccfec93295e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP6ZmI5ZCM5a2m5ZCX:q75.awebp?rk3s=f64ab15b\&x-expires=1742507621\&x-signature=rRdmGjVhJWHX3HOm3B5fqaar83Y%3D)

**2. 无需更新**

![image.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/b20e7e4c655a48a6b6d6cec02fea1650~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP6ZmI5ZCM5a2m5ZCX:q75.awebp?rk3s=f64ab15b\&x-expires=1742507621\&x-signature=rSrz5AvlWy5zTmaEPkKCk8L0yIA%3D)

## 增量更新

### 为什么要这么做

其实全量更新是一种比较简单粗暴的更新方式，我没有花费太大的篇幅去介绍，基本上就是使用 `autoUpdater` 封装的一些方法，开发过程中更多的注意力则是放在了渲染进程的交互上。

此外，我们的更新交互用的是一种 **用户感知** 的方式，即更不更新是由用户自己决定的。而 **静默更新** 则是用户无感知，在监测到更新后不用去通知用户，而是自行在后台下载，在某个时刻执行安装的逻辑，这种方式往往是一键安装，不会弹出让用户去选择安装路径的窗口。接下去要介绍的增量更新其实是这种 `用户无感知` 的形式，只不过我们更新的不是整个应用程序。

由于产品迭代比较频繁，我们的业务方经常收到更新提示，意味着他们要经常手动更新应用，以便使用到最新的功能特性。众所周知，`Electron` 给前端开发提供了一个比较容易上手的客户端开发解决方案，但在享受 `跨平台` 等特性的同时，还得忍受 **臃肿的安装包** 。

带宽、流量在当前不是什么大问题，下载和安装的速度也挺快，但这频繁的下载覆盖一模一样的资源文件还是挺糟心的，代码改动量小时，全量更新完全没有必要。**我们希望的是**，开发更新了什么代码，应用程序就替换掉这部分代码就好了，这很优雅。在 **我们的场景** 中，这部分代码指的是 —— `main、preload、renderer`，并不包括 `dll`、`第三方SDK`等资源。

网上有挺多种增量更新的 **解决方案**，例如：

1. 通过 `win.loadURL(一个线上地址)` 实现，相当于就套了一层客户端的壳子，与加载的`Web` 端同步更新。这种方法对于简单应用来说是最省心的，但是也有一定的局限性，例如不能使用 `node` 去操作一些底层的东西。
2. 设置 `asar` 的归档方式，替换`app.asar` 或 `app.asar.unpack`来实现。但后者在我实践过程中存在文件路径不存在的问题。
3. 禁用 `asar` 归档，解压渲染进程压缩包后实现替换。简单尝试过，首次执行安装包的时候写入文件很慢，不知道是不是这个方式引起的。
4. 欢迎补充。

本文我们采用较普遍的 **替换 asar** 来实现。

### 优化 app.asar 体积

> `asar`是 `Electron`提供的一种将多个文件合并成一个文件的类 `tar` 风格的归档格式，不仅可以缓解`Windows`下路径名过长的问题， 还能够略微加快一下 `require`的速度，并且可以隐藏你的源代码。（并非完全隐藏，有方法可以找出来）

`Electron` 应用程序启动的时候，会读取 `app.asar.unpacked` 目录中的内容合并到 `app.asar` 的目录中进行加载。在此之前我们已经打包了一份 Demo 项目，安装到本地后，我们可以根据安装路径找到 `app.asar` 这个文件。

例如：`D:\你的安装路径\electron-update-demo\resources`

![image.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/1eba985973514b65847689d1d80bf96c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP6ZmI5ZCM5a2m5ZCX:q75.awebp?rk3s=f64ab15b\&x-expires=1742507621\&x-signature=UD1Sn6l4QJWMZ6B8m77VmiaFWiE%3D)

在这个 Demo 项目中，脚手架生成的模板将图标剥离出来，因此出现了一个 `app.asar.unpacked` 文件夹。我们不难发现，`app.asar` 这个文件竟然有 **66 MB**，再回过头看我们真正的代码文件，甚至才 **1 MB** ！那么到底是什么原因导致的这个文件这么大呢，刚才提到了，`asar` 其实是一种压缩格式，因此我们只要解压看看就知道了。

```
npm i -g asar // 全局安装

asar e app.asar folder // 解压到folder文件夹
```

![image.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/f8e98320940442c197e3537a32524c7d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP6ZmI5ZCM5a2m5ZCX:q75.awebp?rk3s=f64ab15b\&x-expires=1742507621\&x-signature=Dah3NNHLkdT0jyQ%2BotanswzponY%3D)

解压后我们不难发现，`out` 文件夹里的才是我们打包出来的资源，罪魁祸首竟然是 `node_modules`，足足有 **62.3 MB**。

查阅资料得知，`Electron` 在打包的时候，会把 **dependencies** 字段里的依赖也一起打包进去。而我们的渲染进程是用 `React`开发的，这些第三方依赖早就通过 `Vite` 等打包工具打到资源文件里了，根本不需要再打包一次，不然我们重新下载的 `app.asar` 文件还是很大的，因此需要尽可能减少体积。

优化应用程序体积 == 减少 `node_modules` 文件夹的大小 == 减少需要打包的依赖数量 == 减少 `dependencies` 中的依赖。

**1. 移除 dependencies**

最开始我想的是把 `package.json` 中的 `dependencies` 全都移到 `devDependencies`，打包后的体积果然减小了，但是在测试过程中会发现某些功能依赖包会缺失，比如 `@electron/remote`。因此在修改这部分代码的时候，需要特别留意，哪些依赖是需要保留下来的。

由于不想影响 `package.json` 的版本结构，我只是在写了一个脚本，在 `npm i` 之后，执行打包命令前修改 `devDependencies` 就好了。

**2. 双 package.json 结构**

这是 `electron-builder` 官网上看到的一种技巧，[传送门](https://link.juejin.cn/?target=https%3A%2F%2Fwww.electron.build%2Ftutorials%2Ftwo-package-structure "https://www.electron.build/tutorials/two-package-structure")， 创建 `app` 文件夹，再创建第二个 `package.json`，在该文件中配置我们应用的名称、版本、主进程入口文件等信息。这样一来，`electron-builder` 在打包时会以该文件夹作为打包的根文件夹，即只会打包这个文件夹下的文件。

但是我原项目的主进程和预加载脚本也放在这，尝试修改后出现打包错误的情况，**感兴趣的可以试试**。

![image.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/2d3df819ea5f40de9cdd6bc392c10c1f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP6ZmI5ZCM5a2m5ZCX:q75.awebp?rk3s=f64ab15b\&x-expires=1742507621\&x-signature=aOyL1uICZMZDEhd4g1UQPeXlK3w%3D)

这是我们优化之后的结果，**1.32 MB**，后面只需要替换这个文件就实现了版本的更新。

### 校验增量更新

全量更新的校验逻辑是第三方库已经封装好了的，那么对于增量更新，就得由我们自己来实现了。

首先明确一下 **校验的时机**，`package.json` 的 `version` 字段表示应用程序的版本，用于全量更新的判断，那也就意味着，当这个字段保持不变的时候，会触发上文提到的 `update-not-available` 事件。所以我们可以在这个事件的回调函数里来进行校验。

```
autoUpdater.on('update-not-available', info => { console.log('不需要全量更新', info.version) })
```

然后就是 **如何校验**，我们回过头来看 `electron-builder` 的打包配置，在 `releaseInfo` 字段里描述了发行版本的一些信息，目前我们用到了 `releaseNotes` 来存储更新日志，查阅官网得知还有个 `releaseName` 好像对于我们而言是没什么用的，那么我们就可以把它作为增量更新的 **热版本号**。（但其实 [官网](https://link.juejin.cn/?target=https%3A%2F%2Fwww.electron.build%2Fapp-builder-lib.interface.releaseinfo "https://www.electron.build/app-builder-lib.interface.releaseinfo") 配置项还有个 `vendor` 字段，可是我在用的时候打包会报错，可能是版本的问题，感兴趣的可以试试。）

每次发布新版本的时候，只要不是 `Electron自身版本变化` 等重大更新，我们都可以通过修改 `releaseInfo` 的 `releaseName` 来发布我们的热版本号。现在我们已经有了线上的版本，那 **本地热版本号** 该如何获取呢。这里我们在每次热更新完成之后，就会把最新的版本号存储在本地的一个配置文件中，通常是 `userData` 文件夹，用于存储我们应用程序的用户信息，**即使程序卸载** 了也不会影响里面的资源。在 `Windows` 下，路径如下： `C:\Users\用户名\AppData\Roaming\electron-update-demo`。

因此，整个 **校验流程** 就是，在打开程序的时候，`autoUpdater` 触发 `update-not-available` 事件，拿到线上 `latest.yml` 描述的 `releaseName` 作为热版本号，与本地配置文件（我们命名为 `config.json`）里存储的热版本号（我们命名为 `hotVersion`）进行对比，若不同就去下载最新的 `app.asar` 文件。

我们使用 `electron-log` 来记录日志，代码如下所示。

```
// 本地配置文件
const localConfigFile = path.join(app.getPath('userData'), 'config.json')

const checkHotVersion = (latestHotVersion: string): boolean => {
  let needDownload = false
  if (!fs.existsSync(localConfigFile)) {
    fs.writeFileSync(localConfigFile, '{}', 'utf8')
    log.info('配置文件不存在，已自动创建')
  } else {
    log.info('监测到配置文件')
  }

  try {
    const configStr = fs.readFileSync(localConfigFile, 'utf8')
    const configData = JSON.parse(configStr || '{}')
    // 对比版本号
    if (latestHotVersion !== configData.hotVersion) {
      log.info('当前版本不是最新热更版本')
      needDownload = true
    } else {
      log.info('当前为最新版本')
    }
  } catch (error) {
    log.error('读取配置文件时出错', error)
  }

  return needDownload
}
```

### 下载增量更新包

通过刚才的校验，我们已经知道了什么时候该去下载增量更新包。

在开发调试的时候，我们可以把新版本的 `app.asar` 也放到起了本地服务器的 `mockServer` 文件夹里来模拟真实的情况。有很多方式可以去下载文件，这里我用了 `nodejs` 的 `http` 模块去实现，如果是 `https` 的需要引用 `https` 模块。

下载到本地的时候，我是放在了与 `app.asar` 同级目录的 `resources` 文件夹，我们不能直接覆盖原文件。一是因为进程权限占用的问题，二是为了容错，所以我们需要以另一个名字来命名下载后的文件（这里我们用的是 `app.asar-temp`），也就不需要去备份原文件了，代码如下。

```
const resourcePath = isDev
    ? path.join('D:\\测试\\electron-update-demo\\resources')
    : process.resourcesPath

const localAsarTemp = path.join(resourcePath, 'app.asar-temp')

const asarUrl = 'http://localhost:3000/app.asar'

downloadAsar() {
  const fileStream = fs.createWriteStream(localAsarTemp)
  http.get(asarUrl, res => {
    res.pipe(fileStream)
    fileStream
      .on('finish', () => {
        log.info('asar下载完成')
      })
      .on('error', error => {
        // 删除文件
        fs.unlink(localAsarTemp, () => {
          log.error('下载出现异常，已中断', error)
        })
      })
  })
}
```

因此，我们的流程更新为：发现新版本后，下载最新的 `app.asar` 到 `resources` 目录，并重命名为 `app.asar-temp`。这个时候我们启动项目进行调试，找到记录在本地的日志 —— `C:\Users\用户名\AppData\Roaming\electron-update-demo\logs`，会有以下的记录：

```
[2024-09-20 13:49:22.456] [info]  监测到配置文件
[2024-09-20 13:49:22.462] [info]  当前版本不是最新热更版本
[2024-09-20 13:49:23.206] [info]  asar下载完成
```

在看看项目 `resources` 文件夹，多了一个 `app.asar-temp`文件。

![image.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/e8ef88558abf4213b8cbe9f0fe1dcf4d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP6ZmI5ZCM5a2m5ZCX:q75.awebp?rk3s=f64ab15b\&x-expires=1742507621\&x-signature=nyCPY43E60BswZ31brYfs%2Fnm2Bs%3D)

至此，下载这一步已经完成了，但这样还会有一个问题，因为文件名没有加上版本号，也没有重复性校验，倘若一直没有更新，那么每次启动应用需要增量更新的时候都需要再次下载。

### 替换 app.asar 文件

好了，新文件也有了，接下来就是直接替换掉老文件就可以了，但是 **替换的时机** 很重要。

在 `Windows` 操作系统下，直接替换 `app.asar` 会提示程序被占用而导致失败，所以我们应该在程序关闭的时候实现替换。

1. 进入应用，下载新版本，自动关闭应用，替换资源，重启应用。
2. 进入应用，下载新版本，不影响使用，用户 **手动关闭** 后替换，**下次启动** 就是新版本了。

我们有上面两种方案，最终采用了 `方案2`。

在主进程监听 `app.on('quit')` 事件，在应用退出的时候，判断 `app.asar` 和 `app.asar-temp` 是否同时存在，若同时存在，就去替换。这里替换不能直接用 `nodejs` 在主进程里去写，因为主进程执行的时候，资源还是被占用的。因此我们需要额外起一个 **子进程** 去做。

`nodejs` 可以通过 `spawn`、`exec` 等方法创建一个子进程。子进程可以执行一些自定义的命令，我们并没有使用子进程去执行 `nodejs`，因为业务方的机器上不一定有这个环境，而是采用了启动 `exe` 可执行文件的方式。可能有人问为什么不直接运行 `.bat` 批处理文件，因为我调试关闭应用的时候，会有一个 **命令框闪烁** 的现象，这不太优雅，尽管已经设置 `spawn` 的 `windowsHide: true`。

那么如何获得这个 `exe` 可执行文件呢，其实是通过 `bat` 文件去编译的，命令如下：

```
@echo off
timeout /T 1 /NOBREAK
del /f /q /a %1\app.asar
ren %1\app.asar-temp app.asar
```

我们加了延时，等待父进程完全关闭后，再去执行后续命令。其中 `%1` 为运行脚本传入的参数，在我们的场景里就是 `resources` 文件夹的地址，因为每个人的安装地址应该是不一样的，所以需要作为参数传进去。

转换文件的工具一开始用的是 `Bat To Exe Converter` [下载地址](https://link.juejin.cn/?target=https%3A%2F%2Fwww.battoexe.com%2F "https://www.battoexe.com/")，但是在实际使用的过程中，我的电脑竟然把转换后的 `exe` 文件 **识别为病毒**，但在其他同事电脑上没有这种表现，这肯定就不行了，最后还是同事使用 `python` 帮我转换生成了一份可用的文件（`replace.exe`）。

这里我们可以选择不同的方式把 `replace.exe` 存放到 **用户目录** 上，要么是从线上服务器下载，要么是安装的时候就已经存放在本地了。我们选择了后者，这需要修改 `electron-builder` 打包配置，指定 `asarUnpack`, 这样就会存放在 `app.asar.unpacked` 文件夹中，不经常修改的文件都可以放在这里，不会随着增量更新而替换掉。

有了这个替换脚本之后，开始编写子进程相关的代码。

```
import { spawn } from 'child_process'

cosnt localExePath = path.join(resourcePath, 'app.asar.unpacked/resources/replace.exe')

replaceAsar() {
  if (fs.existsSync(localAsar) && fs.existsSync(localAsarTemp)) {
    const command = `${localExePath} ${resourcePath}`
    log.info(command)
    const logPath = app.getPath('logs')
    const childOut = fs.openSync(path.join(logPath, './out.log'), 'a')
    const childErr = fs.openSync(path.join(logPath, './err.log'), 'a')
    const child = spawn(`"${localExePath}"`, [`"${resourcePath}"`], {
      detached: true, // 允许子进程独立
      shell: true,
      stdio: ['ignore', childOut, childErr]
    })
    child.on('spawn', () => log.info('子进程触发'))
    child.on('error', err => log.error('child error', err))
    child.on('close', code => log.error('child close', code))
    child.on('exit', code => log.error('child exit', code))
    child.stdout?.on('data', data => log.info('stdout', data))
    child.stderr?.on('data', data => log.info('stderr', data))
    child.unref()
  }
}

app.on('quit', () => {
  replaceAsar()
})
```

在这块代码中，创建子进程的配置项比较重要，尤其是路径相关的。因为用户安装路径是不同的，可能会存在 `文件夹名含有空格` 的情况，比如 `Program Files`，这会导致在执行的时候将空格识别为分隔符，导致命令执行失败，因此需要加上 **双引号**。此外，`detached: true` 可以让子进程独立出来，也就是父进程退出后可以执行，而`shell: true` 可以将路径名作为参数传过去。

```
const child = spawn(`"${localExePath}"`, [`"${resourcePath}"`], {
  detached: true,
  shell: true,
  stdio: ['ignore', childOut, childErr]
})
```

但这块有个 **疑惑**，为什么我的 `close`、`exit` 以及 `stdout` 都没有触发，以至于不能拿到命令是否执行成功的最终结果，了解的同学可以评论区交流一下。

至此，在关闭应用之后，`app.asar` 就已经被替换为最新版本了，还差最后一步，更新本地配置文件里的 `hotVersion`，防止下次又去下载更新包了。

```
child.on('spawn', () => {
  log.info('子进程触发')
  updateHotVersion()
})

updateHotVersion() {
  fs.writeFileSync(localConfigFile, JSON.stringify({ hotVersion }, null, 2))
}
```

### 增量更新日志提示

既然之前提到的全量更新有日志说明，那增量更新可以不用，也应该需要具备这个能力，不然我们神不知鬼不觉帮用户更新了，用户都不知道 **新在哪里**。

至于更新内容，我们可以复用 `releaseInfo` 的 `releaseNotes` 字段，把更新日志写在这里，增量更新完成后展现给用户就好了。

但是总不能每次打开都展示，这里需要用户有个交互，比如点击 `知道了` 按钮，或者关闭 `Modal` 后，把当前的热更新版本号保存在本地配置文件，记录为 `logVersion`。在下次打开程序或者校验更新的时候，我们判断一下 `logVersion === hotVersion`，**若不同**，再去提示更新日志。

**日志版本** 校验和修改的代码如下所示：

```
checkLogVersion() {
  let needShowLog = false
  try {
    const configStr = fs.readFileSync(localConfigFile, 'utf8')
    const configData = JSON.parse(configStr || '{}')
    const { hotVersion, logVersion } = configData
    if (hotVersion !== logVersion) {
      log.info('日志版本与当前热更新版本不同，需要提示更新日志')
      needShowLog = true
    } else {
      log.info('日志已是最新版本，无需提示更新日志')
    }
  } catch (error) {
    log.error('读取配置文件失败', error)
  }
  return needShowLog
}

updateLogVersion() {
  try {
    const configStr = fs.readFileSync(localConfigFile, 'utf8')
    const configData = JSON.parse(configStr || '{}')
    const { hotVersion } = configData
    fs.writeFileSync(localConfigFile, JSON.stringify({ hotVersion, logVersion: hotVersion }, null, 2))
    log.info('日志版本已更新')
  } catch (error) {
    log.error('读取配置文件失败', error)
  }
}
```

读取 `config.json` 文件的方法自行封装一下，我这里就重复使用了。主进程 `ipcMain.on` 监听一下用户传递过来的事件，再去调用 `updateLogVersion` 即可，渲染进程效果如下：

**提示增量更新日志**

![image.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/9b6f4611f8fd42dd9c3999e3545696f5~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP6ZmI5ZCM5a2m5ZCX:q75.awebp?rk3s=f64ab15b\&x-expires=1742507621\&x-signature=%2Bcmd7rILlRWxCWqIc1HNxMD8zow%3D)

点击 `知道了` 后，再次打开应用后就不会提示日志了，因为本地配置文件已经被修改了。

![image.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/3e5fb9c069ec491c9ececdabf40f6286~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP6ZmI5ZCM5a2m5ZCX:q75.awebp?rk3s=f64ab15b\&x-expires=1742507621\&x-signature=7RCYaVWx1PH0IxBxxvyzwEhxE30%3D)

当然可能也有这么个场景，开发就改了一点点无关功能的代码，无需向用户展示日志，我们只需要加一个判断 `releaseNotes` 是否为空的逻辑就好了，也做到了 **静默更新**。

## 小结

### 不足之处

本文提出的增量更新方案应该算是比较简单的，可能并不适用于所有的场景，考虑也不够全面，例如：

1. `dll`、`第三方SDK` 等资源的更新。
2. 增量更新失败后应该通过全量更新 **兜底**。
3. 用户在使用过程中发布新版本，得等到 **第二次打开** 才能用到新版本。

### 流程图

针对本文的解决方案，我简单画了一个 **流程图**。

![未命名绘图.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/fc7e0ed6bd044433a0816eb864b68f4c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP6ZmI5ZCM5a2m5ZCX:q75.awebp?rk3s=f64ab15b\&x-expires=1742507621\&x-signature=uF7wHmzSPAcmu570%2FA1yiGz7Rww%3D)

### 参考文章

网上其实有不少关于 `Electron` 自动更新的文章，在做这个需求之前也是浏览了好多，但也有些没仔细看完，所以就躺在我的标签页没有关闭，在这罗列出来，也当作收藏了。

写这篇文章的目的也是为了记录和复盘，如果能为你提供一些思路那就再好不过了。

**鸣谢：**

1. [# Electron 增量更新（二）](https://link.juejin.cn/?target=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000039872331 "https://segmentfault.com/a/1190000039872331")
2. [# Electron 版本更新之增量更新、无感更新](https://link.juejin.cn/?target=https%3A%2F%2Fblog.csdn.net%2Fsxww_zyt%2Farticle%2Fdetails%2F131006833 "https://blog.csdn.net/sxww_zyt/article/details/131006833")
3. [# Electron+Vue 客户端一键生成多版本差分全资源增量更新包](https://link.juejin.cn/?target=https%3A%2F%2Fwww.toutiao.com%2Farticle%2F7343238355070829092%2F%3Fapp%3Dnews_article%26group_id%3D7343238355070829092%26req_id%3D20240307082219696F051D80500C4E833A%26share_token%3D28086D6D-A4AE-4981-9A82-1F9BA0CF0300%26timestamp%3D1709770940%26tt_from%3Dcopy_link%26use_new_style%3D1%26utm_campaign%3Dclient_share%26utm_medium%3Dtoutiao_ios%26utm_source%3Dcopy_link%26source%3Dm_redirect%26wid%3D1710924760217 "https://www.toutiao.com/article/7343238355070829092/?app=news_article\&group_id=7343238355070829092\&req_id=20240307082219696F051D80500C4E833A\&share_token=28086D6D-A4AE-4981-9A82-1F9BA0CF0300\&timestamp=1709770940\&tt_from=copy_link\&use_new_style=1\&utm_campaign=client_share\&utm_medium=toutiao_ios\&utm_source=copy_link\&source=m_redirect\&wid=1710924760217")
4. [# Electron 客户端场景化更新升级方案实践](https://link.juejin.cn/?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F94171579 "https://zhuanlan.zhihu.com/p/94171579")
5. [# Electron 热更新的最优实践](https://juejin.cn/user/448256474879341/posts "https://juejin.cn/user/448256474879341/posts")
6. [# 手撸 Electron 自动更新，再繁琐也要搞懂它](https://juejin.cn/post/7302724955700264999?searchId=202409191421048567AECEFE1BEA1187CC "https://juejin.cn/post/7302724955700264999?searchId=202409191421048567AECEFE1BEA1187CC")
7. [# 简单且详细地实现 Electron 自动更新（Auto Update）](https://juejin.cn/post/7320152980211499060?searchId=202409191344328F045C5D6CD2B40D3758 "https://juejin.cn/post/7320152980211499060?searchId=202409191344328F045C5D6CD2B40D3758")
8. [# Electron 打包优化 - 从 393MB 到 161MB](https://link.juejin.cn/?target=https%3A%2F%2Fcloud.tencent.com%2Fdeveloper%2Farticle%2F1547891 "https://cloud.tencent.com/developer/article/1547891")
