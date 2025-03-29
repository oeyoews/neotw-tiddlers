> 本文作者：IMWeb laynechen 原文出处：[IMWeb 社区](https://cloud.tencent.com/developer/tools/blog-entry?target=http%3A%2F%2Fimweb.io%2Ftopic%2F5b9f500cc2ec8e6772f34d79\&objectId=1547891\&objectType=1\&isNewArticle=undefined) **未经同意，禁止转载**

在 [上一篇 (你不知道的 Electron (二)：了解 Electron 打包)](https://cloud.tencent.com/developer/tools/blog-entry?target=http%3A%2F%2Fimweb.io%2Ftopic%2F5b6817b5f6734fdf12b4b09c\&objectId=1547891\&objectType=1\&isNewArticle=undefined) 中对 `Electron` 应用是如何被打包成可执行文件进行了简单的介绍，并且谈到了默认情况下打包存在的问题。

这篇文章会对 `Electron` 打包进行更深入的了解，并且对谈到的一些问题进行解决。

## electron-builder 打包

简单回顾下 `Electron` 打包后的结果

#### 目录结构

我们的应用打包后的目录结构是这样的:

```
.
├── locales
│   ├── am.pak
│   └── ... 一堆的 pak 文件
├── resources
│   ├── app.asar (空项目只有 2KB，一个实际项目有 130MB+)
│   └── electron.asar (大小在 250KB 左右)
├── electron.exe (67.5MB)
└── ...
```

#### 关键文件说明

1. **app.asar**

将我们项目的代码进行打包后的文件。默认情况下会对我们的整个项目进行打包，包括需要使用到的在 `package.json` 中 `dependencies` 声明的包。

可以利用 asar 工具解压这个文件看下里面包含了什么。

1. **elecrton.asar**

`electron` 的 JS 部分代码。如提供 `remote`、`ipcMain`、`ipcRenderer` 等模块。

1. **electron.exe**

我们应用的主程序。一个事先就编译好的程序，功能就是运行 `resoruces/app.asar` 这个文件内所包含的项目代码。

## 如何正确打包

直接打包存在的问题

1. 体积大
2. 暴露源码

### 优化方向

从项目目录结构中可以看出，`electron.exe`、`electron.asar` 等文件是每个 `Electron` 应用都一样且必需的，因此我们可以优化的空间只是 `app.asar` 文件。

目前 `app.asar` 是将我们的项目整个打包，我们整个应用之所以大，原因在于 `node_modules` 文件夹特别大。因此我们要做的是我们的应用能否不打包 `node_modules` 文件夹，或者让需要打包的东西尽可能的少。

### 打包优化

#### 减少 `dependencies` 依赖

之所以需要打包 `dependencies` 中的依赖，是因为 `Electron` 是直接运行我们的源码，依赖引用的查找路径是从 `node_modules` 文件夹中查找。

**因此：**

优化应用程序体积 == 减少 `node_modules` 文件夹的大小 == 减少需要打包的依赖数量 == 减少 `dependencies` 中的依赖。

**如何减少 `dependencies` 中的依赖？**

如果我们将代码进行打包，将需要使用到的依赖直接打包进最终的文件，那就可以不需要再将 `node_modules` 打包进应用程序了。并且通过打包一方面可以减少应用的体积，另一方面也可以对我们的代码进行混淆，避免暴露我们的源码。

##### 视图层 (网页界面) 代码打包

这个和平时的网页项目一样，简单使用 `Webpack` 进行打包就好，大家都会的就不废话了～

当我们对视图层的代码打包之后，只有视图层需要用到的代码就不在需要打包进 `node_module` 文件夹中了。为了不让打包程序将这些只在视图层使用到的依赖打包进 `node_modules` 中，最简单的方式就是在 `package.json` 文件中将这部分依赖从 `dependencies` 中移动到 `devDependencies`（`electron-builder` 不会将 `devDependencies` 中的依赖打包进应用程序）。

（这样的话如果 `eslint` 配置了引用的依赖必须在 `denpendencies` 中声明的规则，则需要将其关闭）

##### 主进程 (Electron 层) 代码打包

使用 `Webpack` 对主进程的代码打包与普通网页打包基本是一致的。需要注意的是 `target` 需要设置为 `electron-main`。

详细看 `Webpack` 中对 `target` 字段的说明：[Webpack - Target](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Ftarget%2F\&objectId=1547891\&objectType=1\&isNewArticle=undefined)

#### 必须保留的 `dependencies` 依赖

当把上面的步骤都做好后，我们将 `node_modules` 从需要打包的文件列表中删除。但打包后会发现 `node_modules` 文件夹还是会被打包进最终的应用中。

实际上 `electron-builder` 保留 `node_modules` 是有原因的。我们使用 `Electron` 开发是为了可以实现跨平台，JS 代码借助 `Electron` 确实是可以实现跨平台，但有些 npm 包为了性能上或者其他因素的考虑，并非使用 JS 而是 C、C++ 来实现。这些包是需要根据平台来编译后才能使用。`electron-builder` 打包时也是在打包某个平台的版本时重新安装相对应平台的依赖包。

#### 双 `package.json` 项目结构

上面说到，为不不让 `electron-builder` 将运行时需要用到但是我们自己已经打包好的依赖放进 `node_modules` 里一起打包，我们是将那些依赖放进了 `devDependencies` 中，因为即使设置不打包 `node_modules` 还是会帮我们打包进我们的应用。

虽然将不需要打包的依赖放进 `devDependencies` 可以解决这个问题，但是不太优雅。

而 `electron-builder` 也提供了另外一种方式帮助我们更好的管理依赖：也就是双 `package.json` 项目结构。

##### 双 `packajson.json` 文件进行依赖管理

`electron-builder` 对双 `package.json` 的解释：[Two package.json Structure - electron-builder](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fwww.electron.build%2Ftutorials%2Ftwo-package-structure\&objectId=1547891\&objectType=1\&isNewArticle=undefined)

**双 `packajson.json` 具体是怎么样？**

1. 在原本的项目下新建一个需要打包的文件夹 `app`。

如果项目下有 `app` 文件夹，`electron-builder` 在打包时会以改文件夹为打包的根文件夹，即只会打包改文件夹下的文件。配置中设置的需要打包的文件 / 文件夹也是基于 `app` 文件夹来设置。如设置

```
"build": {
    "files": [
        "dist"
    ]
}
```

则只会打包 `app/dist` 这个文件夹下的内容。

1. `app` 文件夹下创建 `package.json` 文件

由于只会打包 `app` 下的文件，因此我们也需要在 `app` 文件夹下创建 `package.json` 文件，在该文件中配置我们应用的名称、版本、主进程入口文件等信息。

1. 依赖管理

接下来，我们可以把只在开发中使用到的依赖装在整个项目的根目录下，将需要打包的依赖 (与平台相关的或者运行时需要的依赖) 装在 `app` 文件夹下。因为现在打包工具不会打包除 `app` 文件夹外的文件，因此也不用担心安装在根目录下的 `dependencies` 依赖会被打包进去。

#### 进一步减少体积

将 `node_modules` 文件夹移除后相信我们的应用体积已经小了很多。不过这里还有个小技巧可以让我们的体积再小些。

如果我们没有使用到平台相关的依赖 (Native npm modules)，我们打包后的应用里是没有 `node_modules` 文件夹的，但是难免会使用到，这时候我们还是需要打包 `node_modules` 文件夹。而发布包的作者一般也不会只打包代码，可能也会打包一些 `README` 等一些打包后不需要用到的文件。这些文件可以通过 `yarn` 提供的 `autoclean` 功能进行清除：

```
# 初始化 yarn autoclean, 生成 .yarnclean 文件，和 .gitignore 一样，不过 .yarnclena 是声明需要清理的文件
yarn autoclean -I
# 清理
yarn autoclean -F
```

### 【参考资料】

* [electron-userland/electron-builder](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fgithub.com%2Felectron-userland%2Felectron-builder\&objectId=1547891\&objectType=1\&isNewArticle=undefined)
* [electron-userland/electron-packager](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fgithub.com%2Felectron-userland%2Felectron-packager\&objectId=1547891\&objectType=1\&isNewArticle=undefined)
* [Two package.json Structure - electron-builder](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fwww.electron.build%2Ftutorials%2Ftwo-package-structure\&objectId=1547891\&objectType=1\&isNewArticle=undefined)

本文参与 [腾讯云自媒体同步曝光计划](https://cloud.tencent.com/developer/support-plan)，分享自作者个人站点 / 博客。

原始发表：2018-09-17 ，

<!-- -->

如有侵权请联系 <cloudcommunity@tencent.com> 删除
