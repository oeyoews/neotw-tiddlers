本文正在参加[「金石计划。瓜分 6 万现金大奖」](https://juejin.cn/post/7162096952883019783 "https://juejin.cn/post/7162096952883019783")

最近在`vue`项目中我发现可以使用`commonjs`模块规范，于是一探究竟，便整理成此文。

## 现象描述

首先使用`vue-cli`生成一个 vue 项目，然后定义一个`commonjs`模块:

```
// util.js
module.exports = {
  hero: function (name) {
    console.log(name)
  },
  core: {
    version: '1.0'
  }
}

// app.vue
const core = require('./util')
console.log('core', core)
```

发现`vue`项目是可以正常运行的，同时在控制台能打印相应的信息:

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01d05650856b43b686aad5543e0a74b5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

即，`commonjs`模块在`vue`项目中能通过`require`方式引用。那能否通过`import`方式引入呢？

```
import core, { hero } from './util'

console.log('core', core)
console.log('hero', hero)
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/354222a4f6414ac7bf0f8ff39635302f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

发现也可以，这非常的神奇。

那如果是`esm`模块，能用`require`方式引用吗？

```
// util.js
export function hero(name) {
  console.log(name)
}
const core = {
  version: '1.0'
}
export default core

// app.vue
const core = require('./util')
console.log('core', core)
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2eb272cfd5eb4093a16b4df2b17e6ea2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

发现即使是`esm`模块也能用`require`的方式引用。

本来`esm`模块和 `cjs` 模块有很大的差异，但是现在不管哪种模块，都可以使用`require`和`import`方式引用，这是怎么做到的呢？

## 如何把`esm`转化为`cjs`？

先说答案：在利用`webpack`启动的项目中，`webpack`会利用`babel`把`esm`模块规范转化为`cjs`：

* `export` 语法转化为 `module.exports`
* `import` 语法转换为 `require`

**为什么是把`esm`转化为`cjs`呢？毕竟以后`esm`才是主流的模块规范。**

这是因为`cjs`出现的很早， 它是在没有 `esm` 之前的一个产物。正是 cjs 简单而又高效的模块化设计， 使得 cjs 受到了大量开发人员的青睐。在 `esm` 出现之前，已经存在了大量的 `cjs` 的模块，总不能要求所有的模块都迁移使用 `esm` 吧。 `cjs` 和 `esm` 的模块化实现还上还是有很大不同的，但是**在项目中，又不可避免的出现 esm 调用 cjs 的情形**， 那么这是怎么实现它们之间的相互调用呢？

**答案是编译器，大体思路上是把 esm 转换成 cjs 的形式然后统一处理。**

让我们抛开 `babel, rollup` 这些东西，把自己当成一个编译器开发者，你会怎么处理 `esm` 调用`cjs` 的问题呢。

假设有一个 `esm` 模块:

```
export const a = 1
export const b = 2

export default () => {
  return 3
}
```

现在交给你来处理，你需要把这段代码处理成 `cjs` 的形式。

* 首先，我们看到 `lib.js` 有两个 `export`，这个简单 我们把 `cjs` 的 `exports.xx` 和 `esm` 的 `export const xx`，一一对应起来就好了。

* 然后，还有个 `export default`, 查阅了下资料，我们知道在 `esm` 中我们可以认为 `export default` 是 `export` 了一个 `default` 的变量或方法。 这下就简单了，直接 `exports.default = xx` 不就好了，于是得到以下 cjs 的代码：

```
module.exports {
  a: 1,
  b: 2,
  default: function(){return 3;}
}
```

这个翻译过程看上去没什么问题，于是我们愉快的保存了 `lib.js` 的 `cjs` 版本。

这时候有人在项目中用到了 `lib.js` 他是使用的 `esm` 形式，所以也要把`esm` 翻译为`cjs`：

```
import fn, { a, b } from 'lib'
console.log(a)
console.log(b)
console.log(fn())

// 翻译为：
const { a, b } = require('lib')
const fn = require('lib').default
console.log(a)
console.log(b)
console.log(fn())
```

好像看上去没什么问题。因为代码逻辑上，完全正确。

但是注意这里的 `default`，我们把 `default` 当成 `exports` 的一个属性导出。

如果使用这种转换规则的话， 那么在 `react` 项目中使用这个编译器将会收到一堆报错。因为 `import react from 'react'` 会被翻译成 `const react = require('react').default`;

但是 `react` 模块导出的对象上，并没有 `default` 属性。而且，不仅仅是 `react`，很多 `cjs` 的 `lib` 只会导出一个方法或者 class 类似这种：`module.exports = function() {}`。

那么为了直接使用这些 `cjs` 的库，你只能这样写：`import * as React from 'react'`， 来整体导出使用。 这也是之前 typescript 的处理方式。但是，在 typescript 项目中开启 `esModuleInterop`或者 `babel` 项目中， 你是这样导入一个 cjs 的模块了: `import react from 'react'`，就多亏了这些神奇的**编译器**。

## babel 把 `esm` 转化为 `cjs`

我们直接使用 `babel online` 看看它是怎么处理我们上面 `lib.js` 的，把上面的`lib.js`用`babel`编译结果如下：

```
//lib.js
export const a = 1
export const b = 2

export default () => {
  return 3
}

;('use strict')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = exports.b = exports.a = void 0
const a = 1
exports.a = a
const b = 2
exports.b = b

var _default = () => {
  return 3
}

exports.default = _default
```

这里看上去和我们的处理方式没什么区别，只是在 exports 挂了一个 `__esModule` 属性，然后我们再来看看 `import`， 先看最简单的:

```
import { a, b } from 'lib';

console.log(a);
console.log(b);
```

经过 `babel` 处理后，变成了这样：

```
'use strict';

var _lib = require('lib');

console.log(_lib.a);
console.log(_lib.b);
```

`babel` 在处理这一块的时候，使用整体导入的，那 `default import` 呢？

```
import lib from './lib'
console.log(lib)

// 编译后结果：
;('use strict')
var _lib = _interopRequireDefault(require('lib'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

console.log(_lib.default)
```

这里注意到，虽然 `babel` 还是使用了整体导入的形式，但是包了一层 `_interopRequireDefault`, 单独处理 `default import` 的形式。

前面我们也看到了， `es module` 在转换时会在 `export` 上挂载`__esModule` 属性，所以在导入时，如果是模块采用 `es module` 格式那么直接返回，`require('lib')`的结果就是`exports`这个对象：

```
exports.a = a
exports.b = b
var _default = () => {
  return 3
}
exports.default = _default
```

如果模块不是采用`esmodule`格式，那么当 `cjs` 处理， 把整体模块挂在一个对象的 `default` 属性上，那么这两种情况下导出的对象上都有一个`default`属性，然后**返回这个`default`属性的值，这样后续的操作就统一了**。

这也是为什么你可以在使用了 `babel` 的项目中使用`import react from 'react'` 的形式。

简单点就是，`esm`编译成`cjm`，`esm`上的所有属性都花挂载到`exports`这个对象上，包括`default`属性。对于`import fn from './fn'`这样的引用，编译器也会编译成`cjs`，也就是`require('./fn')`，**返回的是属性`default`的值**:

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5109e1be42eb4d909f9e7c651fbc96fa~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

不管是`esm`格式的模块，还是`cjs`的模式，通过上面的 `_interopRequireDefault` 进行了统一处理，统一都有一个`default`属性，然后把这个属性`default`的值返回出去。所以，你就可以直接`import fn from './fn'`。

**如果在 nodejs 里面使用这个经过 babel 编译后的库，那么我们需要这样使用`require('fn').default`，为什么这里要加上呢？因为所有的内容都放在 exports 的 default 属性上。为什么 import 引用的时候可以直接 import fn from './fn'，因为 import 这个语法被 babel 特殊处理过，它直接返回的是 default 的属性值，而不是 exports 这个对象。**

## 总结

**为了快乐的在 esm 中使用 cjs 的模块， 比较通用的形式是转换为 cjs 统一处理**。

在 `esm` 转换为 `cjs` 的过程上， 最主要的问题体现在 `export default` 上， 它让事情变得复杂。在我们平常的开发中，可能我们已经习惯了 `export default`, 特别是在 `react` 项目中，我们自然的写下 `export default myComponent`。

如果本身项目都建立在 `es module`的体系下，`export default` 绝对是一个很便利的方式。但是，如果你同时需要支持 cjs 和 esm，涉及到相互调用的问题， 那就要慎重考虑 `export default`。 因为 esm 与 cjs 如何成功相互使用，并不由你决定，而是由帮你打包处理的工具决定。

在 `vue` 项目中，我们使用`babel`这个编译器，不管你是用`export import`的`esm`模块语法，还是使用`module.exports require`的`cjs`语法，最后`webpack`打包之后都是`cjs`语法，所以现在就能回答前面提出的问题了。
