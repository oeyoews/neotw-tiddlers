## 介绍

`infer` 最早出现在此 [PR](https://github.com/Microsoft/TypeScript/pull/21496) 中，表示在 `extends` 条件语句中待推断的类型变量。

简单示例如下：

在这个条件语句 `T extends (arg: infer P) => any ? P : T` 中，`infer P` 表示待推断的函数参数。

整句表示为：如果 `T` 能赋值给 `(arg: infer P) => any`，则结果是 `(arg: infer P) => any` 类型中的参数 `P`，否则返回为 `T`。

## 内置类型

在 2.8 版本中，TypeScript 内置了一些与 `infer` 有关的映射类型：

* 用于提取函数类型的返回值类型：

  相比于文章开始给出的示例，`ReturnType<T>` 只是将 `infer P` 从参数位置移动到返回值位置，因此此时 `P` 即是表示待推断的返回值类型。

* 用于提取构造函数中参数（实例）类型：

  一个构造函数可以使用 `new` 来实例化，因此它的类型通常表示如下：

  当 `infer` 用于构造函数类型中，可用于参数位置 `new (...args: infer P) => any;` 和返回值位置 `new (...args: any[]) => infer P;`。

  因此就内置如下两个映射类型：

## 一些用例

至此，相信你已经对 `infer` 已有基本了解，我们来看看一些使用它的「骚操作」：

* **tuple** 转 **union** ，如：`[string, number]` -> `string | number`

  解答之前，我们需要了解 tuple 类型在一定条件下，是可以赋值给数组类型：

  因此，在配合 `infer` 时，这很容易做到：

  在 [stackoverflow](https://stackoverflow.com/questions/44480644/typescript-string-union-to-string-array/45486495#45486495) 上看到另一种解法，比较简（牛）单（逼）：

* **union** 转 **intersection**，如：`T1 | T2` -> `T1 & T2`

  这个可能要稍微麻烦一点，需要 `infer` 配合「 [Distributive conditional types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types) 」使用。

  在[相关链接](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types)中，我们可以了解到「Distributive conditional types」是由「naked type parameter」构成的条件类型。而「naked type parameter」表示没有被 `Wrapped` 的类型（如：`Array<T>`、`[T]`、`Promise<T>` 等都是不是「naked type parameter」）。「Distributive conditional types」主要用于拆分 `extends` 左边部分的联合类型，举个例子：在条件类型 `T extends U ? X : Y` 中，当 `T` 是 `A | B` 时，会拆分成 `A extends U ? X : Y | B extends U ? X : Y`；

  有了这个前提，再利用在逆变位置上，[同一类型变量的多个候选类型将会被推断为交叉类型](https://github.com/Microsoft/TypeScript/pull/21496)的特性，即

  因此，综合以上几点，我们可以得到在 [stackoverflow](https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type) 上的一个答案：

  当传入 `T1 | T2` 时：

  * 第一步：`(U extends any ? (k: U) => void : never)` 会把 union 拆分成 `(T1 extends any ? (k: T1) => void : never) | (T2 extends any ? (k: T2)=> void : never)`，即是得到 `(k: T1) => void | (k: T2) => void`；

  * 第二步：`(k: T1) => void | (k: T2) => void extends ((k: infer I) => void) ? I : never`，根据上文，可以推断出 `I` 为 `T1 & T2`。

当然，你可以玩出更多花样，比如 [**union** 转 **tuple**](https://zhuanlan.zhihu.com/p/58704376)。

## LeetCode 的一道 TypeScript 面试题

前段时间，在 [GitHub](https://github.com/LeetCode-OpenSource/hire/blob/master/typescript_zh.md) 上，发现一道来自 LeetCode TypeScript 的面试题，比较有意思，题目的大致意思是：

假设有一个这样的类型（原题中给出的是类，这里简化为 interface）：

在经过 `Connect` 函数之后，返回值类型为

其中 `Action<T>` 的定义为：

这里主要考察两点

* 挑选出函数
* 此篇文章所提及的 `infer`

挑选函数的方法，已经在 [handbook](http://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html) 中已经给出，只需判断 value 能赋值给 Function 就行了：

接下来就比较简单了，主要是利用条件类型 + `infer`，如果函数可以赋值给 `asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>`，则取值为 `asyncMethod<T, U>(input: T): Action<U>`。具体答案就不给出了，感兴趣的小伙伴可以尝试一下。

上次更新: 6/30/2022, 12:47:40 PM
