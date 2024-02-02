## Baseline<!-- --> Widely available 基线广泛可用

The **`flatMap()`** method of [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) instances returns a new array formed by applying a given callback function to each element of the array, and then flattening the result by one level. It is identical to a [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) followed by a [`flat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) of depth 1 (`arr.map(...args).flat()`), but slightly more efficient than calling those two methods separately.`Array` 实例的 `flatMap()` 方法返回一个新数组，该数组通过将给定的回调函数应用于数组的每个元素，然后将结果展平一级而形成。它与 `map()` 后跟深度为 1 ( `arr.map(...args).flat()` ) 的 `flat()` 相同，但比分别调用这两个方法稍微高效一些。

## [Try it  尝试一下](#try_it)

## [Syntax 句法](#syntax)

```
flatMap(callbackFn)
flatMap(callbackFn, thisArg)
```

### [Parameters  参数](#parameters)

* [`callbackFn`](#callbackfn)

  A function to execute for each element in the array. It should return an array containing new elements of the new array, or a single non-array value to be added to the new array. The function is called with the following arguments: 对数组中的每个元素执行的函数。它应该返回一个包含新数组的新元素的数组，或要添加到新数组的单个非数组值。使用以下参数调用该函数：

  * [`element`](#element)

    The current element being processed in the array. 数组中当前正在处理的元素。

  * [`index`](#index)

    The index of the current element being processed in the array. 数组中当前正在处理的元素的索引。

  * [`array`](#array)

    The array `flatMap()` was called upon. 调用了数组 `flatMap()` 。

* [`thisArg`](#thisarg) Optional  `thisArg` 可选

  A value to use as `this` when executing `callbackFn`. See [iterative methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#iterative_methods). 执行 `callbackFn` 时用作 `this` 的值。请参阅迭代方法。

### [Return value  返回值](#return_value)

A new array with each element being the result of the callback function and flattened by a depth of 1. 一个新数组，其中每个元素都是回调函数的结果，并按深度 1 展平。

## [Description  描述](#description)

The `flatMap()` method is an [iterative method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#iterative_methods). See [`Array.prototype.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) for a detailed description of the callback function. The `flatMap()` method is identical to [`map(callbackFn, thisArg)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) followed by [`flat(1)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) — for each element, it produces an array of new elements, and concatenates the resulting arrays together to form a new array. Read the [iterative methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#iterative_methods) section for more information about how these methods work in general.`flatMap()` 方法是一种迭代方法。回调函数的详细说明请参见 `Array.prototype.map()` 。 `flatMap()` 方法与 `map(callbackFn, thisArg)` 后跟 `flat(1)` 相同 - 对于每个元素，它生成一个新元素数组，并将结果数组连接在一起形成一个新数组。请阅读迭代方法部分，了解有关这些方法一般如何工作的更多信息。

The `flatMap()` method is [generic](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#generic_array_methods). It only expects the `this` value to have a `length` property and integer-keyed properties. However, the value returned from `callbackFn` must be an array if it is to be flattened.`flatMap()` 方法是通用的。它只期望 `this` 值具有 `length` 属性和整数键属性。但是，如果要展平，从 `callbackFn` 返回的值必须是数组。

### [Alternative  选择](#alternative)

#### Pre-allocate and explicitly iterate 预分配和显式迭代

```
const arr = [1, 2, 3, 4];

arr.flatMap((x) => [x, x * 2]);
// is equivalent to
const n = arr.length;
const acc = new Array(n * 2);
for (let i = 0; i < n; i++) {
  const x = arr[i];
  acc[i * 2] = x;
  acc[i * 2 + 1] = x * 2;
}
// [1, 2, 2, 4, 3, 6, 4, 8]
```

Note that in this particular case the `flatMap` approach is slower than the for-loop approach — due to the creation of temporary arrays that must be garbage collected, as well as the return array not needing to be frequently resized. However, `flatMap` may still be the correct solution in cases where its flexibility and readability are desired. 请注意，在这种特殊情况下， `flatMap` 方法比 for 循环方法慢 — 这是因为创建了必须进行垃圾收集的临时数组，并且返回数组不需要频繁调整大小。但是，在需要灵活性和可读性的情况下， `flatMap` 可能仍然是正确的解决方案。

## [Examples  例子](#examples)

### [map () and flatMap ()  map () 和 flatMap ()](#map_and_flatmap)

```
const arr1 = [1, 2, 3, 4];

arr1.map((x) => [x * 2]);
// [[2], [4], [6], [8]]

arr1.flatMap((x) => [x * 2]);
// [2, 4, 6, 8]

// only one level is flattened
arr1.flatMap((x) => [[x * 2]]);
// [[2], [4], [6], [8]]
```

While the above could have been achieved by using map itself, here is an example that better showcases the use of `flatMap()`. 虽然上述内容可以通过使用地图本身来实现，但这里有一个更好地展示 `flatMap()` 用法的示例。

Let's generate a list of words from a list of sentences. 让我们从句子列表中生成单词列表。

```
const arr1 = ["it's Sunny in", "", "California"];

arr1.map((x) => x.split(" "));
// [["it's","Sunny","in"],[""],["California"]]

arr1.flatMap((x) => x.split(" "));
// ["it's","Sunny","in", "", "California"]
```

Notice, the output list length can be different from the input list length. 请注意，输出列表长度可以与输入列表长度不同。

### [For adding and removing items during a map () 用于在 map () 期间添加和删除项目](#for_adding_and_removing_items_during_a_map)

`flatMap` can be used as a way to add and remove items (modify the number of items) during a `map`. In other words, it allows you to map *many items to many items* (by handling each input item separately), rather than always *one-to-one*. In this sense, it works like the opposite of [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter). Return a 1-element array to keep the item, a multiple-element array to add items, or a 0-element array to remove the item.`flatMap` 可用作在 `map` 期间添加和删除项目（修改项目数量）的方法。换句话说，它允许您将许多项目映射到许多项目（通过单独处理每个输入项目），而不是始终一对一。从这个意义上说，它的工作原理与过滤器相反。返回 1 元素数组以保留项目，返回多元素数组以添加项目，或返回 0 元素数组以删除项目。

```
// Let's say we want to remove all the negative numbers
// and split the odd numbers into an even number and a 1
const a = [5, 4, -3, 20, 17, -33, -4, 18];
//         |\  \  x   |  | \   x   x   |
//        [4,1, 4,   20, 16, 1,       18]

const result = a.flatMap((n) => {
  if (n < 0) {
    return [];
  }
  return n % 2 === 0 ? [n] : [n - 1, 1];
});
console.log(result); // [4, 1, 4, 20, 16, 1, 18]
```

### [Using the third argument of callbackFn 使用 callbackFn 的第三个参数](#using_the_third_argument_of_callbackfn)

The `array` argument is useful if you want to access another element in the array, especially when you don't have an existing variable that refers to the array. The following example first uses `filter()` to extract operational stations and then uses `flatMap()` to create a new array where each element contains a station and its next station. On the last station, it returns an empty array to exclude it from the final array. 如果您想访问数组中的另一个元素， `array` 参数非常有用，特别是当您没有引用该数组的现有变量时。以下示例首先使用 `filter()` 提取操作站点，然后使用 `flatMap()` 创建一个新数组，其中每个元素包含一个站点及其下一个站点。在最后一个站点上，它返回一个空数组以将其从最终数组中排除。

```
const stations = ["New Haven", "West Haven", "Milford (closed)", "Stratford"];
const line = stations
  .filter((name) => !name.endsWith("(closed)"))
  .flatMap((name, idx, arr) => {
    // Without the arr argument, there's no way to easily access the
    // intermediate array without saving it to a variable.
    if (idx === arr.length - 1) return []; // last station has no next station
    return [`${name} - ${arr[idx + 1]}`];
  });
console.log(line); // ['New Haven - West Haven', 'West Haven - Stratford']
```

The `array` argument is *not* the array that is being built — there is no way to access the array being built from the callback function.`array` 参数不是正在构建的数组 - 无法从回调函数访问正在构建的数组。

### [Using flatMap () on sparse arrays 在稀疏数组上使用 flatMap ()](#using_flatmap_on_sparse_arrays)

The `callbackFn` won't be called for empty slots in the source array because `map()` doesn't, while `flat()` ignores empty slots in the returned arrays. 对于源数组中的空槽，不会调用 `callbackFn` ，因为 `map()` 不会调用，而 `flat()` 会忽略返回数组中的空槽。

```
console.log([1, 2, , 4, 5].flatMap((x) => [x, x * 2])); // [1, 2, 2, 4, 4, 8, 5, 10]
console.log([1, 2, 3, 4].flatMap((x) => [, x * 2])); // [2, 4, 6, 8]
```

### [Calling flatMap () on non-array objects 在非数组对象上调用 flatMap ()](#calling_flatmap_on_non-array_objects)

The `flatMap()` method reads the `length` property of `this` and then accesses each property whose key is a nonnegative integer less than `length`. If the return value of the callback function is not an array, it is always directly appended to the result array.`flatMap()` 方法读取 `this` 的 `length` 属性，然后访问键为小于 `length` 的非负整数的每个属性。如果回调函数的返回值不是数组，则总是直接追加到结果数组中。

```
const arrayLike = {
  length: 3,
  0: 1,
  1: 2,
  2: 3,
  3: 4, // ignored by flatMap() since length is 3
};
console.log(Array.prototype.flatMap.call(arrayLike, (x) => [x, x * 2]));
// [1, 2, 2, 4, 3, 6]

// Array-like objects returned from the callback won't be flattened
console.log(
  Array.prototype.flatMap.call(arrayLike, (x) => ({
    length: 1,
    0: x,
  })),
);
// [ { '0': 1, length: 1 }, { '0': 2, length: 1 }, { '0': 3, length: 1 } ]
```

## [Specifications  规格](#specifications)

| Specification 规格                                                                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ECMAScript Language SpecificationECMAScript 语言规范<!-- --> # <!-- -->sec-array.prototype.flatmap](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.flatmap) |

## [Browser compatibility  浏览器兼容性](#browser_compatibility)

[Report problems with this compatibility data on GitHub 在 GitHub 上报告此兼容性数据的问题](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FArray%2FflatMap\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60javascript.builtins.Array.flatMap%60%0A*+Report+started%3A+2024-02-02T15%3A18%3A36.979Z%0A%0A%3C%2Fdetails%3E\&title=javascript.builtins.Array.flatMap+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|           | desktop    |         |               |          |              | mobile              |                              |                    |                             |                        |                              | server  |         |
| --------- | ---------- | ------- | ------------- | -------- | ------------ | ------------------- | ---------------------------- | ------------------ | --------------------------- | ---------------------- | ---------------------------- | ------- | ------- |
|           | Chrome 铬合金 | Edge 边缘 | Firefox 火狐浏览器 | Opera 歌剧 | Safari 苹果浏览器 | Chrome Android 铬 安卓 | Firefox for Android 安卓版火狐浏览器 | Opera Android 安卓系统 | Safari on iOS iOS 上的 Safari | Samsung Internet 三星互联网 | WebView Android Android 网页视图 | Deno 德诺 | Node.js |
| `flatMap` |            |         |               |          |              |                     |                              |                    |                             |                        |                              |         |         |

### Legend

Tip: you can click/tap on a cell for more information. 提示：您可以单击 / 点击单元格以获取更多信息。

* Full support

  Full support 全力支持

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## [See also  也可以看看](#see_also)
