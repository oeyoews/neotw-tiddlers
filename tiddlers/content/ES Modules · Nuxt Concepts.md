<!--[-->This guide helps explain what ES Modules are and how to make a Nuxt app (or upstream library) compatible with ESM. 本指南有助于解释什么是 ES 模块，以及如何使 Nuxt 应用程序（或上游库）与 ESM 兼容。<!--]-->

### [<!--[-->CommonJS Modules CommonJS 模块<!--]-->](https://nuxt.com/docs/guide/concepts/esm#commonjs-modules)

<!--[-->CommonJS (CJS) is a format introduced by Node.js that allows sharing functionality between isolated JavaScript modules ([<!--[-->read more<!--]-->](https://nodejs.org/api/modules.html)). You might be already familiar with this syntax:CommonJS （CJS） 是 Node.js 引入的一种格式，它允许在隔离的 JavaScript 模块之间共享功能（阅读更多）。您可能已经熟悉以下语法：<!--]-->

<!---->

<!--[-->

```
const a = require('./a')

module.exports.a = a
```

<!--]-->

<!--[-->Bundlers like webpack and Rollup support this syntax and allow you to use modules written in CommonJS in the browser. 像 webpack 和 Rollup 这样的打包器支持这种语法，并允许您在浏览器中使用用 CommonJS 编写的模块。<!--]-->

### [<!--[-->ESM Syntax ESM 语法<!--]-->](https://nuxt.com/docs/guide/concepts/esm#esm-syntax)

<!--[-->Most of the time, when people talk about ESM vs CJS, they are talking about a different syntax for writing [<!--[-->modules<!--]-->](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules). 大多数时候，当人们谈论 ESM 与 CJS 时，他们谈论的是编写模块的不同语法。<!--]-->

<!---->

<!--[-->

```
import a from './a'

export { a }
```

<!--]-->

<!--[-->Before ECMAScript Modules (ESM) became a standard (it took more than 10 years!), tooling like [<!--[-->webpack<!--]-->](https://webpack.js.org/guides/ecma-script-modules) and even languages like TypeScript started supporting so-called **<!--[-->ESM syntax<!--]-->**. However, there are some key differences with actual spec; here's [<!--[-->a helpful explainer<!--]-->](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive). 在 ECMAScript 模块 （ESM） 成为标准之前（花了 10 多年时间！），像 webpack 这样的工具，甚至像 TypeScript 这样的语言都开始支持所谓的 ESM 语法。但是，与实际规格存在一些关键差异；这里有一个有用的解释器。<!--]-->

### [<!--[-->What is 'Native' ESM? 什么是 “原生” ESM？<!--]-->](https://nuxt.com/docs/guide/concepts/esm#what-is-native-esm)

<!--[-->You may have been writing your app using ESM syntax for a long time. After all, it's natively supported by the browser, and in Nuxt 2 we compiled all the code you wrote to the appropriate format (CJS for server, ESM for browser). 您可能已经使用 ESM 语法编写应用很长时间了。毕竟，浏览器原生支持它，在 Nuxt 2 中，我们将您编写的所有代码编译为适当的格式（服务器为 CJS，浏览器为 ESM）。<!--]-->

<!--[-->When adding modules to your package, things were a little different. A sample library might expose both CJS and ESM versions, and let us pick which one we wanted: 在将模块添加到软件包时，情况略有不同。示例库可能会同时公开 CJS 和 ESM 版本，让我们选择我们想要的版本：<!--]-->

<!---->

<!--[-->

```
{
  "name": "sample-library",
  "main": "dist/sample-library.cjs.js",
  "module": "dist/sample-library.esm.js"
}
```

<!--]-->

<!--[-->So in Nuxt 2, the bundler (webpack) would pull in the CJS file ('main') for the server build and use the ESM file ('module') for the client build. 因此，在 Nuxt 2 中，打包器（webpack）将拉入 CJS 文件（'main'）进行服务器构建，并使用 ESM 文件（'module'）进行客户端构建。<!--]-->

<!--[-->However, in recent Node.js LTS releases, it is now possible to [<!--[-->use native ESM module<!--]-->](https://nodejs.org/api/esm.html) within Node.js. That means that Node.js itself can process JavaScript using ESM syntax, although it doesn't do it by default. The two most common ways to enable ESM syntax are: 但是，在最近的 Node.js LTS 版本中，现在可以在 Node.js 中使用本机 ESM 模块。这意味着 Node.js 本身可以使用 ESM 语法处理 JavaScript，尽管它默认不这样做。启用 ESM 语法的两种最常见方法是：<!--]-->

* <!--[-->
  <!--[-->
  set `"type": "module"` within your `package.json` and keep using `.js` extension 在您的 `package.json` 扩展程序中设置 `"type": "module"` 并继续使用 `.js`
  <!--]-->
* <!--[-->
  use the `.mjs` file extensions (recommended) 使用 `.mjs` 文件扩展名（推荐）
  <!--]-->
  <!--]-->

<!--[-->This is what we do for Nuxt Nitro; we output a `.output/server/index.mjs` file. That tells Node.js to treat this file as a native ES module. 这就是我们为 Nuxt Nitro 所做的；我们输出一个 `.output/server/index.mjs` 文件。这告诉 Node.js 将此文件视为本机 ES 模块。<!--]-->

### [<!--[-->What Are Valid Imports in a Node.js Context? 在 Node.js 上下文中，什么是有效导入？<!--]-->](https://nuxt.com/docs/guide/concepts/esm#what-are-valid-imports-in-a-nodejs-context)

<!--[-->When you `import` a module rather than `require` it, Node.js resolves it differently. For example, when you import `sample-library`, Node.js will look not for the `main` but for the `exports` or `module` entry in that library's `package.json`. 当你 `import` 是一个模块而不是 `require` 它时，Node.js 以不同的方式解析它。例如，当您导入 `sample-library` 时，Node.js 不会查找 `main` 该库的 `exports` `package.json` . `module`<!--]-->

<!--[-->This is also true of dynamic imports, like `const b = await import('sample-library')`. 动态导入也是如此，例如 `const b = await import('sample-library')` .<!--]-->

<!--[-->Node supports the following kinds of imports (see [<!--[-->docs<!--]-->](https://nodejs.org/api/packages.html#determining-module-system)):Node 支持以下类型的导入（请参阅文档）：<!--]-->

1. <!--[-->
   <!--[-->
   files ending in `.mjs` - these are expected to use ESM syntax 以 - 结尾的文件 `.mjs` 应使用 ESM 语法
   <!--]-->
2. <!--[-->
   files ending in `.cjs` - these are expected to use CJS syntax 以 `.cjs` - 结尾的文件应使用 CJS 语法
   <!--]-->
3. <!--[-->
   files ending in `.js` - these are expected to use CJS syntax unless their `package.json` has `"type": "module"`以 `.js` - 结尾的文件应使用 CJS 语法，除非它们 `package.json` 有 `"type": "module"`
   <!--]-->
   <!--]-->

### [<!--[-->What Kinds of Problems Can There Be? 会有什么问题？<!--]-->](https://nuxt.com/docs/guide/concepts/esm#what-kinds-of-problems-can-there-be)

<!--[-->For a long time module authors have been producing ESM-syntax builds but using conventions like `.esm.js` or `.es.js`, which they have added to the `module` field in their `package.json`. This hasn't been a problem until now because they have only been used by bundlers like webpack, which don't especially care about the file extension. 很长一段时间以来，模块作者一直在生成 ESM 语法构建，但使用像 或 `.es.js` 这样的 `.esm.js` 约定，他们已将其添加到 `module` 他们的 `package.json` . 直到现在，这还不是问题，因为它们只被像 webpack 这样的打包器使用，它们并不特别关心文件扩展名。<!--]-->

<!--[-->However, if you try to import a package with an `.esm.js` file in a Node.js ESM context, it won't work, and you'll get an error like: 但是，如果您尝试导入包含 `.esm.js` Node.js ESM 上下文中的文件的包，它将不起作用，并且会收到如下错误：<!--]-->

<!--[-->

```
(node:22145) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
/path/to/index.js:1

export default {}
^^^^^^

SyntaxError: Unexpected token 'export'
    at wrapSafe (internal/modules/cjs/loader.js:1001:16)
    at Module._compile (internal/modules/cjs/loader.js:1049:27)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1114:10)
    ....
    at async Object.loadESM (internal/process/esm_loader.js:68:5)
```

<!--]-->

<!--[-->You might also get this error if you have a named import from an ESM-syntax build that Node.js thinks is CJS: 如果您从 ESM 语法版本中 Node.js 认为是 CJS 的命名导入，则也可能收到此错误：<!--]-->

<!--[-->

```
file:///path/to/index.mjs:5
import { named } from 'sample-library'
         ^^^^^
SyntaxError: Named export 'named' not found. The requested module 'sample-library' is a CommonJS module, which may not support all module.exports as named exports.

CommonJS modules can always be imported via the default export, for example using:

import pkg from 'sample-library';
const { named } = pkg;

    at ModuleJob._instantiate (internal/modules/esm/module_job.js:120:21)
    at async ModuleJob.run (internal/modules/esm/module_job.js:165:5)
    at async Loader.import (internal/modules/esm/loader.js:177:24)
    at async Object.loadESM (internal/process/esm_loader.js:68:5)
```

<!--]-->

<!--[-->If you encounter these errors, the issue is almost certainly with the upstream library. They need to [<!--[-->fix their library<!--]-->](https://nuxt.com/docs/guide/concepts/esm#library-author-guide) to support being imported by Node. 如果遇到这些错误，几乎可以肯定问题出在上游库上。他们需要修复他们的库以支持 Node 导入。<!--]-->

### [<!--[-->Transpiling Libraries 转译库<!--]-->](https://nuxt.com/docs/guide/concepts/esm#transpiling-libraries)

<!--[-->In the meantime, you can tell Nuxt not to try to import these libraries by adding them to `build.transpile`: 同时，你可以告诉 Nuxt 不要尝试导入这些库，将它们添加到 `build.transpile` ：<!--]-->

<!---->

<!--[-->

```
export default 

defineNuxtConfig

({
  

build

: {
    

transpile

: ['sample-library']
  }
})
```

<!--]-->

<!--[-->You may find that you *<!--[-->also<!--]-->* need to add other packages that are being imported by these libraries. 您可能会发现，您还需要添加这些库正在导入的其他包。<!--]-->

### [<!--[-->Aliasing Libraries 别名库<!--]-->](https://nuxt.com/docs/guide/concepts/esm#aliasing-libraries)

<!--[-->In some cases, you may also need to manually alias the library to the CJS version, for example: 在某些情况下，您可能还需要手动将库别名设置为 CJS 版本，例如：<!--]-->

<!---->

<!--[-->

```
export default 

defineNuxtConfig

({
  

alias

: {
    'sample-library': 'sample-library/dist/sample-library.cjs.js'
  }
})
```

<!--]-->

### [<!--[-->Default Exports 默认导出<!--]-->](https://nuxt.com/docs/guide/concepts/esm#default-exports)

<!--[-->A dependency with CommonJS format, can use `module.exports` or `exports` to provide a default export: 具有 CommonJS 格式的依赖项可以使用 `module.exports` 或 `exports` 提供默认导出：<!--]-->

node\_modules/cjs-pkg/index.js

<!--[-->

```
module.exports = { test: 123 }
// or
exports.test = 123
```

<!--]-->

<!--[-->This normally works well if we `require` such dependency: 如果我们 `require` 这样的依赖，这通常很有效：<!--]-->

<!--[-->

```
const pkg = require('cjs-pkg')

console.log(pkg) // { test: 123 }
```

<!--]-->

<!--[-->[<!--[-->Node.js in native ESM mode<!--]-->](https://nodejs.org/api/esm.html#interoperability-with-commonjs), [<!--[-->typescript with `esModuleInterop` enabled<!--]-->](https://www.typescriptlang.org/tsconfig#esModuleInterop) and bundlers such as webpack, provide a compatibility mechanism so that we can default import such library. This mechanism is often referred to as "interop require default":Node.js 原生 ESM 模式下，启用的 `esModuleInterop` 打字稿和捆绑器（如 webpack）提供了兼容机制，以便我们可以默认导入此类库。这种机制通常被称为 “interop require default”：<!--]-->

<!---->

<!--[-->

```
import pkg from 'cjs-pkg'

console.log(pkg) // { test: 123 }
```

<!--]-->

<!--[-->However, because of the complexities of syntax detection and different bundle formats, there is always a chance that the interop default fails and we end up with something like this: 但是，由于语法检测的复杂性和不同的捆绑包格式，互操作默认值总是有可能失败，我们最终会得到这样的结果：<!--]-->

<!---->

<!--[-->

```
import pkg from 'cjs-pkg'

console.log(pkg) // { default: { test: 123 } }
```

<!--]-->

<!--[-->Also when using dynamic import syntax (in both CJS and ESM files), we always have this situation: 此外，当使用动态导入语法（在 CJS 和 ESM 文件中）时，我们总是会遇到这种情况：<!--]-->

<!---->

<!--[-->

```
import('cjs-pkg').then(console.log) // [Module: null prototype] { default: { test: '123' } }
```

<!--]-->

<!--[-->In this case, we need to manually interop the default export: 在这种情况下，我们需要手动互操作默认导出：<!--]-->

<!---->

<!--[-->

```
// Static import
import { default as pkg } from 'cjs-pkg'

// Dynamic import
import('cjs-pkg').then(m => m.default || m).then(console.log)
```

<!--]-->

<!--[-->For handling more complex situations and more safety, we recommend and internally use [<!--[-->mlly<!--]-->](https://github.com/unjs/mlly) in Nuxt 3 that can preserve named exports. 为了处理更复杂的情况和更高的安全性，我们建议在 Nuxt 3 中内部使用 mlly，它可以保留命名导出。<!--]-->

<!---->

<!--[-->

```
import { interopDefault } from 'mlly'

// Assuming the shape is { default: { foo: 'bar' }, baz: 'qux' }
import myModule from 'my-module'

console.log(interopDefault(myModule)) // { foo: 'bar', baz: 'qux' }
```

<!--]-->

<!--[-->The good news is that it's relatively simple to fix issues of ESM compatibility. There are two main options:<!--]-->

1. <!--[-->
   <!--[-->
   **<!--[-->You can rename your ESM files to end with `.mjs`.<!--]-->**\
   *<!--[-->This is the recommended and simplest approach.<!--]-->* You may have to sort out issues with your library's dependencies and possibly with your build system, but in most cases, this should fix the problem for you. It's also recommended to rename your CJS files to end with `.cjs`, for the greatest explicitness.
   <!--]-->
2. <!--[-->
   **<!--[-->You can opt to make your entire library ESM-only<!--]-->**.\
   This would mean setting `"type": "module"` in your `package.json` and ensuring that your built library uses ESM syntax. However, you may face issues with your dependencies - and this approach means your library can *<!--[-->only<!--]-->* be consumed in an ESM context.
   <!--]-->
   <!--]-->

### [<!--[-->Migration<!--]-->](https://nuxt.com/docs/guide/concepts/esm#migration)

<!--[-->The initial step from CJS to ESM is updating any usage of `require` to use `import` instead:<!--]-->

<!---->

<!--[-->

```
module.exports = ...

exports.hello = ...
```

<!--]-->

<!---->

<!--[-->

```
const myLib = require('my-lib')
```

<!--]-->

<!--[-->In ESM Modules, unlike CJS, `require`, `require.resolve`, `__filename` and `__dirname` globals are not available and should be replaced with `import()` and `import.meta.filename`.<!--]-->

<!---->

<!--[-->

```
import { join } from 'path'

const newDir = join(__dirname, 'new-dir')
```

<!--]-->

<!---->

<!--[-->

```
const someFile = require.resolve('./lib/foo.js')
```

<!--]-->

### [<!--[-->Best Practices<!--]-->](https://nuxt.com/docs/guide/concepts/esm#best-practices)

* <!--[-->
  <!--[-->
  Prefer named exports rather than default export. This helps reduce CJS conflicts. (see
  <!--[-->
  [Default exports](https://nuxt.com/docs/guide/concepts/esm#default-exports)
  <!--]-->
  section)
  <!--]-->
* <!--[-->
  Avoid depending on Node.js built-ins and CommonJS or Node.js-only dependencies as much as possible to make your library usable in Browsers and Edge Workers without needing Nitro polyfills.
  <!--]-->
* <!--[-->
  Use new `exports` field with conditional exports. (
  <!--[-->
  [read more](https://nodejs.org/api/packages.html#conditional-exports)
  <!--]-->
  ).
  <!--]-->
  <!--]-->

<!---->

<!--[-->

```
{
  "exports": {
    ".": {
      "import": "./dist/mymodule.mjs"
    }
  }
}
```

<!--]-->
