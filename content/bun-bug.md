:::warning 
<$iconify icon="devicon:bun" /> bun 1.0 虽然能用, 但是 bug 很多, 几乎没有么生态
:::

* 全局使用 bun 安装 vercel

`bun add --global vercel` 导致 vercel 安装了一个 4.8 的 typescript 在 ~/node_modules(bun 全局安装的目录在自动生成不理解, 为什么还有一个 ~/.bun/cache, 难道是为了全局自动安装吗, 是的, 不知道是不是又是硬链接)

tsconfig.json 自动使用的是 5.x 的配置 modduleresolution 是 bundler, 4.x 需要使用 node, 或者 nodenext, neovim 会自动找到全局的 typescript 的 types, 导致解析报错, vscode 之所以不报错, 是因为自己安装了最新的 typescript

