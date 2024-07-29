## Baseline<!-- --> Widely available 基线广泛可用

The **`forEach()`** method of [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) instances executes a provided function once for each array element.`Array` 实例 `forEach()` 的方法为每个数组元素执行一次提供的函数。

## [Try it 尝试一下](#try_it)

## [Syntax 语法](#syntax)

```
forEach(callbackFn)
forEach(callbackFn, thisArg)
```

### [Parameters 参数](#parameters)

* [`callbackFn`](#callbackfn)

  A function to execute for each element in the array. Its return value is discarded. The function is called with the following arguments: 要为数组中的每个元素执行的函数。其返回值将被丢弃。使用以下参数调用该函数：

  * [`element`](#element)

    The current element being processed in the array. 数组中正在处理的当前元素。

  * [`index`](#index)

    The index of the current element being processed in the array. 数组中正在处理的当前元素的索引。

  * [`array`](#array)

    The array `forEach()` was called upon. 阵列 `forEach()` 被调用。

* [`thisArg`](#thisarg) Optional  `thisArg` 自选

  A value to use as `this` when executing `callbackFn`. See [iterative methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#iterative_methods). 执行 `callbackFn` 时要使用 `this` 的值。请参阅迭代方法。

### [Return value 返回值](#return_value)

None ([`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)). 无 （ `undefined` ）。

## [Description 描述](#description)

The `forEach()` method is an [iterative method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#iterative_methods). It calls a provided `callbackFn` function once for each element in an array in ascending-index order. Unlike [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), `forEach()` always returns [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) and is not chainable. The typical use case is to execute side effects at the end of a chain. Read the [iterative methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#iterative_methods) section for more information about how these methods work in general. 该 `forEach()` 方法是一种迭代方法。它按升序索引顺序为数组中的每个元素调用一次提供的 `callbackFn` 函数。与 不同 `map()` ，总是 `forEach()` 返回 `undefined` 并且不可链接。典型的用例是在链的末端执行副作用。阅读迭代方法部分，了解有关这些方法的一般工作方式的更多信息。

`callbackFn` is invoked only for array indexes which have assigned values. It is not invoked for empty slots in [sparse arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections#sparse_arrays).`callbackFn` 仅对具有指定值的数组索引调用。对于稀疏数组中的空插槽，不会调用它。

The `forEach()` method is [generic](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#generic_array_methods). It only expects the `this` value to have a `length` property and integer-keyed properties. 该 `forEach()` 方法是通用的。它只期望 `this` 值具有 `length` 属性和整数键控属性。

There is no way to stop or break a `forEach()` loop other than by throwing an exception. If you need such behavior, the `forEach()` method is the wrong tool. 除了抛出异常之外，没有其他方法可以停止或中断 `forEach()` 循环。如果你需要这样的行为，那么该 `forEach()` 方法是错误的工具。

Early termination may be accomplished with looping statements like [`for`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for), [`for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of), and [`for...in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in). Array methods like [`every()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every), [`some()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some), [`find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find), and [`findIndex()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) also stops iteration immediately when further iteration is not necessary. 可以使用像 、 `for...of` 和 `for...in` 这样的 `for` 循环语句来完成提前终止。数组方法（如 `every()` 、 `some()` 、 `find()` 和 `findIndex()` ）也会在不需要进一步迭代时立即停止迭代。

`forEach()` expects a synchronous function — it does not wait for promises. Make sure you are aware of the implications while using promises (or async functions) as `forEach` callbacks.`forEach()` 期望有一个同步函数 — 它不会等待 promise。请确保在使用 promises（或异步函数）作为 `forEach` 回调时了解其影响。

```
const ratings = [5, 4, 5];
let sum = 0;

const sumFunction = async (a, b) => a + b;

ratings.forEach(async (rating) => {
  sum = await sumFunction(sum, rating);
});

console.log(sum);
// Naively expected output: 14
// Actual output: 0
```

To run a series of asynchronous operations sequentially or concurrently, see [promise composition](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#composition). 要按顺序或并发运行一系列异步操作，请参阅 promise 组合。

## [Examples 例子](#examples)

### [Converting a for loop to forEach 将 for 循环转换为 forEach](#converting_a_for_loop_to_foreach)

```
const items = ["item1", "item2", "item3"];
const copyItems = [];

// before
for (let i = 0; i < items.length; i++) {
  copyItems.push(items[i]);
}

// after
items.forEach((item) => {
  copyItems.push(item);
});
```

### [Printing the contents of an array 打印数组的内容](#printing_the_contents_of_an_array)

**Note:** In order to display the content of an array in the console, you can use [`console.table()`](https://developer.mozilla.org/en-US/docs/Web/API/console/table_static "console.table()"), which prints a formatted version of the array. 注意：为了在控制台中显示数组的内容，您可以使用 `console.table()` ，它打印数组的格式化版本。

The following example illustrates an alternative approach, using `forEach()`. 以下示例说明了另一种方法，使用 `forEach()` .

The following code logs a line for each element in an array: 以下代码为数组中的每个元素记录一行：

```
const logArrayElements = (element, index /*, array */) => {
  console.log(`a[${index}] = ${element}`);
};

// Notice that index 2 is skipped, since there is no item at
// that position in the array.
[2, 5, , 9].forEach(logArrayElements);
// Logs:
// a[0] = 2
// a[1] = 5
// a[3] = 9
```

### [Using thisArg 使用 thisArg](#using_thisarg)

The following (contrived) example updates an object's properties from each entry in the array: 以下（人为的）示例更新数组中每个条目的对象属性：

```
class Counter {
  constructor() {
    this.sum = 0;
    this.count = 0;
  }
  add(array) {
    // Only function expressions have their own this bindings.
    array.forEach(function countEntry(entry) {
      this.sum += entry;
      ++this.count;
    }, this);
  }
}

const obj = new Counter();
obj.add([2, 5, 9]);
console.log(obj.count); // 3
console.log(obj.sum); // 16
```

Since the `thisArg` parameter (`this`) is provided to `forEach()`, it is passed to `callback` each time it's invoked. The callback uses it as its `this` value. 由于 `thisArg` 参数 （ `this` ） 是提供给 `forEach()` 的，因此 `callback` 每次调用它时都会传递给它。回调使用它作为其 `this` 值。

**Note:** If passing the callback function used an [arrow function expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), the `thisArg` parameter could be omitted, since all arrow functions lexically bind the [`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) value. 注意：如果传递回调函数使用箭头函数表达式，则可以省略该 `thisArg` 参数，因为所有箭头函数都在词法上绑定该 `this` 值。

### [An object copy function 对象复制函数](#an_object_copy_function)

The following code creates a copy of a given object. 以下代码创建给定对象的副本。

There are different ways to create a copy of an object. The following is just one way and is presented to explain how `Array.prototype.forEach()` works by using `Object.*` utility functions. 有多种方法可以创建对象的副本。以下只是一种方法，旨在解释如何使用 `Object.*` 实用程序函数 `Array.prototype.forEach()` 来工作。

```
const copy = (obj) => {
  const copy = Object.create(Object.getPrototypeOf(obj));
  const propNames = Object.getOwnPropertyNames(obj);
  propNames.forEach((name) => {
    const desc = Object.getOwnPropertyDescriptor(obj, name);
    Object.defineProperty(copy, name, desc);
  });
  return copy;
};

const obj1 = { a: 1, b: 2 };
const obj2 = copy(obj1); // obj2 looks like obj1 now
```

### [Flatten an array 展平数组](#flatten_an_array)

The following example is only here for learning purpose. If you want to flatten an array using built-in methods, you can use [`Array.prototype.flat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat). 以下示例仅用于学习目的。如果要使用内置方法展平数组，可以使用 `Array.prototype.flat()` 。

```
const flatten = (arr) => {
  const result = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else {
      result.push(item);
    }
  });
  return result;
};

// Usage
const nested = [1, 2, 3, [4, 5, [6, 7], 8, 9]];
console.log(flatten(nested)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### [Using the third argument of callbackFn 使用 callbackFn 的第三个参数](#using_the_third_argument_of_callbackfn)

The `array` argument is useful if you want to access another element in the array, especially when you don't have an existing variable that refers to the array. The following example first uses `filter()` to extract the positive values and then uses `forEach()` to log its neighbors. 如果要访问数组中的另一个元素，则该 `array` 参数非常有用，尤其是当没有引用数组的现有变量时。以下示例首先用于 `filter()` 提取正值，然后用于 `forEach()` 记录其邻居值。

```
const numbers = [3, -1, 1, 4, 1, 5];
numbers
  .filter((num) => num > 0)
  .forEach((num, idx, arr) => {
    // Without the arr argument, there's no way to easily access the
    // intermediate array without saving it to a variable.
    console.log(arr[idx - 1], num, arr[idx + 1]);
  });
// undefined 3 1
// 3 1 4
// 1 4 1
// 4 1 5
// 1 5 undefined
```

### [Using forEach () on sparse arrays 在稀疏数组上使用 forEach（）](#using_foreach_on_sparse_arrays)

```
const arraySparse = [1, 3, /* empty */, 7];
let numCallbackRuns = 0;

arraySparse.forEach((element) => {
  console.log({ element });
  numCallbackRuns++;
});

console.log({ numCallbackRuns });

// { element: 1 }
// { element: 3 }
// { element: 7 }
// { numCallbackRuns: 3 }
```

The callback function is not invoked for the missing value at index 2. 对于索引 2 处的缺失值，不会调用回调函数。

### [Calling forEach () on non-array objects 在非数组对象上调用 forEach（）](#calling_foreach_on_non-array_objects)

The `forEach()` method reads the `length` property of `this` and then accesses each property whose key is a nonnegative integer less than `length`. 该 `forEach()` 方法读取 的 `length` `this` 属性，然后访问其键为小于 `length` 的非负整数的每个属性。

```
const arrayLike = {
  length: 3,
  0: 2,
  1: 3,
  2: 4,
  3: 5, // ignored by forEach() since length is 3
};
Array.prototype.forEach.call(arrayLike, (x) => console.log(x));
// 2
// 3
// 4
```

## [Specifications 规格](#specifications)

| Specification 规范                                                                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ECMAScript Language SpecificationECMAScript 语言规范<!-- --> # <!-- -->sec-array.prototype.foreach](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.foreach) |

## [Browser compatibility 浏览器兼容性](#browser_compatibility)

[Report problems with this compatibility data on GitHub 在 GitHub 上报告此兼容性数据的问题](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FArray%2FforEach\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60javascript.builtins.Array.forEach%60%0A*+Report+started%3A+2024-07-27T08%3A10%3A46.703Z%0A%0A%3C%2Fdetails%3E\&title=javascript.builtins.Array.forEach+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|           | desktop  |         |               |          |                   | mobile         |                                         |                        |                                 |                        |                 | server  |         |
| --------- | -------- | ------- | ------------- | -------- | ----------------- | -------------- | --------------------------------------- | ---------------------- | ------------------------------- | ---------------------- | --------------- | ------- | ------- |
|           | Chrome 铬 | Edge 边缘 | Firefox 火狐浏览器 | Opera 歌剧 | Safari Safari 浏览器 | Chrome Android | Firefox for Android Firefox 针对于 Android | Opera Android Opera 安卓 | Safari on iOS iOS 上的 Safari 浏览器 | Samsung Internet 三星互联网 | WebView Android | Deno 德诺 | Node.js |
| `forEach` |          |         |               |          |                   |                |                                         |                        |                                 |                        |                 |         |         |

### Legend

Tip: you can click/tap on a cell for more information. 提示：您可以单击 / 点击单元格以获取更多信息。

* Full support

  Full support 全面支持

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## [See also 另请参阅](#see_also)
