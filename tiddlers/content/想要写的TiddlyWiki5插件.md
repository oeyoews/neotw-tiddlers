:::warning
不再更新
:::

:::info
🔌 (即将) 想要写的 TiddlyWiki5 插件; 仅作为个人练习记录，无意优化 TiddlyWiki5 的使用体验，如果有那就算是无意的吧 😄
:::


## TODO

:::todo
- [ ] 图片上传插件： smms, or github, gitlab
- [ ]  图片复制： 支持重命名， 多文件， 预览
- [ ] support `tiddlywiki --init oeyoews`
- [ ] add dplayer(很少用到，目前不做)
- [ ] 构建输出的时候如果有大文件图片，就输出警告
- [ ] slugify plugin: 优化链接
- [x] 默认不出现红框，而是提示界面，点击显示具体错误
- [ ] for two thousands tiddler, daylight plugins will be slow to automatcially switch mode
- [ ] 自动预览导入内容或者图片，选择是否需要修改名字
- [ ] 使用单独布局，https://github.com/casualwriter/vanilla- [x] chatgpt 模仿官网 ui
- [ ] https://tiddlywiki.com/editions/translators/
- [ ] tm-modal to write tiddler link notion
- [x] 盘古插件 neotw-pangu: 格式化文本，符合基本中文习惯，空格空行逗号处理
- [ ] 文章标题支持 fold
- [ ] autolist plugin
- [ ] 浮动目录 (markdown)
- [ ] 所见即所得 (个人并不是其爱好者，更喜欢所写即所见)
- [ ] 双链插件 链出/入 icon
- [x] 看板插件
- [ ] 整屏滑动页面
- [x] 结合 motion 插件和 commandpalette 插件
- [ ] grayscale page plugin
- [ ] 可拖动 tiddler, 调整顺序
- [ ] 全文输出 Rss 插件
- [x] 全文搜索插件
- [x] 日间模式插件
- [ ] Tiddlywiki LSP
- [ ] 插件更新提示插件
- [ ] 类 vscode 插件商店
- [ ] 工作区切换插件; 多故事河管理
- [ ] breadcrumbs
- [ ] layouts 搜索菜单
- [ ] topbar to leftbar just like itab homepage
:::

## Ing

:::info
- [ ] update toggle sidebar position icon and effects
:::

## DONE

:::example
- [x] 时钟翻页效果 https://www.qireader.com.cn/tags/!readlater/entries/2pWeqXJNm71VrbXM
:::

## 写插件遇到的一些问题

- [ ] pageControl 会把有颜色的图标变成黑白的
- [ ] 启动时使用别的 layout, 切换到主 layout 后 topbar 消失
- [ ] 某些 widget 的条目出现在故事河如果刷新，widget 会渲染两次
- [ ] filter 在页面滚动时会进行刷新
```plain
<!-- tags: $:/tags/Macro -->

<!-- This macro will cause twice refresh -->

\define publishFilter()
-[!is[system]publish[no]]
\end
```