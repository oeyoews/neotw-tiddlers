<!---->

<!---->

<!---->

<!---->

### `安装pnpm`

你以前可能会使用如下命令安装 pnpm

```
npm i -g pnpm
```

对与 pnpm 用户来说，npm 是多余的，但是没有 npm 该如何安装 pnpm?

在 windows 下可以使用如下 powershell 命令安装 pnpm

```
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

如果有 shell 环境 (包括`mysys2`或`wsl`)

可以使用如下命令

curl

```
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

如果没有安装 curl，可以使用 wget：

```
wget -qO- https://get.pnpm.io/install.sh | sh -
```

然后就可以使用 [pnpm env](https://link.juejin.cn/?target=https%3A%2F%2Fwww.pnpm.cn%2Fcli%2Fenv "https://www.pnpm.cn/cli/env") 命令来安装 Node.js 了

### `管理node版本`

使用 lts 版本

```
pnpm env use --global lts
```

使用指定版本

```
pnpm env use --global 16
```

删除版本

```
pnpm env remove --global 14.0.0
```

查看本地所有版本

```
pnpm env list
```

ps:

> `通过非standalone方式下载的pnpm是不能管理node版本的`（比如用 homebrew 下载的 pnpm），会提示如下错误
>
> ERR\_PNPM\_CANNOT\_MANAGE\_NODE  Unable to manage Node.js because pnpm was not installed using the standalone installation script
>
> If you want to manage Node.js with pnpm, you need to remove any Node.js that was installed by other tools, then install pnpm using one of the standalone scripts that are provided on the installation page: [pnpm.io/installatio…](https://link.juejin.cn/?target=https%3A%2F%2Fpnpm.io%2Finstallation "https://pnpm.io/installation")

> nodejs 在 v16.13 后会通过 corepack 去管理 package 管理者，这是一个处于实验的特性。
>
> 如需使用 pnpm，需使用`corepack enable`开启 corepack
>
> 关闭 pnpm 则 corepack disable

> 有时候可能不小心用了多种方式安装 pnpm，
>
> 比如`npm install -g pnpm`， `brew install pnpm`， `curl -fsSL https://get.pnpm.io/install.sh | sh -` 等方式
>
> 可以通过 which pnpm 看当前使用的 pnpm 是什么方式，如果方式不是想用的方式，可到目录下删除 pnpm，

## 参考文章：[pnpm.io/installatio…](https://link.juejin.cn/?target=https%3A%2F%2Fpnpm.io%2Finstallation%23compatibility "https://pnpm.io/installation#compatibility")

本文收录于以下专栏

![cover](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95414745836549ce9143753e2a30facd~tplv-k3u1fbpfcp-jj:120:90:0:0:q75.avis)

<!---->

上一篇

由 create-react-app 过程慢引出的问题 npm 使用汇总
