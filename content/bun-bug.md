* 全局使用bun 安装vercel

`bun add --global vercel` 导致vercel 安装了一个4.8的typescript 在 ~/node_modules(bun 全局安装的目录在自动生成不理解, 为什么还有一个 ~/.bun/cache, 难道是为了全局自动安装吗, 是的, 不知道是不是又是硬链接)

tsconfig.json 自动使用的是5.x的配置 modduleresolution是bundler, 4.x需要使用node, 或者nodenext, neovim 会自动找到全局的typescript的types, 导致解析报错, vscode 之所以不报错, 是因为自己安装了最新的typescript

