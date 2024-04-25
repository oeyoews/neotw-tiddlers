## 方法的定义

从 ECMAScript 2015 开始，在对象初始器中引入了一种更简短定义方法的语法，这是一种把方法名直接赋给函数的简写方式。

## [尝试一下](#尝试一下)

## [语法](#语法)

```
var obj = {
  property( parameters… ) {},
  *generator( parameters… ) {},
  async property( parameters… ) {},
  async* generator( parameters… ) {},

  // with computed keys:
  [property]( parameters… ) {},
  *[generator]( parameters… ) {},
  async [property]( parameters… ) {},

  // compare getter/setter syntax:
  get property() {},
  set property(value) {}
};
```

## [描述](#描述)

该简写语法与 ECMAScript 2015 的[getter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/get)和[setter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/set)语法类似。

如下代码：

```
var obj = {
  foo: function () {
    /* code */
  },
  bar: function () {
    /* code */
  },
};
```

现可被简写为：

```
var obj = {
  foo() {
    /* code */
  },
  bar() {
    /* code */
  },
};
```

**备注：** 简写语法使用具名函数而不是匿名函数（如…`foo: function() {}`…）。具名函数可以从函数体调用（这对匿名函数是不可能的，因为没有标识符可以引用）。详细信息，请参阅[`function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/function#examples)。

### [生成器方法](#生成器方法)

[生成器方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*)也可以用这种简写语法定义。使用它们时，

* 简写语法中的星号（\*）必须出现在生成器名前，也就是说`* g(){}`可以正常工作，而`g *(){}`不行。
* 非生成器方法定义可能不包含`yield`关键字。这意味着[遗留的生成器函数 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Deprecated_and_obsolete_features "Currently only available in English (US)")也不会工作，并且将抛出 [`SyntaxError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError)。始终使用`yield`与星号（\*）结合使用。

```
// 用有属性名的语法定义方法（ES6 之前）：
var obj2 = {
  g: function* () {
    var index = 0;
    while (true) yield index++;
  },
};

// 同一个方法，简写语法：
var obj2 = {
  *g() {
    var index = 0;
    while (true) yield index++;
  },
};

var it = obj2.g();
console.log(it.next().value); // 0
console.log(it.next().value); // 1
```

### [Async 方法](#async_方法)

[Async 方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)也可以使用简写语法来定义。

```
// 用有属性名的语法定义方法（ES6 之前）：
var obj3 = {
  f: async function () {
    await some_promise;
  },
};

// 同一个方法，简写语法：
var obj3 = {
  async f() {
    await some_promise;
  },
};
```

### [Async 生成器方法](#async_生成器方法)

[生成器方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*)也能成为 [async](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function).

```
var obj4 = {
  f: async function* () {
    yield 1;
    yield 2;
    yield 3;
  },
};

// The same object using shorthand syntax
var obj4 = {
  async *f() {
    yield 1;
    yield 2;
    yield 3;
  },
};
```

### [方法定义不是构造函数](#方法定义不是构造函数)

所有方法定义不是构造函数，如果你尝试实例化它们，将抛出[`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)。

```
var obj = {
  method() {},
};
new obj.method(); // TypeError: obj.method is not a constructor

var obj = {
  *g() {},
};
new obj.g(); // TypeError: obj.g is not a constructor (changed in ES2016)
```

## [示例](#示例)

### [简单示例](#简单示例)

```
var obj = {
  a: "foo",
  b() {
    return this.a;
  },
};
console.log(obj.b()); // "foo"
```

### [计算的属性名](#计算的属性名)

该简写语法还支持计算的属性名称作为方法名。

```
var bar = {
  foo0: function () {
    return 0;
  },
  foo1() {
    return 1;
  },
  ["foo" + 2]() {
    return 2;
  },
};

console.log(bar.foo0()); // 0
console.log(bar.foo1()); // 1
console.log(bar.foo2()); // 2
```

## [规范](#规范)

| Specification                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ECMAScript Language Specification<!-- --> # <!-- -->sec-method-definitions](https://tc39.es/ecma262/multipage/ecmascript-language-functions-and-classes.html#sec-method-definitions) |

## [浏览器兼容性](#浏览器兼容性)

[Report problems with this compatibility data on GitHub](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FFunctions%2FMethod_definitions\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60javascript.functions.method_definitions%60%0A*+Report+started%3A+2024-04-18T09%3A17%3A21.997Z%0A%0A%3C%2Fdetails%3E\&title=javascript.functions.method_definitions+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|                                                  | desktop |      |         |       |        | mobile         |                     |               |               |                  |                 | server |         |
| ------------------------------------------------ | ------- | ---- | ------- | ----- | ------ | -------------- | ------------------- | ------------- | ------------- | ---------------- | --------------- | ------ | ------- |
|                                                  | Chrome  | Edge | Firefox | Opera | Safari | Chrome Android | Firefox for Android | Opera Android | Safari on iOS | Samsung Internet | WebView Android | Deno   | Node.js |
| Method definitions                               |         |      |         |       |        |                |                     |               |               |                  |                 |        |         |
| Async generator methods                          |         |      |         |       |        |                |                     |               |               |                  |                 |        |         |
| Async methods                                    |         |      |         |       |        |                |                     |               |               |                  |                 |        |         |
| Generator methods are not constructable (ES2016) |         |      |         |       |        |                |                     |               |               |                  |                 |        |         |

### Legend

Tip: you can click/tap on a cell for more information.

* Full support

  Full support

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## [参见](#参见)
