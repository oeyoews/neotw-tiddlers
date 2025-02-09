在你的项目中无法或不想使用 TypeScript 的原因有很多。一个常见的原因是你正在使用与 TypeScript 不兼容的旧代码库。或者切换到 TypeScript 比大家说的更困难。无论出于什么原因，你都被困在 JavaScript 中。但这并不完全意味着你必须放弃 TypeScript 的好处。在本文中，我们将探索 JSDoc 类型的魔力，通过它你可以立即使用大部分 TypeScript 功能。

本文将介绍如下内容：

1. TypeScript 类型：在这里，我们将看到如何在 JSDoc 中使用 TypeScript 类型。如果你对 TypeScript 不熟悉，不用担心，我会解释你需要知道的一切。
2. 更多 JSDoc 的好处：在我们介绍如何为项目添加类型之后，我们将看一下 JSDoc 提供的其他一些功能。
3. 实践中的 JSDoc：现在你已经了解了 JSD 的强大之处，并且想在项目中使用它。是如何开始呢？在本节中，我们将介绍如何设置 VSCode 获得最佳的 JavaScript 类型化体验。
4. 实践：最后，我们将介绍一些在项目中使用 JSDoc 的最佳实践。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46e968437af04271ae7d88a6496b3822~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=464\&h=640\&s=290378\&e=png\&b=897c53)

## TypeScript 类型 (字符串、数字、布尔等)

在 TypeScript 中，最常见的类型是原始类型。这些类型很特殊，因为它们代表了语言的最底层构建块。将原始类型写成小写是很重要的，因为它有助于避免与类或接口混淆。例如，如果你使用`String`而不是`string`，它可能会被误认为是全局的`String`构造函数，从而导致潜在的混淆和错误。你可以在[现代 JavaScript 教程](https://link.juejin.cn/?target=https%3A%2F%2Fjavascript.info%2Fprimitives-methods%23a-primitive-as-an-object "https://javascript.info/primitives-methods#a-primitive-as-an-object")上阅读更多相关信息。

以下是如何在 TypeScript 和 JSDoc 中使用原始类型的示例：

```
// TypeScript
const name: string = 'John Doe';
const age: number = 25;
const average: number = 3.14;
const isActive: boolean = true;
const nullable: number | null = null;
const unassigned: string | undefined;

// JavaScript JSDoc
/** @type {string} */
const name = 'John Doe';

/** @type {number} */
const age = 25;

/** @type {number} */
const average = 3.14;

/** @type {boolean} */
const isActive = true;

/** @type {number | null} */
let nullable = null;
nullable = 5;

/** @type {string | undefined} */
let unassigned;
unassigned = 'John Doe';
```

请注意，JSDoc 注释以两个星号`/**`开头，并以一个普通的星号后跟一个正斜杠`*/`结尾。如果一个注释块以一个星号开头，它将被视为普通注释，不会被 JSDoc 解析。要添加 JSDoc 注释，只需将注释块直接放在要文档化的代码元素之前即可。

### 数组和元组 🍱

在 TypeScript 中，数组和元组可以帮助您处理项目列表。有两种方法可以在 JSDoc 中对它们进行类型标注。第一种是使用`[]`语法，这是最常见和广泛接受的方法。第二种是使用`Array`泛型类型，这种方法较少见。

```
// 数组
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ['John', 'Jane', 'Doe'];
```

虽然`[]`语法更简单易读，但在处理多维数组或复杂类型时，阅读起来会更困难。在这种情况下，`Array`泛型类型更易读。最终，这是个人偏好的问题，您可以选择自己喜欢的方式。

```
// 更易读的写法是 Array<Array<number>>，因为它清楚地显示了嵌套结构，使我们更容易在脑海中可视化数组
const matrix: Array<Array<number>> = [[1, 2], [3, 4]];
const matrix: number[][] = [[1, 2], [3, 4]];

// 使用 JSDoc
/** @type {number[][]} */
const numbers = [[1, 2], [3, 4]];

/** @type {Array<Array<number>>} */
const numbers = [[1, 2], [3, 4]];
```

元组与数组类似，但它们具有固定的长度，并且每个元素具有特定的类型。当您想要表示具有固定数量元素的值时，每个元素都具有特定类型时，可以使用元组。例如，您可以使用元组来表示二维平面上的坐标，其中第一个元素是 x 坐标，第二个元素是 y 坐标：

```
// 元组
const coordinates: [number, number] = [40.7128, -74.0060];
const person: [string, number] = ['John Doe', 30];

// 使用 JSDoc
/** @type {[number, number]} */
const coordinates = [40.7128, -74.0060];

/** @type {[string, number]} */
const person = ['John Doe', 30];
```

### 对象和接口 🏢

TypeScript 允许您使用对象类型和接口来定义对象的结构。当结构简单且不太可能在代码库中重复使用时，可以使用内联对象类型语法（`{ property: Type }`）来定义对象类型。如果有复杂类型或希望在代码库中多次重复使用相同的结构，维护类型将变得越来越困难，这时最好使用`interface`关键字来定义可重用的对象类型。内联对象类型更适用于在不使用单独的接口声明时为特定函数或组件创建临时类型。

```
// 内联对象类型
const user: { name: string; age: number } = {
  name: 'John Doe',
  age: 25,
};

// 接口类型
interface User {
  name: string;
  age: number;
}
const user: User = { name: 'John Doe', age: 25 };

// 使用 JSDoc
/** @type {{ name: string; age: number }} */
const user = { name: 'John Doe', age: 25 };

/** @type {User} */
const user = { name: 'John Doe', age: 25 };
```

我们可以使用`@typedef`标签在 JSDoc 中定义接口和自定义类型。该标签后跟要分配的类型和名称。有两种定义类型的方法：第一种是使用`@property`标签定义类型的每个属性。这样可以为每个属性提供描述，以提供有关属性、用途和使用方式的更多信息。第二种方法是使用`@typedef`标签内联定义类型。第二种方法更简洁易读，但不允许为每个属性添加描述。

```
// 使用 @property 标签
/** 
 * @typedef {Object} User
 * @property {string} name The user's full name.
 * @property {number} age The user's age in days. We use days
 *  instead of years to avoid dealing with leap years.
 */
/** @type {User} */
const user = { name: 'John Doe', age: 25 };

// 使用内联类型定义
/** @typedef {{ name: string; age: number }} User */
const user = { name: 'John Doe', age: 25 };
```

### 可选属性 📝

要将属性标记为可选的，请在属性名称后添加问号（`?`）。这告诉 TypeScript 该属性可能存在于对象中，也可能不存在。在 JSDoc 中，您可以使用`@property`标签将属性标记为可选，将属性名称括在方括号中（`[property]`）。

```
// 使用可选属性
interface User {
  name: string;
  age?: number;
}

// 使用 @property 标签
/** 
 * @typedef {Object} User
 * @property {string} name The user's full name.
 * @property {number} [age] The user's age.
 */
```

### 枚举和联合类型 🎲

TypeScript 引入了枚举和联合类型，以帮助您管理一组命名常量和组合多个类型。JavaScript 没有枚举，但我们可以使用`@enum`标签告诉 JSDoc 将常规对象视为枚举。`@typedef`标签可用于定义联合类型。您还可以使用类型`Record<string, string>`来定义枚举，但`@enum`标签更简洁易读。有关实用类型的更多信息，请参阅 TypeScript 文档。

```
// 枚举
/** @enum {string} */
const Color = {
  Red: 'red',
  Green: 'green',
  Blue: 'blue',
  Age: 42, // 错误：类型“number”不能分配给类型“string”
};

/** @type {Color} */
const color = Color.Red;

// 联合类型
/** @typedef {string | number} StringOrNumber */
/** @type {StringOrNumber} */
let value = 'Hello'; // 可以是字符串
value = 42; // 或者是数字
```

### 类型别名 🏷️

类型别名是一种为现有类型创建新名称的方法。它们可以通过为复杂类型提供更有意义的名称来提高代码的可读性和可维护性。在 TypeScript 中，有`type`关键字用于创建类型别名。在 JSDoc 中，您可以使用之前看到的`@typedef`标签来定义类型别名。

```
// 在TypeScript中
type Age = number;
type Name = string;
type User = { name: Name; age: Age };

const user: User = { name: 'John Doe', age: 25 };

// 使用 JSDoc
/** @typedef {number} Age */
/** @typedef {string} Name */
/** @typedef {{ name: Name; age: Age }} User */

/** @type {User} */
const user = { name: 'John Doe', age: 25 };
```

### 字面量类型 🔠

在 TypeScript 中，字面量类型是一种定义只能具有特定值的类型的方法。它们可以与字符串、数字或布尔值一起使用。要创建字面量类型，只需将所需值用作类型。

```
// 在TypeScript中
type Red = 'red';
type Blue = 'blue';
type Green = 'green';
type Color = Red | Blue | Green;

const color: Color = 'red'; // 允许
color = 'yellow'; // 错误：类型“"yellow"”不能分配给类型“Color”

// 在JSDoc中
/** @typedef {'red' | 'blue' | 'green'} Color */
/** @type {Color} */
const color3 = 'red'; // 允许
color3 = 'yellow'; // 错误：类型“"yellow"”不能分配给类型“Color”
```

### 实用类型 🧰

TypeScript 提供了一组预定义的实用类型，可以帮助您操作和转换类型。这样，您可以基于现有类型创建新类型。其中一些最常见的类型是`Partial`、`Readonly`、`Record`、`Pick`和`Omit`。但还有许多其他可用的实用类型，您可以在[TypeScript 文档](https://link.juejin.cn/?target=https%3A%2F%2Fwww.typescriptlang.org%2Fdocs%2Fhandbook%2Futility-types.html "https://www.typescriptlang.org/docs/handbook/utility-types.html")中找到列表。

```
interface User {
  name: string;
  age: number;
}

// Partial：使User中的所有属性变为可选
type PartialUser = Partial<User>;
// {
//   name?: string | undefined;
//   age?: number | undefined;
// }

// Readonly：使User中的所有属性变为只读
type ReadonlyUser = Readonly<User>;
// {
//   readonly name: string;
//   readonly age: number;
// }

// Record：使用联合的键和特定类型的值创建新类型
type UserRole = 'admin' | 'user';
type Roles = Record<UserRole, boolean>;
// {
//   admin: boolean;
//   user: boolean;
// }

// Pick：从另一个类型中选择特定属性创建新类型
type UserWithoutAge = Pick<User, 'name'>;
// {
//   name: string;
// }

// Omit：从另一个类型中省略特定属性创建新类型
type UserWithoutName = Omit<User, 'name'>;
// {
//   age: number;
// }
```

这些实用类型可以在 JSDoc 中使用，如下所示：

```
/** @typedef {{ name: string; age: number }} User */
/** @typedef {Partial<User>} PartialUser */
/** @typedef {Readonly<User>} ReadonlyUser */
/** @typedef {Record<'admin' | 'user', boolean>} Roles */
/** @typedef {Pick<User, 'name'>} UserWithoutAge */
/** @typedef {Omit<User, 'name'>} UserWithoutName */
```

### 泛型 🧬

泛型是一种创建可与多种类型一起使用的可重用组件的方法。它们允许您定义一个动态类型，该类型可以在多个位置使用不同的类型。听起来很复杂，但您可以将其视为函数参数，其中您要创建的类型是函数，泛型类型是参数。然后，函数 / 类型使用泛型类型来创建新类型。要创建一个泛型，请使用`<>`语法并指定其名称。然后可以在类型定义中使用泛型。要指定多个泛型类型，请使用逗号分隔的列表。在下面的示例中，`T`和`U`是泛型类型。

```
// 在TypeScript中
type TypeT<T> = T;
type TypeTorU<T, U> = T | U;
type TypeBoolean = TypeT<boolean>;
type TypeStringOrNumber = TypeTorU<string, number>;

const value: TypeStringOrNumber = 'Hello'; // 允许
const value2: TypeBoolean = true; // 允许

// 在JSDoc中
/** 
 * @template T
 * @typedef {T} TypeT
 */
/** 
 * @template T,U
 * @typedef {T | U} TypeTorU 
 */
/** @typedef {TypeT<boolean>} TypeBoolean */
/** @typedef {TypeTorU<string, number>} TypeStringOrNumber */
```

### 映射类型 🗺️

映射类型允许您通过转换现有类型的属性来创建新类型。您可以将其视为在 JavaScript 中使用`map`数组方法的方式。当您想要基于一组键修改对象类型的形状或对类型的属性应用特定的转换时，它们特别有用。要创建映射类型，请在类型定义中使用`in`和`keyof`关键字。

`in keyof`关键字用于迭代类型的键。`P`表示`T`的键，`T[P]`是`T`中属性`P`的类型：

```
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

interface User {
  name: string;
  age: number;
}

type NullableUser = Nullable<User>;
// {
//   name: string | null;
//   age: number | null;
}
```

在 JSDoc 中，您可以使用`@template`标签定义泛型，使用`@typedef`标签定义映射类型。

```
/** 
 * @template T 
 * @typedef {{ [P in keyof T]: T[P] | null }} Nullable<T>
 */

/** @typedef {{ name: string; age: number }} User */
/** @typedef {Nullable<User>} NullableUser */
// {
//   name: string | null;
//   age: number | null;
}
```

### 条件类型 🌓

TypeScript 中的条件类型允许您根据条件创建类型，从而实现更灵活和动态的类型。您可以将它们视为 JavaScript 中的`if`语句。它们在类型定义中使用三元运算符语法。`extends`用于定义条件，`?`和`:`用于定义条件为真或假时返回的类型。

```
type IsString<T> = T extends string ? 'yes' : 'no';

type A = IsString<string>; // 'yes'
type B = IsString<number>; // 'no'
// A和B现在分别是'yes'和'no'的字面类型

// JSDoc
/** 
 * @template T
 * @typedef {T extends string ? 'yes' : 'no'} IsString<T>
 */
/** @typedef {IsString<string>} A */ // 'yes'
/** @typedef {IsString<number>} B */ // 'no'
```

### 索引访问类型 🔍

最后一个类型特性是索引访问类型。索引访问类型允许您访问另一个类型中的属性的类型。当您想要提取特定属性的类型或基于现有类型的属性创建更复杂的类型时，它们非常有用。

```
interface User {
  name: string;
  age: number;
}

type UserName = User['name']; // string
type UserAge = User['age']; // number

// JSDoc
/** @typedef {{ name: string; age: number }} User */
/** @typedef {User['name']} UserName */ // string
/** @typedef {User['age']} UserAge */ // number
```

### 类型转换 🎭

既然我们已经体验了 TypeScript 的荣耀，让我们看看如何使用类型转换告诉编译器你比它更了解。当您想要覆盖编译器的类型推断时，类型转换非常有用。要进行类型转换，请使用`@type`标签并指定要转换为的类型。请注意，您必须将要转换的表达式放在括号中。

```
const input = document.querySelector('input[type="text"]');

// TypeScript将input的类型推断为`Element | null`
// 但是现在，如果我们尝试访问`Element`上不存在的属性
// 我们会得到一个错误

if (input) {
  input.value; // 错误：类型'Element'上不存在属性'value'
}

// 为了解决这个问题，我们可以将类型转换为`HTMLInputElement`，如下所示：
if (input) {
  const value = /** @type {HTMLInputElement} */ (input).value;
  // 现在TypeScript知道`value`的类型是`string`
}
```

有了这些强大的功能，您可以创建动态和表达性的类型。在继续之前，我想提到一件事，您可以安装库，通过这些库可以为项目添加更多类型，例如[type-fest](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fsindresorhus%2Ftype-fest "https://github.com/sindresorhus/type-fest")或[utility-types](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fpiotrwitek%2Futility-types "https://github.com/piotrwitek/utility-types")。这些库包含许多有用的类型，您可以在项目中使用它们。

太棒了！现在我们已经探索了 TypeScript 提供的不同类型特性，让我们看看 JSDoc 还能做些什么。

[Elmo Burn Meme](https://link.juejin.cn/?target=https%3A%2F%2Fp3-juejin.byteimg.com%2Ftos-cn-i-k3u1fbpfcp%2Fadadaf2da6a048f1b6dcc4a0ea82c7c7~tplv-k3u1fbpfcp-jj-mark%3A0%3A0%3A0%3A0%3Aq75.image%23%3Fw%3D318%26h%3D215%26s%3D724351%26e%3Dgif%26f%3D16%26b%3D7f280e "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/adadaf2da6a048f1b6dcc4a0ea82c7c7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=318\&h=215\&s=724351\&e=gif\&f=16\&b=7f280e")

## 更多 JSDoc 的好处 📚

还有一些 JSDoc 标签，您应该了解一下。这些标签与类型无关，但在使用 JSDoc 时仍然很有用。让我们来看看它们。

### 快速回顾 📝

* `@type` 用于定义变量的类型。
* `@typedef` 用于定义类型别名。
* `@property` 或 `@prop` 用于定义对象的属性。
* `@template` 用于定义泛型。
* `@enum` 用于定义枚举。
* `@param` 用于定义函数的参数。
* `@returns` 或 `@return` 用于定义函数的返回类型。

让我们继续看一些其他标签。

### see 和 link 标签

`@see` 和 `@link` 标签帮助您连接文档中的不同部分。当您想要指向相关项（如类或类型）时，请使用`@see`标签。`@link`标签用于链接到与当前文档无直接关联的其他文档。您可以使用这两个标签将其链接到项目内部的内容或在线资源。

使用`@link`标签，您还可以将读者引导到文档的特定部分或特定代码行。要链接到一个部分，请使用 #符号，后跟部分名称。要链接到一行代码，请使用`#L`符号，并添加要指向的行号。要引用多行代码，请使用`-`符号将起始行号和结束行号分隔开（例如`#L6-L13`）。

```
/** @typedef {{ name: string; age: number }} Person */
/**
 * @see {Person}
 * @see {@link https://webry.com}
 * @link https://github.com/sindresorhus/type-fest#install
 * @link https://github.com/sindresorhus/type-fest/blob/main/source/primitive.d.ts#L6-L13
 */
```

### example 标签

`@example`标签用于向文档添加示例。您可以使用它来显示如何使用函数或显示特定类型的工作方式。您还可以使用它来显示如何使用库或显示如何使用库的特定功能。

```
/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @example
 * add(1, 2) // 3
 */
```

### summary 和 description 标签

`@summary`标签用于向文档添加简短描述。它用于快速概述您正在记录的项的功能。`@description`标签用于向文档添加更详细的描述。它用于提供有关您正在记录的项的更详细信息。

```
/**
 * @summary Adds two numbers together.
 * @description This function adds two numbers together and returns the result.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
```

### JSDoc 注释的格式 🎨

您可以在 JSDoc 注释中使用 Markdown。这意味着您可以使用标题、列表和其他 Markdown 功能来使您的文档更易读。您还可以使用一些 HTML 标签，如`<br>`，为您的文档添加更多样式。

```
/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @example
 * ### Example usage
 * You can use this **function** _like_ ~this~:
 * ``js
 * add(1, 2) // 3
 * ``
 */
function add(a, b) {
    return a + b;
}
```

您还可以使用更复杂的 Markdown 功能，如列表和表格。有关更多信息，请查看 Adam Pritchard 的[Markdown Cheatsheet](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fadam-p%2Fmarkdown-here%2Fwiki%2FMarkdown-Cheatsheet "https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet")。

### 其他 JSDoc 标签 📚

还有一些其他 JSDoc 标签可能对您有用：

* `@function` 或 `@func`：记录函数或方法。
* `@class`：记录类构造函数。
* `@constructor`：指示函数是类的构造函数。
* `@extends` 或 `@augments`：指示类或类型扩展另一个类或类型。
* `@implements`：指示类或类型实现一个接口。
* `@namespace`：将相关项（如函数、类或类型）分组到一个公共命名空间下。
* `@memberof`：指定项属于哪个类、命名空间或模块。
* `@ignore`：告诉 JSDoc 在生成的文档中排除一个项。
* `@deprecated`：将函数、类或属性标记为已弃用，表示不应再使用它。
* `@since`：记录引入项的版本。还有更多。您可以在[JSDoc 文档](https://link.juejin.cn/?target=https%3A%2F%2Fjsdoc.app%2F "https://jsdoc.app/")中找到完整的 JSDoc 标签列表。

好了，理论的部分就到这里。让我们看看如何在实践中使用 JSDoc。

![Reality Check Meme](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7798c616bb6e4ffca35753de0edf5782~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=362\&h=640\&s=4300782\&e=gif\&f=82\&b=786f7a)

## 在实践中使用 JSDoc 🏄‍♂️

在使用 JSDoc 的项目中，可能会遇到一些挑战。因此，本节将重点介绍这些挑战以及如何克服它们。

### 如何充分利用 JSDoc

在本文中，我将使用 VSCode。如果您使用其他编辑器，您仍然可以跟着做，但您可能需要查找如何在您的编辑器中配置这些内容。

VSCode 内置支持 JSDoc。这意味着您可以在不安装任何其他扩展的情况下获得许多 JSDoc 的好处。但是，您可以采取一些措施，以更充分地利用 JSDoc。在您的`jsconfig.json`文件中启用`checkJs`选项将使编辑器在 JavaScript 文件中显示类型不匹配的错误。将其放置在项目的根目录或要启用类型检查的文件夹中。此文件可能如下所示：

```
{
  "compilerOptions": {
    "checkJs": true
  }
}
```

要在所有项目中应用此选项，请按`cmd + ,`访问 VSCode 设置，搜索`checkJs`，并在那里启用它。要进行更严格的类型检查，请考虑在 jsconfig 中启用其他选项，例如`strict`和`noImplicitAny`。

`strict`强制执行一组更严格的类型检查规则，有助于识别代码中的潜在问题。启用此选项后，以下与类型相关的标志将设置为 true（截至撰写本文时）：

* **noImplicitAny**：当表达式或声明具有隐含的 any 类型时，将报告错误。如果未为变量指定类型，它将被推断为 any，并且您将收到错误。
* **noImplicitThis**：如果 TypeScript 无法确定 this 的类型，它将报告错误。
* **alwaysStrict**：将所有文件视为在文件顶部具有严格模式指令（"use strict"）。
* 和其他选项，如**strictBindCallApply**、**strictNullChecks**、**strictFunctionTypes**、**strictPropertyInitialization**、**useUnknownInCatchVariables**。

您可以在[TypeScript 文档](https://link.juejin.cn/?target=https%3A%2F%2Fwww.typescriptlang.org%2Ftsconfig%23strict "https://www.typescriptlang.org/tsconfig#strict")中阅读有关这些选项的更多信息。

通常，您只想启用这些选项的子集。您可以通过启用`strict`，然后禁用您不想使用的选项来实现这一点。例如，如果要启用`strictNullChecks`但不启用`strictFunctionTypes`，可以通过在 jsconfig 中启用`strict`，然后禁用`strictFunctionTypes`来实现。根据您的用例，还有一些其他相关选项可能需要启用：

* `allowUmdGlobalAccess`允许您在 UMD 模块中访问全局变量。我不会在这里详细介绍 JavaScript 模块，但您可以在 Igor Irianto 的[文章](https://link.juejin.cn/?target=https%3A%2F%2Fdev.to%2Figgredible%2Fwhat-the-heck-are-cjs-amd-umd-and-esm-ikm "https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm")中了解更多信息。简而言之，如果您使用像 jQuery 或 Lodash 这样的库，并且希望访问它们的全局变量`$`和`_`，而不需要导入它们，那么您可能希望启用此选项。
* `typeAcquisition`允许您指定要在项目中使用的库。然后，它将自动从[DefinitelyTyped](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FDefinitelyTyped%2FDefinitelyTyped "https://github.com/DefinitelyTyped/DefinitelyTyped")项目下载这些库的类型定义。这个社区项目包含不带自己类型定义的 npm 包的类型定义。这是它的样子：

```
{
  "compilerOptions": {
    "typeAcquisition": {
      "include": ["jquery", "lodash"]
    }
  }
}
```

### .d.ts 文件

TypeScript 使用`.d.ts`文件存储类型定义。这些文件通常用于为不带自己类型定义的 JavaScript 库定义类型。您也可以使用它们为自己的 JavaScript 代码定义类型。以下是`.d.ts`文件的示例：

```
declare const foo: string;
declare function bar(): User;
declare class Baz {}

interface User {
  name: string;
  age?: number;
}
```

这是您可以在 JavaScript 中使用它的方式：

```
foo; // string
bar(); // User
new Baz(); // Baz
```

在`.d.ts`文件中，您可以使用我们之前看到的所有 TypeScript 功能以及更多功能。TypeScript 将自动获取您的`.d.ts`文件以及您安装的 npm 包的类型定义。在实践中，您可以在要为其添加类型的 JavaScript 文件附近创建文件。对于全局类型，您可以在项目的根目录中创建一个名为`globals.d.ts`的文件，并在其中添加它们。

有两种方法可以在 JavaScript 中从`.d.ts`文件中导入类型。第一种方法是使用三斜线指令。这些指令将告诉 TypeScript 包括指定模块的类型定义。它可能如下所示：

```
// 如果要使用.d.ts文件
/// <reference path="./foo.d.ts" />

// 如果要使用jQuery
/// <reference types="jquery" />

// 如果要使用es2017字符串功能，如.padStart()
/// <reference lib="es2017.string" />
```

有关三斜线指令的更多信息，请参阅[TypeScript 文档](https://link.juejin.cn/?target=https%3A%2F%2Fwww.typescriptlang.org%2Fdocs%2Fhandbook%2Ftriple-slash-directives.html "https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html")。

第二种方法是使用`import`关键字。这将导入指定模块的类型定义。以下是一个示例：

```
/** @typedef {import('./foo.d.ts').Foo} Foo */
/** @typedef {import('type-fest').JsonValue} JsonValue */
```

对于最后一章，我想分享一些编写 JSDoc 注释的最佳实践。我还将分享一些资源，您可以使用这些资源了解更多关于 JSDoc 和 TypeScript 的知识。

![Riding a chandelier meme](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3992a82667be4ae9b3c9d89c36273f63~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=498\&h=329\&s=2150985\&e=gif\&f=22\&b=20211a)

## 最佳实践

代码文档的详细程度取决于特定的用例、项目规模和受众。在提供足够的信息帮助用户理解代码和避免混乱之间需要取得平衡。以下是一些最佳实践：

1. **考虑受众：** 如果您正在开发一个库，您的文档应该全面，并包括对所有类型、函数和接口的详细描述。这有助于库的用户有效地了解如何使用它。另一方面，如果您正在开发一个内部项目，只有一个较小的团队使用，您可能会选择关注高级解释和重要的边缘情况。
2. **保持注释更新：** 随着代码的演变，确保更新相应的注释和文档。过时的注释可能会误导并导致与您的代码一起工作的开发人员困惑。
3. **简洁明了：** 在注释中力求简洁明了。避免过度技术性的术语，专注于提供易于理解的信息。请记住，您的文档应该对有经验的开发人员和新手都有帮助。
4. **包含代码示例：** 在适当的情况下，包含代码示例以说明如何使用特定的函数或类型。这对于对您的代码库或所涉及的概念不熟悉的用户特别有帮助。
5. **遵循一致的风格：** 在注释和文档中使用一致的风格。这有助于创建一个连贯和专业的外观，使用户更容易阅读和理解您的文档。

如果您已经读到这里，那么恭喜您！我很高兴您今天学到了新的东西。现在，您可以开始在 JavaScript 代码中添加 JSDoc 注释，使其几乎与 TypeScript 一样🎉。您可以通过关注和留下评论来支持我。我很想听听您的想法和反馈。

译自: [Boost Your JavaScript with JSDoc Typing - DEV Community](https://link.juejin.cn/?target=https%3A%2F%2Fdev.to%2Fsamuel-braun%2Fboost-your-javascript-with-jsdoc-typing-3hb3 "https://dev.to/samuel-braun/boost-your-javascript-with-jsdoc-typing-3hb3")
