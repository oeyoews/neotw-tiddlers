我只是知道 有一个[pnpm](https://so.csdn.net/so/search?q=pnpm\&spm=1001.2101.3001.7020)的这个包管理工具 但是从来没用过！

然后我就使用[npm 安装](https://so.csdn.net/so/search?q=npm%E5%AE%89%E8%A3%85\&spm=1001.2101.3001.7020)了下\
npm i -g pnpm

然后开始兴高采烈的使用\
pnpm i 进行依赖的安装

然后项目就跑不起来，我很奇怪 然后重新使用 npm i 走了遍发现可以正常运行

让我知道这肯定是 pnpm 的问题了，\
然后开始分析报错，报的都是依赖找不到的问题 就很奇怪\
我看到下面报错中 更多的都是依赖缺失

后面翻了翻 pnpm 的文档才发现 这玩意也需要配置一些东西 才生效

比如一些依赖可能在 node\_modules 根目录下 让所有的 依赖于它的依赖可以访问， 再其次就是自动默认安装缺失的依赖，还有就是依赖丢失或者找不到的话 命令自动失败

这些配置都是有开关的

配置文件名 .npmrc

```
shamefully-hoist=true
auto-install-peers=true
strict-peer-dependencies=false

1
2
3
```

然后删除 node\_modules 和那个 pnpm-lock.yaml 文件\
重新 pnpm install 就可以

关注我 持续更新前端知识
