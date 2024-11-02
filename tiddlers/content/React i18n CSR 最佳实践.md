## 基础配置

建立一个 i18n 配置文件，比如 `i18n.ts`。

随后在入口文件中引入。

那么这样就可以在项目中使用 i18n 了。

## 解决 TypeScript 类型问题

上面的代码虽然可以正常工作，但是在 TypeScript 中，你得不到任何类型检查以及智能提示。

那么，我们希望可以有一个类型安全的写法。

我们按照官网的推荐做法，可以把 resources 放到 `@types` 中，然后建立 `i18next.d.ts` 文件。

然后修改 `i18n.ts` 文件。

那么现在就有类型提示。

## 分离 namespace

当我们项目变得越来越大，我们就会发现，如果把所有的文字都放在一个文件里，会非常难维护。因此我们需要把文字拆分到不同的文件里。也就是 namespace。

在 Follow 中，目前为止，一共拆分了以下几个 namespace：

* `app` 应用相关
* `lang` 语言
* `external` 外部页面
* `settings` 设置
* `shortcuts` 快捷键
* `common` 通用

目录结构如下：

```
. locales
├── app
│   ├── en.json
│   ├── zh-CN.json
│   └── zh-TW.json
├── common
│   ├── en.json
│   ├── zh-CN.json
│   └── zh-TW.json
├── external
│   ├── en.json
│   ├── zh-CN.json
│   └── zh-TW.json
├── lang
│   ├── en.json
│   ├── zh-CN.json
│   └── zh-TW.json
├── settings
│   ├── en.json
│   ├── zh-CN.json
│   └── zh-TW.json
└── shortcuts
    ├── en.json
    ├── zh-CN.json
    └── zh-TW.json
```

这样拆分之后，我们只需要在上面的 `resources.d.ts` 中引入所有的语言文件即可。

## 按需加载语言

当我们引入了越来越多的语言，我们就会发现，打包之后的体积也会越来越大。而用户一般只会使用一种语言，因此我们希望可以按需加载语言。

但是其实 i18next 并没有内置按需加载的逻辑，因此我们需要自己实现。首先我们需要修改 `resource.ts` 文件。

这里我们除了英语是全量引入之外，其他语言都是按需引入。其次删除其他语言的大部分 namespace 资源，只保留 `common` 和 `lang` 两个 namespace。由于这两个 namespace 是通用模块的，并且大小也比较小，这里可以全量引入。在实际使用场景中，你也可以完全删除。比如：

类似上面，只有一个英语的资源。现在我们可以改改文件名，`resources.ts` 改成 `default-resources.ts`。其他的不变。

接下来我们来实现如何按需加载语言。

大概的思路是：

1. 通过 `import()` 去加载需要的语言资源的，然后使用 `i18n.addResourceBundle()` 去完成加载
2. 然后再次调用 `i18n.changeLanguage()` 去切换语言
3. 重新设置一个 `i18next` 实例，让组件重新渲染

创建一个 `I18nProvider` 去实现这个逻辑。

然后监听 i18n 语言变化。这里注意即便是目前没有相关的语言，`languageChanged` 也会触发。

这里注意，当语言加载完成之后，我们还需要重新调用 `i18next.changeLanguage()` 去切换语言。

## 在生产环境中合并 namespace 资源

在上面的例子中，我们拆分了多个 namespace 资源，但是在生产环境中，我们希望可以把所有的 namespace 资源合并成一个文件，这样可以减少网络请求的次数。

我们来写一个 Vite 插件，在生产环境中，把所有的 namespace 资源合并成一个文件。

然后在 `vite.config.ts` 中引入。

现在，打包之后的产物中，会生成一个 `locales` 目录，下面包含了所有的语言资源的合并后的文件。

![](https://object.innei.in/bed/2024/0915_1726383322853.png)

当然除了这个插件还不行，我们继续修改 `i18n-provider.tsx` 中的 `langChangedHandler` 方法。

区分开发环境和生产环境，在生产环境中使用 `import` 的方式加载语言资源，在开发环境中使用 `import.meta.glob` 的方式加载语言资源。

现在在生产环境中，测试切换语言，可以看到，只会请求一个文件。

![](https://object.innei.in/bed/2024/0915_1726383622073.png)

## 动态加载日期库的 i18n

同样的，我们也要兼顾日期库的 i18n。这里以 `dayjs` 为例。

我们需要维护一个 Dayjs 的国际化配置的 import 表。类似：

> 语言代码通过：<https://github.com/iamkun/dayjs/tree/dev/src/locale>** 获取

然后我们就可以在 `langChangedHandler` 中使用 `dayjsLocaleImportMap` 去加载对应的语言资源。

## DX 优化：HMR 支持

如果我们不做任何处理，在开发环境中，当我们修改任何语言资源文件的 json，都会导致页面完全重载。而不是实时看到修改后的文字。

我们可以写一个 Vite 插件去实现 HMR。

现在当我们修改任何语言资源文件的 json，都不会导致页面完全重载，Vite 的 HMR 处理逻辑已经被我们捕获了。那么现在我们需要去手动处理他。在上面的插件中，当 json 修改，我们会发送一个 `i18n-update` 事件，我们可以在 `i18n.ts` 中处理该事件。

在 `I18nProvider` 中监听该事件。

## 计算语言翻译完成度

由于我们使用了动态加载的语言资源，那么计算语言翻译完成度不能在运行时进行了，我们需要在编译时就计算出来。

我们来写一个计算方法。

然后在 Vite 中引入这个编译宏。

在业务中使用：

![](https://object.innei.in/bed/2024/0915_1726384668245.png)

## 扁平 Key 的处理

为了开发方便，我们一般让 i18n 的数据更加扁平。键值全部扁平处理，为了后续能够直接通过搜索找到对应的文案。

例如这样：

那么在实际业务中，按照模块去划分，这种方式会造成大量的重复前缀。

在「在生产环境中合并 namespace 资源」章节中提到，在生产中我们合并了 namespace，我们继续优化一下这个部分，让在生产中加载嵌套结构的 json 文件。

这里我们通过 `lodash.set` 方法让扁平数据结构转换为嵌套结构。

![](https://cdn.jsdelivr.net/gh/cupchino/fancy2024@main/2024/0919131849.png)

## 总结

上面我们实现了一个比较完整的 i18n 解决方案。

包括了：

* 全量引入
* 按需引入
* 动态加载
* 生产环境合并 namespace
* 计算语言翻译完成度
* HMR 支持

