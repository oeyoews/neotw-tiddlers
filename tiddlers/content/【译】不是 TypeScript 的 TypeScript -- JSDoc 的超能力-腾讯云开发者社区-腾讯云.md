> 原文链接：[https://fettblog.eu/typescript-jsdoc-superpowers/](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Ffettblog.eu%2Ftypescript-jsdoc-superpowers%2F\&source=article\&objectId=1651212)undefined 作者：[@ddprrt](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Ftwitter.com%2Fddprrt\&source=article\&objectId=1651212)undefined 时间：2019.07.16

我们可以把 TypeScript 看做为 JavaScript 添加了类型注释的薄层，而类型注释可以确保不会犯任何错误。TypeScript 团队也在努力确保类型检查适用于常规 JavaScript 文件。TypeScript 的编译器（tsc）以及 VSCode 等编辑器中的语言支持无需任何编译步骤，就能提供出色的开发体验。下面我们来看看如何使用。

### 目录

* 带有 JSDoc 注释的 TypeScript
* 激活检查
* 内联类型
* 定义对象
* 定义函数
* 导入类型
* 使用泛型
* 枚举
* typeof
* 从类扩展

#### 带有 JSDoc 注释的 TypeScript

在最优的情况下，TypeScript 能够通过从使用 JavaScript 的方式正确推断来找出正确的类型。

```
function addVAT(price, vat) {
  return price * (1 + vat) // 喔！你使用并加上了数字，所以他是 number。
}
```

在上面的例子中，我们增加了值。这个操作只对 number 是合法的，有了这些信息，TypeScript 知道`addVAT`的返回值将是 number。

为确保输入值正确，我们可以添加默认值：

```
function addVAT(price, vat = 0.2) { // 棒, `vat` 也是 number!
  return price * (1 + vat)
}
```

但类型推断只能到目前为止。我们可以通过添加 JSDoc 注释为 TypeScript 提供更多信息：

```
/**
 * Adds VAT to a price
 * 
 * @param {number} price The price without VAT
 * @param {number} vat The VAT [0-1]
 * 
 * @returns {number}
 */
function addVAT(price, vat = 0.2) {
  return price * (1 + vat)
}
```

关于这点 Paul Lewis 有一个很棒的[视频](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DYHvqbeh_n9U\&source=article\&objectId=1651212)。类型有很多很多，比评论中的几种基本类型更多。结果就是使用 JSDoc 类型可以让你走得很远。

#### 激活检查

为了确保您不仅能够获得类型信息，而且在编辑器中（或通过 tsc）获得实际的错误反馈，请激活源文件中的`@ts-check`标志：

如果有一个特定的行出错，但你知道这样更好，请添加 @ts-ignore 标志：

```
// @ts-ignore
addVAT('1200', 0.1); // would error otherwise
```

#### 内联类型

定义参数的时候，希望确保尚未分配的变量具有正确的类型，这是可以使用 TypeScript 的内联类型注释。

```
/** @type {number} */
let amount;
amount = '12'; // does not work
```

不要忘记正确的注释语法。使用`//`的内联注释不起作用。

#### 定义对象

除了基本类型，在 JavaScript 中还经常使用到复杂类型和对象，这种情况对基于注释的类型注释也没有问题：

```
/**
 * @param {[{ price: number, vat: number, title: string, sold?: boolean }]} articles
 */
function totalAmount(articles) {
  return articles.reduce((total, article) => {
    return total + addVAT(article)
  }, 0)
}
```

我们定义了一个复杂的对象类型（就像我们在 TypeScript 中所做的那样）内联作为参数。

内联注释一切都会很快变得拥挤。通过 @typedef 定义对象类型是一种更优雅的方式：

```
/**
 * @typedef {Object} Article
 * @property {number} price
 * @property {number} vat
 * @property {string} string
 * @property {boolean=} sold
 */

/**
 * Now we can use Article as a proper type
 * @param {[Article]} articles
 */
function totalAmount(articles) {
  return articles.reduce((total, article) => {
    return total + addVAT(article)
  }, 0)
}
```

写的更多，但更具可读性。此外，TypeScript 可以识别名称为 Article 的 Article，从而在 IDE 中提供更好的信息。

请注意名为`sold`的可选参数。它的定义是`@property {boolean =} sold`。另一种语法是`@property {boolean} [sold]`。功能`@params`也是如此。

#### 定义函数

函数也能够在内联中被定义，就像对象一样:

```
/**
 * @param {string} url
 * @param {(status: number, response?: string) => void} cb
 */
function loadData(url, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url)
  xhr.onload = () => {
    cb(xhr.status, xhr.responseText)
  }
}
```

同样，这很快就会变得非常混乱。 可以使用`@callback`修改：

```
/**
 * @callback LoadingCallback
 * @param {number} status
 * @param {string=} response
 * @returns {void}
 */

/**
 * @param {string} url
 * @param {LoadingCallback} cb
 */
function loadData(url, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url)
  xhr.onload = () => {
    cb(xhr.status, xhr.responseText)
  }
}
```

`@callback`采用与函数注释相同的参数，与`@typedef`类似

#### 导入类型

`@typedef`允许您从任何其他 .js 或 .ts 文件导入类型。这样，您就可以在 TypeScript 中编写 TypeScript 类型定义，并将它们导入源文件中。

见*article.ts*:

```
export type Article = {
  title: string,
  price: number,
  vat: number,
  sold?: boolean,
}
```

*main.js*

```
// The following line imports the Article type from article.ts and makes it
// available under Article
/** @typedef { import('./article').Article } Article */

/** @type {Article} */
const article = {
  title: 'The best book in the world',
  price: 10,
  vat: 0.2
}
```

还可以直接在类型注释中导入类型：

```
/** @type {import('./article').Article} */
const article = {
  title: 'The best book in the world',
  price: 10,
  vat: 0.2
}
```

这在没有环境类型定义的情况下处理混合的 TypeScript 时非常棒。

#### 使用泛型

只要存在可以通用的类型，TypeScript 的泛型语法就可用：

```
/** @type PromiseLike<string> */
let promise;

// checks. `then` is available, and x is a string
promise.then(x => x.toUpperCase())
```

您可以使用`@template`注释定义更精细的泛型（尤其是带有泛型的函数）。

```
/**
 * @template T
 * @param {T} obj
 * @param {(keyof T)[]} params
 */
function pluck(obj, ...params) {
  return params.map(el => obj[el])
}
```

这样很方便，但对复杂的泛型有点难。内联泛型仍然使用 TypeScript 方式：

```
/** @type { <T, K extends keyof T>(obj: T, params: K[]) => Array<T[K]>} */
function values(obj, ...params) {
  return params.map(el => obj[el])
}

const numbers = values(article, 'price', 'vat')
const strings = values(article, 'title')
const mixed = values(article, 'title', 'vat')
```

还有更复杂的泛型？考虑将它们放在 TypeScript 文件中并通过导入功能导入它。

#### 枚举

将特殊结构化的 JavaScript 对象转换为枚举，并确保值一致：

```
/** @enum {number} */
const HTTPStatusCodes = {
  ok: 200,
  forbidden: 403,
  notFound: 404,
}
```

枚举与常规 TypeScript 枚举有很大不同，枚举确保此对象中的每个键都具有指定的类型。

```
/** @enum {number} */
const HTTPStatusCodes = {
  ok: 200,
  forbidden: 403,
  notFound: 404,
  errorsWhenChecked: 'me'
}
```

这就是他们所做的一切。

#### typeof

这是我最喜欢的工具之一，typeof 也可用。为您节省大量编辑时间：

```
/**
 * @param {number} status The status code as a number
 * @param {string} data The data to work with
 */
function defaultCallback(status, data) {
  if(status === 200) {
    document.body.innerHTML = data
  }
}

/**
 * @param {string} url the URL to load data from
 * @param {typeof defaultCallback} cb what to do afterwards
 */
function loadData(url, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url)
  xhr.onload = () => {
    cb(xhr.status, xhr.responseText)
  }
}
```

#### 从类扩展

`extends`允许您在从基本 JavaScript 类扩展时指定通用参数。请参阅以下示例：

```
/**
 * @template T
 * @extends {Set<T>}
 */
class SortableSet extends Set {
  // ...
}
```

另一方面，`@augments`可以使泛型参数更具体：

```
/**
 * @augments {Set<string>}
 */
class StringSet extends Set {
  // ...
}
```

真方便！

### 写在最后

纯 JavaScript 中增加 TypeScript 注释可以更好地维护项目。特别是在输入泛型时，TypeScript 还有一些功能，但是对于很多基本任务，你可以在不安装任何编译器情况下获得很多编辑器的能力。

知道的更多？给我发一条推文。我很高兴在这里添加它们。

本文参与 [腾讯云自媒体同步曝光计划](https://cloud.tencent.com/developer/support-plan)，分享自作者个人站点 / 博客。
