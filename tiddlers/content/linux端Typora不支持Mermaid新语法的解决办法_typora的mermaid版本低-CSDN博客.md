#### []()文章目录

* * [概要](#_1)
  * [问题原因](#_4)
  * [解决方案](#_17)
  * * [步骤：](#_24)

### []()[]()概要

  最近使用 typora 编辑 markdown 文件的时候，发现能使用 mermaid 功能来画流程图或者结构图。但是，有些功能在本地的 typora 无法使用，在线上的[mermaid](https://mermaid.live/edit#pako:eNptU1Fr2zAY_CtCr4u7Zn0zjaEkhpWyrDTeYMMgpM-fHUEsqZK8LpT-90lynCbp3j7pznfnk_RKQTdIc-rweUAFuJK8s7yvVe354LUaeoE2rgy3XoI0XHnCCXdkOzhxM59fYiJiHoyMgNB_w9ybK7ikwYHWXwJuAphDz5znHiMFVZMykSwrik-E58E_2jNjtcADVBQZEXlyZxY76TxaZrT1CQcv_wQ1IlIyknQgH70-sBs850P0PdLbF9aFdMCNSyA5onuDENSc7E7E1jrIWNltPdFtpEUgK8yLZVbvkCxI9euxXLLN_frhVtjPxYg33PNzwqr8eb8sTyjGYov_UYmu78myY3Cp5HkZcGDFMqbqJpIYG01dp7M-IukD4nKSzmdBNusH9mN9V1V3y6_lijS443vWu8X1e4ZJHuRYHRwcpngA8_AH17MwfInDR5uw-_j9qWJP5aasLjxOjgvojPZoey6bcK9fa0VITf0We6xpHsYGWz7sfE1r9Rao8ZZv9gpo7u2AMzqYUPv0DKbNcDN_ax2WLd-5sMZGem2_jU8nvaC3fyVtIms)却能正常使用。\
  

### []()[]()问题原因

  主要原因在于本地 typora 使用的 mermaid 版本低于线上 mermaid 的版本，所以导致有些功能无法使用。\
  本地查看 mermaid 的版本的方法，如下:

> \`\`\`mermaid\
> info\
> \`\`\`

  用这种方式就能查看当前 markdown 编辑器的 mermaid 的版本是多少了，比如 CSDN 内置 mermaid, 如下显示：

  而目前 mermaid 的官方已经更新到**10.9.0**的版本，明显存在差异，这就导致 mermaid 的功能可能无法满足需求。

### []()[]()解决方案

  从上面分析到原因后，主要的问题在于如何更新 mermaid 的版本，在 typora 的安装目录下辗转反侧了很久，于是在网上查看了很多资料如：\
  转载：[Typora 不支持最新 Mermaid 语法的解决办法 - 郄郄私语 (qzy.im)](https://qzy.im/blog/2020/05/typora-integrate-the-latest-version-of-mermaid/)\
这位大神给出的方法，**解决了 windows 和 mac 端的问题，但是无法解决 linux 端的问题**\
  这里**主要给出 linux 端问题的解决方案**，windows 和 mac 就不再赘述，请移步观摩大神的文章。\
  本文中的方法对 linux 高版本的 1.xx 的 typora 也同样奏效：

#### []()[]()步骤：

**step 1：安装 npm 工具**\
  `sudo apt-get install npm`

**step 2：安装 asar 工具**\
  `sudo npm install -g asar --registry=https://registry.npm.taobao.org`

**step 3: 下载 mermaid 10.9.0 的版本**\
  `wget https://unpkg.com/mermaid@10.9.0/dist/mermaid.min.js`\
  具体的 mermaid 版本更新较快，可以更改 mermaid\@x.x.x 下载到对应的版本

**step 4: 跳转到 typora 安装目录，并解压 lib.asar**\
  typora 默认安装在 /usr/share/typora

```
# 根目录下文件夹操作需要root权限，这里直接一步到位进入到root
sudo su
cd /usr/share/typora/resources
asar extract lib.asar lib/

1
2
3
4
```

**step 6：替换新版 mermaid 的 js 文件**\
   这里使用软链接的方式替换的 mermaid.min.js，当然也可以用 cp 的指令来替换该文件。

```
# 根目录下文件夹操作需要root权限，这里直接一步到位进入到root
sudo su
cd /usr/share/typora/resources/lib/diagram
# 备份一下当前使用的mermaid以防typora无法使用新版mermaid
cp mermaid.min.js mermaid.min.js.bk
# 使用软链接的方式，新版mermaid文件的路径根据下载实际情况做调整v 8.14.0
ln -sf /xxx/xxx/xxx/10.9.0/mermaid.min.js mermaid.min.js

1
2
3
4
5
6
7
```

**step 5：修改 frame.js 接入 mermaid 的文件路径**

```
# 根目录下文件夹操作需要root权限，这里直接一步到位进入到root
sudo su
cd /usr/share/typora/resources
# 打开frame.js
vi appsrc/window/frame.js

1
2
3
4
5
```

查找 mermaid.min.js 如下：\
`n=File.isNode?"./lib.asar":"./lib",m.getScript(n+"/diagram/diagram.min.js",function(){m.get Script(n+"/diagram/mermaid.min.js",function()`\
可以看到这里的**n**我们使用 ".lib" 就行，所以修改为如下语句：\
`n="./lib",m.getScript(n+"/diagram/diagram.min.js",function(){m.get Script(n+"/diagram/mermaid.min.js",function()`\
这样就默认使用 lib 路径下的文件了。

  这样修改有一个好处就是后续如果我们想使用更新版本的 mermaid 时，直接替换 lib/diagram 下 mermaid.min,js 就行。\
且目前这样的修改是适用于所有版本 typora

如上步骤就实现了 typora 的 mermaid 版本更新，如下是我的 typora 更新完成后的结果：\
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/7dbeff4b4f771065cf41fc432d9e0703.png)
