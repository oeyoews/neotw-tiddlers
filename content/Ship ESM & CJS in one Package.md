* [ESM & CJS  ESM 和 CJS](#esm-cjs)

* [Compatibility  兼容性](#compatibility)
  * [package.json  包.json](#package-json)

* [Bundling  捆绑](#bundling)

  * [tsup  TSUP 的](#tsup)

  * [unbuild  取消构建](#unbuild)

    * [Stubbing  存根](#stubbing)
    * [Bundleless Build  无捆绑构建](#bundleless-build)

* [Context Misalignment  上下文错位](#context-misalignment)

* [Verify your Packages  验证您的软件包](#verify-your-packages)

* [Final words  最后的话](#final-words)

## ESM & CJS  ESM 和 CJS

* ESM - [ECMAScript modules](https://nodejs.org/api/esm.html) ESM - ECMAScript 模块
* CJS - [CommonJS](https://nodejs.org/api/modules.html#modules-commonjs-modules) CJS - 通用 JS

In the past decade, due to the lack of a standard module system of JavaScript, CommonJS (a.k.a the `require('xxx')` and `module.exports` syntax) has been the way how Node.js and NPM packages work. Until 2015, when ECMAScript modules finally show up as the standard solution, the community start migrating to native ESM gradually.在过去的十年中，由于缺乏标准的 JavaScript 模块系统，CommonJS（又名和语法）一直是 Node.js `require('xxx')` 和 `module.exports` NPM 包的工作方式。直到 2015 年，当 ECMAScript 模块最终成为标准解决方案时，社区开始逐步迁移到原生 ESM。

```
// CJS
const circle = require('./circle.js')

console.log(`The area of a circle of radius 4 is ${circle.area(4)}`)
```

```
// ESM
import { area } from './circle.mjs'

console.log(`The area of a circle of radius 4 is ${area(4)}`)
```

ESM enables named exports, better static analysis, tree-shaking, browsers native support, and most importantly, as a standard, it’s basically the future of JavaScript.ESM 支持命名导出、更好的静态分析、摇树、浏览器原生支持，最重要的是，作为一个标准，它基本上是 JavaScript 的未来。

Experimental support of native ESM is introduced in Node.js v12, and stabilized in v12.22.0 and v14.17.0. As the end of 2021, many packages now ship in pure-ESM format, or CJS and ESM dual formats; meta-frameworks like [Nuxt 3](https://github.com/nuxt/framework) and [SvelteKit](https://github.com/sveltejs/kit) are now recommending users to use ESM-first environment.Node.js v12 中引入了对原生 ESM 的实验性支持，并在 v12.22.0 和 v14.17.0 中稳定下来。截至 2021 年底，许多软件包现在以纯 ESM 格式或 CJS 和 ESM 双格式发布;像 Nuxt 3 和 SvelteKit 这样的元框架现在建议用户使用 ESM 优先环境。

The overall migration of the ecosystem is still in progress, for most library authors, shipping dual formats is a safer and smoother way to have the goods from both worlds. In the rest of this blog post, I will show you why and how.生态系统的整体迁移仍在进行中，对于大多数图书馆作者来说，发布双格式是一种更安全、更顺畅的方式，可以同时拥有来自两个世界的商品。在这篇博文的其余部分，我将向您展示原因和方式。

## Compatibility  兼容性

If ESM is the better and the future, why don’t we all move to ESM then? Even though Node.js is smart enough to allow CJS and ESM packages to work together, the main blocker is that **you can’t use ESM packages in CJS**.如果 ESM 是更好的和未来的，那么我们为什么不都转向 ESM 呢？尽管 Node.js 足够智能，允许 CJS 和 ESM 包协同工作，但主要的障碍是您不能在 CJS 中使用 ESM 包。

If you do: 如果您这样做：

```
// in CJS
const pkg = require('esm-only-package')
```

you will receive the following error 您将收到以下错误

```
Error [ERR_REQUIRE_ESM]: require() of ES Module esm-only-package not supported.
```

The root cause is that ESM is asynchronous by nature, meaning you can’t import an async module in synchronous context that `require` is for. This commonly means **if you want to use ESM packages, you have to use ESM as well**. Only one exception is that you can use ESM package in CJS using [dynamic `import()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports):根本原因是 ESM 本质上是异步的，这意味着您无法在同步上下文 `require` 中导入异步模块。这通常意味着，如果要使用 ESM 包，也必须使用 ESM。唯一的例外是，您可以在 CJS 中使用 ESM 包，使用 dynamic `import()` ：

```
// in CJS
const { default: pkg } = await import('esm-only-package')
```

Since dynamic import will return a Promise, meaning all the sub-sequential callee need to be async as well (so call [Red Functions](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function/), or I prefer call it Async Infection). In some case it might work, but generally I won’t think this to be an easy approachable solution for users.由于动态导入将返回一个 Promise，这意味着所有子顺序被调用方也需要异步（因此调用 Red Functions，或者我更喜欢将其称为异步感染）。在某些情况下，它可能会起作用，但一般来说，我认为这对用户来说不是一个简单易行的解决方案。

On the other hand, if you are able to go with ESM directly, it would be much easier as `import` supports both ESM and CJS.另一方面，如果您能够直接使用 ESM，则会容易得多，因为 `import` 同时支持 ESM 和 CJS。

```
// in ESM
import { named } from 'esm-package'
import cjs from 'cjs-package'
```

Some packages now ship [pure-ESM packages](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) advocating the ecosystem to move from CJS to ESM. While this might be the "right thing to do", however, giving the fact that that majority of the ecosystem are still on CJS and the migration is not that easy, I found myself more lean to ship both CJS and ESM formats to make the transition smoother.一些软件包现在发布了纯 ESM 软件包，倡导生态系统从 CJS 迁移到 ESM。虽然这可能是“正确的做法”，但是，考虑到大多数生态系统仍在使用 CJS 并且迁移并不那么容易，我发现自己更倾向于同时发布 CJS 和 ESM 格式，以使过渡更加顺利。

### `package.json`

Luckily, Node allows you to have those two formats in a single package at the same time. With the new [`exports`](https://nodejs.org/api/packages.html#conditional-exports) field in `package.json`, you can now specify multiple entries to provide those formats conditionally. Node will resolve to the version based on user’s or downstream packages environment.幸运的是，Node 允许您同时将这两种格式放在一个包中。使用 中的新 `exports` 字段 `package.json` ，您现在可以指定多个条目以有条件地提供这些格式。节点将根据用户或下游包环境解析为版本。

```
{
  "name": "my-cool-package",
  "exports": {
    ".": {
      "require": "./index.cjs", // CJS
      "import": "./index.mjs" // ESM
    }
  }
}
```

## Bundling  捆绑

So now we have two copies of code with slightly different module syntax to maintain, duplicating them is of course not an ideal solution. At this point you might need to consider introducing some build tools or bundling process to build your code into multiple formats. This might remind you the nightmare of configuring complex Webpack or Rollup, well don’t worry, my mission today is to introduce you two awesome tools that make your life so much easier.因此，现在我们有两个代码副本，需要维护的模块语法略有不同，复制它们当然不是一个理想的解决方案。此时，您可能需要考虑引入一些构建工具或捆绑过程，以将代码构建为多种格式。这可能会让你想起配置复杂的 Webpack 或 Rollup 的噩梦，别担心，我今天的任务是向您介绍两个很棒的工具，它们让您的生活变得更加轻松。

* [`tsup`](#tsup)
* [`unbuild`](#unbuild)

### tsup  TSUP 的

[`tsup`](https://github.com/egoist/tsup) by [@egoist](https://github.com/egoist) is one of my most used tools. The features zero-config building for TypeScript project. The usage is like:`tsup` by @egoist 是我最常用的工具之一。特点是 TypeScript 项目的零配置构建。用法如下：

```
$ tsup src/index.ts
```

And then you will have `dist/index.js` file ready for you to publish.然后，您将准备好 `dist/index.js` 文件供您发布。

To support dual formats, it’s just a flag away:要支持双格式，只需一旗即可：

```
$ tsup src/index.ts --format cjs,esm
```

Two files `dist/index.js` and `dist/index.mjs` will be generated with it and you are good to go. Powered by [`esbuild`](https://github.com/evanw/esbuild), `tsup` is not only super easy to use but also incredible fast. I highly recommend to give it a try.两个文件 `dist/index.js` ， `dist/index.mjs` 将与它一起生成，您就可以开始了。Powered by `esbuild` ，不仅超级易于使用， `tsup` 而且速度快得令人难以置信。我强烈建议您尝试一下。

Here is my go-to template of `package.json` using `tsup`:这是我 `package.json` 使用 `tsup` 的首选模板：

```
{
  "name": "my-cool-package",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "require": "./dist/index.js",
      "import": "./dist/index.mjs",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts --clean",
    "watch": "npm run build -- --watch src",
    "prepublishOnly": "npm run build"
  }
}
```

### unbuild  取消构建

If we say `tsup` is a minimal bundler for TypeScript, [`unbuild`](https://github.com/unjs/unbuild) by the [@unjs org](https://github.com/unjs) is a more generalized, customizable and yet powerful. `unbuild` is being used to bundle Nuxt 3 and it’s sub packages.如果我们说 `tsup` 是 TypeScript 的最小打包器， `unbuild` 那么 @unjs 组织是一个更通用、可定制且功能更强大的组织。 `unbuild` 用于捆绑 Nuxt 3 及其子包。

To use it, we create `build.config.ts` file in the root 为了使用它，我们在根目录中创建 `build.config.ts` 文件

```
// build.config.ts
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index'
  ],
  declaration: true, // generate .d.ts files
})
```

and run the `unbuild` command:并运行以下 `unbuild` 命令：

```
$ unbuild
```

`unbuild` will generate both ESM and CJS for you by default!`unbuild` 默认情况下会为您生成 ESM 和 CJS！

#### Stubbing  存根

This is one of the most incredible things that I have found when I first looked into [Nuxt 3’s codebase](https://github.com/nuxt/framework). `unbuild` introduced a new idea called Stubbing. Instead of firing up a watcher to re-trigger the bundling every time you made changes to the source code, the stubbing in `unbuild` (so call Passive watcher) does not require you are have another process for that at all. By calling the following command **only once**:这是我第一次研究 Nuxt 3 的代码库时发现的最不可思议的事情之一。 `unbuild` 引入了一个名为 Stubbing 的新想法。每次对源代码进行更改时，都不会启动观察器来重新触发捆绑，而是存 `unbuild` 根（因此称为被动观察器）根本不需要您有另一个过程。通过仅调用以下命令一次：

```
$ unbuild --stub
```

You are able to play and test out with your library with the up-to-date code! 您可以使用最新的代码使用您的库进行游戏和测试！

Want to know the magic? After running the stubbing command, you can check out the generated distribution files:想知道它的魔力吗？运行 stubbing 命令后，您可以签出生成的分发文件：

```
// dist/index.mjs
import jiti from 'jiti'

export default jiti(null, { interopDefault: true })('/Users/antfu/unbuild-test/src/index')
```

```
// dist/index.cjs
module.exports = require('jiti')(null, { interopDefault: true })('/Users/antfu/unbuild-test/src/index')
```

Instead of the distribution of your code bundle, the dist files are now redirecting to your source code with a wrap of [`jiti`](https://github.com/unjs/jiti) - another treasure hidden in the [@unjs](https://github.com/unjs) org. `jiti` provides the runtime support of TypeScript, ESM for Node by transpiling the modules on the fly. Since it directly goes to your source files, there won’t be a misalignment between your source code and bundle dist - thus there is no watcher process needed! This is a huge DX bump for library authors, if you still not getting it, you shall definitely grab it down and play with it yourself.dist 文件现在不是分发您的代码包，而是重定向到您的源代码，并包装 `jiti` - 隐藏在 @unjs 组织中的另一个宝藏。通过动态转译模块来提供 TypeScript 的运行时支持，ESM for Node。 `jiti` 由于它直接转到您的源文件，因此您的源代码和 bundle dist 之间不会出现错位 - 因此不需要观察程序进程！对于图书馆作者来说，这是一个巨大的 DX 颠簸，如果你仍然没有得到它，你一定要抓住它自己玩它。

#### Bundleless Build  无捆绑构建

Powered by [`mkdist`](https://github.com/unjs/mkdist) - another [@unjs](https://github.com/unjs) package - `unbuild` also handles static assets and file-to-file transpiling. Bundleless build allows you to keep the structure of your source code, made easy for importing submodules on-demand to optimizing performance and more.Powered by `mkdist` - 另一个@unjs 包 - `unbuild` 还处理静态资产和文件到文件转译。无捆绑构建允许您保留源代码的结构，从而轻松按需导入子模块以优化性能等。

Config in `unbuild` will look like:中的 `unbuild` 配置如下所示：

```
// build.config.ts
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    // bundling
    'src/index',
    // bundleless, or just copy assets
    { input: 'src/components/', outDir: 'dist/components' },
  ],
  declaration: true,
})
```

One of the coolest features on this is that it handles `.vue` file out-of-box. For example, if I have a component `MyComponent.vue` under `src/components` with following content:最酷的功能之一是它可以开箱即用 `.vue` 地处理文件。例如，如果我有一个包含以下内容的 `src/components` 组件 `MyComponent.vue` ：

```
<!-- src/components/MyComponent.vue -->
<template>
  <div>{{ count }}</div>
</template>

<script lang="ts">
  const count: number | string = 0

  export default {
    data: () => ({ count }),
  }
</script>
```

Notice that we are using TypeScript in the Vue file, when we do the build, the component will be copied over but with the TypeScript annotation removed along with a `MyComponent.vue.d.ts` generated.请注意，我们在 Vue 文件中使用了 TypeScript，当我们进行构建时，组件将被复制过来，但 TypeScript 注解会与 `MyComponent.vue.d.ts` 生成的

```
<!-- dist/components/MyComponent.vue -->
<template>
  <div>{{ count }}</div>
</template>

<script>
  const count = 0
  export default {
    data: () => ({ count }),
  }
</script>
```

```
// dist/components/MyComponent.vue.d.ts
declare const _default: {
  data: () => {
    count: number | string
  }
}
export default _default
```

This way this allows you to use TypeScript in development while not requiring consumers to also have TypeScript in their setup.这样一来，你就可以在开发中使用 TypeScript，同时不需要使用者在他们的设置中也安装 TypeScript。

P.S. `unbuild` is working on providing better out-of-box experience by auto infering the entries in `package.json`, [learn more](https://github.com/unjs/unbuild/issues/3).P.S. `unbuild` 正在努力通过自动推断条目 `package.json` 来提供更好的开箱即用体验，了解更多信息。

## Context Misalignment  上下文错位

With either of the tools mentioned above, now we are able to write TypeScript as the single source of truth and made the overall codebase easier to maintain. However, there are still some caveats that you will need to keep an eye on it.使用上面提到的任何一种工具，现在我们能够将 TypeScript 编写为单一事实来源，并使整个代码库更易于维护。但是，您仍然需要注意一些注意事项。

**In ESM, there is NO `__dirname`, `__filename`, `require`, `require.resolve`**. Instead, you will need to use `import.meta.url` and also do some convertion to get the file path string.在 ESM 中，没有、 、 `require` 、 `__filename` `__dirname` `require.resolve` 。相反，您将需要使用 `import.meta.url` 并进行一些转换来获取文件路径字符串。

So since our code will be compiled to both CJS and ESM, it’s better to avoiding using those environment specific context whenever possible. If you do need them, you can refer to my note about [Isomorphic `__dirname`](https://antfu.me/posts/isomorphic-dirname):因此，由于我们的代码将同时编译为 CJS 和 ESM，因此最好尽可能避免使用这些特定于环境的上下文。如果你确实需要它们，你可以参考我关于同构的笔记 `__dirname` ：

```
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const _dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : dirname(fileURLToPath(import.meta.url))
```

For `require` and `require.resolve`, you can use 对于 `require` 和 `require.resolve` ，您可以使用

```
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
```

Some good news, if you are using `unbuild`, you can turn on the `cjsBridge` flag and `unbuild` will shims those CJS context in ESM automatically for you!.一些好消息，如果你正在使用 `unbuild` ，你可以打开标志， `cjsBridge` 并 `unbuild` 会自动为你在 ESM 中填充这些 CJS 上下文！

```
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  cjsBridge: true, // <--
})
```

On the other hand, if you are using `tsup`, it will shims ESM’s `import.meta.url` for you in CJS instead.另一方面，如果您正在使用 `tsup` ，它将在 CJS 中 `import.meta.url` 为您填充 ESM。

## Verify your Packages  验证您的软件包

Once your published your package, you can verify if it follows the best practices using [publint.dev](https://publint.dev/) made by [@bluwy](https://github.com/bluwy). It will also give you suggestions of how to improve them further.发布包后，可以使用@bluwy 制作的 publint.dev 验证它是否遵循最佳实践。它还将为您提供有关如何进一步改进它们的建议。

## Final words  最后的话

This blog post showcased you only a few features of both tools. Do check their docs for more details. And hope you find these setups useful for building your own libraries. If you have any comments or suggestions, ping me on Twitter [@antfu7](https://twitter.com/antfu7). Happy hacking! 这篇博文仅向您展示了这两种工具的一些功能。请查看他们的文档以获取更多详细信息。希望您发现这些设置对构建自己的库有用。如果您有任何意见或建议，请在 Twitter @antfu7 上联系我。祝您黑客愉快！
