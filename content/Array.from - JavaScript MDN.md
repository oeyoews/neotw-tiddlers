**`Array.from()`** 静态方法从[可迭代](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#%E5%8F%AF%E8%BF%AD%E4%BB%A3%E5%8D%8F%E8%AE%AE)或[类数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#%E4%BD%BF%E7%94%A8%E7%B1%BB%E6%95%B0%E7%BB%84%E5%AF%B9%E8%B1%A1)对象创建一个新的浅拷贝的数组实例。

转换[异步的可迭代](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#%E5%BC%82%E6%AD%A5%E8%BF%AD%E4%BB%A3%E5%99%A8%E5%92%8C%E5%BC%82%E6%AD%A5%E5%8F%AF%E8%BF%AD%E4%BB%A3%E5%8D%8F%E8%AE%AE)对象到数组，可以使用 [`Array.fromAsync()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync)。

## [尝试一下](#尝试一下)

## [语法](#语法)

```
Array.from(arrayLike)
Array.from(arrayLike, mapFn)
Array.from(arrayLike, mapFn, thisArg)
```

### [参数](#参数)

* [`arrayLike`](#arraylike)

  想要转换成数组的类数组或可迭代对象。

* [`mapFn`](#mapfn) 可选

  调用数组每个元素的函数。如果提供，每个将要添加到数组中的值首先会传递给该函数，然后将 `mapFn` 的返回值增加到数组中。使用以下参数调用该函数：

  * [`element`](#element)

    数组当前正在处理的元素。

  * [`index`](#index)

    数组当前正在处理的元素的索引。

* [`thisArg`](#thisarg) 可选

  执行 `mapFn` 时用作 `this` 的值。

### [返回值](#返回值)

一个新的[数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)实例。

## [描述](#描述)

`Array.from()` 可以通过以下方式来创建数组对象：

* [可迭代对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)（例如 [`Map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map) 和 [`Set`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set) 对象）；或者，如果对象是不可迭代的，
* 类数组对象（带有 `length` 属性和索引元素的对象）。

`Array.from()` 绝不会创建稀疏数组。如果 `arrayLike` 对象缺少一些索引属性，那么这些属性在新数组中将是 `undefined`。

`Array.from()` 有一个可选的参数 `mapFn`，该参数允许你在创建数组时为每个元素执行一个函数，类似于 [`map()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)。更明确地说，`Array.from(obj, mapFn, thisArg)` 和 `Array.from(obj).map(mapFn, thisArg)` 具有相同的结果，只是它不会创建中间数组，并且 `mapFn` 仅接受两个参数（`element`、`index`），不接受数组，因为数组仍然在构建中。

`Array.from()` 方法是一个通用的工厂方法。例如，如果一个数组类的子类继承 `from()` 方法，继承的 `from()` 方法将返回新的子类的实例，而不是数组的实例。事实上，`this` 值可以是任意的构造函数，只要该构造函数接受一个表示新数组长度的单个参数。当一个迭代器对象作为类数组传递时，不带参数调用构造函数；当传递类数组对象时，将携带类数组对象的[规范化长度](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#%E9%95%BF%E5%BA%A6%E5%B1%9E%E6%80%A7%E7%9A%84%E8%A7%84%E8%8C%83%E5%8C%96)调用构造函数。迭代完成时，将再次设置最终的 `length`。如果 `this` 值并不是构造函数，则使用 `Array` 构造函数。

## [示例](#示例)

### [从字符串构建数组](#从字符串构建数组)

```
Array.from("foo");
// [ "f", "o", "o" ]
```

### [从 Set 构建数组](#从_set_构建数组)

```
const set = new Set(["foo", "bar", "baz", "foo"]);
Array.from(set);
// [ "foo", "bar", "baz" ]
```

### [从 Map 构建数组](#从_map_构建数组)

```
const map = new Map([
  [1, 2],
  [2, 4],
  [4, 8],
]);
Array.from(map);
// [[1, 2], [2, 4], [4, 8]]

const mapper = new Map([
  ["1", "a"],
  ["2", "b"],
]);
Array.from(mapper.values());
// ['a', 'b'];

Array.from(mapper.keys());
// ['1', '2'];
```

### [从 NodeList 构建数组](#从_nodelist_构建数组)

```
// 根据 DOM 元素的属性创建一个数组
const images = document.querySelectorAll("img");
const sources = Array.from(images, (image) => image.src);
const insecureSources = sources.filter((link) => link.startsWith("http://"));
```

### [从类数组对象构建数组（arguments）](#从类数组对象构建数组（arguments）)

```
function f() {
  return Array.from(arguments);
}
f(1, 2, 3);
// [ 1, 2, 3 ]
```

### [使用箭头函数和 Array.from ()](#使用箭头函数和_array.from)

```
// 使用箭头函数作为映射函数去操作多个元素
Array.from([1, 2, 3], (x) => x + x);
// [2, 4, 6]

// 生成一个数字序列。因为数组在每个位置都使用 `undefined` 初始化，下面的 `v` 值将是 `undefined`
Array.from({ length: 5 }, (v, i) => i);
// [0, 1, 2, 3, 4]
```

### [序列生成器（range）](#序列生成器（range）)

```
// 序列生成器函数（通常称为“range”，例如 Clojure、PHP 等）
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

// 生成的数字范围 0..4
range(0, 4, 1);
// [0, 1, 2, 3, 4]

// 生成的数字范围 1..10，步长为 2
range(1, 10, 2);
// [1, 3, 5, 7, 9]

// 使用 Array.from 生成字母表，并将其序列排序
range("A".charCodeAt(0), "Z".charCodeAt(0), 1).map((x) =>
  String.fromCharCode(x),
);
// ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
```

### [在非数组构造函数上调用 from ()](#在非数组构造函数上调用_from)

`from()` 方法可以在任何构造函数上调用，只要该构造函数接受一个表示新数组长度的单个参数。

```
function NotArray(len) {
  console.log("NotArray called with length", len);
}

// 可迭代对象
console.log(Array.from.call(NotArray, new Set(["foo", "bar", "baz"])));
// NotArray called with length undefined
// NotArray { '0': 'foo', '1': 'bar', '2': 'baz', length: 3 }

// 类数组对象
console.log(Array.from.call(NotArray, { length: 1, 0: "foo" }));
// NotArray called with length 1
// NotArray { '0': 'foo', length: 1 }
```

当 `this` 值不是构造函数，返回一个普通的数组对象。

```
console.log(Array.from.call({}, { length: 1, 0: "foo" })); // [ 'foo' ]
```

## [规范](#规范)

| Specification                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------- |
| [ECMAScript Language Specification<!-- --> # <!-- -->sec-array.from](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.from) |

## [浏览器兼容性](#浏览器兼容性)

[Report problems with this compatibility data on GitHub](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FArray%2Ffrom\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60javascript.builtins.Array.from%60%0A*+Report+started%3A+2024-01-16T08%3A49%3A51.689Z%0A%0A%3C%2Fdetails%3E\&title=javascript.builtins.Array.from+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|        | desktop |      |         |       |        | mobile         |                     |               |               |                  |                 | server |         |
| ------ | ------- | ---- | ------- | ----- | ------ | -------------- | ------------------- | ------------- | ------------- | ---------------- | --------------- | ------ | ------- |
|        | Chrome  | Edge | Firefox | Opera | Safari | Chrome Android | Firefox for Android | Opera Android | Safari on iOS | Samsung Internet | WebView Android | Deno   | Node.js |
| `from` |         |      |         |       |        |                |                     |               |               |                  |                 |        |         |

### Legend

Tip: you can click/tap on a cell for more information.

* Full support

  Full support

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## [参见](#参见)
